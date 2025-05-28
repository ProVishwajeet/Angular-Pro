# Coinspace Angular Application

This is an Angular application for Coinspace cryptocurrency platform with a responsive header and sidebar navigation.

## Features

- Responsive header with search functionality
- Collapsible sidebar navigation
- Interactive menu with submenu options
- Notification system with badge indicator
- Snackbar notifications for user actions

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
