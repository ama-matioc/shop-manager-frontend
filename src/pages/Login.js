import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../handlers/FirebaseHandler';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="add-product-container">
        <h1>Login</h1>
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
          {error && <p className="error">{error}</p>}
          <div className="button-group">
            <button type="submit" className="add-btn">
              Login
            </button>
            <Link to="/register" className="btn back-btn">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
