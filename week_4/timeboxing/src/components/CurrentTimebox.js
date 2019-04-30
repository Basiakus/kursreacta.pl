import React from 'react';
import Clock from './ProgressBar';
import ProgressBar from './ProgressBar';

function CurrentTimebox(props) {
   const { title,
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
   } = props;

   const totalTimeInSeconds = totalTimeInMinutes * 60;
   const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
   const hoursLeft = totalTimeInSeconds >= 3600 ? Math.floor(timeLeftInSeconds / 3600) : 0;
   const minutesLeft = hoursLeft == 0 ? Math.floor(timeLeftInSeconds / 60) : Math.floor(((timeLeftInSeconds - hoursLeft * 3600) / 60));
   const secondsLeft = Math.floor(timeLeftInSeconds % 60);
   const milisecondsLeft = ((timeLeftInSeconds) - Math.floor(timeLeftInSeconds)).toFixed(2);
   const decimalConverter = (value) => (value % 1) * 1000;
   const progressInPercent = (timeLeftInSeconds / totalTimeInSeconds) * 100;
   return (
      <div className={`CurrentTimebox ${isEditable ? 'inactive' : ""}`}>
         <h1>{title}</h1>
         <Clock className={isPaused ? 'inactive' : ''} hours={hoursLeft} minutes={minutesLeft} seconds={secondsLeft} miliseconds={decimalConverter(milisecondsLeft)} />
         <ProgressBar className={isPaused ? 'inactive' : ''} percent={progressInPercent} trackRemaining={false} />
         <button onClick={handleStart} disabled={isRunning}>Start</button>
         <button onClick={handleStop} disabled={!isRunning}>Stop</button>
         <button onClick={togglePause} disabled={!isRunning}>{isPaused ? 'Wznów' : 'Pauzuj'}</button>
         <button onClick={handleEdit} disabled={isEditable}>Edytuj</button>
         liczba przerw: {pausesCount}
      </div>
   )
}

export default CurrentTimebox;