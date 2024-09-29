import { createContext, useContext, useEffect, useReducer } from "react";
import { dataReducer } from "./DataReducer";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { DefaultResponse, PostProps } from "@/interfaces/postInterface";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { AuthContext } from "../authContext/AuthContext";
import { Alert } from "react-native";

export interface DataState {
    posts: []; // Asegúrate de que PostProps define los campos de una publicación

}

const dataStateDefault = {
    posts: [], // Inicializamos los posts como un array vacío

}

interface DataContextProps {
    state: DataState,
    newPost: (newPost: PostProps) => Promise<DefaultResponse>
    getPosts: () => void; // Elimina el parámetro de getPosts
}

export const DataContext = createContext({} as DataContextProps);

export function DataProvider({ children }: any) {

    const [state, dispatch] = useReducer(dataReducer, dataStateDefault);
    const { state: { user } } = useContext(AuthContext)

    useEffect(() => {

    }, []);


    const uploadImage = async (uri: string) => {
        const storage = getStorage();
        const storageRef = ref(storage, 'posts/'+ Date.now());
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const snapshot =await uploadBytes(storageRef,blob);
            const url = await getDownloadURL(storageRef);
            console.log('Uploaded a raw string!');
            console.log({
                snapshot
            })
            return url?? "";
        } catch (error) {
            console.log(error)
        }
    }

    const getPosts = async () => {
        try {
            const postRef = collection(db, "posts");
            const q = query(postRef, where("postedBy", "==", user.uid));
            const querySnapshot = await getDocs(q);

            const posts = querySnapshot.docs.map(doc =>({
                id: doc.id,
                ...doc.data(),
            }));
            dispatch({type:"getMyPosts", payload:posts})
            console.log(posts)
            return posts 
        } catch (error) {
            return []
        }


    }
    


    const newPost = async (newPost: PostProps): Promise<DefaultResponse> => {
        try {
            const urlImage = await uploadImage(newPost.image);

            const docRef = await addDoc(collection(db, "posts"), {
                ...newPost,
                image: urlImage,
                date: new Date(),
                username: user.email,
                postedBy: user.uid,
                likes: 0,
            });
            Alert.alert("Post creado con exito");
            console.log("estos son los posts guardados",getPosts())
            console.log("Document written with ID: ", docRef.id);
            await getPosts()
            return {
                isSuccess: true,
                message: "Creado con exito"
            }
            
        } catch (error) {
            console.log(error);
            return {
                isSuccess: false,
                message: "Hubo un error: " + error
            }
        }
    }

    const updatePost = async () => {
    }

    const deletePost = async () => {
    }


    return <DataContext.Provider
        value={{
            state,
            newPost,
            getPosts
        }}
    >
        {children}
    </DataContext.Provider>
}