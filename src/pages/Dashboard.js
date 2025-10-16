import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Student');
  const [showChatbot, setShowChatbot] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.name) {
      setUserName(user.name);
    }

    // Close notifications when clicking outside
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-area')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const scrollToSection = (sectionIndex) => {
    setCurrentSection(sectionIndex);
    document.getElementById(`section-${sectionIndex}`).scrollIntoView({ 
      behavior: 'smooth' 
    });
  };


  const mockProgressData = {
    daily: [70, 85, 60, 90, 75, 80, 65],
    weekly: [75, 80, 70, 85],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      position: 'relative',
      overflow: 'hidden'
    },
    animatedBg: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 0
    },
    bgOrb: {
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(80px)',
      opacity: 0.15,
      animation: 'orbitFloat 30s infinite ease-in-out'
    },
    bgOrb1: {
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, var(--accent), transparent)',
      top: '-200px',
      left: '-200px'
    },
    bgOrb2: {
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, var(--accent-2), transparent)',
      bottom: '-150px',
      right: '-150px',
      animationDelay: '10s'
    },
    bgOrb3: {
      width: '350px',
      height: '350px',
      background: 'radial-gradient(circle, var(--accent), transparent)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animationDelay: '20s'
    },
    navbar: {
      height: '80px',
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.98), rgba(23, 19, 22, 0.95))',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      borderBottom: '1px solid rgba(255, 138, 0, 0.15)',
      zIndex: 1000,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0
    },
    navBrand: {
      fontSize: '26px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      cursor: 'pointer',
      letterSpacing: '-1px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    navMenu: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center'
    },
    navItem: {
      color: 'var(--muted)',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'color 0.3s'
    },
    notificationButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      color: 'var(--muted)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      marginRight: '10px',
      transition: 'background-color 0.3s'
    },
    profileButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'var(--accent)',
      color: 'var(--background)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    scrollContainer: {
      height: '100vh',
      overflowY: 'auto',
      scrollBehavior: 'smooth',
      paddingTop: '80px'
    },
    section: {
      minHeight: '100vh',
      padding: '60px 40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      boxSizing: 'border-box'
    },
    sectionIndicator: {
      position: 'fixed',
      right: '30px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 500,
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 138, 0, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '2px solid transparent'
    },
    activeDot: {
      backgroundColor: 'var(--accent)',
      border: '2px solid var(--accent-2)',
      boxShadow: '0 0 20px rgba(255, 138, 0, 0.6)'
    },
    heroSection: {
      background: 'transparent',
      color: 'var(--text)',
      position: 'relative',
      zIndex: 10
    },
    heroCard: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.95), rgba(23, 19, 22, 0.7))',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderRadius: '30px',
      padding: '60px',
      textAlign: 'center',
      maxWidth: '900px',
      border: '1px solid rgba(255, 138, 0, 0.2)',
      boxShadow: `
        0 30px 80px rgba(0,0,0,0.5),
        0 0 120px rgba(255, 138, 0, 0.08),
        inset 0 0 80px rgba(255, 138, 0, 0.02)
      `,
      position: 'relative',
      overflow: 'hidden'
    },
    heroGlow: {
      position: 'absolute',
      top: '-50%',
      right: '-30%',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle, rgba(255, 138, 0, 0.15), transparent 60%)',
      animation: 'pulseGlow 4s ease-in-out infinite',
      pointerEvents: 'none'
    },
    greeting: {
      fontSize: '52px',
      fontWeight: '900',
      background: 'linear-gradient(135deg, var(--text), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '20px',
      letterSpacing: '-2px',
      textShadow: '0 0 60px rgba(255, 138, 0, 0.4)'
    },
    dailyTip: {
      fontSize: '20px',
      marginBottom: '30px',
      lineHeight: '1.6'
    },
    tipBox: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: '15px',
      padding: '20px',
      fontSize: '18px',
      fontStyle: 'italic'
    },
    progressSection: {
      backgroundColor: 'var(--surface)'
    },
    sectionCard: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.85), rgba(23, 19, 22, 0.5))',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      borderRadius: '25px',
      padding: '45px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      boxShadow: `
        0 15px 50px rgba(0,0,0,0.4),
        0 0 80px rgba(255, 138, 0, 0.03)
      `,
      border: '1px solid rgba(255, 138, 0, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      overflow: 'hidden'
    },
    sectionCardHover: {
      transform: 'translateY(-10px) scale(1.02)',
      boxShadow: `
        0 25px 70px rgba(0,0,0,0.5),
        0 0 120px rgba(255, 138, 0, 0.1)
      `,
      borderColor: 'rgba(255, 138, 0, 0.3)'
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: 'var(--text)',
      marginBottom: '30px',
      textAlign: 'center'
    },
    progressChart: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      height: '200px',
      marginTop: '30px',
      padding: '20px',
      backgroundColor: 'var(--background)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 138, 0, 0.1)'
    },
    progressBar: {
      width: '40px',
      backgroundColor: 'var(--accent)',
      borderRadius: '5px 5px 0 0',
      transition: 'height 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    progressLabel: {
      marginTop: '10px',
      fontSize: '12px',
      color: 'var(--muted)'
    },
    featureIcon: {
      fontSize: '72px',
      marginBottom: '25px',
      display: 'inline-block',
      animation: 'float 6s ease-in-out infinite',
      filter: 'drop-shadow(0 10px 20px rgba(255, 138, 0, 0.3))'
    },
    featureDescription: {
      fontSize: '18px',
      color: 'var(--muted)',
      marginBottom: '30px',
      textAlign: 'center',
      maxWidth: '600px',
      lineHeight: '1.6'
    },
    actionButton: {
      padding: '18px 45px',
      fontSize: '16px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 10px 30px rgba(255, 138, 0, 0.4)',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      position: 'relative',
      overflow: 'hidden'
    },
    robotChatbot: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '60px',
      height: '60px',
      backgroundColor: 'var(--accent)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(255, 138, 0, 0.4)',
      transition: 'all 0.3s ease',
      animation: 'robotFloat 3s ease-in-out infinite'
    },
    robotFace: {
      fontSize: '30px',
      animation: 'robotBlink 4s ease-in-out infinite'
    },
    scheduleSection: {
      backgroundColor: 'var(--background)'
    },
    quizSection: {
      backgroundColor: 'var(--background)'
    },
    summarizerSection: {
      backgroundColor: 'var(--background)'
    },
    inputGroup: {
      width: '100%',
      maxWidth: '500px',
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid var(--muted)',
      borderRadius: '8px',
      outline: 'none',
      backgroundColor: 'var(--background)',
      color: 'var(--text)'
    },
    summaryBox: {
      backgroundColor: 'var(--surface)',
      borderRadius: '15px',
      padding: '20px',
      marginTop: '20px',
      whiteSpace: 'pre-line',
      fontSize: '16px',
      lineHeight: '1.6',
      color: 'var(--text)',
      maxWidth: '600px',
      width: '100%',
      border: '1px solid rgba(255, 138, 0, 0.1)'
    },
    endSection: {
      backgroundColor: 'var(--background)',
      minHeight: '50vh'
    },
    notificationCard: {
      backgroundColor: 'var(--surface)',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    notificationIcon: {
      fontSize: '24px'
    },
    notificationText: {
      flex: 1,
      fontSize: '14px',
      color: 'var(--muted)'
    },
    chatbot: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '350px',
      height: '450px',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 200
    },
    chatHeader: {
      backgroundColor: '#667eea',
      color: 'white',
      padding: '15px',
      borderRadius: '15px 15px 0 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    chatBody: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto'
    },
    chatInput: {
      display: 'flex',
      padding: '15px',
      borderTop: '1px solid #e0e0e0'
    },
    notificationDropdown: {
      position: 'absolute',
      top: '70px',
      right: '80px',
      width: '350px',
      backgroundColor: 'var(--surface)',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      zIndex: 200,
      maxHeight: '400px',
      overflowY: 'auto',
      border: '1px solid var(--muted)'
    },
    notificationHeader: {
      padding: '15px 20px',
      borderBottom: '1px solid var(--muted)',
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'var(--text)'
    },
    notificationItem: {
      padding: '12px 20px',
      borderBottom: '1px solid rgba(217, 194, 166, 0.1)',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    notificationItemHover: {
      backgroundColor: 'rgba(255, 138, 0, 0.1)'
    },
    '@keyframes robotFloat': {
      '0%, 100%': {
        transform: 'translateY(0px)'
      },
      '50%': {
        transform: 'translateY(-10px)'
      }
    },
    '@keyframes robotBlink': {
      '0%, 90%, 100%': {
        transform: 'scaleY(1)'
      },
      '95%': {
        transform: 'scaleY(0.1)'
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.animatedBg}>
        <div style={{...styles.bgOrb, ...styles.bgOrb1}}></div>
        <div style={{...styles.bgOrb, ...styles.bgOrb2}}></div>
        <div style={{...styles.bgOrb, ...styles.bgOrb3}}></div>
      </div>
      
      {/* Fixed Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navBrand} onClick={() => scrollToSection(0)}>
          <span style={{fontSize: '30px'}}>🎆</span>
          StudyBuddy
        </div>
        <div style={styles.navMenu}>
          <span style={styles.navItem} onClick={() => scrollToSection(0)}>Home</span>
          <span style={styles.navItem} onClick={() => scrollToSection(2)}>Schedule</span>
          <span style={styles.navItem} onClick={() => scrollToSection(4)}>Quiz</span>
          <span style={styles.navItem} onClick={() => scrollToSection(3)}>AI Tutor</span>
          <span style={styles.navItem} onClick={() => navigate('/about')}>About</span>
          <button 
            className="notification-area"
            style={styles.notificationButton} 
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            🔔
          </button>
          <button style={styles.profileButton} onClick={() => navigate('/profile')}>
            {userName.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>

      {/* Section Navigation Dots */}
      <div style={styles.sectionIndicator}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            style={{
              ...styles.dot,
              ...(currentSection === index ? styles.activeDot : {})
            }}
            onClick={() => scrollToSection(index)}
            title={[
              'Welcome',
              'Dashboard',
              'Schedule Generator',
              'AI Tutor',
              'Quiz Generator',
              'Site Info'
            ][index]}
          />
        ))}
      </div>


      {/* Scrollable Content */}
      <div style={styles.scrollContainer}>
        {/* Section 1: Greeting Section */}
        <div id="section-0" style={{ ...styles.section, ...styles.heroSection }}>
          <div style={styles.heroCard}>
            <div style={styles.heroGlow}></div>
            <h1 style={styles.greeting}>Welcome Back, {userName}! 👋</h1>
            <p style={styles.dailyTip}>Ready to continue your amazing learning journey?</p>
            <div style={{...styles.tipBox, background: 'rgba(255, 138, 0, 0.1)', borderLeft: '4px solid var(--accent)', borderRadius: '12px'}}>
              💡 Today's Focus: "Success is the sum of small efforts repeated day in and day out." - Robert Collier
            </div>
            <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button style={styles.actionButton} onClick={() => scrollToSection(1)}>
                View Dashboard
              </button>
              <button style={{...styles.actionButton, background: 'linear-gradient(135deg, var(--accent-2), var(--accent))'}} onClick={() => scrollToSection(2)}>
                Quick Start
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Dashboard with Performance & Graphs */}
        <div id="section-1" style={{ ...styles.section, ...styles.progressSection }}>
          <div style={{...styles.sectionCard, maxWidth: '1200px', width: '100%'}}>
            <h2 style={styles.sectionTitle}>📊 Performance Dashboard</h2>
            
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginBottom: '40px', width: '100%' }}>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.1)', borderRadius: '15px', padding: '25px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.2)' }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>📚</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--accent)' }}>23</div>
                <div style={{ fontSize: '16px', color: 'var(--muted)' }}>Study Hours This Week</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 200, 107, 0.1)', borderRadius: '15px', padding: '25px', textAlign: 'center', border: '1px solid rgba(255, 200, 107, 0.2)' }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>🎯</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--accent-2)' }}>87%</div>
                <div style={{ fontSize: '16px', color: 'var(--muted)' }}>Goal Completion</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.1)', borderRadius: '15px', padding: '25px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.2)' }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>🏆</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--accent)' }}>12</div>
                <div style={{ fontSize: '16px', color: 'var(--muted)' }}>Quizzes Completed</div>
              </div>
            </div>

            {/* Progress Chart */}
            <div style={styles.progressChart}>
              {mockProgressData.daily.map((value, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div 
                    style={{
                      ...styles.progressBar,
                      height: `${value * 2}px`
                    }}
                  >
                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>{value}%</span>
                  </div>
                  <div style={styles.progressLabel}>{mockProgressData.labels[index]}</div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: '25px', color: 'var(--muted)', fontSize: '18px' }}>
              🎉 Excellent progress! You're on track to achieve your learning goals!
            </p>
          </div>
        </div>


        {/* Section 3: Schedule Generator */}
        <div id="section-2" style={{ ...styles.section, ...styles.scheduleSection }}>
          <div style={{...styles.sectionCard, maxWidth: '1000px', width: '100%'}}>
            <div style={styles.featureIcon}>📅</div>
            <h2 style={styles.sectionTitle}>AI-Powered Schedule Generator</h2>
            <p style={styles.featureDescription}>
              Create personalized study schedules tailored to your exam dates, subjects, and available time.
              Our AI analyzes your learning patterns to optimize your study plan.
            </p>
            
            {/* Quick Schedule Options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px', marginBottom: '40px' }}>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚡</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Quick Schedule</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Generate in 30 seconds</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 200, 107, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 200, 107, 0.1)', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎯</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Exam Focused</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Target specific exams</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>📚</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Subject Based</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Organize by subjects</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                style={styles.actionButton}
                onClick={() => navigate('/schedule')}
              >
                Create New Schedule
              </button>
              <button 
                style={{...styles.actionButton, background: 'linear-gradient(135deg, var(--accent-2), var(--accent))'}}
                onClick={() => navigate('/my-schedules')}
              >
                View My Schedules
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: AI Tutor/Summarizer */}
        <div id="section-3" style={{ ...styles.section, ...styles.summarizerSection }}>
          <div style={{...styles.sectionCard, maxWidth: '1000px', width: '100%'}}>
            <div style={styles.featureIcon}>🤖</div>
            <h2 style={styles.sectionTitle}>AI Study Assistant & Tutor</h2>
            <p style={styles.featureDescription}>
              Your personal AI tutor is here to help! Get instant answers, video summaries, 
              concept explanations, and personalized study guidance powered by advanced AI.
            </p>
            
            {/* AI Features Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '30px', marginBottom: '40px' }}>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)' }}>
                <div style={{ fontSize: '28px', marginBottom: '15px' }}>💬</div>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)' }}>Ask Questions</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Get instant answers to your study questions</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 200, 107, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 200, 107, 0.1)' }}>
                <div style={{ fontSize: '28px', marginBottom: '15px' }}>📹</div>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)' }}>Video Summaries</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Summarize educational videos quickly</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)' }}>
                <div style={{ fontSize: '28px', marginBottom: '15px' }}>📄</div>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)' }}>Text Analysis</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Analyze and explain complex texts</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 200, 107, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 200, 107, 0.1)' }}>
                <div style={{ fontSize: '28px', marginBottom: '15px' }}>🎯</div>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)' }}>Study Tips</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Personalized learning strategies</div>
              </div>
            </div>

            <button 
              style={styles.actionButton}
              onClick={() => navigate('/ai-tutor')}
            >
              Launch AI Tutor
            </button>
          </div>
        </div>

        {/* Section 5: Quiz Generator */}
        <div id="section-4" style={{ ...styles.section, ...styles.quizSection }}>
          <div style={{...styles.sectionCard, maxWidth: '1000px', width: '100%'}}>
            <div style={styles.featureIcon}>📝</div>
            <h2 style={styles.sectionTitle}>Smart Quiz Generator</h2>
            <p style={styles.featureDescription}>
              Test your knowledge with AI-generated quizzes tailored to your subjects and difficulty level. 
              Track your progress and identify areas that need more attention.
            </p>
            
            {/* Quiz Types */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px', marginBottom: '40px' }}>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚡</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Quick Quiz</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>5-10 questions, 5 mins</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 200, 107, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 200, 107, 0.1)', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>📚</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Subject Quiz</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Topic-specific questions</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🏆</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Challenge Mode</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Advanced difficulty</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                style={styles.actionButton}
                onClick={() => navigate('/quiz')}
              >
                Generate Quiz
              </button>
              <button 
                style={{...styles.actionButton, background: 'linear-gradient(135deg, var(--accent-2), var(--accent))'}}
                onClick={() => navigate('/quizzes')}
              >
                View Quiz History
              </button>
            </div>
          </div>
        </div>

        {/* Section 6: Site Info & Navigation */}
        <div id="section-5" style={{ ...styles.section, ...styles.endSection, minHeight: '100vh', justifyContent: 'space-between', padding: '60px 40px 40px' }}>
          <div style={{...styles.sectionCard, maxWidth: '1200px', width: '100%', padding: '50px'}}>
            {/* Site Header */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎆</div>
              <h2 style={{...styles.sectionTitle, fontSize: '36px', marginBottom: '15px'}}>StudyBuddy</h2>
              <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
                Your intelligent learning companion powered by AI. Transforming the way you study, 
                one personalized lesson at a time.
              </p>
            </div>

            {/* Navigation Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '50px' }}>
              {/* Study Tools */}
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--accent)' }}>Study Tools</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }} onClick={() => navigate('/dashboard')}>🏠 Dashboard</span>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }} onClick={() => navigate('/schedule')}>📅 Schedule Generator</span>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }} onClick={() => navigate('/ai-tutor')}>🤖 AI Tutor</span>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }} onClick={() => navigate('/quiz')}>📝 Quiz Generator</span>
                </div>
              </div>

              {/* My Account */}
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--accent)' }}>My Account</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }} onClick={() => navigate('/profile')}>👤 Profile</span>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }} onClick={() => navigate('/my-schedules')}>📚 My Schedules</span>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }} onClick={() => navigate('/quizzes')}>🏆 My Quizzes</span>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }} onClick={() => navigate('/general-questions')}>❓ Help & Support</span>
                </div>
              </div>

              {/* About StudyBuddy */}
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--accent)' }}>About StudyBuddy</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }} onClick={() => navigate('/about')}>ℹ️ About Us</span>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }}>📧 Contact</span>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }}>🔒 Privacy Policy</span>
                  <span style={{ color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s' }}>📜 Terms of Service</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--accent)' }}>Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <button 
                    style={{...styles.actionButton, padding: '12px 24px', fontSize: '14px'}}
                    onClick={() => scrollToSection(0)}
                  >
                    Back to Top
                  </button>
                  <button 
                    style={{...styles.actionButton, padding: '12px 24px', fontSize: '14px', background: 'linear-gradient(135deg, var(--accent-2), var(--accent))'}}
                    onClick={() => navigate('/schedule')}
                  >
                    Quick Schedule
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid rgba(255, 138, 0, 0.2)', paddingTop: '30px', textAlign: 'center' }}>
              <p style={{ fontSize: '16px', color: 'var(--muted)', marginBottom: '15px' }}>
                Made with ❤️ for students worldwide
              </p>
              <p style={{ fontSize: '14px', color: 'var(--muted)', opacity: 0.7 }}>
                © 2024 StudyBuddy. All rights reserved. | Empowering minds through intelligent learning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="notification-area" style={styles.notificationDropdown}>
          <div style={styles.notificationHeader}>
            🔔 Notifications
          </div>
          <div 
            style={styles.notificationItem}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 138, 0, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>Daily Quiz Ready!</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Your personalized quiz for today is available</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', opacity: 0.7 }}>2 hours ago</div>
          </div>
          <div 
            style={styles.notificationItem}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 138, 0, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>New Study Material</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Physics Chapter 3 materials have been added</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', opacity: 0.7 }}>1 day ago</div>
          </div>
          <div 
            style={styles.notificationItem}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 138, 0, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>7-Day Streak! 🏆</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Congratulations on maintaining your study streak</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', opacity: 0.7 }}>2 days ago</div>
          </div>
        </div>
      )}

      {/* 3D Robot Chatbot - Hide when chat is open */}
      {!showChatbot && (
        <div 
          className="robot-float"
          style={styles.robotChatbot}
          onClick={() => setShowChatbot(!showChatbot)}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.15) translateY(-5px)';
            e.target.style.boxShadow = '0 8px 30px rgba(255, 138, 0, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) translateY(0px)';
            e.target.style.boxShadow = '0 4px 20px rgba(255, 138, 0, 0.4)';
          }}
        >
          <div className="robot-blink" style={styles.robotFace}>🤖</div>
        </div>
      )}

      {/* Chatbot Window */}
      {showChatbot && (
        <div style={{
          ...styles.chatbot,
          backgroundColor: 'var(--surface)',
          color: 'var(--text)'
        }}>
          <div style={{
            ...styles.chatHeader,
            backgroundColor: 'var(--accent)',
            color: 'var(--text)'
          }}>
            <span style={{ fontWeight: 'bold' }}>AI Study Assistant</span>
            <button 
              onClick={() => setShowChatbot(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '20px', cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
          <div style={styles.chatBody}>
            <p style={{ color: 'var(--muted)' }}>Hi! I'm your AI study assistant. How can I help you with your studies today? 🤖</p>
          </div>
          <div style={styles.chatInput}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              style={{ 
                flex: 1, 
                padding: '10px', 
                border: '1px solid var(--muted)', 
                borderRadius: '5px',
                backgroundColor: 'var(--background)',
                color: 'var(--text)'
              }}
            />
            <button style={{ 
              marginLeft: '10px', 
              padding: '10px 20px', 
              backgroundColor: 'var(--accent)', 
              color: 'var(--text)', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
