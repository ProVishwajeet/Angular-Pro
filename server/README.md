# Coinspace API Server

This is the backend server for the Coinspace cryptocurrency dashboard application.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Database Setup

1. Install PostgreSQL if you haven't already.
2. Create a new database named `coinspace`:

```bash
createdb coinspace
```

3. Initialize the database with sample data:

```bash
npm run db:init
```

## Configuration

Create a `.env` file in the server directory with the following variables:

```
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=coinspace
DB_PASSWORD=your_password
DB_PORT=5432
```

Replace `your_password` with your actual PostgreSQL password.

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## API Endpoints

- `GET /api/cryptocurrencies` - Get all cryptocurrencies
- `GET /api/cryptocurrencies/:id` - Get a specific cryptocurrency by ID
- `POST /api/cryptocurrencies` - Create a new cryptocurrency
- `PUT /api/cryptocurrencies/:id` - Update a cryptocurrency
- `DELETE /api/cryptocurrencies/:id` - Delete a cryptocurrency
