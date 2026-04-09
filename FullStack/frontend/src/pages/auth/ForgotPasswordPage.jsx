// ═══════════════════════════════════════════════════════════════════════════════════
// Forgot Password Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة استرجاع كلمة السر - Forgot Password flow
// Authentication page for password recovery.
// ───────────────────────────────────────────────────────────────────────────────────
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/auth/AuthBase.css";

const ForgotPasswordPage = () => {
  // 📍 Return section starts here
  return (
    <div className="auth-container">
      <div className="brand-sidebar">
        <div className="brand-content">
          <h1 className="brand-logo">LawLink</h1>
          <h2 className="welcome-text">Recover Access.</h2>
        </div>
      </div>
      <div className="form-section">
        <div className="auth-card">
          <h2 className="form-title">Reset Password</h2>
          <p className="form-subtitle">Enter your email to receive a reset link.</p>
          <form className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="law-input" placeholder="name@example.com" />
            </div>
            <button type="submit" className="btn-law">Send Link &rarr;</button>
          </form>
          <p className="footer-link">
            <Link to="/login">&larr; Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
