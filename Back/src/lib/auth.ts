import { SignJWT, jwtVerify } from "jose";import { Request, Response, NextFunction } from "express";
import { ResponseMessage } from "./interfaces";

const JWT_SECRET = "randon-secret-key";
const secret = new TextEncoder().encode("JWT_SECRET");
export const generateToken = async (username: string) => {
    const token =await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);
    return token
}


export const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        const data: ResponseMessage = { success: false, msg: 'missing header', data: {} }
        res.status(401).json(data);
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        const data: ResponseMessage = { success: false, msg: 'missing token', data: {} }
        res.status(401).json(data);
        return;
    }

    try {
        const payload  =  jwtVerify(token, secret);
        (req as any).user = payload; 
        next(); 
    } catch (err) {
        const data: ResponseMessage = { success: false, msg: 'invalid or expired token', data: {} }
        res.status(403).json(data);
    }
}





