export interface dataState{
    user?: any,
    isLogged: boolean
}

type ActionsProps = {type:"getAllPosts", payload:any}

export const forYouReducer = (state:any, actions:ActionsProps)=> {
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