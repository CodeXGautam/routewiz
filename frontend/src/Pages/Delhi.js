import { useState } from 'react';
import Dltraffic from '../Components/Dltraffic'
import img1 from '../images/congestion.png'
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import { FaCircle } from "react-icons/fa6";



const Delhi = () => {

    const api_url = "https://routewiz-ml.onrender.com/predict/?timestamp=";

    const [timestamp, setTimestamp] = useState(
        { date: '', time: '' }
    );

    const [congestion, setCongestion] = useState('');
    const [speed, setSpeed] = useState('');

    const [date, setDate] = useState('');

    const [showAnswer, setShowAnswer] = useState(false);
    const[speedAnswer, setSpeedAnswer] = useState(false);
    const[calculatedAnswer, setCalculatedAnswer] = useState(false);
     const[modelAnswer, setModelAnswer] = useState(false);

    const url = `${api_url}${date} ${timestamp.time}`
    console.log(url);
		

    async function fetchdata() {
        try {
            const output = await fetch(url,
				       {method: 'get',
					headers: {
                    'Content-Type': 'application/json'
                },
		    credentials : 'include')}
            const data = await output.json();
            setCongestion(data.predicted_congestion_factor)
            setSpeed(data.predicted_current_speed)
            console.log(congestion)
            console.log(speed)
        }

        catch (err) {
            console.log(err);
        }
    }


    const changeHandler = (event) => {
        setTimestamp((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    console.log(timestamp)

    const clickHandler = () => {
        const [year, month, day] = timestamp.date.split('-');
        const newFormat = `${day}-${month}-${year}`;
        setDate(newFormat);
	    fetchdata();
        console.log('I am clicked')
    }

    const answer1Handler = () => {
        console.log("i am clicked")
        setShowAnswer(!showAnswer)
    }

    const answer2Handler = () => {
        console.log("i am clicked")
        setSpeedAnswer(!speedAnswer)
    }

    const answer3Handler = () => {
        console.log("i am clicked")
        setCalculatedAnswer(!calculatedAnswer)
    }
     
    const answer4Handler = () => {
        console.log("i am clicked")
        setModelAnswer(!modelAnswer)
    }

    return (
        <div className='flex flex-col items-center mt-3 gap-8 mb-5'>
            <div className='w-[95%] h-[34vw] min-h-[220px]'><Dltraffic /></div>
            <h1 className='font-bold text-2xl sm:text-4xl md:text-4xl lg:text-5xl'>New Delhi <span className='text-red-500'>Live Traffic</span></h1>
            <h2 className='text-lg sm:text-xl md:text-xl lg:text-xl text-blue-400'>
                Updating Every 5 minutes
            </h2>


            <div className='flex flex-col gap-2 text-sm sm:text-md md:text-xl lg:text-xl text-gray-500 mt-8 min-w-[200px] max-w-[900px] w-[50%]'>

		 <h2 className='text-lg sm:text-xl md:text-xl lg:text-xl text-red-500 mb-2'>
                NOTE :-  This Page is for the analysis of traffic in Delhi 
            	</h2>

                <div className='flex gap-2 w-[100%]'>
                     <FaCircle className='text-[10px]' color='red' />
                    <span className='w-[90%] flex items-center justify-center'>Congestion and Speed Values are predicted on the basis of previous dataset.</span>
                </div>

                <div className='flex gap-2 w-[100%]'>
                     <FaCircle className='text-[10px]' color='red' />
                    <span className='w-[90%] flex '>These may or may not be 100% accurate.</span>
                </div>

                <div className='flex gap-2 w-[100%]'>
                     <FaCircle className='text-[10px]' color='red' />
                    <span className='w-[90%] flex'>One can predict congestion factor and speed on their desired date and time by simply putting
                        date and time below and click on GET.</span>
                </div>
            </div>

            <div className='flex flex-col gap-10 items-center mt-4 border-2 border-gray-200 p-8 w-[70%] rounded-2xl min-w-[250px]'>
                <div className='flex bg-blue-200 rounded-full text-lg sm:text-xl md:text-2xl lg:text-2xl'>
                    <span className='bg-blue-400 rounded-full p-3 flex items-center'>Congestion</span>
                    <span className='rounded-full p-3 flex items-center'>Current Speed</span>
                </div>
                <label className='flex justify-center gap-3 items-center'>
                    <span className='text-md sm:text-lg md:text-xl lg:text-xl font-bold'>Date:</span>
                    <input type='date' id='date' name='date' onChange={changeHandler} value={timestamp.date}
                        className='' />
                </label>

                <label className='flex justify-center gap-3 items-center'>
                    <span className='text-md sm:text-lg md:text-xl lg:text-xl font-bold'>Time:</span>
                    <input type='time' id='time' name='time' onChange={changeHandler} value={timestamp.time} />
                </label>

                <button className='flex items-center text-md sm:text-lg md:text-xl lg:text-xl justify-center bg-blue-200 p-2 rounded-full w-[9vw] min-w-[80px]' onClick={clickHandler}>
                    Get
                </button>
            </div>

            <div className='flex flex-col gap-5 border-2 border-gray-100 p-8 w-[70%] rounded-full bg-blue-100 min-w-[250px]'>
                <div className='flex justify-center items-center gap-5'>
                    <h1 className='text-md sm:text-lg md:text-xl lg:text-xl font-semibold'>Predicted Congestion Factor : </h1>
                    <span className='text-sm sm:text-md md:text-lg lg:text-lg border-2 border-gray-400 p-2 rounded-xl'>{congestion} </span>
                </div>

                <div className='flex justify-center items-center gap-5'>
                    <h1 className='text-md sm:text-lg md:text-xl lg:text-xl font-semibold'>Predicted Speed :</h1>
                    <div className='flex items-center justify-center gap-2'>
                        <span className='text-sm sm:text-md md:text-lg lg:text-lg border-2 border-gray-400 p-2 rounded-xl'> {speed} </span>
                        <span className='text-sm sm:text-md md:text-lg lg:text-lg'>Km/Hr </span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col mt-10 items-center gap-8'>
                <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold'>Congestion Level Over Time</h1>
                <img src={img1} width={1100} alt='' />
            </div>

            <div className='flex flex-col gap-4 shadow-lg border rounded-md w-[100%] justify-center items-center mt-4 mb-5 p-2'>
                <h2 className='text-lg sm:text-2xl md:text-2xl lg:text-2xl text-gray-950'>Related Questions</h2>
                <div className='w-[90%] flex flex-col gap-3'>
                    <div onClick={answer1Handler} className='cursor-pointer flex flex-col gap-2 w-[100%] shadow-lg border rounded-md p-2'>
                        <div className='flex justify-between items-center w-[100%] text-md sm:text-md md:text-lg lg:text-lg'>
                            <span className='flex items-center gap-2 '> <FaCircle className='text-[10px]' color='red' />
                                What is Congestion Factor ?
                            </span>
                            <span>{showAnswer ? (<GoTriangleUp />) : (<GoTriangleDown />)}</span>
                        </div>
                        <span className={showAnswer ? "block" : "hidden"}>
                            <span className='text-sm'>
                                ↪ Congestion factor is a way to measure how crowded a road is by comparing the
                                time it takes to travel during
                                traffic with the time it takes when there’s no traffic
                                <br />
                                ↪ If the factor is 1, traffic is smooth. The higher the number, the worse the traffic.
                            </span>
                        </span>
                    </div>

                    <div onClick={answer2Handler} className='cursor-pointer flex flex-col gap-2 w-[100%] shadow-lg border rounded-md p-2'>
                        <div className='flex justify-between items-center w-[100%] text-md sm:text-md md:text-lg lg:text-lg'>
                            <span className='flex items-center gap-2 '> <FaCircle className='text-[10px]' color='red' />
                                What is Current Speed ?
                            </span>
                            <span>{speedAnswer ? (<GoTriangleUp />) : (<GoTriangleDown />)}</span>
                        </div>
                        <span className={speedAnswer ? "block" : "hidden"}>
                            <span className='text-sm'>
                                ↪ Current speed is the actual speed at which vehicles are moving on a road at a specific moment.
                                <br />
                                ↪ It changes with traffic conditions — lower during heavy traffic and higher when roads are clear.
                            </span>
                        </span>
                    </div>

                    <div onClick={answer3Handler} className='cursor-pointer flex flex-col gap-2 w-[100%] shadow-lg border rounded-md p-2'>
                        <div className='flex justify-between items-center w-[100%] text-md sm:text-md md:text-lg lg:text-lg'>
                            <span className='flex items-center gap-2 '> <FaCircle className='text-[10px]' color='red' />
                                How is the congestion Factor calculated ?
                            </span>
                            <span>{calculatedAnswer ? (<GoTriangleUp />) : (<GoTriangleDown />)}</span>
                        </div>
                        <span className={calculatedAnswer ? "block" : "hidden"}>
                            <span className='text-sm'>
                                ↪ Congestion Factor = (current speed - freeflow speed) / (current speed + freeflow speed)      
                            </span>
                        </span>
                    </div>

         	    <div onClick={answer4Handler} className='cursor-pointer flex flex-col gap-2 w-[100%] shadow-lg border rounded-md p-2'>    
	                <div className='flex justify-between items-center w-[100%] text-md sm:text-md md:text-lg lg:text-lg'>
                            <span className='flex items-center gap-2 '> <FaCircle className='text-[10px]' color='red' />
                               Which ML model is being used for predictions ?
                            </span>
                            <span>{modelAnswer ? (<GoTriangleUp />) : (<GoTriangleDown />)}</span>
                        </div>
                        <span className={modelAnswer ? "block" : "hidden"}>
                            <span className='text-sm'>
                                ↪ A XG-Boost model is used for making predictions, which is trained on speed and traffic congestion data varying with time. 
				<br/>
				The dataset is of location between Delhi and Gurugram. 
                            </span>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Delhi;
