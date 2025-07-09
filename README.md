# Email Client Application

A full-stack email client application built with Next.js and Fastify.

## ✅ Features Implemented

### 1. Email Management
- **Apple Mail-style sidebar** with email list
- **Email composition** with floating action button
- **Email detail view** on the right panel
- **Real-time email storage** in SQLite database

### 2. Search Functionality  
- **Search bar** at the top of sidebar
- **500ms debounced search** to prevent excessive API calls
- **Backend filtering** on `to`, `cc`, `bcc`, `subject`, and `body` fields
- **URL-based search** with bookmarkable search results
- **Browser back/forward** navigation support

### 3. User Interface
- **Responsive Material-UI design**
- **Loading states** and error handling
- **Form validation** for email composition
- **Visual feedback** for selected emails

### 4. Backend API
- **RESTful API** with Fastify
- **SQLite database** with Knex.js migrations
- **CORS configuration** for frontend integration
- **Email CRUD operations**

## 🏗️ Architecture

### Frontend (Next.js)
- **React 18** with hooks and modern patterns
- **Material-UI (MUI)** for component library
- **URL search parameters** for state management
- **Debounced search** with useCallback optimization

### Backend (Fastify)
- **ES modules** configuration
- **SQLite3** file-based database
- **Knex.js** query builder and migrations
- **CORS** enabled for development

### Database Schema
```sql
CREATE TABLE emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  to TEXT NOT NULL,
  cc TEXT,
  bcc TEXT,
  subject VARCHAR(255) NOT NULL,
  body TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Setup Instructions

### Backend Setup
```bash
cd backend
yarn install
yarn migrate          # Run database migrations
yarn dev              # Start server on http://localhost:3001
```

### Frontend Setup
```bash
cd frontend
yarn install
yarn dev              # Start server on http://localhost:3000
```

## 📡 API Endpoints

- `GET /emails` - Get all emails
- `GET /emails?search=term` - Search emails
- `POST /emails` - Create new email
- `GET /emails/:id` - Get specific email
- `GET /ping` - Health check

## 🔧 Technology Stack

- **Frontend**: Next.js 14, React 18, Material-UI, JavaScript ES6+
- **Backend**: Fastify 4, Node.js, ES Modules
- **Database**: SQLite3 with Knex.js
- **Development**: Nodemon, Yarn

## 🎯 Key Features

1. **Real-time Search**: Search through emails with backend filtering
2. **Persistent URLs**: Search results are bookmarkable via URL parameters
3. **Responsive Design**: Works on desktop and mobile devices
4. **File-based Database**: SQLite for zero-configuration development
5. **Modern React**: Uses hooks, useCallback, and modern patterns
6. **Error Handling**: Graceful error states and loading indicators

## 🗂️ Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Next.js pages
│   │   └── utils/               # API utilities
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── db/                  # Database operations
│   │   └── routes/              # API routes
│   ├── migrations/              # Database migrations
│   ├── dev.sqlite3              # SQLite database file
│   └── package.json
└── README.md
```

## 🎨 UI Components

- **EmailSidebar**: Email list with search functionality
- **EmailDetail**: Email content display
- **ComposeDialog**: Email composition form
- **ComposeButton**: Floating action button

## 🔍 Search Implementation

The search functionality uses URL parameters for state management:
- Search term is stored in URL: `?search=term`
- Backend filtering with SQL LIKE queries
- 500ms debounced input to optimize performance
- Browser history integration for back/forward navigation

## 💾 Database

Uses SQLite3 for development convenience:
- Single file database (`dev.sqlite3`)
- Knex.js for query building and migrations
