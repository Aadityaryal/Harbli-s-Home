// Login.jsx 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import api from '../utils/api';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    rememberMe: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      setAuthStatus({ type: '', message: '' });

      try {
        const endpoint = isLogin ? '/auth/login' : '/auth/register';
        const payload = isLogin 
          ? { email: formData.email, password: formData.password }
          : { email: formData.email, password: formData.password, name: formData.name };

        const response = await api.post(endpoint, payload);
        
        // Store token in localStorage if rememberMe is checked, otherwise in sessionStorage
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', response.data.token);
        storage.setItem('user', JSON.stringify(response.data.user));

        setAuthStatus({
          type: 'success',
          message: isLogin ? 'Login successful! Redirecting...' : 'Registration successful! Please login.'
        });

        if (isLogin) {
          // Redirect based on user role
          const role = response.data.user.role;
          setTimeout(() => {
            navigate(role === 'admin' ? '/admin' : '/dashboard');
          }, 1500);
        } else {
          // After registration, switch to login
          setTimeout(() => {
            setIsLogin(true);
          }, 1500);
        }
        
      } catch (error) {
        setAuthStatus({
          type: 'error',
          message: error.response?.data?.message || 
            (isLogin ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.')
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      rememberMe: false
    });
    setFormErrors({});
    setAuthStatus({ type: '', message: '' });
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Control your world, effortlessly</h1>
        <div className="auth-illustration">
          <svg className="auth-svg" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            {/* Background Elements */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgba(255,255,255,0.05)'}} />
                <stop offset="100%" style={{stopColor: 'rgba(255,255,255,0.02)'}} />
              </linearGradient>
            </defs>

            {/* Abstract Network Lines */}
            <g className="network-lines">
              <path d="M100,300 Q400,100 700,300" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="2" />
              <path d="M100,350 Q400,550 700,350" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="2" />
              <path d="M400,100 Q400,300 400,500" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="2" />
            </g>

            {/* Connection Points */}
            <g className="connection-points">
              {/* Left Points */}
              <circle cx="100" cy="300" r="8" fill="rgba(255,255,255,0.2)" />
              <circle cx="100" cy="350" r="8" fill="rgba(255,255,255,0.2)" />
              
              {/* Center Points */}
              <circle cx="400" cy="100" r="10" fill="rgba(255,255,255,0.3)" />
              <circle cx="400" cy="300" r="15" fill="rgba(255,255,255,0.3)" />
              <circle cx="400" cy="500" r="10" fill="rgba(255,255,255,0.3)" />
              
              {/* Right Points */}
              <circle cx="700" cy="300" r="8" fill="rgba(255,255,255,0.2)" />
              <circle cx="700" cy="350" r="8" fill="rgba(255,255,255,0.2)" />
            </g>

            {/* Pulse Animations */}
            <g className="pulse-rings">
              <circle cx="400" cy="300" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2">
                <animate attributeName="r" from="20" to="50" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="400" cy="300" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2">
                <animate attributeName="r" from="20" to="50" dur="2s" begin="0.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Floating Particles */}
            <g className="particles">
              {[...Array(20)].map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 800}
                  cy={Math.random() * 600}
                  r={Math.random() * 3}
                  fill="rgba(255,255,255,0.2)"
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.5;0.2"
                    dur={`${2 + Math.random() * 3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>

            {/* Decorative Hexagons */}
            <g className="hexagons" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1">
              <path d="M350,250 L380,270 L380,310 L350,330 L320,310 L320,270 Z" />
              <path d="M420,250 L450,270 L450,310 L420,330 L390,310 L390,270 Z" />
              <path d="M385,200 L415,220 L415,260 L385,280 L355,260 L355,220 Z" />
            </g>
          </svg>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-card">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to continue to your account' : 'Sign up to get started'}
          </p>
          
          {authStatus.message && (
            <div className={`status-message ${authStatus.type}`}>
              {authStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} noValidate>
            {!isLogin && (
              <div className={`form-group ${formErrors.name ? 'error' : ''}`}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && (
                  <span className="error-message">{formErrors.name}</span>
                )}
              </div>
            )}

            <div className={`form-group ${formErrors.email ? 'error' : ''}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={formErrors.email ? 'error' : ''}
              />
              {formErrors.email && (
                <span className="error-message">{formErrors.email}</span>
              )}
            </div>

            <div className={`form-group ${formErrors.password ? 'error' : ''}`}>
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={formErrors.password ? 'error' : ''}
                />
                {formErrors.password && (
                  <span className="error-message">{formErrors.password}</span>
                )}
              </div>
            </div>

            {!isLogin && (
              <div className={`form-group ${formErrors.confirmPassword ? 'error' : ''}`}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={formErrors.confirmPassword ? 'error' : ''}
                  />
                  {formErrors.confirmPassword && (
                    <span className="error-message">{formErrors.confirmPassword}</span>
                  )}
                </div>
              </div>
            )}

            {isLogin && (
              <div className="form-extras">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
            )}

            <button 
              type="submit" 
              className={`auth-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                isLogin ? 'Sign In' : 'Sign Up'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button"
                className="toggle-auth-mode" 
                onClick={toggleAuthMode}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;