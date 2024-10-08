export interface AuthState{
    user?: any,
}

interface newDataProps {
    name?: String;
    lastname?: String;
    username?: String;
    age?: number;
    phone?: number;
    post?: number;
    folowers?: number;
    folowing?: number;
    bio?: String;
    avatar?: String;
}

type ActionsProps = {type:"GET",payload: newDataProps}

export const useInfoReducer = (state:any, actions:ActionsProps)=> {
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