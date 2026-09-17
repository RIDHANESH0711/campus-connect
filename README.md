# CampusConnect – College Event Management System 🎓

![License](https://img.shields.io/badge/Academic-SOP--Compliant-emerald)
![Backend](https://img.shields.io/badge/Backend-Django_REST_Framework-092E20)
![Frontend](https://img.shields.io/badge/Frontend-React_18_+_Vite-61DAFB)
![Styling](https://img.shields.io/badge/Styling-Tailwind_CSS-38BDF8)
![Database](https://img.shields.io/badge/Database-MySQL-4479A1)
![Auth](https://img.shields.io/badge/Auth-JWT_SimpleJWT-black)

**CampusConnect** is a full-stack college event management platform built with a clear separation of concerns between a **React + Vite** frontend and a **Django + Django REST Framework** backend powered by **MySQL**.

---

## 1. Problem Statement & Objectives

### Problem Statement
Traditional college event management relies on fragmented Google forms, physical notice boards, and manual spreadsheet tracking. This leads to duplicate student registrations, overbooked venues, poor turnout visibility, and lack of systematic feedback collection.

### Core Objectives
1. **Centralized Discovery**: Provide students with a searchable, filterable portal for all campus hackathons, workshops, cultural fests, and sports meets.
2. **Automated Registration**: Enforce business rules (seat limits, registration deadlines, duplicate prevention) at both API and UI layers.
3. **Role-Based Governance**: Separate **Student** workflows (discovery, registration, feedback) from **Admin** operations (event CRUD, student roster, approval management, venue allocation, analytics).
4. **Academic SOP Readiness**: Deliver clean REST APIs, JWT authentication, MySQL database schemas, and complete Postman testing collections.

---

## 2. Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React icons, Axios, React Router v6.
- **Backend**: Python 3.14, Django 5, Django REST Framework (DRF), `djangorestframework-simplejwt`, `django-cors-headers`.
- **Database**: MySQL 8.0 / MariaDB with strict relational integrity & foreign keys.
- **API Testing**: Postman collection file (`CampusConnect.postman_collection.json`).

---

## 3. System Architecture & ER Diagram

```
                             +-----------------------+
                             | React + Vite Frontend |
                             +-----------+-----------+
                                         |
                                  Axios (JWT Bearer)
                                         |
                                         v
                             +-----------------------+
                             |  Django REST Backend  |
                             +-----------+-----------+
                                         |
                                   Django ORM
                                         |
                                         v
                             +-----------------------+
                             |     MySQL Database    |
                             +-----------------------+
```

### Entity Relationship Model

- **`User`** (id, name, email, password, role [ADMIN/STUDENT], register_number, phone, department, year, created_at)
  - 1-to-Many with **`Registration`**
  - 1-to-Many with **`Feedback`**
- **`Category`** (id, name, description)
  - 1-to-Many with **`Event`**
- **`Venue`** (id, name, location, capacity, availability)
  - 1-to-Many with **`Event`**
- **`Event`** (id, event_name, description, category_id, date, start_time, end_time, venue_id, organizer, max_participants, registration_deadline, poster, status, created_at, updated_at)
  - 1-to-Many with **`Registration`**
  - 1-to-Many with **`Feedback`**
- **`Registration`** (id, user_id, event_id, registration_date, status)
  - **Constraint**: `UNIQUE (user_id, event_id)`
- **`Feedback`** (id, user_id, event_id, rating [1-5], comment, created_at)
  - **Constraint**: `UNIQUE (user_id, event_id)`

---

## 4. REST API Documentation

| Endpoint | Method | Role | Description |
|---|---|---|---|
| `/api/auth/register/` | `POST` | Public | Register new student |
| `/api/auth/login/` | `POST` | Public | Authenticate user & return JWT token pair |
| `/api/auth/refresh/` | `POST` | Public | Refresh expired JWT access token |
| `/api/auth/me/` | `GET/PATCH` | Authenticated | Retrieve / update profile |
| `/api/events/` | `GET` | Public | List & search events (Filters: category, status, date, venue) |
| `/api/events/` | `POST` | Admin | Create new campus event |
| `/api/events/{id}/` | `GET/PUT/DELETE` | Mixed | Event detail, edit, or delete |
| `/api/registrations/` | `GET` | Authenticated | List student's registrations (Admin sees all) |
| `/api/registrations/` | `POST` | Student | Register student for event |
| `/api/registrations/{id}/approve/` | `PATCH` | Admin | Approve pending registration |
| `/api/registrations/{id}/cancel/` | `PATCH` | Student/Admin | Cancel registration |
| `/api/students/` | `GET/POST/PUT/DELETE` | Admin | Student roster CRUD |
| `/api/categories/` | `GET/POST/PUT/DELETE` | Mixed | Category management |
| `/api/venues/` | `GET/POST/PUT/DELETE` | Mixed | Campus venue management |
| `/api/feedback/` | `GET/POST/DELETE` | Mixed | Submit rating (1-5) and comment |

---

## 5. Sample Credentials for Testing

| Role | Email | Password | Access Rights |
|---|---|---|---|
| **Admin** | `admin@campusconnect.edu` | `Admin@123` | Full CRUD access to events, registrations, students, categories, venues & analytics |
| **Student** | `alex.rivera@campusconnect.edu` | `Student@123` | Browse events, register, view schedule, submit feedback |
| **Student** | `emily.chen@campusconnect.edu` | `Student@123` | Student participant demo |

---

## 6. Installation & Execution Guide

### Option A: Standalone Browser Quick Preview
You can directly open [`index.html`](file:///c:/event_mangment/index.html) in any web browser to interact with the complete application immediately (powered by local mock database engine & full UI).

### Option B: Django REST Backend Setup

1. **Navigate to backend folder**:
   ```bash
   cd backend
   ```

2. **Create virtual environment & install requirements**:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure MySQL Database in `.env`**:
   Copy `.env.example` to `.env` and fill in your MySQL credentials:
   ```env
   DB_NAME=campusconnect_db
   DB_USER=root
   DB_PASSWORD=your_password
   DB_HOST=127.0.0.1
   DB_PORT=3306
   ```

4. **Run migrations & seed initial database**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python seed_data.py
   ```

5. **Start Django Development Server**:
   ```bash
   python manage.py runserver
   ```
   API Server will start at `http://127.0.0.1:8000/api/`

---

### Option C: React + Vite Frontend Setup

1. **Navigate to frontend folder**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start Vite Development Server**:
   ```bash
   npm run dev
   ```
   Frontend will run at `http://localhost:3000` and proxy API calls to Django.

---

## 7. Testing with Postman

1. Open **Postman**.
2. Click **Import** and select `CampusConnect.postman_collection.json`.
3. Set initial environment variable `base_url` to `http://127.0.0.1:8000/api`.
4. Run `Authentication -> Login` to retrieve your JWT access token.
5. Postman automatically sets the token for subsequent requests.

---

## 8. Academic SOP & Security Checklist

- [x] JWT Authentication & Token Rotation
- [x] Role-Based Access Control (Admin vs Student permissions)
- [x] Django ORM SQL Injection Immunity
- [x] Database Unique Constraints (`unique_user_event_registration`, `unique_user_event_feedback`)
- [x] Input Validation (Email regex, phone, seat limits, start/end time checks)
- [x] Responsive Emerald/Charcoal Design System
- [x] Complete Postman API Test Suite Included
