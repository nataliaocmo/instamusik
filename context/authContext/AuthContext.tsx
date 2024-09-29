import { createContext, useEffect, useReducer } from "react";
import { authReducer, AuthState } from "./AuthReducer";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

const defaultValues: AuthState = {
    user: undefined,
    isLogged: false
}

interface AuthContextProps {
    state: AuthState;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username: string, fullname: string, birthdate: Date) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, defaultValues);

    const auth = getAuth();

    useEffect(()=>{
    console.log(state)
    },[state])

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const docRef = doc(db, "Users", userCredential.user.uid);
            const docSnap = await getDoc(docRef);

            dispatch({ type: "LOGIN", payload: userCredential.user })
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                console.log("No such document!");
            }

        
        } catch (error) {
            throw error;
        }
    };

   
    const signUp = async (email: string, password: string, username: string, fullname: string, birthdate: Date) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const uid= user.uid;

            await setDoc(doc(db, "Users", uid),{

               email,
               username,
               fullname,
               birthdate,
            
            });

            
            dispatch({ type: "LOGIN", payload: { name: user.email } });
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                signUp
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};