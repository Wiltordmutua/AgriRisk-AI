import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Add registration logic here
    console.log("Signup:", formData);
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
            Join thousands of farmers making smarter decisions with data-driven insights
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Create Account</h2>
            <p className="auth-form-subtitle">Get started with AgriRiskIQ today</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form signup">
            {/* Full Name Input */}
            <div className="auth-input-group">
              <label htmlFor="fullName" className="auth-input-label">
                Full Name
              </label>
              <div className="auth-input-wrapper">
                <div className="auth-input-icon">
                  <User />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="auth-input"
                  placeholder="John Doe"
                />
              </div>
            </div>

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

            {/* Phone Input */}
            <div className="auth-input-group">
              <label htmlFor="phone" className="auth-input-label">
                Phone Number
              </label>
              <div className="auth-input-wrapper">
                <div className="auth-input-icon">
                  <Phone />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="auth-input"
                  placeholder="+1 (555) 000-0000"
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

            {/* Confirm Password Input */}
            <div className="auth-input-group">
              <label htmlFor="confirmPassword" className="auth-input-label">
                Confirm Password
              </label>
              <div className="auth-input-wrapper">
                <div className="auth-input-icon">
                  <Lock />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="auth-input auth-input-with-toggle"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="auth-input-toggle"
                >
                  {showConfirmPassword ? (
                    <EyeOff />
                  ) : (
                    <Eye />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="auth-terms">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="auth-terms-checkbox"
              />
              <label htmlFor="terms" className="auth-terms-label">
                I agree to the{" "}
                <a href="#" className="auth-terms-link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="auth-terms-link">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="auth-submit-btn"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="auth-footer-text signup">
            Already have an account?{" "}
            <Link to="/login" className="auth-footer-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
