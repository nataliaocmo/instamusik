export interface dataState{
    user?: any,
    isLogged: boolean
}
export interface AuthState{
    userState?: any,
}


export interface newDataProps {
    id?: string,
    name?: String;
    lastname?: String;
    username?: String;
    age?: number;
    phone?: number;
    post?: number;
    folowers?: number;
    folowing?: number;
    bio?: String;
    avatar?: string;
}

type ActionsPropsnew = {type:"GET",payload: newDataProps}

export const useInfoReducer = (state:any, actions:any)=> {
    switch(actions.type){
        case "GET":
            return {
                ...state,
                user: actions.payload,
            }
        default:
            return state
    }
}

type ActionsProps = {type:"getMyPosts", payload:any}
type ActionsPropsall = {type:"getAllPosts", payload:any}

export const dataReducer = (state:any, actions:ActionsProps)=> {
    switch(actions.type){
        case "getMyPosts":
            return {
                ...state,
                posts: actions.payload, // Actualizamos los posts con el payload
            }
        default:
            return state
    }
}
export const forYouReducer = (state:any, actions:ActionsPropsall)=> {
    switch(actions.type){
        case "getAllPosts":
            return {
                ...state,
                posts: actions.payload, // Actualizamos los posts con el payload
            }
        default:
            return state
    }
}