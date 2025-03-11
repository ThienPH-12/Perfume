import React, { useContext, useEffect } from 'react';
import './About.scss';
import { AuthContext } from '../../context/AuthContext';

export default function About() {
    const { checkAuth } = useContext(AuthContext);
  
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);
  
  return (
    <div id="About" className="d-flex" style={{ marginTop: '50px' }}>
      <div className="container">
        <h2>About Us</h2>
        <p>Welcome to our website. We are dedicated to providing the best service possible.</p>
      </div>
    </div>
  );
}
