import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { Context } from './Context';

function App() {
  const [context, setContext] = useState(false);
  return (
    <div>
      <Context.Provider value={[context, setContext]}>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<MainPage />}/>
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
