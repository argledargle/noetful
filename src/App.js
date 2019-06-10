import React from 'react';
import Header from './Header'
import { Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Main from './Main'
import store from './dummy-store'

function App() {
  return (
    <main className='App'>
      <Route path='/' component={Header} />
      <Route path='/' component={Sidebar} />
      <Route path='/' component={Main} />
    </main>
  );
}

export default App;
