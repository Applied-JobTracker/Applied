import React, { useState } from 'react';
import '../css/NavBar.css'
import NewAppModal from './NewAppModal'
import { UserProps } from '../FrontendTypes';

export default function NavBar({userId}: UserProps) {
  const [showModal, setShowModal] = useState(false);
  const handleNewAppClick = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
    <div id='bar-container'>
      <button className='bar-display'>
        My Applications        
      </button>
      <button className='bar-display' onClick={handleNewAppClick}>
        New Application
      </button>
    </div>
    {showModal && <NewAppModal userId={userId} />}
    </div>
  );
}