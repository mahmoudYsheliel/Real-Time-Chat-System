import cors from 'cors';
import express from "express";
import { Server } from "socket.io";
import http from 'http';
import { ResponseMessage } from './lib/interfaces'
import userRouter from './routes/user'
import chatRouter from './routes/chat';
import db from './config/db'
import { addMessage } from './controller/chat';

const initDb = async () => {
  console.log("initDb called")
  try {
    if (!db) {
      return { success: false, msg: 'DB is not found', data: {} };
    }
    // await db.query(`DROP DATABASE IF EXISTS chat_system`);
    // await db.query(`CREATE DATABASE chat_system`);
    // await db.query(`USE chat_system`);
    const res = await db.query(`
      CREATE TABLE IF NOT EXISTS chat (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user1 VARCHAR(50) NOT NULL,
        user2 VARCHAR(50) NOT NULL,
        messages JSON NOT NULL,
        UNIQUE KEY unique_chat (user1, user2)
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);


    return { success: true, msg: 'DB initialized successfully', data: {} };
  } catch (err: any) {
    return { success: false, msg: err, data: {} };
  }
};


const app = express();

app.use(express.json());

const server = http.createServer(app);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

app.use('/', chatRouter)
app.use('/', userRouter)



app.get('/', (req, res) => {
  const data: ResponseMessage = { success: true, msg: 'server is up', data: {} }
  res.json(data);
});




io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (roomId: string) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('chatMessage', async (data: { chatId: number; message: any }) => {
    await addMessage(data.chatId, data.message);
    socket.broadcast.to(data.chatId.toString()).emit('chatMessage', data.message);
  });

  socket.on('disconnect', () => console.log('User disconnected', socket.id));
})





const PORT = 5000;

async function startServer() {
  try {
    const result = await initDb();
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to initialize DB:", err);
    process.exit(1);
  }
}

startServer();