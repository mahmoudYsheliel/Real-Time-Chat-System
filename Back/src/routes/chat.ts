import express from 'express';
import { fetchChat } from '../controller/chat';
import { tokenMiddleware } from '../lib/auth';

const chatRouter = express.Router();

chatRouter.post('/chat', tokenMiddleware, fetchChat);

export default chatRouter;
