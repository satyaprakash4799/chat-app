import React from 'react';

import logo from './logo.svg';
import Dashboard from './Dashboard';
import Store from './Store';

import './App.css';


function App() {
  return (
    <div className="App">
      <Store>
        <Dashboard />
      </Store>
    </div>
  )
}

export default App;