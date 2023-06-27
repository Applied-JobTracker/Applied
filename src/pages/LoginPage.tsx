import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'

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
  const handleSignupSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log('signup submitted!')
    console.log('username', username, 'password', password)
    try {
      const response = await fetch('/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        console.log("response", response)
        const userId = await response.json()
        setUsername('');
        setPassword('');
        setUserId(userId);
        navigate('/home', { state: { userId } });
      } else if  (response.status === 401){
        alert('Username already exists, please select another');
        setUsername('');
      } else {
        console.error('Server error', response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log('login submitted!')
    console.log('username', username, 'password', password)
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const userId = await response.json()
        console.log('userId', userId);
        setUsername('');
        setPassword('');
        setUserId(userId);
        navigate('/home', { state: { userId } });
      } else if  (response.status === 409){
        alert('Invalid Username or Password');
        setUsername('');
        setPassword('')
      } else {
        console.error('Server error', response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
  <div id="intro-container">
    <div id="intro">
      <h1>Welcome to Applied</h1>
        <div id="intro-desc">
          <h2>
            You are one step away from easy job application tracking!
            <br/>
            Please use the form below to either Login or Signup
          </h2>
        </div>
    <div className="login-container">
      <form className="login-form"  onSubmit={handleLoginSubmit}>
        <input
          className="form-field"
          required
          name="username"
          placeholder="Enter your username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <div className='login-button-container'>
        <button
          className="login-button"
          type="submit"
        >
          Login
        </button>
        </div>
      </form>
      <form className='login-form' onSubmit={handleSignupSubmit}>
        <input
          className="form-field"
          required
          name="password"
          placeholder="Enter your password"
          type="text"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          className="signup-button"
          type="submit"
        >
          Signup
        </button>
      </form>
      </div>
    </div>
  </div>
  );
}
