// App.js

import React from 'react';
import './App.css';
import Header from './components/Header'; // 修改引入路径
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
