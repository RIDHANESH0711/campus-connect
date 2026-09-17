-- CampusConnect MySQL Database Schema DDL
CREATE DATABASE IF NOT EXISTS campusconnect_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE campusconnect_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(254) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    password VARCHAR(128) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'STUDENT',
    register_number VARCHAR(50) UNIQUE NULL,
    phone VARCHAR(20) NULL,
    department VARCHAR(100) NULL,
    year VARCHAR(20) NULL,
    is_staff BOOLEAN NOT NULL DEFAULT FALSE,
    is_superuser BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login DATETIME NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL
);

-- 3. Venues Table
CREATE TABLE IF NOT EXISTS venues_venue (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    location VARCHAR(255) NOT NULL,
    capacity INT UNSIGNED NOT NULL,
    availability BOOLEAN NOT NULL DEFAULT TRUE
);

-- 4. Events Table
CREATE TABLE IF NOT EXISTS events_event (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category_id BIGINT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    venue_id BIGINT NOT NULL,
    organizer VARCHAR(150) NOT NULL,
    max_participants INT UNSIGNED NOT NULL,
    registration_deadline DATETIME(6) NOT NULL,
    poster VARCHAR(500) NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Published',
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (category_id) REFERENCES categories_category(id) ON DELETE RESTRICT,
    FOREIGN KEY (venue_id) REFERENCES venues_venue(id) ON DELETE RESTRICT
);

-- 5. Registrations Table
CREATE TABLE IF NOT EXISTS registrations_registration (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    registration_date DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    status VARCHAR(20) NOT NULL DEFAULT 'Registered',
    FOREIGN KEY (user_id) REFERENCES users_user(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events_event(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_event_registration UNIQUE (user_id, event_id)
);

-- 6. Feedback Table
CREATE TABLE IF NOT EXISTS feedback_feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    rating SMALLINT UNSIGNED NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    FOREIGN KEY (user_id) REFERENCES users_user(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events_event(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_event_feedback UNIQUE (user_id, event_id)
);
