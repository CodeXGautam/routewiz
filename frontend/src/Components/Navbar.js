import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const Navbar = (props) => {

    const isloggedIn = props.isloggedIn;
    const setLogin = props.setLogin;

    const navigate = useNavigate();

    const [icon, setIcon] = useState(false)


    const clickHandler = () => {
        console.log("I am clicked")
        setIcon(!icon)
    }

    return (
        <div className='flex flex-col relative'>
            <div className='flex justify-between items-center w-[100%] h-[100%] py-[0.7vw] px-[4vw] 
        shadow-md text-slate-950'>
                <div>
                    <NavLink to='/'>
                        <div className='text-lg font-bold'>
                            RouteWizard
                        </div>
                    </NavLink>
                </div>

                <div >
                    {!isloggedIn &&
                        <div className='flex gap-[2vw] items-center'>
                            <NavLink to='/login'>
                                <div className='text-md font-semibold  hover:bg-sky-100 rounded-lg p-2 text-gray-900'>Login</div>
                            </NavLink>

                            <NavLink to='/register'>
                                <div className='text-md font-semibold  hover:bg-sky-100 rounded-lg p-2 text-gray-900'>Register</div>
                            </NavLink>
                        </div>
                    }
                </div>

                
                    {isloggedIn &&
                        <div className='flex gap-[2vw] items-center hidden sm:flex md:flex lg:flex'>
                            <NavLink to='/home'>
                                <div className='text-md font-semibold'>Home</div>
                            </NavLink>

                            <NavLink to='/search'>
                                <div className='text-md font-semibold'>Search</div>
                            </NavLink>

                            <NavLink to='/profile'>
                                <div className='text-md font-semibold'>Profile</div>
                            </NavLink>

                            <NavLink>
                                <div className='text-md font-semibold hover:bg-gray-100 rounded-lg p-2 text-red-600'
                                    onClick={async () => {
                                        try {
                                            const response = await fetch("https://routewiz-backend.onrender.com/api/logout", {
                                                method: "GET",
                                                credentials: "include",
                                            });

                                            const data = await response.json();

                                            if (data.message === "Logged out successfully") {
                                                toast.success("Logged Out");
                                                navigate("/");
						setLogin(false);
                                            } else {
                                                toast.error("Something went wrong");
                                            }
                                        } catch (error) {
                                            toast.error("Logout failed");
                                            console.error(error);
                                        }
                                    }}>Log Out </div>
                            </NavLink>
                        </div>
                    }




                {isloggedIn &&
                    <div className='flex sm:hidden md:hidden lg:hidden'
                        onClick={clickHandler}>
                        {
                            icon ? (<RxCross2 />) : (<TiThMenu />)
                        }
                    </div>
                }
            </div>

            {isloggedIn && 
                <div className={icon ? 'block' : 'hidden'}>
                <div className='flex flex-col gap-4 mt-3 bg-white items-center shadow-lg sm:hidden md:hidden lg:hidden z-[1000] 
            absolute top-[25px] right-[0px] p-10' id='menu' >
                    {isloggedIn &&
                        <NavLink to='/home'>
                            <div className='text-lg font-semibold'>Home</div>
                        </NavLink>
                    }

                    {isloggedIn &&
                        <NavLink to='/search'>
                            <div className='text-lg font-semibold'>Search</div>
                        </NavLink>

                    }

                    {isloggedIn &&
                        <NavLink to='/profile'>
                            <div className='text-lg font-semibold'>Profile</div>
                        </NavLink>
                    }

                    {isloggedIn &&
                        <NavLink>
                            <div className='text-lg font-semibold text-red-500 bg-sky-100 hover:bg-gray-100 rounded-lg p-2 text-red-600'
                                onClick={async () => {
                                    try {
                                        const response = await fetch("https://routewiz-backend.onrender.com/api/logout", {
                                            method: "GET",
                                            credentials: "include",
                                        });

                                        const data = await response.json();

                                        if (data.message === "Logged out successfully") {
                                            toast.success("Logged Out");
                                   		 navigate("/");
						 setLogin(false);
                                        } else {
                                            toast.error("Something went wrong");
                                        }
                                    } catch (error) {
                                        toast.error("Logout failed");
                                        console.error(error);
                                    }
                                }}>Log Out </div>
                        </NavLink>
                    }
                </div>
            </div>
            }
            
        </div>
    )
}

export default Navbar;
