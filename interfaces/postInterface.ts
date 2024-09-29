import { ReactNode } from "react";

export interface PostProps{
    address: string,
    caption: string,
    image: string ,
    date: Date,
    username?: string,
    postedBy?: string
    likes?:number
    coments?: string
}
export interface DefaultResponse{
    isSuccess: boolean,
    message: string;
}