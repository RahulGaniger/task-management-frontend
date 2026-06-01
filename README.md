# Task Management Application - Frontend

## Overview

The Task Management Application Frontend is a modern and responsive web application built using Next.js and TypeScript. It provides users with a clean interface to manage their personal tasks efficiently through authentication, task tracking, filtering, and dashboard analytics.

The application communicates with a RESTful backend API and offers a seamless user experience with protected routes, toast notifications, and responsive design.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Token Storage
* Protected Routes
* Email Validation
* Password Validation (Minimum 8 Characters)
* Show/Hide Password
* Toast Notifications for Success and Errors

### Dashboard

* Welcome Dashboard
* Total Tasks Overview
* To Do Tasks Count
* In Progress Tasks Count
* Completed Tasks Count
* Overdue Tasks Count
* Task Status Visualization

### Task Management

* Create New Tasks
* Edit Existing Tasks
* Delete Tasks
* Search Tasks
* Filter by Status
* Filter by Priority
* Real-Time UI Updates After Create/Edit/Delete

### User Experience

* Responsive Design
* Sidebar Navigation
* Loading States
* Custom Delete Confirmation Modal
* Toast-Based Feedback System

---

## Tech Stack

### Framework

* Next.js 15

### Language

* TypeScript

### Styling

* Tailwind CSS

### HTTP Client

* Axios

### Notifications

* React Hot Toast

### Icons

* Lucide React

### State Management

* React Hooks (useState, useEffect)

---

## Project Structure

```bash
src/
├── app/
│   ├── api/
│   │   ├── api.ts
│   │   ├── authApi.ts
│   │   └── taskApi.ts
│   │
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── task/
│   │   │   ├── TaskCard.tsx
│   │   │   └── CreateTaskModal.tsx
│   │
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── tasks/
│   │   └── auth/
│   │
│   ├── types/
│   │   └── task.ts
│   │
│   ├── layout.tsx
│   └── page.tsx
│
└── public/
```

---

## Local Development Setup

### Prerequisites

* Node.js 18+
* npm

### Clone Repository

```bash
git clone <repository-url>

cd task-management-frontend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Run Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## Environment Variables

| Variable            | Description          |
| ------------------- | -------------------- |
| NEXT_PUBLIC_API_URL | Backend API Base URL |

### Development

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Production

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

---

## Authentication Flow

1. User enters credentials.
2. Login API returns JWT token.
3. Token is stored in Local Storage.
4. Axios interceptor automatically attaches the token to requests.
5. Protected pages validate authentication.
6. Unauthorized users are redirected to the login page.

---

## API Integration

### Authentication APIs

#### Register

```http
POST /auth/register
```

#### Login

```http
POST /auth/login
```

---

### Task APIs

#### Get Tasks

```http
GET /tasks
```

#### Create Task

```http
POST /tasks
```

#### Update Task

```http
PUT /tasks/:id
```

#### Delete Task

```http
DELETE /tasks/:id
```

---

## Deployment

### Vercel Deployment

1. Push code to GitHub.
2. Import repository into Vercel.
3. Configure Environment Variables:

```env
NEXT_PUBLIC_API_URL=(https://task-management-backend-uck8.onrender.com/api)
```

4. Deploy application.

---

## Demo Video

A short demo video should demonstrate:

* User Registration
* User Login
* Dashboard Overview
* Create Task
* Edit Task
* Delete Task
* Search and Filter Tasks
* Logout

---

## Future Improvements

* Dark Mode
* User Profile Page
* Task Pagination
* Advanced Filters
* Drag-and-Drop Task Management
* Team Collaboration Features
* Task Attachments

---

## Author

Rahul Ganiger

Full Stack Developer

Built using Next.js, TypeScript, Tailwind CSS, Axios, and React Hot Toast.
