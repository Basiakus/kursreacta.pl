import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/components/components.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './reducers/rootReducer.js';

/* Elements from DOM */
const rootElement = document.getElementById("root");
let store = createStore(reducer);

/* Render funcional components to virtualDOM */
ReactDOM.render(
     <Provider store = { store }>
          <App />
     </Provider>, 
     rootElement
);