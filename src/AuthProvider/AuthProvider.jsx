import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase/firebase";
import { createContext, useEffect, useState } from "react";



const auth = getAuth(app);
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

       // google provider
       const logInbyGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

       // logout
       const userLogout = () => {
        setLoading(true)
        return signOut(auth);
    }
        //urrent user is by setting an observer
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            });
            return () => {
                unsubscribe();
            }
        }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        logInbyGoogle,
        userLogout
    }
    

    return (
        <AuthContext.Provider value={authInfo}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;