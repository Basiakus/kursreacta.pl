import React from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import '../styles/components/CurrentTimebox.scss';

class CurrentTimebox extends React.Component {


   componentWillUnmount() {
      console.log(`CurrentTimebox component will unmount`);
      this.props.handleStop();
   }
   componentWillMount() {
      console.log(`CurrentTimebox component will mount`);
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
      const minutesLeft = hoursLeft === 0 ? Math.floor(timeLeftInSeconds / 60) : Math.floor(((timeLeftInSeconds - hoursLeft * 3600) / 60));
      const secondsLeft = Math.floor(timeLeftInSeconds % 60);
      const milisecondsLeft = (totalTimeInSeconds > elapsedTimeInSeconds) ? (timeLeftInSeconds - Math.floor(timeLeftInSeconds)).toFixed(2) : 0;
      const decimalConverter = ((value) => (value % 1) * 1000);
      const progressInPercent = (timeLeftInSeconds / totalTimeInSeconds) * 100;
      return (
         <div className={`CurrentTimebox ${isEditable ? 'inactive' : ""}`}>
            <h1>{title}</h1>
            pozostało: <Clock
               className={isPaused ? 'inactive' : ''}
               hours={hoursLeft}
               hoursColor="default"
               minutes={minutesLeft}
               minutesColor="blue"
               seconds={secondsLeft}
               secondsColor="green"
               miliseconds={decimalConverter(milisecondsLeft)}
               milisecondsColor="red"
               separatorColor="red"
            />
            <ProgressBar
               className={isPaused ? 'inactive' : ''}
               borderBlue={true}
               barColor="green"
               isBig={true} percent={progressInPercent}
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