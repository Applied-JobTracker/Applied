import React, { useContext } from 'react';
import '../css/FeedItem.css'
import { FeedItemProps } from '../FrontendTypes';
import { Context } from '../Context';

export default function FeedItem(props : FeedItemProps) {
  const [context, setContext] = useContext(Context);
  return (
    <div className='feedItem'>
      <div>
        <p><span>Company:</span> {props.company}</p>
        <p><span>Application Type:</span> {props.appType}</p>
        <p><span>Stack:</span> {props.stack}</p>
        <p><span>Progress:</span> {props.progress}</p>
      </div>
      <div className='feedRightDiv'>
        <p><span>Date Applied:</span> {props.date}</p>
        <div className='feedButtons'>
          {/* Edit App button - shows the EditModal, which sends a request to the backend to update an application on submit */}
          <button className='greenButton' onClick={props.toggleModal} >Edit</button>
          {/* Delete App button - send request to the backend to delete an App */}
          <button className='redButton' onClick={() => {
              fetch(`/apps/${props.appID}`, { method: 'DELETE' })
              .then(() => setContext(true))
              .catch(err => {
                  console.log('There was an error deleting the application: ', err);
              });
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
};
