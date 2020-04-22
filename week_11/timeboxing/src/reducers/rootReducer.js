import { combineReducers } from 'redux'
import { timeboxesReducer } from './timeboxesReducer.js';
import { currentTimeboxReducer } from './currentTimeboxReducer.js';


export const reducer =  combineReducers({
     timeboxesReducer,
     currentTimeboxReducer
})

//CURRENTTIMEBOX SELECTORS
export const setPauseValue = state => !state.isPaused;
export const getPausesCount = state => state.pausesCount;
export const isTimeRunning = state => state.isRunning;
export const getElapsedTime = state => state.elapsedTimeInSeconds;
export const isTimePaused = state => state.isPaused;

//TIMEBOXLISTMENAGER SELECTORS
export const getAllTimeboxes = state => state.timeboxes;
export const areTimeboxesLoading = state => state.loading;
export const getTimeboxesError = state => state.error;
export const isCurrentTimeboxEditing = (state, timebox) => state.currentTimeboxId && state.currentTimeboxId === timebox.id;
export const getTimeboxById = (state, timeboxId) => state.timeboxes.find(timebox => timebox.id === timeboxId);
export const getCurrentlyEditableTimebox = state => getTimeboxById(state, state.currentTimeboxId);
export const isAnyTimeboxEditabled = state => !!state.currentTimeboxId;