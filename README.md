# Blog 

## Description

This is an api for a blog, you can add, edit and delete blogs you can log in with a user, add or edit this user.

## Technologies Used

- Node.js
- Express
- Mongodb


## Installation

To install and run this API, follow these steps:

1. Clone the repository: `git clone https://github.com/HectorTorrez/blog-backend`
2. Navigate to the repository directory: `cd blog-backend`
3. Install dependencies: `npm install`
4. Start the server: `npm run dev`
5. Testing with jest: `test`
6. Testing with cypress in frontend: `start:test`


## Endpoints

List and explain the available API endpoints. 

### Login

| Method   | Endpoint           | Description                      |
| -------- | ------------------ | -------------------------------- |
| POST     | /api/resetPassword | Reset password                   |

### Reset Password

| Method   | Endpoint           | Description                      |
| -------- | ------------------ | -------------------------------- |
| POST     | /api/login         | Login                            |


### Blog

| Method   | Endpoint           | Description                      |
| -------- | ------------------ | -------------------------------- |
| GET      | /api/blogs         | Get all blogs                    |
| GET      | /api/blogs/id:     | Get one blog                     |
| POST     | /api/blogs         | Create a new blog                |
| PATCH    | /api/blogs/:id     | Update an existing blog          |
| DELETE   | /api/blogs/:id     | Delete a blog                    |

### User

| Method   | Endpoint           | Description                      |
| -------- | ------------------ | -------------------------------- |
| GET      | /api/users         | Get all users                    |
| POST     | /api/users         | Create a new user                |
| PATCH    | /api/users/:id     | Update an existing user          |
| DELETE   | /api/users/:id     | Delete an user                   |
