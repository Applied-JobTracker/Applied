import React, { useState } from 'react';
import '../css/NavBar.css'
import NewAppModal from './NewAppModal'

export default function NavBar() {
  const [showModal, setShowModal] = useState(false);

  const handleNewAppClick = () => {
    setShowModal(!showModal);
  }

  return (
    <div id='bar-container'>
      <button className='bar-display'>
        My Applications        
      </button>
      <button className='bar-display' onClick={handleNewAppClick}>
        New Application
      </button>
      {showModal && <NewAppModal />}
    </div>
  );
}