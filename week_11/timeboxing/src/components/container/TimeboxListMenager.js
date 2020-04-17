import React, { useContext, useEffect, useRef, useReducer } from 'react';
//import Timebox from './Timebox';
import TimeboxCreator from '../TimeboxCreator';
import TimeboxEditor from '../TimeboxEditor';
import TimeboxList from '../presentation/TimeboxList';
import Error from '../Error';
import axiosTimeboxesApi from '../../api/axiosTimeboxesApi';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import { timeboxesReducer } from '../../reducers/timeboxesReducer.js';
const timeboxesApi = axiosTimeboxesApi('http://localhost:4000/timeboxes/'); 
const Timebox = React.lazy(() => import('../Timebox'));
const ReadOnlyTimebox = React.lazy(() => import('../ReadOnlyTimebox'));

function TimeboxListMenager() {

   let inputRef = useRef();
   let context = useContext(AuthenticationContext);
   const [state, dispatch] = useReducer(timeboxesReducer, undefined, timeboxesReducer);
   /* const [timeboxes, setTimeboxes] = useState([]);
   const [hasError, setHasError] = useState(false);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [editIndex, setEditIndex] = useState(null) */

   useEffect(() => {
      timeboxesApi.getAllTimeboxes(context.accessToken)
         .then((timeboxes) => dispatch({ type: "TIMEBOXES_LOAD", timeboxes}))
         .catch((error) => Promise.reject(dispatch({type: "ERROR_SET", error})))
         .finally(() => dispatch({type: "LOADING_SET"})) 
   }, [context.accessToken])
   
   const searchingTimeboxes = (inputReference) => {
      timeboxesApi.getTimeboxesByFullTextSearch(inputReference, context.accessToken)
         .then((searchTimeboxes) => dispatch({ type: "TIMEBOXES_SEARCH", searchTimeboxes}) 
      )
   }

   const addTimebox = (newTimebox) => {
      timeboxesApi.addTimebox(newTimebox, context.accessToken).then(
         (addedTimebox) => dispatch({ type: "TIMEBOX_ADD", timebox: addedTimebox})
      )
   }
   const handleCreate = (createdTimebox) => {
         try {
            addTimebox(createdTimebox);
         }
         catch(error) {
            dispatch({error: true});
         } 
   }

   const removeTimebox = (timeboxToRemove) => {
      console.log(timeboxToRemove)
      const index = timeboxToRemove - 1;
      console.log(state.timeboxes[index])
      timeboxesApi.removeTimebox(state.timeboxes[index], context.accessToken)
         .then(
            () => {
               dispatch({ type: 'TIMEBOX_DELETE', timeboxToRemove})
            }
         )
   }

   const updateTimebox = (timeboxToUpdate) => {
      timeboxesApi.partiallyUpdateTimebox(timeboxToUpdate, context.accessToken).then(
         (updatedTimebox) => {
            dispatch({ type: "TIMEBOX_UPDATE", updatedTimebox})
         }
      )
   }
   const renderTimebox = (timebox) => {
      return <>
         {
            state.currentTimeboxId === timebox.id ?
            <TimeboxEditor 
               inicialTitle={timebox.title}
               inicialTotalTimeInMinutes={timebox.totalTimeInMinutes}
               inicialFlag={timebox.flag}
                  onCancel={() => dispatch({ type: 'TIMEBOX_EDIT_STOP'})}
               onUpdate={
                  (updatedTimebox) => {
                     updateTimebox({...timebox, ...updatedTimebox});
                     dispatch({ type: 'TIMEBOX_EDIT_STOP' });
                  }
               }
            /> :
            <Timebox
               id={timebox.id}
               title={timebox.title}
               flag={timebox.flag}
               totalTimeInMinutes={timebox.totalTimeInMinutes}
               onEdit={() => dispatch({ type: 'TIMEBOX_EDIT_START', currentTimeboxId: timebox.id})}
               onDelete={() => removeTimebox(timebox.id)}
            />
         }
      </>
   }

   const renderReadOnlyTimebox = (timebox) => {
      return <ReadOnlyTimebox
         id={timebox.id}
         title={timebox.title}
         flag={timebox.flag}
         totalTimeInMinutes={timebox.totalTimeInMinutes}
      />
   }

   return (
      <> 
         {
            state.hasError ? 
               <h1>emulacja błędu metody addTimebox</h1> : 
               <TimeboxCreator
                  onCreate={handleCreate} 
               />
         }
         {state.loading ? 'Pobieranie listy timeboxów . . .' : null}
         {state.error ? 'nie udało sie pobrać timeboxów ;(' : null}
         {<label>szukaj wg. tekstu :<input ref={inputRef} onChange={() => { searchingTimeboxes(inputRef.current.value)}} /></label>}
         <Error message='Wystąpił błąd w TimeboxList'>
            <TimeboxList timeboxes={state.timeboxes} renderTimebox={renderTimebox} renderReadOnlyTimebox={renderReadOnlyTimebox}/>
         </Error>
      </>
   )
}

//TimeboxList.contextType = AuthenticationContext;

export default TimeboxListMenager;