import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyConverter from './CurrencyConverter';
import './index.css'; // You may need to adjust the path based on your project structure

ReactDOM.render(
  <React.StrictMode>
    <CurrencyConverter />
  </React.StrictMode>,
  document.getElementById('root')
);
