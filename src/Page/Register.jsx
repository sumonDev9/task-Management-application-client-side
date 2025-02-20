import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Register = () => {
    const {setUser, logInbyGoogle} = useContext(AuthContext);
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        logInbyGoogle()
          .then(result => {
            setUser(result.user);
            console.log(result.user)
            toast.success('login successfull!');
            navigate('/task');
    
          })
          .catch((error) => {
            toast.error("Login failed. Please check your credentials!")
          })
    
      }
    return (
        <div className='flex flex-col  justify-center items-center h-screen'>
            <h1 className='text-xl md:text-3xl font-bold text-[#111111]'>Sign in with Google to Manage Your Tasks</h1>
            <p className='text-2xl mt-2 text-[#434343]'>Drag, drop, and manage tasks easily.</p>
            <div className='mt-5'>
                <button onClick={handleGoogleSignIn} class="w-full bg-indigo-500 flex items-center cursor-pointer justify-center gap-2 px-2 py-2 rounded-md">
                    <img className='w-10 cursor-pointer rounded-md bg-white' src="https://i.ibb.co/TcB5YZK/icons8-google-48.png" alt="" />
                    <span className='text-white text-lg'>Continue with your Goolge task account</span>
                </button>
            </div>
        </div>
    );
};

export default Register;