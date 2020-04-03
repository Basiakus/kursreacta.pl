import React, { useEffect, useState, useRef } from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
//import ProgressArc from './ProgressArc';
//import ProgressBarJui from './ProgressBarJui';
import { getMinutesAndSecondsFromDuractionInSeconds } from '../lib/time.js';

import '../styles/components/CurrentTimebox.scss';

function CurrentTimebox({
   title,
   totalTimeInMinutes

}) {

   const [isRunning, setIsRunning] = useState(false);
   const [isPaused, setIsPaused] = useState(false);
   const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);
   const [pausesCount, setPausesCount] = useState(0);
   let intervalId = useRef();


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
   }, [elapsedTimeInSeconds, isRunning, totalTimeInMinutes, handleStop])
   useEffect(() => handleStop(), [])

   const totalTimeInSeconds = totalTimeInMinutes * 60;
   const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
   const hoursLeft = totalTimeInSeconds >= 3600 ? Math.floor(timeLeftInSeconds / 3600) : 0;
   const milisecondsLeft = (totalTimeInSeconds > elapsedTimeInSeconds) ? (timeLeftInSeconds - Math.floor(timeLeftInSeconds)).toFixed(2) : 0;
   const decimalConverter = ((value) => (value % 1) * 1000);
   const progressInPercent = (timeLeftInSeconds / totalTimeInSeconds) * 100;
   const [minutesLeft, secondsLeft] = getMinutesAndSecondsFromDuractionInSeconds(hoursLeft, timeLeftInSeconds);

   return (
      <div className={`CurrentTimebox`}>
         <h1>{title}</h1>
         pozostało: 
         {/* <ProgressArc canvasSize={80} percent={progressInPercent} /> */}
         <Clock
            className={isPaused ? 'inactive' : ''}
            hours={hoursLeft}
            hoursColor="black"
            minutes={minutesLeft}
            minutesColor="red"
            seconds={secondsLeft}
            secondsColor="green"
            miliseconds={decimalConverter(milisecondsLeft)}
            milisecondsColor="blue"
            separatorColor="red"
         />
         <ProgressBar
            className={isPaused ? 'inactive' : ''}
            borderBlue={true}
            barColor="blue"
            isBig={true} 
            percent={progressInPercent}
            trackRemaining={false}
         />
         {/* <ProgressBarJui
            className={isPaused ? 'inactive' : ''}
            borderBlue={true}
            barColor="green"
            isBig={true}
            percent={progressInPercent}
            trackRemaining={false}
         /> */}
         <button onClick={handleStart} disabled={isRunning}>Start</button>
         <button onClick={handleStop} disabled={!isRunning}>Stop</button>
         <button onClick={togglePause} >{isPaused ? 'Wznów' : 'Pauzuj'}</button>
         liczba przerw: {pausesCount}
      </div>
   )
}

export default CurrentTimebox;