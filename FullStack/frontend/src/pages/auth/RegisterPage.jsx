import React from "react";
import { Link } from "react-router-dom";
import "../../styles/auth/AuthBase.css";

const RegisterPage = () => {
  return (
    <div className="auth-container">
      <div className="brand-sidebar">
        <div className="brand-content">
          <h1 className="brand-logo">LawLink</h1>
          <h2 className="welcome-text">Join LawLink.</h2>
          <p className="brand-tagline">Redefining legal access through intelligent technology.</p>
        </div>
      </div>
      <div className="form-section">
        <div className="auth-card">
          <h2 className="form-title">Create Account</h2>
          <form className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="law-input" placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="law-input" placeholder="name@example.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="law-input" placeholder="Create a password" />
            </div>
            <button type="submit" className="btn-law">Register &rarr;</button>
          </form>
          <p className="footer-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
