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

const timeboxesReducer = (state, action) => {
   switch (action.type) {
      case "TIMEBOXES_LOAD": {
         const { timeboxes } = action;
         return {...state, timeboxes};
      }
      case "LOADING_SET": {
            return {...state, loading: false};
      }
      case "ERROR_SET": {
         const {error} = action;
         return {...state, error}
      }
      case "TIMEBOX_ADD": {
         const {timebox} = action
         const timeboxes = [...state.timeboxes, timebox];
         console.log(timeboxes);
         return { ...state, timeboxes}
      }
      case "TIMEBOXES_SEARCH": {
         const {searchTimeboxes} = action;
         let timeboxes = [...state.timeboxes];
         timeboxes = searchTimeboxes;
         return {...state, timeboxes}
      }
      case "TIMEBOX_DELETE": {
         const {indexToRemove} = action;
         const timeboxes = [...state.timeboxes.filter((timebox, index) => index !== indexToRemove)];
         return {...state, timeboxes }
      }
      case "TIMEBOX_UPDATE": {
         const {updatedTimebox} = action;
         const timeboxes = [...state.timeboxes.map(timebox => timebox.id === updatedTimebox.id ? updatedTimebox : timebox)]
         return { ...state, timeboxes }
      }
      case "TIMEBOX_EDIT_START": {
         const {editIndex} = action;
         return { ...state, editIndex }
      }
      case "TIMEBOX_EDIT_STOP": {
         return { ...state, editIndex: null }
      }
      default: {
         return state;
      }
   }
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
   const [state, dispatch] = useReducer(timeboxesReducer, inicialState);
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

   const removeTimebox = (indexToRemove) => {
      timeboxesApi.removeTimebox(state.timeboxes[indexToRemove], context.accessToken)
         .then(
            () => {
               dispatch({ type: 'TIMEBOX_DELETE', indexToRemove})
            }
         )
   }

   const updateTimebox = (indexToUpdate, timeboxToUpdate) => {
      timeboxesApi.partiallyUpdateTimebox(timeboxToUpdate, context.accessToken).then(
         (updatedTimebox) => {
            dispatch({ type: "TIMEBOX_UPDATE", updatedTimebox})
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
                  onCancel={() => dispatch({ type: 'TIMEBOX_EDIT_STOP'})}
               onUpdate={
                  (updatedTimebox) => {
                     updateTimebox(index, {...timebox, ...updatedTimebox});
                     dispatch({ type: 'TIMEBOX_EDIT_STOP' });
                  }
               }
            /> :
            <Timebox
               id={timebox.id}
               index={index}
               title={timebox.title}
               flag={timebox.flag}
               totalTimeInMinutes={timebox.totalTimeInMinutes}
                  onEdit={() => dispatch({ type: 'TIMEBOX_EDIT_START', editIndex: index})}
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