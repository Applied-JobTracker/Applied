import React, { useState } from 'react';
import '../css/FeedItem.css'
import { FeedItemProps } from '../FrontendTypes';
import EditModal from './EditModal';
import FeedItem from './FeedItem';

export default function FeedItemContainer(props : FeedItemProps) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <React.Fragment>
      <div>
        {!showModal && <FeedItem 
          company={props.company}
          date={props.date}
          appType={props.appType}
          stack={props.stack} 
          appID={props.appID}
          progress={props.progress}
          toggleModal={toggleModal}
        />}
      </div>
      <div>
        {showModal && <EditModal 
          company={props.company}
          date={props.date}
          appType={props.appType}
          stack={props.stack} 
          appID={props.appID}
          progress={props.progress}
          toggleModal={toggleModal}
        />}
      </div>
    </React.Fragment>
  );
};
