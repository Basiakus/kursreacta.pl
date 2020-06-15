import React, { useEffect, useRef } from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import { getMinutesAndSecondsFromDuractionInSeconds } from '../lib/time.js';
import { setPauseValue, getPausesCount, isTimeRunning, getElapsedTime, isTimePaused } from "../reducers/currentTimeboxReducer.js";
import { startTimer, resetTimer, stopTimer, setPausesCount, setPause, setElapsedTime, elapsetTimeReset } from '../actions/currentTimeboxActions.js';
import { resetCurrentTimebox } from "../actions/timeboxListMenagerActions.js";
import { getCurrentTimebox } from '../reducers/timeboxesReducer.js';
import { useDispatch, useSelector, connect } from 'react-redux';
import '../styles/components/CurrentTimebox.scss';


function CurrentTimebox({title, totalTimeInMinutes}) {
   
   let intervalId = useRef();
   let dispatch = useDispatch();
   const elapsedTime = useSelector(state => getElapsedTime(state));
   const currentPause = useSelector(state => setPauseValue(state));
   const timeRunning = useSelector(state => isTimeRunning(state));
   const timePaused = useSelector(state => isTimePaused(state));
   const pausesCount = useSelector(state => getPausesCount(state));
   
   const totalTimeInSeconds = totalTimeInMinutes * 60;
   const timeLeftInSeconds = totalTimeInSeconds - elapsedTime;
   const hoursLeft = totalTimeInSeconds >= 3600 ? Math.floor(timeLeftInSeconds / 3600) : 0;
   const milisecondsLeft = (totalTimeInSeconds > elapsedTime) ? (timeLeftInSeconds - Math.floor(timeLeftInSeconds)).toFixed(2) : 0;
   const decimalConverter = ((value) => (value % 1) * 1000);
   const progressInPercent = (timeLeftInSeconds / totalTimeInSeconds) * 100;
   const [minutesLeft, secondsLeft] = getMinutesAndSecondsFromDuractionInSeconds(hoursLeft, timeLeftInSeconds);

   useEffect(() => {
      let totalTimeInSeconds = totalTimeInMinutes * 60;
      if (timeRunning) {
         intervalId.current = window.setInterval(() => {
            
            dispatch(setElapsedTime(elapsedTime))
            if (totalTimeInSeconds < elapsedTime) {
               dispatch(resetTimer());
               dispatch(elapsetTimeReset())
            }
         }, 10);
      }
      return () => window.clearInterval(intervalId.current);
   }, [elapsedTime, totalTimeInMinutes, timeRunning, dispatch])

   const handleStop = () => {
      dispatch(resetTimer())
      window.clearInterval(intervalId.current);
   };

   const togglePause = () => {
      dispatch(setPausesCount(currentPause))
      currentPause ? dispatch(stopTimer()) : dispatch(startTimer());
      dispatch(setPause(currentPause))
   };

   return (
      <div className={`CurrentTimebox`}>
         <h1>{title}</h1>
         { (title !== null && totalTimeInMinutes !== null) ?
            <>
               pozostało: 
               <Clock
                  className={timePaused ? 'inactive' : ''}
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
                  className={timePaused ? 'inactive' : ''}
                  borderBlue={true}
                  barColor="blue"
                  isBig={true} 
                  percent={progressInPercent}
                  trackRemaining={false}
               />
            </> : 
            <h1>ZACZNIJ ZADANIE</h1>
         }
         <button className={`CurrentTimebox__buttons`} onClick={() => dispatch(startTimer())} disabled={timeRunning || timePaused || totalTimeInMinutes === null}>Start</button>
         <button className={`CurrentTimebox__buttons`} onClick={handleStop} disabled={!timeRunning}>Reset</button>
         <button className={`CurrentTimebox__buttons`} onClick={togglePause} disabled={!timeRunning && pausesCount === 0}>{timePaused ? '\u25B6' : 'II'}</button>
         <button className={`CurrentTimebox__buttons`} onClick={() => dispatch(resetCurrentTimebox())} >Zakończ</button>
         <p>liczba przerw: {pausesCount}</p>
      </div>
   )
}

const mapStateToProps = state => {
   const currentTimebox = getCurrentTimebox(state);
   console.log(currentTimebox, state)
   return {
      title: currentTimebox ? currentTimebox.title : null,
      totalTimeInMinutes: currentTimebox ? currentTimebox.totalTimeInMinutes : null
   }
}

export default connect(mapStateToProps)(CurrentTimebox);