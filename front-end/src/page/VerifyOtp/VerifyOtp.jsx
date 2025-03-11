import React, { useState } from 'react';
import { verifyOtp, saveUser } from '../../api/apiService';
import './VerifyOtp.scss';

export default function VerifyOtp() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      setError('Email and OTP are required');
      return;
    }
    try {
      await verifyOtp(email, otp);
      await saveUser(email);
      alert('User registered successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="VerifyOtp" className="d-flex" style={{ marginTop: '50px' }}>
      <div className="container">
        <h2>Verify OTP</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleVerifyOtp}>
          <div className="input-container">
            Email:
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            OTP:
            <input
              className="input"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
}
