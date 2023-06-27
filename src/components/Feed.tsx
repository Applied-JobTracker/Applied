import * as React from 'react';
import FeedItem from './FeedItem';
import '../css/Feed.css';
import { UserProps } from '../FrontendTypes';

export default function Feed(props: UserProps) {
  const feedItems : JSX.Element[] = [];
  // Send a get request to the server at the '/apps' endpoint to get all applications in the database
  // NOTE: might want to add logic to limit the number of responses 
  fetch('/apps')
    // parse response from json to js
    .then(response => response.json())
    // NOTE: confirm with backend how the data is received, but assuming for now the response data is an array of objects
    // iterate through response data, pushing individual FeedItems to the feedItems array with relevant props
    .then(response => {
      for (const app of response) {
        // NOTE: confirm how data is received from backend
        feedItems.push(<FeedItem 
          company={app.company_name}
          date={app.date}
          appType={app.app_form}
          stack={app.stack} 
          appID={app.application_id}
        />);
      }
    })
    .catch(err => {
      console.log('There was an error fetching applications: ', err);
  });

  return (
    <div className='feed'>
      <h1>My Applications</h1>
      {/* Delete the 3 manually rendered FeedItems below - temporary here for styling purposes */}
      <FeedItem 
        company={'Google'}
        date={new Date()}
        appType={'Easy apply'}
        stack={'fullstack'} 
        appID={'023779'}
      />
      <FeedItem 
        company={'Google'}
        date={new Date()}
        appType={'Easy apply'}
        stack={'fullstack'} 
        appID={'023779'}
      />
      <FeedItem 
        company={'Google'}
        date={new Date()}
        appType={'Easy apply'}
        stack={'fullstack'} 
        appID={'023779'}
      />
      {feedItems}
    </div>
  );
};