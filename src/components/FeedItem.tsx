import * as React from 'react';
import '../css/FeedItem.css'
import { FeedItemProps } from '../FrontendTypes';

export default function FeedItem(props : FeedItemProps) {
  return (
    <div className='feedItem'>
      <div className='feedData'>
        <p>Company: {props.company}</p>
        <p>Date: {props.date.toLocaleDateString('en-US')}</p>
        <p>Application Type: {props.appType}</p>
        <p>Stack: {props.stack}</p>
      </div>
      {/* Edit App button - send request to the backend to update an App */}
      <div className='feedButtons'>
        <button>Edit</button>
        {/* Delete App button - send request to the backend to delete an App */}
        <button onClick={() => {
            fetch(`/apps/${props.appID}`, { method: 'DELETE' })
            // figure out how to visually remove the feedItem from the frontend after it is deleted without reloading the page
            .then()
            .catch(err => {
                console.log('There was an error deleting the application: ', err);
            })
        }}>Delete</button>
      </div>
    </div>
  );
};