import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UserNotes from './UserNotes.js';
import reportWebVitals from './reportWebVitals';
//import App from './App';
//import FormTest from './formtest';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserNotes />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
