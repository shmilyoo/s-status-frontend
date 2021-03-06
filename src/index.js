import React from 'react';
import ReactDOM from 'react-dom';
// import {ReactDOM} from './vendors'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'


ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  , document.getElementById('root')
);
if(process.env.NODE_ENV === 'development')
  registerServiceWorker();
