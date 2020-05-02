import React, { useContext, useEffect, useRef } from 'react';
import EditableTimebox from '../EditableTimebox';
import TimeboxCreator from '../TimeboxCreator';
import { AllTimeboxesList } from '../presentation/TimeboxList';
import Error from '../Error';
import axiosTimeboxesApi from '../../api/axiosTimeboxesApi';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import { useDispatch, useSelector } from 'react-redux';
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

function TimeboxListMenager() {
   let inputRef = useRef();
   let context = useContext(AuthenticationContext);
   let dispatch = useDispatch();

   useEffect(() => {
      timeboxesApi.getAllTimeboxes(context.accessToken)
         .then((timeboxes) => dispatch(timeboxesLoad(timeboxes)))
         .catch((error) => Promise.reject(dispatch(setError(error))))
         .finally(() => dispatch(setLoading())) 
   }, [context.accessToken, dispatch])
   
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

   const timeboxEditabled = useSelector(state => isAnyTimeboxEditabled(state));
   const currentlyEditableTimebox = useSelector(state => getCurrentlyEditableTimebox(state));
   const timeboxesLoading = useSelector(state => areTimeboxesLoading(state));
   const timeboxesError = useSelector(state => getTimeboxesError(state));
   return (
      <> 
         {timeboxEditabled ? renderReadOnlyTimebox(currentlyEditableTimebox) : null}
         {timeboxEditabled ? <p style={ {fontSize: ".6em"} }>edit: <b>on</b></p> : <p style={{fontSize: ".6em"}}><b>edit: off</b></p>}
         {<TimeboxCreator  onCreate={handleCreate} />}
         {timeboxesLoading ? 'Pobieranie listy timeboxów . . .' : null}
         {timeboxesError ? 'nie udało sie pobrać timeboxów ;(' : null}
         {<label>szukaj wg. tekstu :<input ref={inputRef} onChange={() => searchingTimeboxes(inputRef.current.value)} /></label>}
         <Error message='Wystąpił błąd w TimeboxList'>
            <AllTimeboxesList renderTimebox={renderTimebox} renderReadOnlyTimebox={renderReadOnlyTimebox}/>
         </Error>
      </>
   )
}

//TimeboxList.contextType = AuthenticationContext;

export default TimeboxListMenager;