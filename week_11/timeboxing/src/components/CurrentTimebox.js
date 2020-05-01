import React, { useEffect, useRef, useState, useContext } from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import { getMinutesAndSecondsFromDuractionInSeconds } from '../lib/time.js';
import { setPauseValue, getPausesCount, isTimeRunning, getElapsedTime, isTimePaused } from "../reducers/currentTimeboxReducer.js";
import { startTimer, resetTimer, stopTimer, setPausesCount, setPause, setElapsedTime, elapsetTimeReset } from '../actions/currentTimeboxActions.js';
import {  useStore } from 'react-redux';
import '../styles/components/CurrentTimebox.scss';

const useForceUpdate = () => {
   const [updateCounter, setUpdateCounter] = useState(0);
   const forceUpdate = () => setUpdateCounter(prevUpdateCounter => prevUpdateCounter + 1);
   return forceUpdate;
}
function CurrentTimebox({title, totalTimeInMinutes}) {

   const forceUpdate = useForceUpdate();
   let intervalId = useRef();
   //const [state, dispatch] = useReducer(currentTimeboxReducer, undefined, currentTimeboxReducer); 
   //let { store } = useContext(ReactReduxContext);
   let store = useStore();
   let state = store.getState();
   let dispatch = store.dispatch;
   const elapsedTime = getElapsedTime(state);
   
   const handleStop = () => {
      dispatch(resetTimer())
      window.clearInterval(intervalId.current);
   };

   const togglePause = () => {
      const currentPause = setPauseValue(state);
      dispatch(setPausesCount(currentPause))
      currentPause ? dispatch(stopTimer()) : dispatch(startTimer());
      dispatch(setPause(currentPause))
   };

   useEffect(() => store.subscribe(forceUpdate), []);
   useEffect(() => {
      let totalTimeInSeconds = totalTimeInMinutes * 60;
      if (isTimeRunning(state)) {
         intervalId.current = window.setInterval(() => {
            
            dispatch(setElapsedTime(elapsedTime))
            if (totalTimeInSeconds < elapsedTime) {
               dispatch(resetTimer());
               dispatch(elapsetTimeReset())
            }
         }, 10);
      }
      return () => window.clearInterval(intervalId.current);
   }, [elapsedTime, totalTimeInMinutes, state])
   useEffect(() => handleStop(), [])

   const totalTimeInSeconds = totalTimeInMinutes * 60;
   const timeLeftInSeconds = totalTimeInSeconds - elapsedTime;
   const hoursLeft = totalTimeInSeconds >= 3600 ? Math.floor(timeLeftInSeconds / 3600) : 0;
   const milisecondsLeft = (totalTimeInSeconds > elapsedTime) ? (timeLeftInSeconds - Math.floor(timeLeftInSeconds)).toFixed(2) : 0;
   const decimalConverter = ((value) => (value % 1) * 1000);
   const progressInPercent = (timeLeftInSeconds / totalTimeInSeconds) * 100;
   const [minutesLeft, secondsLeft] = getMinutesAndSecondsFromDuractionInSeconds(hoursLeft, timeLeftInSeconds);

   return (
      <div className={`CurrentTimebox`}>
         <h1>{title}</h1>
         pozostało: 
         <Clock
            className={isTimePaused(state) ? 'inactive' : ''}
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
            className={isTimePaused(state) ? 'inactive' : ''}
            borderBlue={true}
            barColor="blue"
            isBig={true} 
            percent={progressInPercent}
            trackRemaining={false}
         />
         <button className={`CurrentTimebox__buttons`} onClick={() => dispatch(startTimer())} disabled={isTimeRunning(state) || isTimePaused(state)}>Start</button>
         <button className={`CurrentTimebox__buttons`} onClick={(handleStop)} disabled={!isTimeRunning(state)}>Reset</button>
         <button className={`CurrentTimebox__buttons`} onClick={togglePause} disabled={!isTimeRunning(state) && getPausesCount(state) === 0}>{isTimePaused(state) ? '\u25B6' : 'II'}</button>
         liczba przerw: {getPausesCount(state)}
      </div>
   )
}

export default CurrentTimebox;