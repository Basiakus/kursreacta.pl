import { getTimeboxById } from '../reducers/timeboxesReducer.js';

test("testing getTimeboxById", () => {
     const state = {
          timeboxesReducer: {
               timeboxes: [
                    {
                         id: 'test'
                    }
               ]
          }
     }
     expect(getTimeboxById(state, 'test')).toEqual({id: 'test'});
})