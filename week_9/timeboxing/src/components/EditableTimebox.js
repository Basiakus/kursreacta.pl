import React, {useState, useRef, useEffect} from 'react';
import TimeboxEditor from './TimeboxEditor';
import CurrentTimebox from './CurrentTimebox';
import RealTimeClock from './RealTimeClock';
//import { prettyDir } from '../additionalFunctions.js';
//import '../styles/components/EditableTimebox.scss';
function EditableTimebox() {
    const [title, setTitle] = useState("Nauka reacta")
    const [totalTimeInMinutes, setTotalTimeInMinutes] = useState(0.1);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);
    const [pausesCount, setPausesCount] = useState(0);
    const [isEditable, setIsEditable] = useState(true);
    let intervalId = useRef();
    
    const handleTitleOnChange = event => {
        setTitle(event.target.value);
    };
  
    const handleTotalTimeInMinutesOnChange = event => {
        let inputValue = event.target.value;
        setTotalTimeInMinutes(inputValue)
    };

    const startTimer = () => {
        setIsRunning(true);
        setIsPaused(false)
        console.log(isPaused)
    };
    
    const stopTimer = (e) => {
        setIsRunning(false)
        window.clearInterval(intervalId.current);
        console.log('timer stop')
    };
    const handleStart = (e) => {
        startTimer();
    };
    const handleStop = () => {
        setIsRunning(false);
        setIsPaused(false);
        setPausesCount(0);
        setElapsedTimeInSeconds(0);        
        stopTimer();
    };
    const togglePause = () => {
        const currentPause = !isPaused;
        setPausesCount(prev => {
            let prevValue;
            currentPause ? prevValue = prev + 1 : prevValue = prev;
            return prevValue;
        })
        currentPause ? stopTimer() : startTimer();
        setIsPaused(currentPause);
    };

    const handleConfirm = () => {
        setIsEditable(false)
    };

    const handleEdit = () => {
        setIsEditable(true)
        handleStop();
    };

    useEffect(() => {
        let totalTimeInSeconds = totalTimeInMinutes * 60;
        if (isRunning) {
            intervalId.current = window.setInterval(() => {
                setElapsedTimeInSeconds(prevValue => prevValue + 0.01)
                //console.log(elapsedTimeInSeconds, 'interval running')
                if (totalTimeInSeconds < elapsedTimeInSeconds) {
                    stopTimer();
                    setElapsedTimeInSeconds(0)
                }
            }, 10);
        } 
        return () => window.clearInterval(intervalId.current);
    }, [elapsedTimeInSeconds, isRunning, totalTimeInMinutes])
    return (
        <React.Fragment>
            <RealTimeClock />
            <TimeboxEditor
                title={title}
                totalTimeInMinutes={totalTimeInMinutes}
                handleTitleOnChange={handleTitleOnChange}
                handleTotalTimeInMinutesOnChange={handleTotalTimeInMinutesOnChange}
                isEditable={isEditable}
                onConfirm={handleConfirm}
            />
            <CurrentTimebox
                title={title}
                totalTimeInMinutes={totalTimeInMinutes}
                isRunning={isRunning}
                isPaused={isPaused}
                pausesCount={pausesCount}
                elapsedTimeInSeconds={elapsedTimeInSeconds}
                handleStart={handleStart}
                handleStop={handleStop}
                togglePause={togglePause}
                isEditable={isEditable}
                handleEdit={handleEdit}
            />
        </React.Fragment>
    );
}
export default EditableTimebox;