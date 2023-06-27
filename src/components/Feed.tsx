import * as React from 'react';
import FeedItem from './FeedItem';

export default function Feed() {
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
    <div>
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