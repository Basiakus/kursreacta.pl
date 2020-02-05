import React, {useState, useRef, useEffect} from 'react';
import TimeboxEditor from './TimeboxEditor';
import CurrentTimebox from './CurrentTimebox';
import RealTimeClock from './RealTimeClock';
//import { prettyDir } from '../additionalFunctions.js';
//import '../styles/components/EditableTimebox.scss';
function EditableTimebox() {
    const [title, setTitle] = useState("Nauka reacta")
    const [totalTimeInMinutes, setTotalTimeInMinutes] = useState(0.2);
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
        if (intervalId.current === null) {
            intervalId.current = window.setInterval(() => {
                let totalTimeInSeconds = totalTimeInMinutes * 60;
                if (totalTimeInSeconds < elapsedTimeInSeconds) {
                    return window.clearInterval(intervalId.current);
                }
                setElapsedTimeInSeconds(prevValue => prevValue + 0.01)
            }, 10);
        }
    };
    
    const stopTimer = () => {
        window.clearInterval(intervalId.current);
        return intervalId = null;
    };
    const handleStart = e => {
        setIsRunning(true)
        startTimer();
    };
    const handleStop = e => {
        setIsRunning(false);
        setIsPaused(false);
        setPausesCount(0);
        setElapsedTimeInSeconds(0);        
        stopTimer();
    };
    const togglePause = () => {

        setIsPaused(prev => !prev);
        isPaused ? stopTimer() : startTimer();
        setPausesCount(prev => {
            let prevValue;
            isPaused ? prevValue = prev + 1 : prevValue = prev;
            return prevValue;
        })
        /* this.setState(prevState => {
            const isPaused = !prevState.isPaused;
            isPaused ? stopTimer() : startTimer();
            return {
                isPaused,
                pausesCount: isPaused
                ? prevState.pausesCount + 1
                : prevState.pausesCount
            };
        }); */
    };

    const handleConfirm = () => {
        setIsEditable(false)
    };

    const handleEdit = () => {
        setIsEditable(true)
        handleStop();
    };
   useEffect(() => {
    startTimer();
    return () => {
        clearInterval(intervalId);
    }
   }, [])
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