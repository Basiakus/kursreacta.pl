import React, { useContext, useEffect, useRef, useReducer } from 'react';
//import Timebox from './Timebox';
import TimeboxCreator from '../TimeboxCreator';
import TimeboxEditor from '../TimeboxEditor';
import TimeboxList from '../presentation/TimeboxList';
import Error from '../Error';
import axiosTimeboxesApi from '../../api/axiosTimeboxesApi';
import AuthenticationContext from '../../contexts/AuthenticationContext';
const timeboxesApi = axiosTimeboxesApi('http://localhost:4000/timeboxes/'); 
const Timebox = React.lazy(() => import('../Timebox'));
const ReadOnlyTimebox = React.lazy(() => import('../ReadOnlyTimebox'));

const stateReducer = (prevState, stateChanges) => {

   let newState = prevState;

   if (typeof stateChanges === "function") {
      newState = stateChanges(prevState);
   } else {
      newState = {
         ...prevState,
         ...stateChanges
      }
   }
   return newState
}

function TimeboxListMenager() {

   const inicialState = {
      timeboxes: [],
      hasError: false,
      loading: true,
      error: null,
      editIndex: null
   };

   let inputRef = useRef();
   let context = useContext(AuthenticationContext);
   const [state, setState] = useReducer(stateReducer, inicialState);
   /* const [timeboxes, setTimeboxes] = useState([]);
   const [hasError, setHasError] = useState(false);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [editIndex, setEditIndex] = useState(null) */

   useEffect(() => {
      timeboxesApi.getAllTimeboxes(context.accessToken)
         .then((timeboxes) => setState({timeboxes}))
         .catch((error) => Promise.reject(setState({error})))
         .finally(() => setState({loading: false})) 
   }, [context.accessToken])
   
   const searchingTimeboxes = (inputReference) => {
      timeboxesApi.getTimeboxesByFullTextSearch(inputReference, context.accessToken)
         .then((searchTimeboxes) => setState(prevState => {
            let timeboxes = [...prevState.timeboxes];
            timeboxes = searchTimeboxes;
            console.log('searched timeboxes from manager: ', timeboxes, typeof timeboxes);
            return { timeboxes}; 
         }) 
      )
   }

   const addTimebox = (newTimebox) => {
      timeboxesApi.addTimebox(newTimebox, context.accessToken).then(
         (addedTimebox) => setState(prevState => {
            /* new array of state with new timebox */
            const timeboxes = [...prevState.timeboxes, addedTimebox];
            return  {timeboxes}; 
         })
      )
   }
   const handleCreate = (createdTimebox) => {
         try {
            addTimebox(createdTimebox);
         }
         catch(error) {
            setState({error: true});
         } 
   }

   const removeTimebox = (indexToRemove) => {
      timeboxesApi.removeTimebox(state.timeboxes[indexToRemove], context.accessToken)
         .then(
            () => {
               setState(prevState => {
                  // const newTimebox = prevState.timeboxes;
                  //const newTimeboxes = newTimebox.slice(0, indexToRemove).concat(newTimebox.slice(indexToRemove + 1, newTimebox.length)); 
                  const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
                  return {timeboxes};
               })
            }
         )
   }

   const updateTimebox = (indexToUpdate, timeboxToUpdate) => {
      timeboxesApi.partiallyUpdateTimebox(timeboxToUpdate, context.accessToken).then(
         (updatedTimebox) => {
            setState(prevState => {
               /* new array of state with new timebox */
               let timeboxes = [prevState.timeboxes];
               timeboxes[indexToUpdate] = updatedTimebox;
               //const newTimeboxes = prevState.timeboxes.map((timebox, index) => index === indexToUpdate ? updatedTimebox : timebox);
               return {timeboxes};
            })
         }
      )
   }
   const renderTimebox = (timebox, index) => {
      return <>
         {
            state.editIndex === index ?
            <TimeboxEditor 
               inicialTitle={timebox.title}
               inicialTotalTimeInMinutes={timebox.totalTimeInMinutes}
               inicialFlag={timebox.flag}
               onCancel={() => setState({editIndex: null})}
               onUpdate={
                  (updatedTimebox) => {
                     updateTimebox(index, {...timebox, ...updatedTimebox});
                     setState({editIndex: null});
                  }
               }
            /> :
            <Timebox
               id={timebox.id}
               index={index}
               title={timebox.title}
               flag={timebox.flag}
               totalTimeInMinutes={timebox.totalTimeInMinutes}
               onEdit={() => setState({editIndex: index})}
               onDelete={() => removeTimebox(index, timebox)}
            />
         }
      </>
   }

   const renderReadOnlyTimebox = (timebox, index) => {
      return <ReadOnlyTimebox
         id={timebox.id}
         index={index}
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