import { useState } from 'react';
import Dltraffic from '../Components/Dltraffic'
import img1 from '../images/congestion.png'




const Delhi = () => {

    const api_url = "http://127.0.0.1:8000/predict/?timestamp=";

    const [timestamp, setTimestamp] = useState(
        { date: '', time: '' }
    );

    const [congestion, setCongestion] = useState('');
    const [speed, setSpeed] = useState('');

    const [date, setDate] = useState('');


    const url = `${api_url}${date} ${timestamp.time}`
    console.log(url);

    async function fetchdata() {
        try {
            const output = await fetch(url);
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

    return (
        <div className='flex flex-col items-center mt-3 gap-8 mb-5'>
            <div className='w-[95%] h-[34vw] min-h-[220px]'><Dltraffic /></div>
            <h1 className='font-bold text-2xl sm:text-4xl md:text-4xl lg:text-5xl'>New Delhi <span className='text-red-500'>Live Traffic</span></h1>
            <h2 className='text-lg sm:text-xl md:text-xl lg:text-xl text-blue-400'>
                Updating Every 5 minutes
            </h2>


            <div className='flex flex-col gap-2 text-sm sm:text-md md:text-xl lg:text-xl text-gray-500 mt-8 min-w-[200px] max-w-[900px] w-[50%]'>
                <div className='flex gap-2 w-[100%]'>
                    <span className='bg-red-600 w-[10px] h-[10px] rounded-full'></span>
                    <span className='w-[90%] flex items-center justify-center'>Congestion and Speed Values are predicted on the basis of previous dataset.</span>
                </div>

                <div className='flex gap-2 w-[100%]'>
                    <span className='bg-red-600 w-[10px] h-[10px] rounded-full'></span>
                    <span className='w-[90%] flex '>These may or may not be 100% accurate.</span>
                </div>

                <div className='flex gap-2 w-[100%]'>
                    <span className='bg-red-600 w-[10px] h-[10px] rounded-full'></span>
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
        </div>
    )
} 

export default Delhi;