import React, { Suspense, useEffect } from 'react';
import Error from '../Error';


function TimeboxList({ timeboxes, renderTimebox, renderReadOnlyTimebox }) {
          let randomEdit = Math.random() >= 0.5;

     return timeboxes.map((timebox, index) =>
          (
               <Error key={timebox.id} message='Wystąpił błąd w Timebox'>
                    <Suspense fallback="... timebox loading">
                         { randomEdit ? renderTimebox(timebox, index) : renderReadOnlyTimebox(timebox, index) }
                    </Suspense>
               </Error>
          )
     )
}

export default TimeboxList;