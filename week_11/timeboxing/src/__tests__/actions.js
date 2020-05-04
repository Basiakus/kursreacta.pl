import {timeboxesReducer} from '../reducers/timeboxesReducer.js';
import { updateTimebox } from '../actions/timeboxListMenagerActions.js';
describe('timeboxesReducer', () => {
     const state = {
          timeboxes: [
               {
                    id: 'timebox to update',
                    text: 'string to update'
               }
          ]
     }
     const updatedTimebox = {
          id: 'timebox to update',
          text: 'updated string'
     }
     test("upbate Timebox", () => {
          expect(timeboxesReducer(state, { type: "TIMEBOX_UPDATE", updatedTimebox })).
               toEqual({
                    timeboxes: [
                         {
                              id: 'timebox to update',
                              text: 'updated string'
                         }
                    ]
               }
          );
     });
     test('update timebox with imported action', () => {
          expect(timeboxesReducer(state, updateTimebox(updatedTimebox))).
               toEqual({
                    timeboxes: [
                         {
                              id: 'timebox to update',
                              text: 'updated string'
                         }
                    ]
               }
               );
     })
})