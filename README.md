# React Walla Store

An online store application built with React, TypeScript, and Redux Toolkit. This project is a practice e-commerce style application, allowing users to browse, create, and manage advertisements for items they want to sell or buy. It demonstrates fundamental React concepts and modern state management with Redux Toolkit.

---

## 🚀 Features

- **State Management:** Redux Toolkit for centralized state management
- **Authentication:** Login/logout system with localStorage/sessionStorage persistence and "remember me" functionality
- **Ad Management:** Complete CRUD operations for advertisements with filters and pagination
- **Advanced Filters:** Filtering by name, sale type, price, and tags
- **Responsive Design:** Adaptive interface with Tailwind CSS
- **TypeScript:** Complete static typing
- **Testing:** Comprehensive unit test suite with Vitest
- **Image Uploads:** Optional image uploads using multipart/form-data

---

### Redux Store

The application uses Redux Toolkit

### Main Slices

#### Auth Slice

- **Actions:** `bootstrapSession`, `login`, `logout`
- **State:** `token`, `user`, authentication status

#### Adverts Slice

- **Actions:** `fetchAdverts`, `fetchAdvertDetail`, `createAdvert`, `deleteAdvert`
- **State:** `advertisements`, `filters`, `pagination`

#### Tags Slice

- **Actions:** `fetchTags`
- **State:** `tag list`

---

## 🛠️ Installation

## Backend Setup

```bash
# Clone repository
git clone <repository-url>
cd react-walla-store

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Clone backend repository
git clone https://github.com/davidjj76/nodepop-api
cd nodepop-api

# Install dependencies
npm install

# Run development server
npm run dev

```

# Optional: Docker

```bash
docker run --name nodepop-api -dp 3001:3001 \
  -v nodepop-api-data:/home/node/app/data \
  -v nodepop-api-uploads:/home/node/app/uploads \
  davidjj76/nodepop-api
```

## 🧪 Testing

```bash
# Watch mode
npm test

# Run once
npm run test:run

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

## Test Coverage

    1. The application includes tests for:

    2. Synchronous Actions: authSlice.test.ts

    3. Asynchronous Actions: authSlice.async.test.ts

    4. Reducers: advertsSlice.test.ts

    5. Selectors: advertsSelectors.test.ts

    6. Snapshot Testing: AdvertFilters.test.tsx

    7. Store Actions: AdvertFilters.actions.test.tsx

## Test Configuration

    -Vitest: Testing framework

    -Testing Library: Component testing utilities

    -JSDOM: DOM environment for tests

    -Mocks: localStorage, sessionStorage, and services

## Redux DevTools

Redux DevTools is automatically enabled in development mode for debugging.

```bash
NODE_ENV=development # DevTools enabled
NODE_ENV=production  # DevTools disabled
```

## Main Components

    -SessionBootstrap: Restores session from localStorage on app start

    -AdvertFilters: Connected to Redux; allows filtering advertisements by multiple criteria

    -Navbar: Main navigation with authentication state and login/logout actions

## Data Flow

    1. Initialization: SessionBootstrap restores session

    2. Authentication: Login/logout updates store and storage

    3. Data: Components connect to store via hooks

    4. Filters: Filter changes trigger Redux actions

    5. UI: Components automatically re-render

## Available Scripts

```bash
npm run dev           # Development server
npm run build         # Production build
npm run preview       # Production preview
npm run lint          # Code linting
npm test              # Run tests
npm run test:run      # Tests once
npm run test:ui       # Tests with UI
npm run test:coverage # Tests with coverage
```

## Dependencies

    -React 19: UI framework

    -Redux Toolkit: State management

    -React Router DOM: Routing

    -TypeScript: Static typing

    -Tailwind CSS: CSS framework

    -Lucide React: Icon library

    -Vitest: Testing framework

    -Testing Library: Testing utilities

## Learnings & Concepts Applied

    -State Management: useState, createContext/ContextProvider, Redux Toolkit

    -Lifecycle Management: useEffect for side effects

    -Routing: React Router DOM for navigation and dynamic routes

    -Styling: Tailwind CSS utility-first approach

    -API Integration: Handling CRUD operations and file uploads

    -Local & Session Storage: Managing user sessions and authentication tokens
