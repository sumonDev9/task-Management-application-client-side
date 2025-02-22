import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex py-10 md:py-20 justify-center items-center'>
        <div className='text-center'>
            <img src='https://i.ibb.co/9HmQH8tp/image.png' className='w-[450px] h-[250px] rounded-2xl mx-auto' alt="" />
            <h1 className='my-5 text-textsecondary font-bold text-xl md:text-3xl'>Oops! The page youre looking for can not be found.</h1>
            <Link to='/task'><button className='px-4 py-2 bg-indigo-600 text-lg font-bold cursor-pointer text-white rounded-3xl'>Go Back to Home</button></Link>
        </div>
    </div>
    );
};

export default ErrorPage;