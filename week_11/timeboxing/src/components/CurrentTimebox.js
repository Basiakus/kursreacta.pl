import React, { useEffect, useState, useRef, useReducer } from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import { currentTimeboxReducer } from "../reducers/currentTimeboxReducer.js";
//import ProgressArc from './ProgressArc';
//import ProgressBarJui from './ProgressBarJui';
import { getMinutesAndSecondsFromDuractionInSeconds } from '../lib/time.js';

import '../styles/components/CurrentTimebox.scss';

function CurrentTimebox({title, totalTimeInMinutes}) {

   /* const [isRunning, setIsRunning] = useState(false);
   const [isPaused, setIsPaused] = useState(false);
   const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);
   const [pausesCount, setPausesCount] = useState(0); */

   let intervalId = useRef();
   const [state, dispatch] = useReducer(currentTimeboxReducer, undefined, currentTimeboxReducer);

   const startTimer = () => {
      dispatch({type: "CURRENT_TIMEBOX_START"})
      //console.log(state)
   };

   const stopTimer = (e) => {
      dispatch({ type: "CURRENT_TIMEBOX_STOP" })
      window.clearInterval(intervalId.current);
      //console.log(state)
      
   };
   const handleStart = (e) => {
      startTimer();
   };
   
   const handleStop = () => {
      dispatch({ type: "CURRENT_TIMEBOX_STOP_HANDLER" })
      stopTimer();
   };
   const togglePause = () => {
      const currentPause = !state.isPaused;
      dispatch({ type: "CURRENT_TIMEBOX_PAUSES_COUNT", currentPause })
      currentPause ? stopTimer() : startTimer();
      dispatch({ type: "CURRENT_TIMEBOX_PAUSE", currentPause })
   };

   useEffect(() => {
      let totalTimeInSeconds = totalTimeInMinutes * 60;
      if (state.isRunning) {
         intervalId.current = window.setInterval(() => {
            const { elapsedTimeInSeconds } = state;
            dispatch({ type: 'CURRENT_TIMEBOX_ELAPSED_TIME', elapsedTimeInSeconds })
            //console.log(elapsedTimeInSeconds, 'interval running')
            if (totalTimeInSeconds < elapsedTimeInSeconds) {
               stopTimer();
               dispatch({ type: 'CURRENT_TIMEBOX_ELAPSED_TIME_RESET' })
            }
         }, 10);
      }
      return () => window.clearInterval(intervalId.current);
   }, [state.elapsedTimeInSeconds, state.isRunning, totalTimeInMinutes])
   useEffect(() => handleStop(), [])

   const totalTimeInSeconds = totalTimeInMinutes * 60;
   const timeLeftInSeconds = totalTimeInSeconds - state.elapsedTimeInSeconds;
   const hoursLeft = totalTimeInSeconds >= 3600 ? Math.floor(timeLeftInSeconds / 3600) : 0;
   const milisecondsLeft = (totalTimeInSeconds > state.elapsedTimeInSeconds) ? (timeLeftInSeconds - Math.floor(timeLeftInSeconds)).toFixed(2) : 0;
   const decimalConverter = ((value) => (value % 1) * 1000);
   const progressInPercent = (timeLeftInSeconds / totalTimeInSeconds) * 100;
   const [minutesLeft, secondsLeft] = getMinutesAndSecondsFromDuractionInSeconds(hoursLeft, timeLeftInSeconds);

   return (
      <div className={`CurrentTimebox`}>
         <h1>{title}</h1>
         pozostało: 
         {/* <ProgressArc canvasSize={80} percent={progressInPercent} /> */}
         <Clock
            className={state.isPaused ? 'inactive' : ''}
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
            className={state.isPaused ? 'inactive' : ''}
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
         <button onClick={handleStart} disabled={state.isRunning || state.isPaused}>Start</button>
         <button onClick={handleStop} disabled={!state.isRunning}>Stop</button>
         <button onClick={togglePause} disabled={!state.isRunning && state.pausesCount === 0}>{state.isPaused ? 'Wznów' : 'Pauzuj'}</button>
         liczba przerw: {state.pausesCount}
      </div>
   )
}

export default CurrentTimebox;