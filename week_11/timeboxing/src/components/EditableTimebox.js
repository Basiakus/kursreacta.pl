import React from 'react';
import TimeboxEditor from './TimeboxEditor';
import { connect } from 'react-redux';
import { isCurrentTimeboxEditing } from '../reducers/timeboxesReducer.js';
import { timeboxEditStart, timeboxEditStop } from "../actions/timeboxListMenagerActions.js";
const Timebox = React.lazy(() => import('./Timebox'));

const mapStateToProps = (state, ownProps) => ({ isEditing: isCurrentTimeboxEditing(state, ownProps.timebox)});

const mapDispatchToProps = (dispatch, ownProps) => {
     const onEdit = () => dispatch(timeboxEditStart(ownProps.timebox.id));
     const onCancel = () => dispatch(timeboxEditStop());
     return { onEdit, onCancel }
}

const EditableTimebox = connect(mapStateToProps, mapDispatchToProps)(({ isEditing, onEdit, onCancel, onUpdate, timebox, onDelete}) => {
     return <>
          {
               isEditing ?
                    <TimeboxEditor
                         inicialTitle={timebox.title}
                         inicialTotalTimeInMinutes={timebox.totalTimeInMinutes}
                         inicialFlag={timebox.flag}
                         onCancel={onCancel}
                         onUpdate={onUpdate}
                    /> :
                    <Timebox
                         id={timebox.id}
                         title={timebox.title}
                         flag={timebox.flag}
                         totalTimeInMinutes={timebox.totalTimeInMinutes}
                         onEdit={onEdit}
                         onDelete={onDelete}
                    />
          }
     </>
})
export default EditableTimebox;