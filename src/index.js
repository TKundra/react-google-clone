import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { StateContextProvider } from './contexts/ContextProvider';

ReactDOM.render(
  <StateContextProvider>
    {/* <React.StrictMode> */}
      <Router>
        <App />
      </Router>
    {/* </React.StrictMode> */}
  </StateContextProvider>,
  document.getElementById('root')
);