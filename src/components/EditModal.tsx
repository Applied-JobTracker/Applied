import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../css/EditModal.css'
import { FeedItemDataProps } from '../FrontendTypes';

export default function EditModal(props: FeedItemDataProps) {
  const [companyName, setCompanyName] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [applyStyle, setApplyStyle] = useState('');
  const [stack, setStack] = useState('');
  const [progress, setProgress] = useState('');

  const handleCompanyNameChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setCompanyName(e.target.value);
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setDateApplied(e.target.value);
  };
  const handleStyleChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setApplyStyle(e.target.value);
  };
  const handleStackChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setStack(e.target.value);
  };
  const handleProgressChange = (e: ChangeEvent<HTMLSelectElement>):void => {
    setProgress(e.target.value);
  };

  const updateApplication = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // ASK BACKEND IF USERID IS NECESSARY OR IF THEY CAN REFACTOR
      const response = await fetch(`/apps/${props.appID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
        body: JSON.stringify({
          company_name: companyName,
          date: dateApplied,
          app_form: applyStyle,
          stack: stack,
          progress: progress,
          app_id: props.appID,
        }),
      })
    } catch(err) {
      console.error(err);
    }
  }
  return (
      <form className='modal-container' onSubmit={() => {
        updateApplication;
        props.handleEditClick;
      }}>
      <div className='modal-inputs'>
        <div>
          Company: 
          <input
            className="form-field"
            name="companyname"
            placeholder={props.company}
            required
            type="text"
            value={companyName}
            onChange={handleCompanyNameChange}
          />
        </div>
        <div>
          Date Applied: 
          <input
            className="form-field"
            name="dateApplied"
            placeholder={props.date}
            required
            type="text"
            value={dateApplied}
            onChange={handleDateChange}
          />
        </div>
        <div>
          Application Type:  
          <input
            className="form-field"
            name="applicationStyle"
            placeholder={props.appType}
            required
            type="text"
            value={applyStyle}
            onChange={handleStyleChange}
          />
        </div>
          <div>
            Stack: 
            <input
              className="form-field"
              name="stack"
              placeholder={props.stack}
              required
              type="text"
              value={stack}
              onChange={handleStackChange}
            />
          </div>
          <select
            id="progress-field"
            className="form-field"
            required
            name="progress"
            placeholder={props.progress}
            value={progress}
            onChange={handleProgressChange}
          >
            <option value="" disabled>{props.progress}</option>
            <option value="No Response">No Response</option>
            <option value="Phone Interview Completed">Phone Interview Completed</option>
            <option value="Technical Interview Completed">Technical Interview Completed</option>
            <option value="Offer Received">Offer Received</option>
          </select>
        </div>
        <div>
          <button
            className="submit-button"
            type="submit"
          >
            Submit
          </button>
          <button>
            Cancel
          </button>
        </div>
      </form>
  )
}