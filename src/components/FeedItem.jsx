import React from 'react';

export default function FeedItem(props) {
  return (
    <div>
      <p>{props.company}</p>
      <p>{props.date}</p>
      <p>{props.appType}</p>
      <p>{props.stack}</p>
      {/* Edit App button - send request to the backend to update an App */}
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
  );
};