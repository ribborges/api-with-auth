# REST API with Authentication

This project is a REST API built with TypeScript and Express. It includes authentication features to secure the endpoints.

## Features

- User authentication (login, registration)
- Protected routes
- CRUD operations for resources
- Error handling

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ribborges/api-with-auth
    ```
2. Navigate to the project directory:
    ```sh
    cd api-with-auth
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Running the Project

1. Start the development server:
    ```sh
    npm run dev
    ```

## Using the API

### Authentication

- **Register**
    ```sh
    POST /auth/register
    ```

    ***Body***
    ```json
    {
        "email": "example@email.com",
        "password": "12345678",
        "username": "example"
    }
    ```

- **Login**
    ```sh
    POST /auth/login
    ```

    ***Body***
    ```json
    {
        "username": "example",
        "password": "12345678"
    }
    ```

### User management

- **Get all users (Need authentication)**
    ```sh
    GET /users
    ```

- **Delete user (Need authentication and authorization)**
    ```sh
    DELETE /users/:id
    ```

- **Update user (Need authentication and authorization)**
    ```sh
    PUT /users/:id
    ```

    ***Body***
    ```json
    {
        "username": "new_username"
    }
    ```