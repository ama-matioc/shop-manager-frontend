import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../handlers/FirebaseHandler';
import '../App.css';
import { useNavigate } from 'react-router-dom';

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
      navigate('/Homepage');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='page'>
      <div className="title">Cineflix</div>
      <div className='container'>
        <div className='head'>
          <div className='text'>Login</div>
          <div className='underline'></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <div className='input'>
              <input type='email' placeholder='Email' name='email' onChange={handleInput} />
            </div>
            {/*errors.email && <span className='error'>{errors.email}</span>*/}
            <div className='input'>
              <input type={passwordVisible ? 'text' : 'password'} placeholder='Password' name='password' onChange={handleInput} />
              <button type="button" className="visibility-btn" onClick={togglePasswordVisibility}>
              </button>
            </div>
            {/*errors.password && <span className='error'>{errors.password}</span>*/}
          </div>
          <p></p>
          <button type="submit" className='button'>Login</button>
        </form> 
        
        <Link to="/register">
          <span className="register-link">
            Don't have an account? Click here to create one!
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
