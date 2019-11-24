import React from 'react';
import './App.css';

import ItemList from './ItemList.js';

import data from './data.json';


function App() {
  return (
    <div className="App">
      <div className="header"><img src="glass.png" alt="LU Roundel" /><div>Station Search</div></div>
      <ItemList data={data} />
    </div>
  );
}

export default App;
