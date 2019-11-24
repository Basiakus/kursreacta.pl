import React from 'react';
import Header from './Header';
import TimeboxList from './TimeboxList';
import EditableTimebox from './EditableTimebox'; 
import Error from './Error';
const AuthenticatedApp = () => {
     return (
          <>
               <Header />
               <div className="App">
                    <Error message="Wystąpił błąd w TimeboxList">
                         <TimeboxList />
                    </Error>
                    <Error message="Wystąpił błąd w EditableTimebox">
                         <EditableTimebox />
                    </Error>
               </div>
          </>
     )
}

export default AuthenticatedApp;