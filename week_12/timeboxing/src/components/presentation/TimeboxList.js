import React, { Suspense } from 'react';
import Error from '../Error';
import { connect } from 'react-redux';
import { getAllTimeboxes } from '../../reducers/timeboxesReducer.js';

const Test = () => <h1>Test loading test !!!</h1>;
const TimeboxList = ({ timeboxes, renderTimebox, renderReadOnlyTimebox }) => {
          let randomEdit = Math.random() >= 0.5;
          randomEdit = true;

     return timeboxes.map((timebox, index) =>
          (
               <Error key={timebox.id} message='Wystąpił błąd w Timebox'>
                    <Suspense fallback={<Test />}>
                         { randomEdit ? renderTimebox(timebox, index) : renderReadOnlyTimebox(timebox, index) }
                    </Suspense>
               </Error>
          )
     )
}

const mapStateToProps = state => ({ timeboxes: getAllTimeboxes(state) })
export const AllTimeboxesList = connect(mapStateToProps)(TimeboxList)