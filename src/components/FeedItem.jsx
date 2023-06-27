import React from 'react';
import '../css/FeedItem.css'

export default function FeedItem(props) {
  return (
    <div className='feedItem'>
      <div className='feedData'>
        <p>{props.company}COMPANY</p>
        <p>{props.date}DATE</p>
        <p>{props.appType}APPTYPE</p>
        <p>{props.stack}STACK</p>
      </div>
      {/* Edit App button - send request to the backend to update an App */}
      <div className='feedButtons'>
        <button>Edit</button>
        {/* Delete App button - send request to the backend to delete an App */}
        <button onClick={() => {
            fetch(`/apps/${props.appID}`, options = { method: 'DELETE' })
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