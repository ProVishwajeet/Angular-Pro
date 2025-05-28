#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Install Angular CLI globally if not already installed
if ! command -v ng &> /dev/null
then
    echo "Installing Angular CLI globally..."
    npm install -g @angular/cli
fi

# Start the development server
echo "Starting the Angular development server..."
ng serve --open
