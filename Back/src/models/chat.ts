import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { Chat, Message, ResponseMessage } from '../lib/interfaces';

export const getChatByUsers = async (user1: string, user2: string): Promise<ResponseMessage> => {
    if (!db)
        return { success: false, msg: 'DB is not found', data: {} }
    const [rows] = await db.query<RowDataPacket[]>(
        'SELECT * FROM chat WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)',
        [user1, user2, user2, user1]
    );
    if (!rows.length) return { success: false, msg: 'chat not found', data: {} };

    const chatRow = rows[0] as Chat;
    return { success: true, msg: '', data: chatRow }
};


export const createChat = async (user1: string, user2: string): Promise<ResponseMessage> => {
    if (!db)
        return { success: false, msg: 'DB is not found', data: {} }

    const messages: Message[] = [];
    const [result] = await db.query<ResultSetHeader>(
        'INSERT INTO chat (user1, user2,messages) VALUES (?, ?, ?)',
        [user1, user2, JSON.stringify(messages)]
    );
    const id = result.insertId
    const chat:Chat = {user1, user2,id,messages}
    return { success: true, msg: '', data:chat};
};

export const saveMessage = async (chatId: number, message: Message): Promise<ResponseMessage> => {
    if (!db)
        return { success: false, msg: 'DB is not found', data: {} }

    const [chat] = await db.query<RowDataPacket[]>('SELECT messages FROM chat WHERE id = ?', [chatId]);
    if (!chat.length) return { success: false, msg: 'chat not found', data: {} };
    const messages: Message[] = chat[0].messages || [];
    messages.push(message);

    await db.query('UPDATE chat SET messages = ? WHERE id = ?', [JSON.stringify(messages), chatId]);
    return { success: true, msg: 'message added', data: {} }
};
