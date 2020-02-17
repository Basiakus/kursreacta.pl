import React from 'react';
import Header from './Header';
import TimeboxListMenager from './container/TimeboxListMenager';
import EditableTimebox from './EditableTimebox'; 
import Error from './Error';
import InspiracionalQuoteContainer from './container/InspiracionalQuoteContainer';
import Portal from './Portal'
const AuthenticatedApp = () => {
     return (
          <>
               <Portal>
                    <Header />
               </Portal>
               <div className="App">
                    <Error message="Wystąpił błąd w TimeboxList">
                         <TimeboxListMenager />
                    </Error>
                    <Error message="Wystąpił błąd w EditableTimebox">
                         <EditableTimebox />
                    </Error>
                    <InspiracionalQuoteContainer />
               </div>
          </>
     )
}

export default AuthenticatedApp;