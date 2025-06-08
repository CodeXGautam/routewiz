import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Profile = () => {
    const [userName, setUserName] = useState();
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [history, setHistory] = useState();

    const navigate = useNavigate();

    const getProfile = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/currentUser', {
                method: 'GET',
                credentials: 'include', // important to send cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!res) {
                toast.error("Failed to load profile");
                return;
            }

            const data = await res.json();
            const user = data.user;

            setUserName(user.userName);
            setFullName(`${user.firstName} ${user.lastName}`);
            setEmail(user.email);
        } catch (error) {
            console.log("Error", error);
            toast.error("Something went wrong while fetching profile");
        }
    };

    const clickHandler = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/logout", {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if (data.message === "logged out successfully") {
                toast.success("Logged Out");
                navigate("/");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Logout failed");
            console.error(error);
        }
    };

    const historyHandler = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/searchHistory", {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if (!data || data.message === "Failed to fetch search history") {
                toast.error("Failed to fetch search history");
                return;
            }

            if (data.searchHistory?.length === 0) {
                setHistory("No searches found");
            } else {
                setHistory(data.searchHistory);
            }

            console.log(data.searchHistory);
        } catch (error) {
            console.log("Error", error);
            toast.error("History loading failed");
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className='flex flex-col items-center w-full h-full mt-5 gap-5'>
            <div className='text-4xl font-bold text-blue-400'>Profile</div>
            <div className='text-md font-semibold flex flex-col w-[70%] space-y-5 shadow-lg border-2 px-6 py-3 rounded-md'>
                <div className='w-[170px] h-[170px] min-w-[180px] rounded-full bg-gray-200 mx-auto'></div>

                <div className='flex items-center gap-4'>
                    <span className='text-md sm:text-lg md:text-lg lg:text-xl text-gray-900'>Username:</span>
                    <span>{userName}</span>
                </div>

                <div className='flex items-center gap-4'>
                    <span className='text-md sm:text-lg md:text-lg lg:text-xl text-gray-900'>Fullname:</span>
                    <span>{fullName}</span>
                </div>

                <div className='flex items-center gap-4'>
                    <span className='text-md sm:text-lg md:text-lg lg:text-xl text-gray-900'>Email:</span>
                    <span>{email}</span>
                </div>

                <div className='flex gap-3 items-center'>
                    <span className='text-md sm:text-lg md:text-lg lg:text-xl text-gray-900'>Search History:</span>
                    <button
                        className='flex justify-center items-center text-gray-100 bg-blue-500 hover:text-white hover:bg-blue-600 p-2 rounded-md'
                        onClick={historyHandler}
                    >
                        View
                    </button>
                </div>

                <button
                    onClick={clickHandler}
                    className='flex justify-center items-center text-red-500 text-lg hover:text-red-600 hover:bg-gray-100 p-1 w-[25%] mx-auto'
                >
                    Log Out
                </button>

                {history && (
                    <div className="p-2 mt-2 border-t border-gray-300 text-sm text-gray-700">
                        <pre>{typeof history === "string" ? history : JSON.stringify(history, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
