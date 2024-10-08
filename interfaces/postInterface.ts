

export interface PostProps{
    id?: string,
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