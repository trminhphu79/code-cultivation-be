#!/bin/bash

# Function to push code to both repositories
push_code() {
  # GitHub remote name
  GITHUB_REMOTE="origin"

  # Bitbucket remote name
  BITBUCKET_REMOTE="bitbucket"

  # Get the current branch
  BRANCH=$(git branch --show-current)

  if [ -z "$BRANCH" ]; then
    echo "Error: Unable to detect the current branch."
    exit 1
  fi

  echo "Current branch: $BRANCH"

  echo "Pushing to GitHub ($GITHUB_REMOTE)..."
  git push "$GITHUB_REMOTE" "$BRANCH" || {
    echo "Error: Failed to push to GitHub."
    exit 1
  }

  echo "Pushing to Bitbucket ($BITBUCKET_REMOTE)..."
  git push "$BITBUCKET_REMOTE" "$BRANCH" || {
    echo "Error: Failed to push to Bitbucket."
    exit 1
  }

  echo "Push to both repositories completed successfully!"
}

# Function to check Git remotes
check_remotes() {
  if ! git remote | grep -q "origin"; then
    echo "Error: GitHub remote (origin) not set."
    exit 1
  fi

  if ! git remote | grep -q "bitbucket"; then
    echo "Error: Bitbucket remote (bitbucket) not set."
    exit 1
  fi
}

# Main execution
main() {
  echo "Checking remotes..."
  check_remotes
  echo "Remotes are valid."
  push_code
}

main