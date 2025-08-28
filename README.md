# Chat System

A real-time chat application built with **React**, **Node.js**, **Express**, **Socket.IO**, and **MySQL**.  
Supports user authentication, private chats, text and image messaging, and persistent storage.

---

## Table of Contents

- [Features](#features)  
- [User Flow](#user-flow)  
- [Database Structure](#database-structure)  
- [Docker Configuration](#docker-configuration)  
- [How to Run](#how-to-run)  
- [Future Enhancements](#future-enhancements)  
- [Screenshots](#screenshots)  

---

## Features

- User registration and login with **JWT** authentication  
- One-to-one real-time chat using **Socket.IO**  
- Send and receive **text messages** and **images**  
- View active conversations in an inbox with timestamps  
- Store users, conversations, and messages in **MySQL**

---

## User Flow

1. User opens the application and sees the **login/signup page**  
2. User enters credentials:
   - If correct → redirected to `chats-main` page  
   - If incorrect → shows error  
3. User can **sign up**:
   - If username exists → request refused  
   - Else → new user stored in database  
4. In `chats-main`:
   - User sees all other users  
   - Can start real-time chat with any user  
   - Can send text or images in the conversation  

---

## Database Structure

### User Table
| Column    | Type         |
|-----------|-------------|
| id        | INT, PK      |
| username  | VARCHAR(50)  |
| password  | VARCHAR(255) |

### Chat Table
| Column    | Type         |
|-----------|-------------|
| id        | INT, PK      |
| user1     | VARCHAR(50)  |
| user2     | VARCHAR(50)  |
| messages  | JSON         |

**Message Structure (inside `messages` JSON)**  
```json
{
  "senderName": "username",
  "time": 1234567890,
  "message": "Hello",
  "messageType": "text" // or "image"
}
```


## How to Run

1. Start the database using Docker:
```bash
docker compose up -d
```
Start the backend server:
```bash
cd Back
npm install
npm run dev
```
Start the frontend client:
```bash
cd Front
npm install
npm run dev
```
