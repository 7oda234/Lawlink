import React from "react";
import "../../styles/auth/AuthBase.css";

const ResetPasswordPage = () => {
  return (
    <div className="auth-container">
      <div className="brand-sidebar">
        <div className="brand-content">
          <h1 className="brand-logo">LawLink</h1>
          <h2 className="welcome-text">Security First.</h2>
        </div>
      </div>
      <div className="form-section">
        <div className="auth-card">
          <h2 className="form-title">New Password</h2>
          <form className="auth-form">
            <div className="form-group">
              <label>New Password</label>
              <input type="password" className="law-input" placeholder="••••••••" />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" className="law-input" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn-law">Update Password &rarr;</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
