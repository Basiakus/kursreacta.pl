import React from 'react';
import TimeboxEditor from './TimeboxEditor';
import CurrentTimebox from './CurrentTimebox';
//import '../styles/components/EditableTimebox.scss';

class EditableTimebox extends React.Component {
   state = {
      title: 'Nauka reacta',
      totalTimeInMinutes: .2,
      isRunning: false,
      isPaused: false,
      elapsedTimeInSeconds: 0,
      pausesCount: 0,
      isEditable: true
   }
   handleTitleOnChange = (event) => {
      this.setState({ title: event.target.value });
   }
   handleTotalTimeInMinutesOnChange = (event) => {
      let inputValue = event.target.value;
      this.setState({ totalTimeInMinutes: inputValue });
   }
   startTimer = () => {
      this.intervalId = window.setInterval(
         () => {
            let totalTimeInSeconds = this.state.totalTimeInMinutes * 60;
            if (totalTimeInSeconds < this.state.elapsedTimeInSeconds) return window.clearInterval(this.intervalId);
            this.setState(
               (prevState) => ({ elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.01 })
            )
         }, 10
      )
   }
   stopTimer = () => {
      window.clearInterval(this.intervalId);
   }
   handleStart = (e) => {
      this.setState({
         isRunning: true
      });
      this.startTimer();
   }
   handleStop = (e) => {
      this.setState({
         isRunning: false,
         isPaused: false,
         pausesCount: 0,
         elapsedTimeInSeconds: 0
      })
      this.stopTimer();
   }
   togglePause = () => {
      this.setState(
         (prevState) => {
            const isPaused = !prevState.isPaused;
            isPaused ? this.stopTimer() : this.startTimer();
            return {
               isPaused,
               pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
            }
         }
      )
   }
   handleConfirm = () => {
      this.setState({
         isEditable: false
      })
   }
   handleEdit = () => {
      this.setState({
         isEditable: true
      })
   }
   prettyDir = () => {
      console.log(this.state);
   }
   render() {
      const { title, totalTimeInMinutes, isRunning, isPaused, elapsedTimeInSeconds, pausesCount, isEditable } = this.state;
      this.prettyDir();
      return (
         <React.Fragment>
            <TimeboxEditor
               title={title}
               totalTimeInMinutes={totalTimeInMinutes}
               handleTitleOnChange={this.handleTitleOnChange}
               handleTotalTimeInMinutesOnChange={this.handleTotalTimeInMinutesOnChange}
               handleStart={this.handleStart}
               isEditable={isEditable}
               onConfirm={this.handleConfirm}
            />
            <CurrentTimebox
               title={title}
               totalTimeInMinutes={totalTimeInMinutes}
               isRunning={isRunning}
               isPaused={isPaused}
               pausesCount={pausesCount}
               elapsedTimeInSeconds={elapsedTimeInSeconds}
               handleStart={this.handleStart}
               handleStop={this.handleStop}
               togglePause={this.togglePause}
               isEditable={isEditable}
               handleEdit={this.handleEdit}
            />
         </React.Fragment>
      )
   }
}
export default EditableTimebox;