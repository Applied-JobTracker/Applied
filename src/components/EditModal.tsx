import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../css/EditModal.css'
import { FeedItemProps } from '../FrontendTypes';

export default function EditModal(props: FeedItemProps) {
  const [companyName, setCompanyName] = useState(props.company);
  const [dateApplied, setDateApplied] = useState(props.date);
  const [applyStyle, setApplyStyle] = useState(props.appType);
  const [stack, setStack] = useState(props.stack);
  const [progress, setProgress] = useState(props.progress);

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
    setStack(e.target.value);
  };
  // BACKEND NEEDS TO ADD PROGRESS TO THE EDITAPP METHOD IN APPSCONTROLLER
  const handleProgressChange = (e: ChangeEvent<HTMLSelectElement>):void => {
    setProgress(e.target.value);
  };

  const updateApplication = async (e: FormEvent) => {
    e.preventDefault();
    console.log(progress);
    try {
      await fetch(`/apps/${props.appID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
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

  const handleSubmit = (e : any) => {
    e.preventDefault();
    updateApplication(e);
    props.toggleModal(e);
  };

  return (
      <form className='edit-modal-container' onSubmit={handleSubmit}>
        <div>
          <div className='modal-input'>
            <label htmlFor="companyname" >Company: </label> 
            <input
              className="form-field"
              name="companyname"
              placeholder={props.company}
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
              placeholder={props.date}
              type="text"
              value={dateApplied}
              onChange={handleDateChange}
              pattern="\d{2}\/\d{2}\/\d{4}"
              title="Please enter a date in the format dd/mm/yyyy"
            />
          </div>
          <div className='modal-input'>
            <label htmlFor="applicationStyle" >Application Type: </label>  
            <select
              className="form-field"
              name="applicationStyle"
              placeholder={props.appType}
              value={applyStyle}
              onChange={handleStyleChange}
            >
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
              placeholder={props.stack}
              value={stack}
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
                placeholder={props.progress}
                value={progress}
                onChange={handleProgressChange}
              >
                <option value="No Response">No Response</option>
                <option value="Phone Interview Completed">Phone Interview Completed</option>
                <option value="Technical Interview Completed">Technical Interview Completed</option>
                <option value="Offer Received">Offer Received</option>
              </select>
            </div>
          </div>
        <div>
          <div className='feedButtons'>
            <button onClick={props.toggleModal} className='redButton'>
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