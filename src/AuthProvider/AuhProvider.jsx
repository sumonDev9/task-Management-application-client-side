import { getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase";
import { createContext } from "react";
import { GoogleAuthProvider } from "firebase/auth/web-extension";


const auth = getAuth(app);
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuhProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

       // google provider
       const logInbyGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const authInfo = {
        user,
        setUser,
        loading,
        logInbyGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuhProvider;