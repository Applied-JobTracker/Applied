import React, { useEffect } from 'react';
import Feed from '../components/Feed';
import NavBar from '../components/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import StatsContainer from '../components/StatsContainer';

export default function MainPage() {
  const navigate = useNavigate();
  const {state} = useLocation();

  useEffect(() => {
  if (!state) {
    alert('You must be logged in to view this page');
    navigate('/');
   }
  }, [state, navigate]);

  if (!state) {
    return null;
  }
  
  return (
    <div className="main-container">
      <NavBar userId={state.userId.user_id} />
      <Feed userId={state.userId.user_id} />
      <StatsContainer userId={state.userId.user_id}/>
    </div>
  );
}
