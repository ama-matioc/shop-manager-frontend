import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../handlers/FirebaseHandler';
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
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="add-product-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInput}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleInput}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="btn show-btn"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInput}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="button-group">
            <button type="submit" className="add-btn">
              Register
            </button>
            <Link to="/login" className="btn back-btn">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
