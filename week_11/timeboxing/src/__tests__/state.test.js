import { getAllTimeboxes } from '../reducers/timeboxesReducer.js';
import { reducer } from '../reducers/rootReducer.js';
import { createStore } from 'redux';
import { addTimebox, deleteTimebox, updateTimebox } from '../actions/timeboxListMenagerActions.js';
let store = null;

describe('state testing', () => {
     beforeEach(() => store = createStore(reducer)) 

     test('check if state is a empty array ', () => {
          const state = store.getState();
          const timeboxes = getAllTimeboxes(state);
          expect(timeboxes).toEqual([]);
     });

     test('add timebox to empty array ', () => {
          const newTimebox = {
               id: 'I\' m a new Timebox'
          }
          store.dispatch(addTimebox(newTimebox));
          const state = store.getState();
          const timeboxes = getAllTimeboxes(state);
          expect(timeboxes).toEqual([newTimebox]);
     });
     test('delete timebox from array', () => {
          const newTimebox = {
               id: 'I\' m a new Timebox'
          }
          const anotherTimebox = {
               id: 'I\'m another timebox'
          }
          store.dispatch(addTimebox(newTimebox));
          store.dispatch(addTimebox(anotherTimebox));
          store.dispatch(deleteTimebox(newTimebox))
          const state = store.getState();
          const timeboxes = getAllTimeboxes(state);
          expect(timeboxes).toEqual([anotherTimebox]);
     });
     test('updating timebox', () => {
          const timeboxToUpdate = {
               id: 'I\' m a new Timebox',
               text: 'text to update'
          }
          const updatedTimebox = {
               id: 'I\' m a new Timebox',
               text: 'updated text'
          }
          store.dispatch(addTimebox(timeboxToUpdate));
          store.dispatch(updateTimebox(updatedTimebox));
          const state = store.getState();
          const timeboxes = getAllTimeboxes(state);
          expect(timeboxes[0].text).toEqual('updated text');
     });
});
