package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

// Todo represents a task in the To-Do list
type Todo struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
}

// Database connection string
const (
	host     = "postgres"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "todo-test"
)

// Add a worker pool configuration
const (
	maxWorkers = 5   // Number of worker goroutines
	maxQueue   = 100 // Size of the job queue
)

// Job represents a database operation
type Job struct {
	handler func() error
	result  chan error
}

// Worker pool
type WorkerPool struct {
	jobs    chan Job
	results chan error
}

// Create a new worker pool
func NewWorkerPool(maxWorkers int, maxQueue int) *WorkerPool {
	pool := &WorkerPool{
		jobs:    make(chan Job, maxQueue),
		results: make(chan error, maxQueue),
	}

	// Start workers
	for i := 0; i < maxWorkers; i++ {
		go pool.worker()
	}

	return pool
}

// Worker process
func (p *WorkerPool) worker() {
	for job := range p.jobs {
		err := job.handler()
		job.result <- err
	}
}

var db *sql.DB

func init() {
	// Initialize database connection
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	var err error
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v\n", err)
	}

	// Verify the connection
	err = db.Ping()
	if err != nil {
		log.Fatalf("Failed to ping database: %v\n", err)
	}

	log.Println("Database connected successfully!")
}

func main() {
	// Create worker pool
	pool := NewWorkerPool(maxWorkers, maxQueue)

	// Create a new router
	r := mux.NewRouter()

	// Update route handlers to use the worker pool
	r.HandleFunc("/todos", getAllTodosHandler(pool)).Methods("GET")
	r.HandleFunc("/todos/{id:[0-9]+}", getTodoByIDHandler(pool)).Methods("GET")
	r.HandleFunc("/todos", createTodoHandler(pool)).Methods("POST")
	r.HandleFunc("/todos/{id:[0-9]+}", updateTodoHandler(pool)).Methods("PUT")
	r.HandleFunc("/todos/{id:[0-9]+}", deleteTodoHandler(pool)).Methods("DELETE")

	// Configure the HTTP server
	server := &http.Server{
		Addr:         ":8080",
		Handler:      r,
		ReadTimeout:  10 * time.Second, // Timeout for reading requests
		WriteTimeout: 10 * time.Second, // Timeout for writing responses
		IdleTimeout:  60 * time.Second, // Timeout for idle connections
	}

	// Channel to listen for interrupt signals for graceful shutdown
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	// WaitGroup to ensure all goroutines finish before shutdown
	var wg sync.WaitGroup

	// Start the server in a separate goroutine
	go func() {
		log.Println("Server is running on port 8080...")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Error starting server: %v", err)
		}
	}()

	// Wait for a termination signal
	<-stop
	log.Println("Shutting down the server...")

	// Gracefully shutdown the server with a timeout context
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Shutdown the server
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Error during shutdown: %v", err)
	}

	// Wait for all goroutines to complete
	wg.Wait()
	log.Println("Server gracefully stopped.")
}

// Refactored handlers to use worker pool
func createTodoHandler(pool *WorkerPool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var todo Todo
		if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		resultChan := make(chan error, 1)
		pool.jobs <- Job{
			handler: func() error {
				return db.QueryRow(
					"INSERT INTO todos (title, description, completed) VALUES ($1, $2, $3) RETURNING id",
					todo.Title, todo.Description, todo.Completed,
				).Scan(&todo.ID)
			},
			result: resultChan,
		}

		if err := <-resultChan; err != nil {
			http.Error(w, "Failed to create todo", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(todo)
	}
}

// Example of refactored getAllTodos handler
func getAllTodosHandler(pool *WorkerPool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var todos []Todo
		resultChan := make(chan error, 1)

		pool.jobs <- Job{
			handler: func() error {
				rows, err := db.Query("SELECT id, title, description, completed FROM todos")
				if err != nil {
					return err
				}
				defer rows.Close()

				for rows.Next() {
					var todo Todo
					if err := rows.Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Completed); err != nil {
						return err
					}
					todos = append(todos, todo)
				}
				return nil
			},
			result: resultChan,
		}

		if err := <-resultChan; err != nil {
			http.Error(w, "Failed to fetch todos", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(todos)
	}
}

// Get a single Todo by ID
func getTodoByIDHandler(pool *WorkerPool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]
		var todo Todo
		err := db.QueryRow("SELECT id, title, description, completed FROM todos WHERE id=$1", id).
			Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Completed)
		if err != nil {
			http.Error(w, "Todo not found", http.StatusNotFound)
			return
		}

		json.NewEncoder(w).Encode(todo)
	}
}

// Update an existing Todo
func updateTodoHandler(pool *WorkerPool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]
		var todo Todo
		err := json.NewDecoder(r.Body).Decode(&todo)
		if err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		_, err = db.Exec(
			"UPDATE todos SET title=$1, description=$2, completed=$3 WHERE id=$4",
			todo.Title, todo.Description, todo.Completed, id,
		)
		if err != nil {
			http.Error(w, "Failed to update todo", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

// Delete a Todo
func deleteTodoHandler(pool *WorkerPool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]
		_, err := db.Exec("DELETE FROM todos WHERE id=$1", id)
		if err != nil {
			http.Error(w, "Failed to delete todo", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusNoContent)
	}
}
