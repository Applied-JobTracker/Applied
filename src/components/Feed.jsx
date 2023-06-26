import React from 'react';
import FeedItem from './FeedItem';

export default function Feed() {
  const feedItems = [];
  // Query server/database for applications, which will be used to render individual FeedItems
  // NOTE: CONFIRM ENDPOINT WITH BACKEND
  fetch('/applications')
    // parse response from json to js
    .then(response => response.json())
    // response data should look like an array of objects, but confirm with backend
    // take response data and pass relevant info into a new array of feeditems
    .then(response => {
      for (const app of response) {
        // pass relevant info as props into FeedItem once the data is received from the backend
        feedItems.push(<FeedItem />);
      }
    })
    .catch(err => {
      console.log('There was an error fetching applications: ', err);
  });

  return (
    <div>
      {feedItems}
    </div>
  );
};