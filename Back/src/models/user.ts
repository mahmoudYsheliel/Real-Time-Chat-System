import db from '../config/db'
import { ResponseMessage } from '../lib/interfaces';
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export const createUser = async (username: string, password: string): Promise<ResponseMessage> => {
    if (!db)
        return { success: false, msg: 'DB is not found', data: {} }

    const [users] = await db.query<RowDataPacket[]>("SELECT id FROM user WHERE username = ?",
        [username])
    if (users.length>0)
        return { success: false, msg: 'user already exist', data: {} }
    const [result] = await db.query<ResultSetHeader>(
        "INSERT INTO user (username, password) VALUES (?, ?)",
        [username, password]
      );
    return {success:true,msg:'user added successfully',data:{userId:result.insertId}}
}


export const getUser = async (username:string,password:string):Promise<ResponseMessage>=>{
    if (!db)
        return { success: false, msg: 'DB is not found', data: {} }
    const [user] = await db.query<RowDataPacket[]>("SELECT username FROM user WHERE username = ? AND password = ?",
        [username,password]
    )
    if (user.length ===0)
        return { success: false, msg: 'user does not exist', data: {} }
    return { success: true, msg: '', data: {user:user[0]} }

}
export const getUsers = async ():Promise<ResponseMessage>=>{
    if (!db)
        return { success: false, msg: 'DB is not found', data: {} }
    const [data] = await db.query<RowDataPacket[]>("SELECT username FROM user")
    return {success:true,msg:'',data:{users:data}}
}
