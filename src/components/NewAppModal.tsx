import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../css/NewAppModal.css'
import { UserProps } from '../FrontendTypes';

export default function NewAppModal({userId}: UserProps) {
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
  const handleStyleChange = (e: ChangeEvent<HTMLSelectElement>):void => {
    setApplyStyle(e.target.value);
  };
  const handleStackChange = (e: ChangeEvent<HTMLSelectElement>):void => {
    setStack(e.target.value);
  };
  const handleProgressChange = (e: ChangeEvent<HTMLSelectElement>):void => {
    setProgress(e.target.value);
  };

  const addApplication = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/apps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          company_name: companyName,
          date: dateApplied,
          app_form: applyStyle,
          stack: stack,
          progress: progress,
          user_id: userId
        }),
      })
      setCompanyName('');
      setDateApplied('');
      setApplyStyle('');
      setStack('');
      setProgress('');
    } catch(err) {
      console.error(err);
    }
  }
  return (
    <div className='modal-container'>
      <form className='modal-form' onSubmit={addApplication}>
      <input
          className="form-field"
          required
          name="companyname"
          placeholder="Name of Company"
          type="text"
          value={companyName}
          onChange={handleCompanyNameChange}
        />
        <input
          className="form-field"
          id="date-field"
          required
          name="dateApplied"
          placeholder="Date Applied (dd/mm/yyyy)"
          type="text"
          value={dateApplied}
          onChange={handleDateChange}
          pattern="\d{2}\/\d{2}\/\d{4}"
          title="Please enter a date in the format dd/mm/yyyy"
        />
        <select
          className="form-field"
          required
          name="applicationStyle"
          placeholder="Application Style"
          value={applyStyle}
          onChange={handleStyleChange}
        >
          <option value="" disabled>Application Style</option>
          <option value="Quick">Quick</option>
          <option value="Codesmith">Codesmith</option>
        </select>
        <select
          className="form-field"
          required
          name="stack"
          placeholder="Stack"
          value={stack}
          onChange={handleStackChange}
        >
          <option value="" disabled>Stack</option>
          <option value="Full">Full</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
        <select
          id="progress-field"
          className="form-field"
          required
          name="progress"
          placeholder="Progress"
          value={progress}
          onChange={handleProgressChange}
        >
          <option value="" disabled>Progress</option>
          <option value="No Response">No Response</option>
          <option value="Phone Interview Completed">Phone Interview Completed</option>
          <option value="Technical Interview Completed">Technical Interview Completed</option>
          <option value="Offer Received">Offer Received</option>
        </select>
        <button
          className="submit-button"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}