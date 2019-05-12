import React from 'react';
import TimeboxList from './TimeboxList'; 
import EditableTimebox from './EditableTimebox';
import '../styles/components/App.scss';

function App() {

   return (
      <React.StrictMode>
         <div className="App">
            <TimeboxList />
            <EditableTimebox />
         </div>
      </React.StrictMode>
   )
}
export default App;