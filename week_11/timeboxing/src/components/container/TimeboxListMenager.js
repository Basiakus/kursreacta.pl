import React, { useContext, useEffect, useRef, useState } from 'react';
import EditableTimebox from '../EditableTimebox';
import TimeboxCreator from '../TimeboxCreator';
import { AllTimeboxesList } from '../presentation/TimeboxList';
import Error from '../Error';
import axiosTimeboxesApi from '../../api/axiosTimeboxesApi';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import {  useStore } from 'react-redux';
import {
   areTimeboxesLoading,
   getTimeboxesError,
   getCurrentlyEditableTimebox,
   isAnyTimeboxEditabled
} from '../../reducers/timeboxesReducer.js';
import { 
   timeboxesLoad, 
   setError, 
   setLoading, 
   timeboxesSearch, 
   addTimebox, 
   deleteTimebox, 
   updateTimebox,
   timeboxEditStop 
} from "../../actions/timeboxListMenagerActions.js";

const timeboxesApi = axiosTimeboxesApi('http://localhost:4000/timeboxes/'); 

const ReadOnlyTimebox = React.lazy(() => import('../ReadOnlyTimebox'));

const useForceUpdate = () => {
   const [updateCounter, setUpdateCounter] = useState(0);
   const forceUpdate = () => setUpdateCounter(prevUpdateCounter => prevUpdateCounter + 1);
   return forceUpdate;
}

function TimeboxListMenager() {
   const forceUpdate = useForceUpdate();
   let inputRef = useRef();
   //let { store } = useContext(ReactReduxContext);
   let store = useStore();
   let context = useContext(AuthenticationContext);
   let state = store.getState();
   let dispatch = store.dispatch;
   //const [state, dispatch] = useReducer(timeboxesReducer, undefined, timeboxesReducer);
   useEffect(() => store.subscribe(forceUpdate), []);
   useEffect(() => {
      timeboxesApi.getAllTimeboxes(context.accessToken)
         .then((timeboxes) => dispatch(timeboxesLoad(timeboxes)))
         .catch((error) => Promise.reject(dispatch(setError(error))))
         .finally(() => dispatch(setLoading())) 
   }, [context.accessToken])
   
   const searchingTimeboxes = (inputReference) => {
      timeboxesApi.getTimeboxesByFullTextSearch(inputReference, context.accessToken)
         .then((searchTimeboxes) => dispatch(timeboxesSearch(searchTimeboxes)) 
      )
   }

   const handleCreate = (createdTimebox) => {
         try {
            timeboxesApi.addTimebox(createdTimebox, context.accessToken).then(
               (timebox) => dispatch(addTimebox(timebox))
            )
         }
         catch(error) {
            console.log('wystąpił błąd: ', error)
         } 
   }

   const renderTimebox = (timebox) => {
      const onUpdate = (updatedTimebox) => {
         const updateingTimebox = { ...timebox, ...updatedTimebox };
         timeboxesApi.partiallyUpdateTimebox(updateingTimebox, context.accessToken).then(
            (updatedTimebox) => dispatch(updateTimebox(updatedTimebox)))
         dispatch(timeboxEditStop());
      }
      const onDelete = () => {
         timeboxesApi.removeTimebox(timebox, context.accessToken)
            .then(
               () => {
                  dispatch(deleteTimebox(timebox))
               }
            )
      }
      return <EditableTimebox 
         onUpdate = {onUpdate}
         timebox = {timebox}
         onDelete = {onDelete}
      />
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
         {isAnyTimeboxEditabled(state) ? renderReadOnlyTimebox(getCurrentlyEditableTimebox(state)) : null}
         {isAnyTimeboxEditabled(state) ? <p style={ {fontSize: ".6em"} }>edit: <b>on</b></p> : <p style={{fontSize: ".6em"}}><b>edit: off</b></p>}
         {<TimeboxCreator  onCreate={handleCreate} />}
         {areTimeboxesLoading(state) ? 'Pobieranie listy timeboxów . . .' : null}
         {getTimeboxesError(state) ? 'nie udało sie pobrać timeboxów ;(' : null}
         {<label>szukaj wg. tekstu :<input ref={inputRef} onChange={() => searchingTimeboxes(inputRef.current.value)} /></label>}
         <Error message='Wystąpił błąd w TimeboxList'>
            <AllTimeboxesList renderTimebox={renderTimebox} renderReadOnlyTimebox={renderReadOnlyTimebox}/>
         </Error>
      </>
   )
}

//TimeboxList.contextType = AuthenticationContext;

export default TimeboxListMenager;