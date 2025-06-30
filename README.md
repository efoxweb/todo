Todo App

This is a Todo app with a Laravel backend as the API and a React frontend, styled with Tailwind CSS. The app has basic test coverage on both frontend and backend. 

    Backend: Laravel (PHP)
    
    Frontend: React (Vite)
    
    Styling: Tailwind CSS
    
    Database: MySQL
    
    Admin Tool: phpMyAdmin

    Testing: PHPUnit Feature Tests (backend), Jest (frontend)
    
    Containerization: Docker, Docker Compose

Prerequisites

    Docker installed

    Docker Compose installed

Setup and Running

Clone the repository and navigate to the project directory.

Make sure your .env file inside the backend folder is configured properly for the MySQL database:

    DB_CONNECTION=mysql
    DB_HOST=mysql
    DB_PORT=3306
    DB_DATABASE=laravel
    DB_USERNAME=laravel
    DB_PASSWORD=secret

Start the Docker containers:

    docker-compose up -d

This will start:

    Laravel backend (http://localhost:8000)

    React frontend (http://localhost:5173)

    MySQL database (exposed on port 3307)

    phpMyAdmin (http://localhost:8080)

Run database migrations inside the Laravel container:

    docker exec -it laravel-app php artisan migrate

This ensures your database schema is set up.
Accessing the App

    Backend Laravel API: http://localhost:8000

    Frontend React App: http://localhost:5173

    phpMyAdmin: http://localhost:8080 (login with username: laravel, password: secret)

Backend tests:

    docker exec -it laravel-app php artisan test --testsuite=Feature

Frontend Jest tests:

    docker exec -it vite_frontend npm test