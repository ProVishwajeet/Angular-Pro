# Coinspace Angular Application

This is an Angular application for Coinspace cryptocurrency platform with a responsive header, sidebar navigation, and cryptocurrency dashboard.

## Features

- Responsive header with search functionality
- Collapsible sidebar navigation
- Interactive menu with submenu options
- Notification system with badge indicator
- Snackbar notifications for user actions
- Cryptocurrency dashboard with real-time market data
- PostgreSQL database integration for storing cryptocurrency data

## Setup and Running

### Frontend (Angular)

1. Install dependencies:

```bash
npm install
```

2. Start the Angular development server:

```bash
ng serve --port 4201
```

The application will be available at http://localhost:4201

### Backend (Node.js with PostgreSQL)

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Set up PostgreSQL database:

```bash
createdb coinspace
psql -U postgres -d coinspace -f src/config/init.sql
```

4. Start the backend server:

```bash
npm start
```

The API will be available at http://localhost:3000/api

## Project Structure

```
coinspace-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.scss
│   │   │   └── sidebar/
│   │   │       ├── sidebar.component.ts
│   │   │       ├── sidebar.component.html
│   │   │       └── sidebar.component.scss
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   └── app.module.ts
│   ├── assets/
│   │   ├── Bell.svg
│   │   ├── US-flag.svg
│   │   ├── Wallet.svg
│   │   ├── humberger-icon.svg
│   │   ├── profile-icon.jpg
│   │   ├── search.svg
│   │   └── setting-icon.svg
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── tsconfig.json
└── tsconfig.app.json
```

## Installation

1. Install Node.js and npm if not already installed
2. Install Angular CLI: `npm install -g @angular/cli`
3. Navigate to the project directory
4. Install dependencies: `npm install`
5. Start the development server: `ng serve`
6. Open your browser and navigate to `http://localhost:4200`

## Usage

- Click the hamburger icon to toggle the sidebar
- Click on menu items with submenu to expand/collapse them
- Click on submenu items to see snackbar notifications
