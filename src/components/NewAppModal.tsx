import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../css/NewAppModal.css'
import { UserProps } from '../FrontendTypes';

export default function NewAppModal({userId}: UserProps) {
  const [companyName, setCompanyName] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [applyStyle, setApplyStyle] = useState('');
  const [stack, setStack] = useState('');

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
  console.log('inside modal', {userId});

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
          user_id: userId
        }),
      })
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
          required
          name="dateApplied"
          placeholder="Date Applied"
          type="text"
          value={dateApplied}
          onChange={handleDateChange}
        />
        <input
          className="form-field"
          required
          name="applicationStyle"
          placeholder="Application Style"
          type="text"
          value={applyStyle}
          onChange={handleStyleChange}
        />
        <input
          className="form-field"
          required
          name="stack"
          placeholder="Stack"
          type="text"
          value={stack}
          onChange={handleStackChange}
        />
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