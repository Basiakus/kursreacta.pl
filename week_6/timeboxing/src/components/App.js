import React from 'react';
import TimeboxList from './TimeboxList'; 
import EditableTimebox from './EditableTimebox'; 
import Error from './Error';
import '../styles/components/App.scss';

function App() {

   return (
      <React.StrictMode>
         <Error message="Wystąpił błąd w aplikacji">
            <div className="App">
               <TimeboxList />
               <Error message="Wystąpił błąd w EditableTimebox">
                  <EditableTimebox />
               </Error>
              
            </div>
         </Error>
      </React.StrictMode>
   )
}
export default App;
