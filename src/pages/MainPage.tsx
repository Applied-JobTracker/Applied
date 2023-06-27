import * as React from 'react';
import Feed from '../components/Feed';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';

export default function mainPage() {
  const {state} = useLocation()
  console.log({state});
  return (
    <div>
      <NavBar userId={state.userId.user_id} />
      <Feed userId={state.userId.user_id} />
    </div>
  );
}
