import { combineReducers } from 'redux'
import { timeboxesReducer } from './timeboxesReducer.js';
import { currentTimeboxReducer } from './currentTimeboxReducer.js';


export const reducer =  combineReducers({
     timeboxesReducer,
     currentTimeboxReducer
})
