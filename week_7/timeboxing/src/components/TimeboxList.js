import React from 'react';
import uuid from 'uuid';
import Timebox from './Timebox';
import TimeboxCreator from './TimeboxCreator';
import Error from './Error';
const timeboxes = [
   {
      "id":"1",
      "title": "Week 1 introduction",
      "totalTimeInMinutes": 25,
      "flag": "blue"
   },
   {
      "id": "2",
      "title": "week 2 componens of react",
      "totalTimeInMinutes": 35,
      "flag": "blue"
   },
   {
      "id": "3",
      "title": "week 3 lists and forms",
      "totalTimeInMinutes": 30,
      "flag": "Blue"
   }
]
const timeboxesApi = {
   getAllTimeboxes: async function() {
      //throw new Error('coś nie tak');
      await wait(3000);
      return [...timeboxes];
   },
   addTimebox: async function(timeboxToAdd) {
      await wait(1000);
      const addedTimebox = {...timeboxToAdd, id: uuid.v4()};
      timeboxes.push(addedTimebox)
      return addedTimebox;
   },
   replaceTimebox: async function(timeboxToUpdate) {
      if (!timeboxToUpdate.id) {
         throw new Error('timebox nie ma id');
      }
   }
}
const wait = (ms = 1000) => {
   return new Promise( (resolve) => setTimeout(resolve, ms) );
}

class TimeboxList extends React.Component {
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
      this.setState(prevState => {
         /* new array of state with new timebox */

         /* const newTimebox = prevState.timeboxes;
         const newTimeboxes = newTimebox.slice(0, indexToRemove).concat(newTimebox.slice(indexToRemove + 1, newTimebox.length)); */
         const newTimeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
         return { timeboxes: newTimeboxes }
      })
   }

   updateTimebox = (indexToUpdate, updatedTimebox) => {
      timeboxesApi.replaceTimebox(updatedTimebox).then(
         this.setState(prevState => {
            /* new array of state with new timebox */
            const newTimeboxes = [...prevState.timeboxes];
            newTimeboxes[indexToUpdate] = updatedTimebox;
            //const newTimeboxes = prevState.timeboxes.map((timebox, index) => index === indexToUpdate ? updatedTimebox : timebox);
            return { timeboxes: newTimeboxes }
         })
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