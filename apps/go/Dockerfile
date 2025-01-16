# Use the official Go image as the base
FROM golang:1.23.4-alpine

# Set the working directory inside the container
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main .

EXPOSE 8080
CMD ["./main"]