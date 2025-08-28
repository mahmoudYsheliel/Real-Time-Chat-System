import express from "express";
import { addUser, getToken, fetchUsers } from "../controller/user";
import { tokenMiddleware } from "../lib/auth";

const userRouter = express.Router()


userRouter.post('/signup', addUser)
userRouter.post('/token', getToken)
userRouter.get('/users', tokenMiddleware, fetchUsers)

export default userRouter