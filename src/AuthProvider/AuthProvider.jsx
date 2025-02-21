import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase/firebase";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";



const auth = getAuth(app);
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState({ todo: [], inprogress: [], done: [] });

       // google provider
       const logInbyGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

       // logout
       const userLogout = () => {
        setLoading(true)
        return signOut(auth);
    }
    // context fetchTask data get 
    const fetchTasks = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/tasks/${user?.email}`);
          const taskData = response.data;
      
          const categorizedTasks = { todo: [], inprogress: [], done: [] };
          taskData.forEach((task) => {
            categorizedTasks[task.category]?.push(task);
          });
      
          setTasks(categorizedTasks);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          toast.error("Failed to load tasks!");
        }
      };
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
        userLogout,
        fetchTasks,
        tasks,
        setTasks
    }
    

    return (
        <AuthContext.Provider value={authInfo}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;