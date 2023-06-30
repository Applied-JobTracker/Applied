import React, { useState } from 'react';
import '../css/NavBar.css'
import NewAppModal from './NewAppModal'
import { UserProps } from '../FrontendTypes';
import { useNavigate } from 'react-router-dom';

export default function NavBar({userId}: UserProps) {
  const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate();

  const handleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
    <div id='bar-container'>
      <button className='bar-display' onClick={() => navigate('/')}>
        Logout     
      </button>
      <button className='bar-display' onClick={handleModal}>
        Add New Application
      </button>
    </div>
    {showModal && <NewAppModal userId={userId} handleModal={handleModal} />}
    </div>
  );
}