# File Management Backend

A backend system for uploading, storing, and managing files with user authentication.

## Features

- User registration and login
- File upload (authenticated users only)
- List user's files
- Download files
- Delete files
- File metadata storage (filename, upload date, user, size)

## Technologies Used

- Node.js + Express.js
- Express.js
- MongoDB (Mongoose)
- Multer (for file uploads)
- JWT (for authentication)
- Postman (API Testing)


## 1. Clone the repository

```bash
git clone https://github.com/kumar-raj/file-manager-backend.git
```

## 2.   Install dependencies

```bash
npm install
```

## 3. Start the server

```bash
npm start
```

## 4. Test the API

### 4.1 Register a new user

```bash
curl --location --request POST 'http://localhost:3000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
}


```

### 4.2 Login as a user

```bash
curl --location --request POST 'http://localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "johndoe@example.com",
    "password": "password123"
}
```

### 4.3 Upload a file

```bash
curl --location --request POST 'http://localhost:3000/api/files/upload' \
--header 'Content-Type: multipart/form-data' \
--form 'file=@"/path/to/file.pdf"'
```

### 4.4 List user's files

```bash
curl --location --request GET 'http://localhost:3000/api/files/getalluserfiles' \
--header 'Authorization: Bearer <token>'
```

### 4.5 Download a file

```bash
curl --location --request GET 'http://localhost:3000/api/files/downloadfile/<file_id>' \
--header 'Authorization: Bearer <token>'
```

### 4.6 Delete a file

```bash
curl --location --request DELETE 'http://localhost:3000/api/files/deletefile/<file_id>' \
--header 'Authorization: Bearer <token>'    
```             
