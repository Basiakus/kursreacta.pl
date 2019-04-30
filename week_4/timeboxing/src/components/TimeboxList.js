import React from 'react';
import uuid from 'uuid';
import Timebox from './Timebox';
import TimeboxCreator from './TimeboxCreator';

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

export default TimeboxList;