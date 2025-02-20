import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {
    const {user} = useContext(AuthContext);

    
    return (
        <div className='bg-base-100 shadow-sm'>
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <a className="text-xl md:text-2xl text-[#111111] font-semibold">TaskHive</a>
                </div>

                <div className="navbar-end">
                <div className='flex items-center space-x-2'>
                  
                        <div className="tooltip tooltip-bottom z-10" data-tip={user?.displayName}>
                          <div className="btn btn-ghost btn-circle avatar">
                            <div className="w-8 md:w-10 rounded-full">
                              <img
                                alt="Profile Picture"
                                src={user?.photoURL}
                              />
                            </div>
                          </div>
                        </div>
                        <a className="btn bg-indigo-600 text-white">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;