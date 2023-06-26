import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path='/' element={<LoginPage />} />
        <Route exact path='/home' element={<MainPage />}/>
      </Routes>
    </div>
  );
}

export default App;
