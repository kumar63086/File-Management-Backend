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
## sample Postman collection

## Register a new user
```bash
curl --location --request POST 'http://localhost:3000/api/v1/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "testuser",
  "email":"kumarb910003@gmail.com",
  "password": "testpassword"
}
response_1b3be275-db32-48f5-810a-3578ff643445

{
    "status": "success",
    "message": "User registered successfully",
    "data": {
        "user": {
            "name": "testuser",
            "email": "kumarb910003@gmail.com",
            "password": "$2b$10$8Zt6a.AlQsU4YtPFjUMhcez/xeqbFy9kQRjZshTEuGwZVEJI.PkIK",
            "_id": "6839515f87cd1f760fb99e69",
            "createdAt": "2025-05-30T06:34:07.314Z",
            "__v": 0
        }
    },
    "error": {},
    "code": 201
}
```
## Login as a user
```bash
curl --location --request POST 'http://localhost:3000/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "kumarb910003@gmail.com",
    "password": "testpassword"
}
response_0664ce36-b770-4396-a138-e9e42f6d4c66
{
    "status": "success",
    "message": "Login successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODM5NTE1Zjg3Y2QxZjc2MGZiOTllNjkiLCJpYXQiOjE3NDg1ODY5MDksImV4cCI6MTc0ODY3MzMwOX0.MX7MJ1tardRARa_JbZnrIJnoNBuQMuF44rTFGc7dNDc"
    },
    "error": {},
    "code": 200
}
```
## Upload a file
```bash
curl --location --request POST 'http://localhost:3000/api/v1/files/upload' \
--header 'Content-Type: multipart/form-data' \
Headers:
  Authorization: Bearer {{auth_token}}

  response_1b3be275-db32-48f5-810a-3578ff643445
  {
    "status": "success",
    "message": "File uploaded successfully",
    "data": {
        "file": {
            "filename": "1748587538485-91214945-DBdiagram.pdf",
            "originalname": "DBdiagram.pdf",
            "size": 1201619,
            "path": "src\\uploads\\1748587538485-91214945-DBdiagram.pdf",
            "mimetype": "application/pdf",
            "user": "6839515f87cd1f760fb99e69",
            "title": "",
            "description": "",
            "_id": "6839541287cd1f760fb99e6d",
            "uploadDate": "2025-05-30T06:45:38.539Z",
            "__v": 0
        }
    },
    "error": {},
    "code": 201
}
```

## Get all user files
```bash
curl --location --request GET 'http://localhost:3000/api/v1/files/getalluserfiles' \
--header 'Authorization: Bearer <token>'

{
    "status": "success",
    "message": "Files retrieved successfully",
    "data": {
        "files": [
            {
                "_id": "6839541287cd1f760fb99e6d",
                "filename": "1748587538485-91214945-DBdiagram.pdf",
                "originalname": "DBdiagram.pdf",
                "size": 1201619,
                "path": "src\\uploads\\1748587538485-91214945-DBdiagram.pdf",
                "mimetype": "application/pdf",
                "user": "6839515f87cd1f760fb99e69",
                "title": "",
                "description": "",
                "uploadDate": "2025-05-30T06:45:38.539Z"
            },
            {
                "_id": "683954a287cd1f760fb99e6f",
                "filename": "1748587682779-655920629-MongoDB_CheatSheet.pdf",
                "originalname": "MongoDB_CheatSheet.pdf",
                "size": 2708,
                "path": "src\\uploads\\1748587682779-655920629-MongoDB_CheatSheet.pdf",
                "mimetype": "application/pdf",
                "user": "6839515f87cd1f760fb99e69",
                "title": "",
                "description": "",
                "uploadDate": "2025-05-30T06:48:02.782Z"
            }
        ]
    },
    "error": {},
    "code": 200
}
```

## Download a file

```bash 
curl --location --request GET'http://localhost:3000/api/v1/files/downloadfile/6839541287cd1f760fb99e6d' \
--header 'Authorization: Bearer <token>'

```

## Delete a file
```bash
curl --location --request DELETE 'http://localhost:3000/api/v1/files/deletefile/6839541287cd1f760fb99e6d' \
--header 'Authorization: Bearer <token>'

{
    "status": "success",
    "message": "File deleted successfully",
    "data": {},
    "error": {},
    "code": 200
}
```

