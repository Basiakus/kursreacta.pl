import React from 'react';
import Timebox from './Timebox';
import TimeboxCreator from './TimeboxCreator';
import Error from './Error';
import axiosTimeboxesApi from '../api/axiosTimeboxesApi';
const timeboxesApi = axiosTimeboxesApi('http://localhost:4000/timeboxes/');


class TimeboxList extends React.Component {
   constructor(props) {
      super(props);
      this.inputRef = React.createRef();
   }
   state = {
      "timeboxes": [],
      "hasError": false,
      "loading": true,
      "error": null
   }

   componentDidMount() {
      timeboxesApi.getAllTimeboxes()
      .then( (timeboxes) => this.setState({ timeboxes }))
      .catch( (error) => Promise.reject(this.setState({error} )))
      .finally( () => this.setState({loading : false }) ) 
   }
   
   searchingTimeboxes = (inputReference) => {
      timeboxesApi.getTimeboxesByFullTextSearch(inputReference)
         .then((searchTimeboxes) => this.setState(prevState => {
            let newTimeboxes = [...prevState.timeboxes];
            newTimeboxes = searchTimeboxes;
            return { timeboxes: newTimeboxes }
         }) 
      )
   }

   addTimebox = (newTimebox) => {
      timeboxesApi.addTimebox(newTimebox).then(
         (addedTimebox) => this.setState(prevState => {
            /* new array of state with new timebox */
            const timeboxes = [...prevState.timeboxes, addedTimebox];
            return { timeboxes }
         })
      )
   }
   handleCreate = (createdTimebox) => {
         try {
            this.addTimebox(createdTimebox);
         }
         catch(error) {
            this.setState({ hasError: true });
            //console.log(` metoda addTimebox nie działa`);
         } 
   }

   removeTimebox = (indexToRemove) => {
      timeboxesApi.removeTimebox(this.state.timeboxes[indexToRemove])
         .then(
            () => {
               this.setState(prevState => {
                  // const newTimebox = prevState.timeboxes;
                  //const newTimeboxes = newTimebox.slice(0, indexToRemove).concat(newTimebox.slice(indexToRemove + 1, newTimebox.length)); 
                  const newTimeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
                  return { timeboxes: newTimeboxes }
               })
            }
         )
   }

   updateTimebox = (indexToUpdate, timeboxToUpdate) => {
      timeboxesApi.partiallyUpdateTimebox(timeboxToUpdate).then(
         (updatedTimebox) => {
            this.setState(prevState => {
               /* new array of state with new timebox */
               const newTimeboxes = [...prevState.timeboxes];
               newTimeboxes[indexToUpdate] = updatedTimebox;
               //const newTimeboxes = prevState.timeboxes.map((timebox, index) => index === indexToUpdate ? updatedTimebox : timebox);
               return { timeboxes: newTimeboxes }
            })
         }
         
      )
   }
   
   render() {
      const { timeboxes, hasError } = this.state;
      return (
         <> 
            {
              hasError ? <h1>emulacja błędu metody addTimebox</h1> : <TimeboxCreator onCreate={this.handleCreate} />
            }
            {this.state.loading ? 'Pobieranie listy timeboxów . . .' : null}
            {this.state.error ? 'nie udało sie pobrać timeboxów ;(' : null}
            {<label>szukaj wg. tekstu :<input ref={this.inputRef} onChange={() => { this.searchingTimeboxes(this.inputRef.current.value)}} /></label>}
            <Error message='Wystąpił błąd w TimeboxList'>
               {
                  timeboxes.map((timebox, index) =>
                     (
                        <Error key={timebox.id} message='Wystąpił błąd w Timebox'>
                           <Timebox
                              id={timebox.id}
                              index={index}
                              title={timebox.title}
                              flag={timebox.flag}
                              totalTimeInMinutes={timebox.totalTimeInMinutes}
                              onEdit={this.updateTimebox}
                              onDelete={() => this.removeTimebox(index)}
                           />
                        </Error>
                     )
                  )
               }
            </Error>
         </>
      )
   }
}

export default TimeboxList;