import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuhProvider";



const Register = () => {
    const {user} = useContext(AuthContext);


    return (
        <div className='flex flex-col  justify-center items-center h-screen'>
            <h1 className='text-xl md:text-3xl font-bold text-[#111111]'>Sign in with Google to Manage Your Tasks</h1>
            <p className='text-2xl mt-2 text-[#434343]'>Drag, drop, and manage tasks easily.</p>
            <div className='mt-5'>
                <button class="w-full bg-indigo-500 flex items-center cursor-pointer justify-center gap-2 px-2 py-2 rounded-md">
                    <img className='w-10 cursor-pointer rounded-md bg-white' src="https://i.ibb.co/TcB5YZK/icons8-google-48.png" alt="" />
                    <span className='text-white text-lg'>Continue with your Goolge task account</span>
                </button>
            </div>
        </div>
    );
};

export default Register;