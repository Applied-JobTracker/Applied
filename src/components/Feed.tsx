import React, { useState, useEffect, useContext } from 'react';
import FeedItemContainer from './FeedItemContainer';
import '../css/Feed.css';
import { UserProps } from '../FrontendTypes';
import { Context } from '../Context';

export default function Feed({ userId }: UserProps) {
  const prevState : JSX.Element[] = [];
  const [ feedItems, setFeedItems ] = useState(prevState);
  const [ context, setContext ] = useContext(Context);

  // place the fetch request inside a useEffect, so Feed will rerender any time feedItems is updated
  useEffect(() => {
    // send a get request to the server at the '/apps/user_id' endpoint to get all applications in the database for that user
    // NOTE: might want to add logic to limit the number of responses 
    fetch(`/apps/${userId}`)
    // parse response from json to js
    .then(response => response.json())
    // iterate through response data, pushing individual FeedItems to an array with relevant props
    .then(response => {
      const array : JSX.Element[] = [];
      for (const app of response) {
        array.push(<FeedItemContainer 
          company={app.company_name}
          date={app.date}
          appType={app.app_form}
          stack={app.stack} 
          appID={app.application_id}
          progress={app.progress}
          key={app.application_id}
        />);
      }
      // set feedItems to array
      setFeedItems(array);
      setContext(false);
    })
    .catch(err => {
      console.log('There was an error fetching applications: ', err);
    });
  }, [ context ]);

  return (
    <div className='feed'>
      <h1>My Applications</h1>
      {feedItems}
    </div>
  );
};