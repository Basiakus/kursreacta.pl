import React from 'react';
import Header from './Header';
import TimeboxList from './TimeboxList';
import EditableTimebox from './EditableTimebox'; 
import Error from './Error';
const AuthenticatedApp = ({handleLogout}) => {
     return (
          <>
               <Header handleLogout={handleLogout} />
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