import React, { useState } from 'react';
import '../css/FeedItem.css'
import { FeedItemProps } from '../FrontendTypes';
import EditModal from './EditModal';
import FeedItemData from './FeedItemData';

export default function FeedItem(props : FeedItemProps) {
  const [showModal, setShowModal] = useState(false);
  const handleEditClick = () => {
    setShowModal(!showModal);
  }

  return (
    // {/* add logic so the feedItem div hides when modal is clicked */}
    // <div className='feedItem' >
    //   <div>
    //     <p><span>Company:</span> {props.company}</p>
    //     <p><span>Application Type:</span> {props.appType}</p>
    //     <p><span>Stack:</span> {props.stack}</p>
    //   </div>
    //   {/* Edit App button - send request to the backend to update an App */}
    //   <div className='feedRightDiv'>
    //     <p><span>Date Applied:</span> {props.date}</p>
    //     <div className='feedButtons'>
    //       <button className='leftButton'onClick={handleEditClick} >Edit</button>
    //       {/* Delete App button - send request to the backend to delete an App */}
    //       <button className='rightButton' onClick={() => {
    //           fetch(`/apps/${props.appID}`, { method: 'DELETE' })
    //           // figure out how to visually remove the feedItem from the frontend after it is deleted without reloading the page
    //           .then()
    //           .catch(err => {
    //               console.log('There was an error deleting the application: ', err);
    //           });
    //       }}>Delete</button>
    //     </div>
    //   </div>
    <React.Fragment>
      <div>
        {!showModal && <FeedItemData 
          company={props.company}
          date={props.date}
          appType={props.appType}
          stack={props.stack} 
          appID={props.appID}
          handleEditClick={handleEditClick}
        />}
      </div>
      <div>
        {showModal && <EditModal 
          company={props.company}
          date={props.date}
          appType={props.appType}
          stack={props.stack} 
          appID={props.appID}
          handleEditClick={handleEditClick}
        />}
      </div>
    </React.Fragment>
  );

};
