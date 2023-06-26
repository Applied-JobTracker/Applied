import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    console.log('username', username, 'password', password)
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setUsername('');
        setPassword('');
        navigate('/home');
      } else if  (response.status === 404){
        alert('Username already exists, please select another');
        setUsername('');
      } else {
        console.error('Server error', response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log('username', username, 'password', password)
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setUsername('');
        setPassword('');
        navigate('/home');
      } else if  (response.status === 404){
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
    <div className="login-container">
      <form className="login-form"  onSubmit={handleLoginSubmit}>
        <input
          className="form-field"
          required
          name="username"
          label="Username"
          placeholder="Enter your username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <button
          className="form-field"
          type="submit"
        >
          Login
        </button>
      </form>
      <form className='login-form' onSubmit={handleSignupSubmit}>
        <input
          className="form-field"
          required
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="text"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          className="form-field"
          type="submit"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
