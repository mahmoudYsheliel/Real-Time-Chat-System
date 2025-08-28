import { Request, Response } from 'express';
import { getChatByUsers, createChat, saveMessage } from '../models/chat';
import { ResponseMessage, Message } from '../lib/interfaces';

export const fetchChat = async (req: Request, res: Response) => {
    const { user1, user2 } = req.body as { user1: string; user2: string };
    let chat = await getChatByUsers(user1, user2);
    if (!chat.success) chat = await createChat(user1, user2);
    const data: ResponseMessage = { success: true, msg: '', data: chat.data };
    res.json(data);
};

export const addMessage = async (chatId: number, message: Message) => {
    await saveMessage(chatId, message);
};
