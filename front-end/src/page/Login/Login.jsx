import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.scss';

const Login = () => {
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateIdentifier(credentials.identifier)) {
      try {
        setError('');
        await login(credentials);
        navigate('/');
      } catch (err) {
        setError('Invalid username/email or password.');
      }
    } else {
      setError('Please enter a valid username or email.');
    }
  };

  const validateIdentifier = (identifier) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(identifier) || /^[a-zA-Z0-9_]+$/.test(identifier);
  };

  return (
    <div id="Login" className="d-flex" style={{ marginTop: '50px' }}>
      <div className="container">
        <h2>Đăng nhập</h2>
         <div className="error-message">{error}</div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              className="input"
              type="text"
              name="identifier"
              placeholder="Tên tài khoản hoặc địa chỉ email *"
              value={credentials.identifier}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>
          <div className="input-container">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Mật khẩu *"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
