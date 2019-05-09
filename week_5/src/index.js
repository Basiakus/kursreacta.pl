import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
//import './styles/main.scss';
/* Elements from DOM */
const rootElement = document.getElementById("root");

/* Render funcional components to virtualDOM */
ReactDOM.render(<App />, rootElement);