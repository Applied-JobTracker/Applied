import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event: FormEvent, endpoint: string) => {
    event.preventDefault();
    if (endpoint === '/create') {
      if (!validatePassword()) {
        alert(
          'Password must be at least 8 characters long, include 1 uppercase letter, and 1 symbol.'
        );
        return;
      }
    }
    try {
      const response = await fetch(`/user${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const userId = await response.json();
        setUsername('');
        setPassword('');
        setUserId(userId);
        navigate('/home', { state: { userId } });
      } else if (response.status === 406) {
        alert('Username already exists, please select another');
        setUsername('');
      } else if (response.status === 401) {
        alert('Invalid Username or Password');
        setUsername('');
        setPassword('');
      } else {
        console.error('Server error', response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id='intro-container'>
      <div id='intro'>
        <h1>Welcome to Applied</h1>
        <div id='intro-desc'>
          <h2>
            You are one step away from easy job application tracking! <br />
            Please use the form below to either{' '}
            <span className='submit-text'>Login</span> or{' '}
            <span className='submit-text'>Signup</span>
          </h2>
        </div>
        <div className='login-container'>
          <form
            className='login-form'
            onSubmit={(event) => handleSubmit(event, '/login')}
          >
            <input
              className='form-field'
              required
              name='username'
              placeholder='Enter your username'
              type='text'
              value={username}
              onChange={handleUsernameChange}
            />
            <div className='login-button-container'>
              <button className='login-button' type='submit'>
                Login
              </button>
            </div>
          </form>
          <form
            className='login-form'
            onSubmit={(event) => handleSubmit(event, '/create')}
          >
            <input
              className='form-field'
              required
              name='password'
              placeholder='Enter your password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
            />
            <button className='signup-button' type='submit'>
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
