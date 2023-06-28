import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import '../css/EditModal.css'
import { FeedItemProps } from '../FrontendTypes';
import { Context } from '../Context';

export default function EditModal({ company, date, appType, stack, progress, appID, toggleModal }: FeedItemProps) {
  const [context, setContext] = useContext(Context);
  const [companyName, setCompanyName] = useState(company);
  const [dateApplied, setDateApplied] = useState(date);
  const [applyStyle, setApplyStyle] = useState(appType);
  const [stackType, setStackType] = useState(stack);
  const [progressStatus, setProgress] = useState(progress);

  const handleCompanyNameChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setCompanyName(e.target.value);
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setDateApplied(e.target.value);
  };
  const handleStyleChange = (e: ChangeEvent<HTMLSelectElement>):void => {
    setApplyStyle(e.target.value);
  };
  const handleStackChange = (e: ChangeEvent<HTMLSelectElement>):void => {
    setStackType(e.target.value);
  };
  const handleProgressChange = (e: ChangeEvent<HTMLSelectElement>):void => {
    setProgress(e.target.value);
  };

  const updateApplication = async (e: FormEvent) => {
    e.preventDefault();
    console.log(progress);
    try {
      await fetch(`/apps/${appID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: companyName,
          date: dateApplied,
          app_form: applyStyle,
          stack: stackType,
          progress: progressStatus,
          app_id: appID,
        }),
      })
    } catch(err) {
      console.error(err);
    }
  }

  const handleSubmit = (e : any) => {
    e.preventDefault();
    updateApplication(e);
    setContext(true);
    toggleModal(e);
  };

  return (
      <form className='edit-modal-container' onSubmit={handleSubmit}>
        <div>
          <div className='modal-input'>
            <label htmlFor="companyname" >Company: </label> 
            <input
              className="form-field"
              name="companyname"
              placeholder={company}
              type="text"
              value={companyName}
              onChange={handleCompanyNameChange}
            />
          </div>
          <div className='modal-input'>
            <label htmlFor="dateApplied" >Date Applied: </label>  
            <input
              className="form-field"
              name="dateApplied"
              placeholder={date}
              type="text"
              value={dateApplied}
              onChange={handleDateChange}
              pattern="\d{2}\/\d{2}\/\d{4}"
              title="Please enter a date in the format dd/mm/yyyy"
            />
          </div>
          <div className='modal-input'>
            <label htmlFor="applicationStyle" >Application Style: </label>  
            <select
              className="form-field"
              name="applicationStyle"
              placeholder={appType}
              value={applyStyle}
              onChange={handleStyleChange}
            >
              <option value="Traditional">Traditional</option>
              <option value="Quick">Quick</option>
              <option value="Codesmith">Codesmith</option>
            </select>
          </div>
          <div className='modal-input'>
            <label htmlFor="stack" >Stack: </label>
            <select
              className="form-field"
              required
              name="stack"
              placeholder={stack}
              value={stackType}
              onChange={handleStackChange}
            >
              <option value="Full">Full</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>
          </div>
            <div className='modal-input'>
              <label htmlFor="progress" >Progress: </label>
              <select
                id="progress-field"
                className="form-field"
                required
                name="progress"
                placeholder={progress}
                value={progressStatus}
                onChange={handleProgressChange}
              >
                <option value="No Response">No Response</option>
                <option value="Phone Interview Completed">Phone Interview Completed</option>
                <option value="Technical Interview Completed">Technical Interview Completed</option>
                <option value="Offer Received">Offer Received</option>
                <option value="No Offer Received">No Offer Received</option>
              </select>
            </div>
          </div>
        <div>
          <div className='feedButtons'>
            <button onClick={toggleModal} className='redButton'>
              Cancel
            </button>
            <button
              className='greenButton'
              type='submit'
            >
              Submit
            </button>
          </div>
        </div>
      </form>
  )
}