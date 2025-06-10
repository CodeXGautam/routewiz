import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Profile = (props) => {

	 const setLogin = props.setLogin;	

    const [userName, setUserName] = useState();
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [history, setHistory] = useState([]);

    const navigate = useNavigate();

    const getProfile = async () => {
        try {
            const res = await fetch('https://routewiz-backend.onrender.com/api/currentUser', {
                method: 'GET',
                credentials: 'include', 
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
    };

    const historyHandler = async () => {
    try {
        const response = await fetch("https://routewiz-backend.onrender.com/api/searchHistory", {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();

        if (!data || data.message === "Failed to fetch search history") {
            toast.error("Failed to fetch search history");
            return;
        }

        setHistory(data.searchHistory || []);
    } catch (error) {
        console.log("Error", error);
        toast.error("History loading failed");
    }
};


    useEffect(() => {
        getProfile();
	    historyHandler();
    }, []);

const clearHistoryHandler = async () => {
    try {
        const response = await fetch("https://routewiz-backend.onrender.com/api/clearHistory", {
            method: "POST",  
            credentials: "include",
        });

        const data = await response.json();

        if (!data || data.message === "Failed to delete history") {
            toast.error("Failed to delete history");
            return;
        }

        if (data.message === "No history found to delete") {
            toast.error("No history found to delete");
            return;
        }

        if (data.message === "History deleted successfully") {
            historyHandler(); // reload history
            toast.success("History deleted");
        }
    } catch (error) {
        console.log("Error", error);
        toast.error("Deletion failed");
    }
};


    return (
        <div className='flex flex-col items-center w-full h-full mt-5 gap-5'>
            <div className='text-4xl font-bold text-blue-400'>Profile</div>
            <div className='text-md font-semibold flex flex-col w-[70%] space-y-5 shadow-lg border-2 px-6 py-3 rounded-md'>
                <div className='w-[150px] h-[150px] min-w-[120px] rounded-full bg-blue-400 mx-auto flex justify-center items-center'>
		<img src='https://avatar.iran.liara.run/public/boy?username=Ash' alt='user' className = 'w-[140px] h-[140px] min-w-[110px] rounded-full' />
		</div>

                <div className='flex items-center gap-4'>
                    <span className='text-md sm:text-lg md:text-lg lg:text-xl text-gray-900'>Username:</span>
                    <span className='text-blue-500 text-sm sm:text-md md:text-md lg:text:md' >{userName}</span>
                </div>

                <div className='flex items-center gap-4'>
                    <span className='text-md sm:text-lg md:text-lg lg:text-xl text-gray-900'>Fullname:</span>
                    <span  className='text-blue-500 text-sm sm:text-md md:text-md lg:text:md'>{fullName}</span>
                </div>

                <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row sm:items-center md:items-center lg:items-center gap-4'>
                    <span className='text-md sm:text-lg md:text-lg lg:text-xl text-gray-900'>Email:</span>
                    <span className='text-blue-500 text-sm sm:text-md md:text-md lg:text:md'>{email}</span>
                </div>

                <div className='flex gap-3 items-center'>
                    <span className='text-md sm:text-lg md:text-lg lg:text-xl text-gray-900'>Search History:</span>
                  
                </div>
	   		
{ history.length === 0 ? (
  <p> No searches found</p>
) :
(
  history && (
    <>
      {history.map((value, index) => (  
        <div key={index} className='flex flex-col gap-2 p-2 border-2 shadow-md rounded-md'>
          <div className='text-sm flex gap-2 items-center'>
            Origin : <span className='text-sm text-blue-500 border-2 p-2 shadow-md rounded-md'>{value.start}</span>
          </div>
          <div className='text-sm flex gap-2 items-center'>
            Destination : <span className='text-sm text-blue-500 border-2 p-2 shadow-md rounded-md'>{value.end}</span>
          </div>
          <div className='text-sm flex gap-2 items-center'>
            Vehicle : <span className='text-sm text-blue-500 border-2 p-2 shadow-md rounded-md'>{value.vehicle}</span>
          </div>
          <div className='text-sm flex gap-2 items-center'>
            Route Preference : <span className='text-sm text-blue-500 border-2 p-2 shadow-md rounded-md'>{value.routePref}</span>
          </div>
          <div className='text-sm flex gap-2 items-center'>
            Time : <span className='text-sm text-blue-500 border-2 p-2 shadow-md rounded-md'>{value.createdAt}</span>
          </div>
        </div>  
      ))}
      
      <button
        className='mt-4 flex justify-center items-center text-gray-100 bg-blue-500 hover:text-white hover:bg-blue-600 p-2 rounded-md shadow-md'
        onClick={clearHistoryHandler}
      >
        Clear History
      </button>
    </>
  )
)
}   

                <button onClick={clickHandler} className='flex justify-center items-center text-red-500 text-lg 
                    hover:text-red-600 hover:bg-gray-100 p-1 w-[25%] mx-auto'
                >
                    Log Out
                </button>
        </div>
</div>
    );
};
export default Profile;



	        // <button
                    //     className='flex justify-center items-center text-gray-100 bg-blue-500 hover:text-white hover:bg-blue-600 p-2 rounded-md'
                    //     onClick={historyHandler}
                    // >
                    //     View
                    // </button>
