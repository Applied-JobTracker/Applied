import React, { useState, useEffect } from 'react';
import FeedItem from './FeedItem';
import '../css/Feed.css';
import { UserProps } from '../FrontendTypes';

export default function Feed(props: UserProps) {
  const prevState : JSX.Element[] = [];
  const [ feedItems, setFeedItems ] = useState(prevState);

  useEffect(() => {
    // Send a get request to the server at the '/apps/user_id' endpoint to get all applications in the database
    // NOTE: might want to add logic to limit the number of responses 
    fetch(`/apps/${props.userId}`)
    // parse response from json to js
    .then(response => response.json())
    // NOTE: confirm with backend how the data is received, but assuming for now the response data is an array of objects
    // iterate through response data, pushing individual FeedItems to the feedItems array with relevant props
    .then(response => {
      const array : JSX.Element[] = [];
      for (const app of response) {
        // NOTE: confirm how data is received from backend
        array.push(<FeedItem 
          company={app.company_name}
          date={app.date}
          appType={app.app_form}
          stack={app.stack} 
          appID={app.application_id}
          key={app.application_id}
        />);
      }
      setFeedItems(array);
    })
    .catch(err => {
      console.log('There was an error fetching applications: ', err);
    });
  }, [ feedItems ]);

  return (
    <div className='feed'>
      <h1>My Applications</h1>
      {feedItems}
    </div>
  );
};