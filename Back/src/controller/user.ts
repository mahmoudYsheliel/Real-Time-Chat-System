import { Request, Response } from "express";
import { createUser, getUsers, getUser } from '../models/user';
import { ResponseMessage } from "../lib/interfaces";
import { generateToken,tokenMiddleware } from "../lib/auth";

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body as { username: string; password: string };
        const result = await createUser(username, password);
        if (!result.success)
            res.json(result);
        else{
            const token = await generateToken(username)
            const data:ResponseMessage = {success:true,msg:'',data:{token,username}}
            res.json(data);
        }
    } catch (err: any) {
        const data: ResponseMessage = { success: false, msg: 'failed to add user', data: {} }
        res.status(500).json(data);
    }
};

export const fetchUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err: any) {
        const data: ResponseMessage = { success: false, msg: 'failed to fetch users', data: {} }
        res.status(500).json(data);
    }
};

export const getToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body as { username: string; password: string };
        const result = await getUser(username, password);
        if (!result.success)
            res.json(result)
        else{
            const token = await generateToken(result.data?.user?.username)
            const data:ResponseMessage = {success:true,msg:'',data:{token,username}}
            res.json(data);
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
