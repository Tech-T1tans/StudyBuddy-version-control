import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
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
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Store user in localStorage
      const userData = {
        name: formData.email.split('@')[0], // Extract name from email
        email: formData.email
      };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard');
    } else {
      setErrors(newErrors);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality will be available soon!');
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'var(--background)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    },
    animatedBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0
    },
    floatingOrb: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, var(--accent-2), var(--accent))',
      filter: 'blur(60px)',
      opacity: 0.2,
      animation: 'orbitFloat 20s infinite ease-in-out'
    },
    orb1: {
      width: '300px',
      height: '300px',
      top: '-100px',
      left: '-100px',
      animationDelay: '0s'
    },
    orb2: {
      width: '200px',
      height: '200px',
      bottom: '-50px',
      right: '-50px',
      animationDelay: '7s'
    },
    orb3: {
      width: '250px',
      height: '250px',
      top: '50%',
      left: '50%',
      animationDelay: '14s'
    },
    formCard: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '30px',
      padding: '50px 45px',
      width: '100%',
      maxWidth: '450px',
      boxShadow: `
        0 20px 60px rgba(0,0,0,0.5),
        0 0 100px rgba(255, 138, 0, 0.1),
        inset 0 0 60px rgba(255, 138, 0, 0.02)
      `,
      border: '1px solid rgba(255, 138, 0, 0.2)',
      position: 'relative',
      zIndex: 10,
      transform: 'translateY(0)',
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    formCardGlow: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      right: '-50%',
      bottom: '-50%',
      background: 'radial-gradient(circle, rgba(255, 138, 0, 0.1), transparent 70%)',
      filter: 'blur(40px)',
      zIndex: -1,
      opacity: 0,
      transition: 'opacity 0.5s ease'
    },
    logo: {
      width: '80px',
      height: '80px',
      margin: '0 auto 25px',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      borderRadius: '25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '40px',
      boxShadow: `
        0 10px 30px rgba(255, 138, 0, 0.3),
        0 0 60px rgba(255, 138, 0, 0.2)
      `,
      animation: 'float 6s ease-in-out infinite'
    },
    title: {
      fontSize: '36px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, var(--text) 0%, var(--accent-2) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '10px',
      textAlign: 'center',
      letterSpacing: '-1px',
      textShadow: '0 0 40px rgba(255, 138, 0, 0.3)'
    },
    subtitle: {
      fontSize: '16px',
      color: 'var(--muted)',
      marginBottom: '40px',
      textAlign: 'center',
      opacity: 0.9,
      letterSpacing: '0.5px'
    },
    formGroup: {
      marginBottom: '25px',
      position: 'relative'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: 'var(--muted)',
      marginBottom: '10px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      opacity: 0.8
    },
    inputWrapper: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '20px',
      opacity: 0.5,
      transition: 'opacity 0.3s ease'
    },
    input: {
      width: '100%',
      padding: '16px 16px 16px 48px',
      fontSize: '16px',
      border: '2px solid rgba(255, 138, 0, 0.1)',
      borderRadius: '15px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      backgroundColor: 'rgba(15, 14, 16, 0.6)',
      color: 'var(--text)',
      backdropFilter: 'blur(10px)'
    },
    inputFocused: {
      borderColor: 'var(--accent)',
      backgroundColor: 'rgba(15, 14, 16, 0.8)',
      boxShadow: `
        0 0 30px rgba(255, 138, 0, 0.2),
        inset 0 0 20px rgba(255, 138, 0, 0.05)
      `,
      transform: 'scale(1.01)'
    },
    inputError: {
      borderColor: '#ff6b6b'
    },
    error: {
      color: '#ff6b6b',
      fontSize: '14px',
      marginTop: '5px'
    },
    loginButton: {
      width: '100%',
      padding: '18px',
      fontSize: '18px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: `
        0 10px 30px rgba(255, 138, 0, 0.3),
        0 0 60px rgba(255, 138, 0, 0.1)
      `,
      marginTop: '35px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      position: 'relative',
      overflow: 'hidden'
    },
    loginButtonShine: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s'
    },
    forgotPassword: {
      display: 'block',
      textAlign: 'right',
      color: 'var(--text)',
      fontSize: '14px',
      textDecoration: 'none',
      marginTop: '10px',
      cursor: 'pointer'
    },
    divider: {
      textAlign: 'center',
      margin: '20px 0',
      color: '#999',
      fontSize: '14px'
    },
    signupLink: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      color: 'var(--muted)'
    },
    link: {
      color: 'var(--accent)',
      textDecoration: 'none',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background Orbs */}
      <div style={styles.animatedBg}>
        <div style={{...styles.floatingOrb, ...styles.orb1}}></div>
        <div style={{...styles.floatingOrb, ...styles.orb2}}></div>
        <div style={{...styles.floatingOrb, ...styles.orb3}}></div>
      </div>
      
      <div style={styles.formCard}>
        <div style={styles.formCardGlow}></div>
        
        {/* Logo */}
        <div style={styles.logo}>🚀</div>
        
        <h2 style={styles.title}>Welcome Back!</h2>
        <p style={styles.subtitle}>Continue your learning journey</p>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>📧</span>
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
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 30px rgba(255, 138, 0, 0.2), inset 0 0 20px rgba(255, 138, 0, 0.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 138, 0, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            {errors.email && <div style={styles.error}>{errors.email}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.password ? styles.inputError : {})
                }}
                placeholder="Enter your password"
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 30px rgba(255, 138, 0, 0.2), inset 0 0 20px rgba(255, 138, 0, 0.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 138, 0, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            {errors.password && <div style={styles.error}>{errors.password}</div>}
          </div>

          <a style={styles.forgotPassword} onClick={handleForgotPassword}>
            Forgot Password?
          </a>

          <button 
            type="submit" 
            style={styles.loginButton}
            onMouseEnter={(e) => {
              const shine = e.target.querySelector('.shine');
              if (shine) shine.style.left = '100%';
            }}
          >
            <span style={{position: 'relative', zIndex: 1}}>LOGIN</span>
            <span className="shine" style={styles.loginButtonShine}></span>
          </button>
        </form>

        <div style={styles.signupLink}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
