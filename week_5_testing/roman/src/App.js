import React from 'react';
import RomanConverter from './RomanConverter';
import ArabicConverter from './ArabicConverter';
import './App.css';

function App() {
  return (
    <div className="App">
      <RomanConverter />
      <ArabicConverter />
    </div>
  );
}

export default App;
