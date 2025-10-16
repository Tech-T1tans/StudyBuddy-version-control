import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Student');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.name) {
      setUserName(user.name);
    }
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleLetsStudy = () => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: 'var(--background)',
      position: 'relative',
      overflow: 'hidden'
    },
    particleContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    },
    particle: {
      position: 'absolute',
      width: '4px',
      height: '4px',
      background: 'var(--accent)',
      borderRadius: '50%',
      opacity: 0.6,
      animation: 'particleFloat 15s linear infinite'
    },
    centerOrb: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      height: '600px',
      background: 'radial-gradient(circle, rgba(255, 138, 0, 0.1) 0%, transparent 70%)',
      filter: 'blur(100px)',
      animation: 'pulseGlow 4s ease-in-out infinite'
    },
    card: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.95), rgba(23, 19, 22, 0.7))',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderRadius: '35px',
      padding: '60px 50px',
      maxWidth: '550px',
      width: '100%',
      boxShadow: `
        0 30px 100px rgba(0,0,0,0.5),
        0 0 150px rgba(255, 138, 0, 0.05),
        inset 0 0 100px rgba(255, 138, 0, 0.01)
      `,
      border: '1px solid rgba(255, 138, 0, 0.2)',
      textAlign: 'center',
      position: 'relative',
      transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
      opacity: isLoaded ? 1 : 0,
      transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    logo: {
      width: '120px',
      height: '120px',
      margin: '0 auto 30px',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      borderRadius: '35px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '60px',
      boxShadow: `
        0 15px 40px rgba(255, 138, 0, 0.4),
        0 0 80px rgba(255, 138, 0, 0.2)
      `,
      animation: 'float 6s ease-in-out infinite',
      position: 'relative'
    },
    logoGlow: {
      position: 'absolute',
      top: '-20px',
      left: '-20px',
      right: '-20px',
      bottom: '-20px',
      background: 'radial-gradient(circle, rgba(255, 138, 0, 0.4), transparent 70%)',
      filter: 'blur(30px)',
      animation: 'pulseGlow 3s ease-in-out infinite'
    },
    title: {
      fontSize: '48px',
      fontWeight: '900',
      background: 'linear-gradient(135deg, var(--text) 0%, var(--accent-2) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '15px',
      letterSpacing: '-2px',
      textShadow: '0 0 80px rgba(255, 138, 0, 0.5)',
      animation: 'neonGlow 3s ease-in-out infinite alternate'
    },
    greeting: {
      fontSize: '24px',
      color: 'var(--muted)',
      marginBottom: '20px'
    },
    description: {
      fontSize: '18px',
      color: 'var(--muted)',
      marginBottom: '30px',
      lineHeight: '1.6'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    primaryButton: {
      padding: '20px 50px',
      fontSize: '18px',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '20px',
      fontWeight: '800',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 15px 40px rgba(255, 138, 0, 0.4)',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      position: 'relative',
      overflow: 'hidden',
      marginTop: '10px'
    },
    secondaryButton: {
      padding: '12px 30px',
      fontSize: '14px',
      backgroundColor: 'transparent',
      color: 'var(--muted)',
      border: '2px solid rgba(255, 138, 0, 0.3)',
      borderRadius: '15px',
      fontWeight: '600',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      alignSelf: 'center',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      backdropFilter: 'blur(10px)'
    },
    footer: {
      marginTop: '30px',
      fontSize: '14px',
      color: '#999'
    },
    link: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: 'bold'
    }
  };

  // Generate random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 15}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  }));

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.centerOrb}></div>
      <div style={styles.particleContainer}>
        {particles.map(p => (
          <div
            key={p.id}
            style={{
              ...styles.particle,
              left: p.left,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration
            }}
          />
        ))}
      </div>

      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoGlow}></div>
          🚀
        </div>
        <h1 style={styles.title}>StudyAI</h1>
        <h2 style={styles.greeting}>Welcome back, {userName}! ✨</h2>
        <p style={styles.description}>
          Transform your learning journey with AI-powered study tools.
          Personalized schedules, smart quizzes, and instant summaries.
        </p>
        <div style={styles.buttonContainer}>
          <button 
            style={styles.primaryButton}
            onClick={handleLetsStudy}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 20px 60px rgba(255, 138, 0, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 15px 40px rgba(255, 138, 0, 0.4)';
            }}
          >
            START JOURNEY
          </button>
          <button 
            style={styles.secondaryButton}
            onClick={() => navigate('/about')}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--accent)';
              e.target.style.color = 'var(--accent)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(255, 138, 0, 0.3)';
              e.target.style.color = 'var(--muted)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
