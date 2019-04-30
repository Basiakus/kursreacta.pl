import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

/* Funcional components */
function Clock({ hours = 0, minutes = 0, seconds = 0, miliseconds = 0, className = '' }) {
   const msConverter = (miliseconds) => {
      miliseconds = miliseconds / 10;
      return miliseconds < 10 ? `0${miliseconds}` : miliseconds;
   }
   const secConverter = (seconds) => {
      if (seconds < 0) {
         return '00';
      } else if (seconds < 10) {
         return `0${seconds}`
      } else if (seconds >= 10 && seconds < 60) {
         return `${seconds}`
      } else if (seconds >= 60) {
         return '59'
      }
   }
   const minConverter = (minutes) => {
      if (minutes < 0) {
         return '00';
      } else if (minutes < 10) {
         return `0${minutes}`
      } else if (minutes >= 10 && minutes < 60) {
         return `${minutes}`
      } else if (minutes >= 60) {
         return '59'
      }
   }
   const hConverter = (hours) => {
      if (hours < 0) {
         return '00';
      } else if (hours < 10) {
         return `0${hours}`
      } else if (hours >= 10 && hours < 24) {
         return `${hours}`
      } else if (hours >= 24) {
         return '23';
      }
   }
   return <h2 className={`Clock ${className}`}>
      {
         `Pozostało ${hConverter(hours)}:${minConverter(minutes)}:${secConverter(seconds)}.${msConverter(miliseconds)}`
      }
   </h2>
}

function ProgressBar({ percent = 0, trackRemaining, className }) {
   return (
      <div
         className={`ProgressBar ${className}`}
         style={{
            background: (trackRemaining ?
               `linear-gradient(orangered, orangered) right /${percent}% no-repeat content-box` :
               `linear-gradient(orangered, orangered) left /${percent}% no-repeat content-box`
            )
         }}
      >
      </div>
   )
}

