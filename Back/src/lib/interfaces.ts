type MessageType = 'image' | 'text'

export interface User {
    id: number
    username: string
    password: string
}
export interface Message {
    senderName: string
    time: number
    message: string
    messageType: MessageType
}
export interface Chat {
    id:number
    user1:string
    user2:string
    messages: Message[]
}

export interface ResponseMessage{
    success:boolean 
    msg:string
    data:any
}

