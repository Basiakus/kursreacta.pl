import React from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import ProgressArc from './ProgressArc';
import ProgressBarJui from './ProgressBarJui';
import { getMinutesAndSecondsFromDuractionInSeconds } from '../lib/time.js';

import '../styles/components/CurrentTimebox.scss';

class CurrentTimebox extends React.Component {


   componentWillUnmount() {
      //console.log(`CurrentTimebox component will unmount`);
      this.props.handleStop();
   }
   componentWilllMount() {
      //console.log(`CurrentTimebox component will mount`);
      this.props.handleStop();
   }
   render() {
      const {
         title,
         totalTimeInMinutes,
         isRunning,
         isPaused,
         pausesCount,
         elapsedTimeInSeconds,
         handleStart,
         handleStop,
         togglePause,
         isEditable,
         handleEdit
      } = this.props;

      const totalTimeInSeconds = totalTimeInMinutes * 60;
      const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
      const hoursLeft = totalTimeInSeconds >= 3600 ? Math.floor(timeLeftInSeconds / 3600) : 0;
      const milisecondsLeft = (totalTimeInSeconds > elapsedTimeInSeconds) ? (timeLeftInSeconds - Math.floor(timeLeftInSeconds)).toFixed(2) : 0;
      const decimalConverter = ((value) => (value % 1) * 1000);
      const progressInPercent = (timeLeftInSeconds / totalTimeInSeconds) * 100;
      const [minutesLeft, secondsLeft] = getMinutesAndSecondsFromDuractionInSeconds(hoursLeft, timeLeftInSeconds);
      return (
         <div className={`CurrentTimebox ${isEditable ? 'inactive' : ""}`}>
            <h1>{title}</h1>
            pozostało: 
            <ProgressArc canvasSize={80} percent={progressInPercent} />
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
            {/* <Clock hoursColor={'blue'} hours={12} seconds={32} minutes={21} miliseconds={100}/> */}
            <ProgressBar
               className={isPaused ? 'inactive' : ''}
               borderBlue={true}
               barColor="blue"
               isBig={true} 
               percent={progressInPercent}
               trackRemaining={false}
            />
            <ProgressBarJui
               className={isPaused ? 'inactive' : ''}
               borderBlue={true}
               barColor="green"
               isBig={true}
               percent={progressInPercent}
               trackRemaining={false}
            />
            <button onClick={handleStart} disabled={isRunning}>Start</button>
            <button onClick={handleStop} disabled={!isRunning}>Stop</button>
            <button onClick={togglePause} disabled={!isRunning}>{isPaused ? 'Wznów' : 'Pauzuj'}</button>
            <button onClick={handleEdit} disabled={isEditable}>Edytuj</button>
            liczba przerw: {pausesCount}
         </div>
      )
   }
}

export default CurrentTimebox;