import * as React from 'react';
import Feed from '../components/Feed';
import NavBar from '../components/NavBar';

export default function mainPage() {
  return (
    <div>
      {/* Commenting out NavBar until it is defined and imported */}
      {/* <NavBar /> */}
      <Feed />
    </div>
  );
}
