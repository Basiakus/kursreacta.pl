import React, { useContext, useEffect, useRef, useReducer } from 'react';
//import Timebox from './Timebox';
import TimeboxCreator from '../TimeboxCreator';
import TimeboxEditor from '../TimeboxEditor';
import TimeboxList from '../presentation/TimeboxList';
import Error from '../Error';
import axiosTimeboxesApi from '../../api/axiosTimeboxesApi';
import AuthenticationContext from '../../contexts/AuthenticationContext';

import {
   timeboxesReducer, 
   getAllTimeboxes,
   areTimeboxesLoading,
   getTimeboxesError,
   getCurrentlyEditableTimebox,
   isAnyTimeboxEditabled,
   isCurrentTimeboxEditing 
} from '../../reducers/timeboxesReducer.js';

import { 
   timeboxesLoad, 
   setError, 
   setLoading, 
   timeboxesSearch, 
   addTimebox, 
   deleteTimebox, 
   timeboxEditStart, 
   timeboxEditStop, 
   updateTimebox 
} from "../../actions/timeboxListMenagerActions.js";

const timeboxesApi = axiosTimeboxesApi('http://localhost:4000/timeboxes/'); 
const Timebox = React.lazy(() => import('../Timebox'));
const ReadOnlyTimebox = React.lazy(() => import('../ReadOnlyTimebox'));


function TimeboxListMenager() {

   let inputRef = useRef();
   let context = useContext(AuthenticationContext);
   const [state, dispatch] = useReducer(timeboxesReducer, undefined, timeboxesReducer);

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
      return <>
         {
            isCurrentTimeboxEditing(state, timebox) ?
            <TimeboxEditor 
               inicialTitle={timebox.title}
               inicialTotalTimeInMinutes={timebox.totalTimeInMinutes}
               inicialFlag={timebox.flag}
               onCancel={() => dispatch(timeboxEditStop())}
               onUpdate={
                  (updatedTimebox) => {
                     const updateingTimebox = {...timebox, ...updatedTimebox};
                     timeboxesApi.partiallyUpdateTimebox(updateingTimebox, context.accessToken).then(
                        (updatedTimebox) => dispatch(updateTimebox(updatedTimebox)))
                     dispatch(timeboxEditStop());
                  }
               }
            /> :
            <Timebox
               id={timebox.id}
               title={timebox.title}
               flag={timebox.flag}
               totalTimeInMinutes={timebox.totalTimeInMinutes}
                  onEdit={() => dispatch(timeboxEditStart(timebox.id))}
                  onDelete={() => {
                     timeboxesApi.removeTimebox(timebox, context.accessToken)
                        .then(
                           () => {
                              dispatch(deleteTimebox(timebox))
                           }
                        )
                  }}
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
         {isAnyTimeboxEditabled(state) ? renderReadOnlyTimebox(getCurrentlyEditableTimebox(state)) : null}
         {isAnyTimeboxEditabled(state) ? <p style={ {fontSize: ".6em"} }>edit: <b>on</b></p> : <p style={{fontSize: ".6em"}}><b>edit: off</b></p>}
         {<TimeboxCreator  onCreate={handleCreate} />}
         {areTimeboxesLoading(state) ? 'Pobieranie listy timeboxów . . .' : null}
         {getTimeboxesError(state) ? 'nie udało sie pobrać timeboxów ;(' : null}
         {<label>szukaj wg. tekstu :<input ref={inputRef} onChange={() => searchingTimeboxes(inputRef.current.value)} /></label>}
         <Error message='Wystąpił błąd w TimeboxList'>
            <TimeboxList timeboxes={getAllTimeboxes(state)} renderTimebox={renderTimebox} renderReadOnlyTimebox={renderReadOnlyTimebox}/>
         </Error>
      </>
   )
}

//TimeboxList.contextType = AuthenticationContext;

export default TimeboxListMenager;