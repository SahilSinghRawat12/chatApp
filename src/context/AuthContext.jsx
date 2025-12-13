import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth , db } from "../firebase/firebase";
import { doc , getDoc} from "firebase/firestore";


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [userData , setUserData] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth , async(currentUser)=>{
             if(currentUser)
             {
                const docRef = doc(db , "users" , currentUser.uid);
                const docSnap = await getDoc(docRef);
                                
                setUserData(docSnap.data());
             }

             else {
                setUserData(null);
             }

             setLoading(false);
        } );

        return unsub;
    }, []);

    return(
        <AuthContext.Provider value={{userData , loading}}>
                {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ()=> useContext(AuthContext);