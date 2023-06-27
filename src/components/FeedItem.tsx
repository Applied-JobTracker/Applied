import React from 'react';
import '../css/FeedItem.css'
import { FeedItemProps } from '../FrontendTypes';

export default function FeedItem(props : FeedItemProps) {
  return (
    <div className='feedItem'>
      <div>
        <p><span>Company:</span> {props.company}</p>
        <p><span>Application Type:</span> {props.appType}</p>
        <p><span>Stack:</span> {props.stack}</p>
      </div>
      
      {/* Edit App button - send request to the backend to update an App */}
      <div className='feedRightDiv'>
        <p><span>Date Applied:</span> {props.date}</p>
        <div className='feedButtons'>
          <button className='leftButton'>Edit</button>
          {/* Delete App button - send request to the backend to delete an App */}
          <button className='rightButton' onClick={() => {
              fetch(`/apps/${props.appID}`, { method: 'DELETE' })
              // figure out how to visually remove the feedItem from the frontend after it is deleted without reloading the page
              .then()
              .catch(err => {
                  console.log('There was an error deleting the application: ', err);
              })
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
};