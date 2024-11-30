import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../handlers/FirebaseHandler'; // Your Firebase setup file
import '../App.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/Homepage'); // Redirect to Homepage or any desired page
    } catch (error) {
      setError(error.message); // Display Firebase error message
    }
  };

  return (
    <div className='page'>
      <div className="title">Cineflix</div>
      <div className='container'>
        <div className='head'>
          <div className='text'>Register</div>
          <div className='underline'></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <div className='input'>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={handleInput}
              />
            </div>
            <div className='input'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                value={password}
                onChange={handleInput}
              />
              <button
                type="button"
                className="visibility-btn"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className='input'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='Confirm Password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleInput}
              />
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className='button'>Register</button>
        </form> 
        
        <Link to="/login">
          <span className="register-link">
            Already have an account? Click here to log in!
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Register;
