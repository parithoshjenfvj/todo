import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({ fullName: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = isLogin ? '/user/auth/login' : '/user/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { fullName: formData.fullName, email: formData.email, password: formData.password };
      
      const response = await axios.post(`http://localhost:3000${endpoint}`, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(response.data.message || 'Success! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      {/* Visual Hero Section */}
      <div className="auth-hero">
        <div className="auth-hero-content animate-fade-in-up">
          <h1 className="auth-hero-title">Stay Organized.</h1>
          <p className="auth-hero-subtitle">
            Join the simplest, most elegant way to manage your tasks and boost your productivity.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="auth-form-container">
        <div className="auth-card animate-slide-in" key={isLogin ? 'login' : 'register'}>
          <div className="auth-header">
            <h2 className="auth-title">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
            <p className="auth-subtitle">
              {isLogin ? 'Enter your details to log in to your account.' : 'Sign up to get started with your to-do list.'}
            </p>
          </div>

          {error && (
            <div className="message-banner message-error animate-fade-in-up">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {success && (
            <div className="message-banner message-success animate-fade-in-up">
              <CheckCircle size={18} />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <label className="form-label" htmlFor="fullName">Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-input"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="form-group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label className="form-label" htmlFor="email">Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary animate-fade-in-up" 
              style={{ animationDelay: '0.4s' }}
              disabled={loading}
            >
              {loading ? (
                <Loader size={20} className="spinner" />
              ) : (
                <>
                  {isLogin ? 'Log In' : 'Sign Up'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-toggle animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button type="button" className="auth-toggle-link" onClick={toggleAuthMode}>
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
