import React, { useState } from 'react';
import '../css/FeedItem.css'
import { FeedItemProps } from '../FrontendTypes';
import EditModal from './EditModal';
import FeedItem from './FeedItem';

export default function FeedItemContainer( { company, date, appType, stack, appID, progress }: FeedItemProps) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <React.Fragment>
      <div>
        {!showModal && <FeedItem 
          company={company}
          date={date}
          appType={appType}
          stack={stack} 
          appID={appID}
          progress={progress}
          toggleModal={toggleModal}
        />}
      </div>
      <div>
        {showModal && <EditModal 
          company={company}
          date={date}
          appType={appType}
          stack={stack} 
          appID={appID}
          progress={progress}
          toggleModal={toggleModal}
        />}
      </div>
    </React.Fragment>
  );
};
