import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    emailVerification: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.emailVerification) {
      newErrors.emailVerification = 'Please verify your email';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Store user in localStorage
      const userData = {
        name: formData.name,
        email: formData.email
      };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/general-questions');
    } else {
      setErrors(newErrors);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'var(--background)',
      padding: '20px'
    },
    formCard: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.95), rgba(23, 19, 22, 0.65))',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      borderRadius: '35px',
      padding: '50px 45px',
      width: '100%',
      maxWidth: '500px',
      boxShadow: `
        0 25px 80px rgba(0,0,0,0.5),
        0 0 120px rgba(255, 138, 0, 0.08),
        inset 0 0 80px rgba(255, 138, 0, 0.02)
      `,
      border: '1px solid rgba(255, 138, 0, 0.15)',
      position: 'relative',
      transform: 'translateY(0)',
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: 'var(--text)',
      marginBottom: '10px',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '16px',
      color: 'var(--muted)',
      marginBottom: '30px',
      textAlign: 'center'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      color: 'var(--muted)',
      fontSize: '13px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1.2px',
      opacity: 0.9
    },
    input: {
      width: '100%',
      padding: '15px 18px',
      fontSize: '16px',
      border: '2px solid rgba(255, 138, 0, 0.1)',
      borderRadius: '15px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      backgroundColor: 'rgba(15, 14, 16, 0.5)',
      color: 'var(--text)',
      backdropFilter: 'blur(10px)'
    },
    inputError: {
      borderColor: '#ff6b6b'
    },
    errorText: {
      color: '#ff6b6b',
      fontSize: '12px',
      marginTop: '5px'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '20px',
      marginBottom: '10px'
    },
    checkbox: {
      width: '20px',
      height: '20px',
      marginRight: '10px',
      cursor: 'pointer'
    },
    checkboxLabel: {
      fontSize: '14px',
      color: '#555',
      cursor: 'pointer'
    },
    signupButton: {
      width: '100%',
      padding: '18px',
      fontSize: '17px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '18px',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 12px 35px rgba(255, 138, 0, 0.35)',
      marginTop: '20px',
      textTransform: 'uppercase',
      letterSpacing: '1.8px',
      position: 'relative',
      overflow: 'hidden'
    },
    loginLink: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      color: '#666'
    },
    link: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Create Your Account</h2>
        <p style={styles.subtitle}>Join StudyAI and transform your learning</p>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.name ? styles.inputError : {})
              }}
              placeholder="Enter your full name"
            />
            {errors.name && <div style={styles.errorText}>{errors.name}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {})
              }}
              placeholder="Enter your email"
            />
            {errors.email && <div style={styles.errorText}>{errors.email}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {})
              }}
              placeholder="Create a password"
            />
            {errors.password && <div style={styles.errorText}>{errors.password}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? styles.inputError : {})
              }}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <div style={styles.errorText}>{errors.confirmPassword}</div>}
          </div>

          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="emailVerification"
              id="emailVerification"
              checked={formData.emailVerification}
              onChange={handleChange}
              style={styles.checkbox}
            />
            <label htmlFor="emailVerification" style={styles.checkboxLabel}>
              I verify that this is my valid email address
            </label>
          </div>
          {errors.emailVerification && <div style={styles.errorText}>{errors.emailVerification}</div>}

          <button 
            type="submit" 
            style={styles.signupButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#764ba2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
          >
            Sign Up
          </button>
        </form>

        <div style={styles.loginLink}>
          <p style={styles.subtitle}>Already have an account?</p> <Link to="/login" style={styles.link}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