function App() {
   return (
      <div className="App">
         <TimeboxList />
         <EditableTimebox />
      </div>
   )
}
class EditableTimebox extends React.Component {
   state = {
      title: 'Nauka reacta',
      totalTimeInMinutes: 34,
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
   render() {
      const { title, totalTimeInMinutes, isRunning, isPaused, elapsedTimeInSeconds, pausesCount, isEditable } = this.state;
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

function TimeboxEditor(props) {
   const {
      title,
      totalTimeInMinutes,
      handleTitleOnChange,
      handleTotalTimeInMinutesOnChange,
      handleStart,
      isEditable,
      onConfirm
   } = props;
   return (
      <div className={`TimeboxEditor ${isEditable ? '' : 'inactive'}`}>
         <label>Co robisz?<input type="text" onChange={handleTitleOnChange} value={title} disabled={!isEditable} /></label><br />
         <label>Ile minut?<input type="number" onChange={handleTotalTimeInMinutesOnChange} value={totalTimeInMinutes} disabled={!isEditable} /></label><br />
         <button onClick={handleStart} disabled={!isEditable} >Zacznij</button>
         <button onClick={onConfirm} disabled={!isEditable}>Zatwierdź zmiany</button>
      </div>
   )
}

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

class TimeboxCreator extends React.Component {
   constructor(props) {
      super(props);
      this.formRef = React.createRef();
   }
   handleSubmit = (event) => {
      event.preventDefault();
      //console.log(this.formRef.current[0]) 
      this.props.onCreate({
         id: uuid.v4(),
         title: this.formRef.current[0].value === "" ? "brak" : this.formRef.current[0].value,
         totalTimeInMinutes: this.formRef.current[1].value === '' ? 0 : this.formRef.current[1].value
      });
   }
   render() {
      return (
         <form onSubmit={this.handleSubmit} className='TimeboxCreator' ref={this.formRef}>
            <label>Co robisz?<input type="text" /></label><br />
            <label>Ile minut?<input type="number" /></label><br />
            <button >Dodaj Timebox</button>
         </form>
      )
   }
}

class TimeboxList extends React.Component {
   state = {
      timeboxes: [
         {
            id: uuid.v4(),
            title: 'Week 1 introduction',
            totalTimeInMinutes: 25
         },
         {
            id: uuid.v4(),
            title: "week 2 componens of react",
            totalTimeInMinutes: 35
         },
         {
            id: uuid.v4(),
            title: "week 3 lists and forms",
            totalTimeInMinutes: 30
         }
      ]
   }
   addTimebox = (newTimebox) => {
      this.setState(prevState => {
         /* new array of state with new timebox */
         const newTimeboxes = [...prevState.timeboxes];
         newTimeboxes.unshift(newTimebox);
         //const newTimeboxes = [newTimebox, ...prevState.timeboxes];
         return { timeboxes: newTimeboxes }
      })
   }
   handleCreate = (createdTimebox) => this.addTimebox(createdTimebox);

   removeTimebox = (indexToRemove) => {
      this.setState(prevState => {
         /* new array of state with new timebox */

         /* const newTimebox = prevState.timeboxes;
         const newTimeboxes = newTimebox.slice(0, indexToRemove).concat(newTimebox.slice(indexToRemove + 1, newTimebox.length)); */
         const newTimeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
         return { timeboxes: newTimeboxes }
      })
   }

   updateTimebox = (indexToUpdate, updatedTimebox) => {
      this.setState(prevState => {
         /* new array of state with new timebox */

         const newTimeboxes = [...prevState.timeboxes];
         newTimeboxes[indexToUpdate] = updatedTimebox;
         //const newTimeboxes = prevState.timeboxes.map((timebox, index) => index === indexToUpdate ? updatedTimebox : timebox);
         return { timeboxes: newTimeboxes }
      })
   }
   render() {
      const { timeboxes } = this.state;
      return (
         <>
            <TimeboxCreator onCreate={this.handleCreate} />
            {timeboxes.map((timebox, index) =>
               (
                  <Timebox
                     key={timebox.id}
                     index={index}
                     title={timebox.title}
                     totalTimeInMinutes={timebox.totalTimeInMinutes}
                     //onEdit={ () => this.updateTimebox(index, {...timebox, title: "Zedytowano"}) }
                     onEdit={this.updateTimebox}
                     onDelete={() => this.removeTimebox(index)}
                  />
               )
            )}
         </>
      )
   }
}
class Timebox extends React.Component {
   state = {
      isEditActive: false
   }
   handleIsEditActive = () => {
      this.setState({ isEditActive: !this.state.isEditActive });
   }
   render() {
      const { onDelete, title, totalTimeInMinutes } = this.props;
      return (
         <div className='Timebox'>
            <TimeboxEditer
               key={uuid.v4()}
               title={this.props.title}
               totalTimeInMinutes={this.props.totalTimeInMinutes}
               index={this.props.index}
               onEdit={this.props.onEdit}
               isEdit={this.state.isEditActive}
               handleIsEdit={this.handleIsEditActive}
            />
            <h3>
               Zadanie: {title} - {totalTimeInMinutes}min.
                  </h3>
            <button onClick={onDelete}>Delete</button>
            <button onClick={this.handleIsEditActive}>Edit</button>
         </div>
      )
   }
}
class TimeboxEditer extends React.Component {
   state = {
      title: this.props.title,
      totalTimeInMinutes: this.props.totalTimeInMinutes
   }
   handleTitleOnChange = (event) => {
      console.log(event.target.value)
      this.setState({ title: event.target.value });
   }
   handleTimeOnChange = (event) => {
      console.log(event.target.value)
      this.setState({ totalTimeInMinutes: event.target.value });
   }
   handleSubmitForm = (event) => {
      event.preventDefault();
      this.props.onEdit(this.props.index, { id: uuid.v4(), title: this.state.title, totalTimeInMinutes: this.state.totalTimeInMinutes });
   }
   render() {
      const { index, title, totalTimeInMinutes, onEdit, isEdit, handleIsEdit } = this.props;
      return (
         <div className={`TimeboxEditer ${isEdit ? '' : 'unactive'}`}>
            <form onSubmit={this.handleSubmitForm}>
               <label>Zadanie: <input type="text" onChange={this.handleTitleOnChange} defaultValue={title} /></label>
               <label>min: <input type="number" onChange={this.handleTimeOnChange} defaultValue={totalTimeInMinutes} /></label>
               <button type="submit">edytuj</button>
               <button onClick={handleIsEdit}>anuluj</button>
            </form>
         </div>
      )
   }
}
/* Elements from DOM */
const rootElement = document.getElementById("root");

/* Render funcional components to virtualDOM */
ReactDOM.render(<App />, rootElement);