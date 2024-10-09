import { createContext, useContext, useEffect, useReducer } from "react";
import { dataReducer, forYouReducer, newDataProps, useInfoReducer } from "./DataReducer";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { DefaultResponse, PostProps } from "@/interfaces/postInterface";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { AuthContext } from "../authContext/AuthContext";
import { AuthState } from "./DataReducer";


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
    getUserinfo: () => Promise<void>
    stateUser: any
    updateUser: (updateUser:newDataProps)=>Promise<DefaultResponse>;
    state2: DataState
    getAllPosts: () => Promise<{
        id: string;
    }[]>
   
}

export const DataContext = createContext({} as DataContextProps);

export function DataProvider({ children }: any) {

    const [state, dispatch] = useReducer(dataReducer, dataStateDefault);
    const [state2, dispatch2] = useReducer(forYouReducer, dataStateDefault);
    const [stateUser, dispatchUser] = useReducer(useInfoReducer, dataStateDefault)
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
    

    const getUserinfo = async () =>{
        try{
            const ref = doc(db, "Users", user.uid);
            const userDoc = await getDoc(ref);

            const userData = userDoc.data();

            dispatchUser({type: "GET", payload: userData})
        }
        catch(error){
            console.log(error);
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
            return posts 
        } catch (error) {
            return []
        }
    }

    const getAllPosts = async () => {
        try {
            const postRef = collection(db, "posts");
            const querySnapshot = await getDocs(postRef);
      
            const posts = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            dispatch2({ type: "getAllPosts", payload: posts });
            return posts;
          } catch (error) {
            console.log(error);
            return [];
          }
    }

    


    const newPost = async (newPost: PostProps): Promise<DefaultResponse> => {
        try {
            const urlImage = await uploadImage(newPost.image);

            const docRef = await addDoc(collection(db, "posts"), {
                ...newPost,
                image: urlImage,
                date: new Date(),
                postedBy: user.uid,
                username: stateUser.user.username,
                likes: 0,
            });
            console.log("Datos del usuario antes de crear el post:", user);
            console.log("User data: ", user.uid);
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

    const updateUser = async (updatedUserData: newDataProps): Promise<DefaultResponse> => {
        try {
          // Ubicamos el documento del usuario en la colección "users"
          const userDoc = doc(db, "Users", user.uid);
      
          // Actualizamos los campos que nos llegan con updatedUserData
          await updateDoc(userDoc, {
            ...updatedUserData,
            updatedAt: new Date(), // Puedes registrar la fecha de actualización si es necesario
          });
      
          console.log("Usuario actualizado con éxito");
          return {
            isSuccess: true,
            message: "Usuario actualizado con éxito",
          };
        } catch (error) {
          console.log("Error al actualizar el usuario: ", error);
          return {
            isSuccess: false,
            message: "Hubo un error al actualizar el usuario: " + error,
          };
        }
      };


    return <DataContext.Provider
        value={{
            state,
            newPost,
            getPosts,
            getUserinfo,
            stateUser,
            updateUser,
            state2,
            getAllPosts
        }}
    >
        {children}
    </DataContext.Provider>
}