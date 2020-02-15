import React, { Suspense, useState, useContext, useEffect, useRef } from 'react';
//import Timebox from './Timebox';
import TimeboxCreator from './TimeboxCreator';
import Error from './Error';
import axiosTimeboxesApi from '../api/axiosTimeboxesApi';
import AuthenticationContext from '../contexts/AuthenticationContext';
const timeboxesApi = axiosTimeboxesApi('http://localhost:4000/timeboxes/'); 
const Timebox = React.lazy(() => import('./Timebox'));


function TimeboxList() {
   let inputRef = useRef();
   let context = useContext(AuthenticationContext)
   const [timeboxes, setTimeboxes] = useState([]);
   const [hasError, setHasError] = useState(false);
   const [loading, setLoading] = useState(true) ;
   const [error, setError] = useState(null) ;

   useEffect(() => {
      timeboxesApi.getAllTimeboxes(context.accessToken)
         .then((timeboxes) => setTimeboxes(timeboxes))
         .catch((error) => Promise.reject(setError(error)))
         .finally(() => setLoading(false)) 
   }, [])
   /* componentDidMount() {
      console.log(this)
      timeboxesApi.getAllTimeboxes(context.accessToken)
      .then( (timeboxes) => this.setState({ timeboxes }) )
      .catch( (error) => Promise.reject(this.setState({error})) )
      .finally( () => this.setState({loading : false }) ) 
   } */
   
   const searchingTimeboxes = (inputReference) => {
      console.log(inputRef.current.value)
      timeboxesApi.getTimeboxesByFullTextSearch(inputReference, context.accessToken)
         .then((searchTimeboxes) => setTimeboxes(prevState => {
            let newTimeboxes = [...prevState];
            newTimeboxes = searchTimeboxes;
            return newTimeboxes; 
         }) 
      )
   }

   const addTimebox = (newTimebox) => {
      timeboxesApi.addTimebox(newTimebox, context.accessToken).then(
         (addedTimebox) => setTimeboxes(prevState => {
            /* new array of state with new timebox */
            const timeboxes = [...prevState, addedTimebox];
            return  timeboxes; 
         })
      )
   }
   const handleCreate = (createdTimebox) => {
         try {
            addTimebox(createdTimebox);
         }
         catch(error) {
           setHasError(true);
         } 
   }

   const removeTimebox = (indexToRemove) => {
      timeboxesApi.removeTimebox(timeboxes[indexToRemove], context.accessToken)
         .then(
            () => {
               setTimeboxes(prevState => {
                  // const newTimebox = prevState.timeboxes;
                  //const newTimeboxes = newTimebox.slice(0, indexToRemove).concat(newTimebox.slice(indexToRemove + 1, newTimebox.length)); 
                  const newTimeboxes = prevState.filter((timebox, index) => index !== indexToRemove);
                  return newTimeboxes;
               })
            }
         )
   }

   const updateTimebox = (indexToUpdate, timeboxToUpdate) => {
      timeboxesApi.partiallyUpdateTimebox(timeboxToUpdate, context.accessToken).then(
         (updatedTimebox) => {
            setTimeboxes(prevState => {
               /* new array of state with new timebox */
               const newTimeboxes = [...prevState];
               newTimeboxes[indexToUpdate] = updatedTimebox;
               //const newTimeboxes = prevState.timeboxes.map((timebox, index) => index === indexToUpdate ? updatedTimebox : timebox);
               return newTimeboxes;
            })
         }
         
      )
   }
   
   return (
      <> 
         {
            hasError ? <h1>emulacja błędu metody addTimebox</h1> : <TimeboxCreator onCreate={handleCreate} />
         }
         {loading ? 'Pobieranie listy timeboxów . . .' : null}
         {error ? 'nie udało sie pobrać timeboxów ;(' : null}
         {<label>szukaj wg. tekstu :<input ref={inputRef} onChange={() => { searchingTimeboxes(inputRef.current.value)}} /></label>}
         <Error message='Wystąpił błąd w TimeboxList'>
            {
               timeboxes.map((timebox, index) =>
                  (
                     <Error key={timebox.id} message='Wystąpił błąd w Timebox'>
                        <Suspense fallback="... timebox loading">
                           <Timebox
                              id={timebox.id}
                              index={index}
                              title={timebox.title}
                              flag={timebox.flag}
                              totalTimeInMinutes={timebox.totalTimeInMinutes}
                              onEdit={updateTimebox}
                              onDelete={() => removeTimebox(index)}
                           />
                        </Suspense>
                     </Error>
                  )
               )
            }
         </Error>
      </>
   )
}

//TimeboxList.contextType = AuthenticationContext;

export default TimeboxList;