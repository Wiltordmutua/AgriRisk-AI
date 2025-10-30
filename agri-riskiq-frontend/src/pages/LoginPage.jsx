import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log("Login:", formData);
    // For now, just navigate to dashboard
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-layout">
      {/* Left Side - Image */}
      <div className="auth-image-section">
        <img
          src="/farmer-image.jpg"
          alt="Farmer with fresh produce"
          className="auth-image"
        />
        <div className="auth-image-overlay"></div>
        <div className="auth-image-content">
          <h1 className="auth-image-title">AgriRiskIQ</h1>
          <p className="auth-image-subtitle">
            Empowering farmers with intelligent risk assessment and management solutions
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Welcome Back</h2>
            <p className="auth-form-subtitle">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email Input */}
            <div className="auth-input-group">
              <label htmlFor="email" className="auth-input-label">
                Email Address
              </label>
              <div className="auth-input-wrapper">
                <div className="auth-input-icon">
                  <Mail />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="auth-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="auth-input-group">
              <label htmlFor="password" className="auth-input-label">
                Password
              </label>
              <div className="auth-input-wrapper">
                <div className="auth-input-icon">
                  <Lock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="auth-input auth-input-with-toggle"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-input-toggle"
                >
                  {showPassword ? (
                    <EyeOff />
                  ) : (
                    <Eye />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="auth-remember-forgot">
              <div className="auth-remember">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="auth-checkbox"
                />
                <label htmlFor="remember-me" className="auth-checkbox-label">
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="auth-forgot-link">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="auth-submit-btn"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-footer-link">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
