import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import notificationService from '../services/notificationService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Student');
  const [isNewUser, setIsNewUser] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  // Memoized scrollbar width calculation
  const scrollbarWidth = useMemo(() => {
    const div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.overflow = 'scroll';
    div.style.position = 'absolute';
    div.style.top = '-9999px';
    document.body.appendChild(div);
    const width = div.offsetWidth - div.clientWidth;
    div.remove();
    return width;
  }, []);

  // Handle chat open/close with body scroll lock
  const handleChatToggle = (isOpen) => {
    if (isOpen) {
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      document.body.classList.add('chat-open');
    } else {
      document.body.classList.remove('chat-open');
      document.documentElement.style.removeProperty('--scrollbar-width');
    }
    setShowChatbot(isOpen);
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  // Load notifications on mount and when notifications panel opens
  useEffect(() => {
    // Sync notifications for current user
    notificationService.syncNotifications();
    loadNotifications();
    
    // Cleanup old user notifications (keep only current user)
    notificationService.cleanupOldNotifications();
    
    // Check if user is new and send welcome journey
    if (notificationService.isNewUser()) {
      notificationService.sendWelcomeJourney();
      // Reload after welcome journey
      setTimeout(() => {
        loadNotifications();
      }, 500);
    }
    
    // Check profile completion after a delay
    setTimeout(() => {
      notificationService.checkProfileCompletion();
      loadNotifications();
    }, 10000); // Check after 10 seconds
  }, []);

  const loadNotifications = () => {
    const allNotifications = notificationService.getAllNotifications();
    setNotifications(allNotifications);
    setUnreadCount(notificationService.getUnreadCount());
  };

  // Listen for notification changes in real-time
  useEffect(() => {
    // Add listener for notification updates
    notificationService.addListener(loadNotifications);

    // Cleanup listener on unmount
    return () => {
      notificationService.removeListener(loadNotifications);
    };
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userType = localStorage.getItem('userType'); // 'signup' or 'login'
    
    if (user.name) {
      setUserName(user.name);
    }
    
    // Check if user came from signup (new user) or login (returning user)
    setIsNewUser(userType === 'signup');

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

  // Notification handlers
  const handleNotificationClick = (notification) => {
    notificationService.markAsRead(notification.id);
    loadNotifications();
    
    // Navigate to route if specified
    if (notification.route) {
      setShowNotifications(false);
      navigate(notification.route);
    }
  };

  const handleMarkAllAsRead = () => {
    notificationService.markAllAsRead();
    loadNotifications();
  };

  const handleDeleteNotification = (e, notificationId) => {
    e.stopPropagation();
    notificationService.deleteNotification(notificationId);
    loadNotifications();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      notificationService.clearAll();
      loadNotifications();
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      loadNotifications();
    }
  };

  // Detect current section on scroll
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollContainer = e.target;
      const sections = document.querySelectorAll('[id^="section-"]');
      const containerRect = scrollContainer.getBoundingClientRect();
      const scrollTop = scrollContainer.scrollTop;
      const viewportMiddle = scrollTop + containerRect.height / 2;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100; // Account for navbar
        const sectionBottom = sectionTop + section.offsetHeight;

        if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
          setCurrentSection(index);
        }
      });
    };

    // Add scroll listener to the scrollable container
    const scrollContainer = document.getElementById('scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);


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
      height: '70px',
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.7), rgba(15, 14, 16, 0.75))',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 50px',
      margin: '15px 30px',
      borderRadius: '50px',
      boxShadow: '0 15px 50px rgba(0,0,0,0.6), 0 0 100px rgba(255, 138, 0, 0.1), inset 0 0 50px rgba(255, 138, 0, 0.05)',
      border: '1px solid rgba(255, 138, 0, 0.2)',
      zIndex: 1000,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      overflow: 'hidden'
    },
    navBrand: {
      fontSize: '26px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      position: 'relative'
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
      border: '1px solid rgba(255, 138, 0, 0.2)',
            fontSize: '18px',
      marginRight: '10px',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      overflow: 'visible'
    },
    notificationBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: '#ff4444',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '11px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid var(--background)',
      boxShadow: '0 2px 8px rgba(255, 68, 68, 0.5)',
      animation: 'pulse 2s infinite'
    },
    profileButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'var(--accent)',
      color: 'var(--background)',
      border: '1px solid rgba(255, 138, 0, 0.3)',
            fontSize: '18px',
      fontWeight: 'bold',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      overflow: 'hidden'
    },
    scrollContainer: {
      height: '100vh',
      overflowY: 'auto',
      scrollBehavior: 'smooth',
      paddingTop: '100px'
    },
    section: {
      minHeight: '80vh',
      padding: '40px 30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      boxSizing: 'border-box',
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
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 138, 0, 0.2)',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      border: '2px solid rgba(255, 138, 0, 0.3)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    activeDot: {
      backgroundColor: 'transparent',
      border: '2px solid var(--accent)',
      boxShadow: '0 0 25px rgba(255, 138, 0, 0.8), inset 0 0 15px rgba(255, 138, 0, 0.2)'
    },
    goldenBall: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, #ffd700, #ffaa00)',
      boxShadow: '0 0 15px rgba(255, 215, 0, 0.8), 0 0 25px rgba(255, 170, 0, 0.4)',
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
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
      left: '30px',
      width: '60px',
      height: '60px',
      backgroundColor: 'var(--accent)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
    chatOverlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      padding: '16px',
      zIndex: 9999,
      pointerEvents: 'auto'
    },
    chatPanel: {
      width: '380px',
      maxWidth: 'calc(100vw - 32px)',
      height: '450px',
      maxHeight: 'calc(100vh - 120px)',
      backgroundColor: 'var(--surface)',
      borderRadius: '25px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 100px rgba(255, 138, 0, 0.2)',
      border: '3px solid var(--accent)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      marginLeft: '14px',
      marginBottom: '80px',
      animation: 'slideIn 0.3s ease-out',
      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: '-15px',
        right: '30px',
        width: '0',
        height: '0',
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderTop: '15px solid var(--accent)'
      }
    },
    chatHeader: {
      backgroundColor: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      padding: '20px',
      borderRadius: '22px 22px 0 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '2px solid rgba(255, 138, 0, 0.3)'
    },
    chatBody: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      overflowX: 'hidden',
      minHeight: 0
    },
    chatInput: {
      display: 'flex',
      padding: '15px',
      borderTop: '1px solid #e0e0e0'
    },
    notificationDropdown: {
      position: 'fixed',
      top: '80px',
      right: '20px',
      width: '380px',
      backgroundColor: 'var(--surface)',
      borderRadius: '25px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 100px rgba(255, 138, 0, 0.2)',
      zIndex: 10000,
      maxHeight: '500px',
      overflowY: 'auto',
      border: '3px solid var(--accent)'
    },
    notificationHeader: {
      padding: '15px 20px',
      borderBottom: '2px solid rgba(255, 138, 0, 0.2)',
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'var(--text)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      backgroundColor: 'var(--surface)',
      zIndex: 1,
      borderRadius: '25px 25px 0 0'
    },
    notificationActions: {
      display: 'flex',
      gap: '10px',
      fontSize: '12px'
    },
    notificationActionBtn: {
      background: 'linear-gradient(135deg, rgba(255, 138, 0, 0.1), rgba(255, 200, 107, 0.1))',
      border: '1px solid rgba(255, 138, 0, 0.3)',
      color: 'var(--accent)',
      cursor: 'pointer',
      fontSize: '10px',
      fontWeight: '700',
      padding: '4px 10px',
      borderRadius: '12px',
      transition: 'all 0.3s',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: '0 2px 8px rgba(255, 138, 0, 0.15)'
    },
    notificationItem: {
      padding: '15px 20px',
      borderBottom: '1px solid rgba(217, 194, 166, 0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s',
      position: 'relative',
      display: 'flex',
      gap: '12px'
    },
    notificationItemUnread: {
      backgroundColor: 'rgba(255, 138, 0, 0.05)',
      borderLeft: '4px solid var(--accent)'
    },
    notificationIcon: {
      fontSize: '24px',
      flexShrink: 0
    },
    notificationContent: {
      flex: 1,
      minWidth: 0
    },
    notificationDelete: {
      background: 'rgba(255, 68, 68, 0.1)',
      border: '1px solid rgba(255, 68, 68, 0.2)',
      color: '#ff4444',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      padding: '2px 6px',
      opacity: 0.7,
      transition: 'all 0.3s',
      flexShrink: 0,
      borderRadius: '8px',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    emptyNotifications: {
      padding: '40px 20px',
      textAlign: 'center',
      color: 'var(--muted)',
      fontSize: '14px'
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
      
      {/* Fixed Navbar with Shining Effect */}
      <div 
        style={styles.navbar}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = '0 20px 60px rgba(0,0,0,0.8), 0 0 150px rgba(255, 138, 0, 0.3), inset 0 0 80px rgba(255, 138, 0, 0.1)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = '0 15px 50px rgba(0,0,0,0.6), 0 0 100px rgba(255, 138, 0, 0.1), inset 0 0 50px rgba(255, 138, 0, 0.05)';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        {/* Shining Effect Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            animation: 'shine 3s infinite',
            pointerEvents: 'none'
          }}
        />
        
        <div 
          style={styles.navBrand} 
          onClick={() => scrollToSection(0)}
          onMouseEnter={(e) => {
            e.target.style.textShadow = '0 0 30px rgba(255, 138, 0, 0.8)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.textShadow = 'none';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <span style={{fontSize: '30px'}}>🎆</span>
          StudyBuddy
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <span style={styles.navItem} onClick={() => scrollToSection(0)}>Home</span>
          <span style={styles.navItem} onClick={() => scrollToSection(2)}>Schedule</span>
          <span style={styles.navItem} onClick={() => scrollToSection(4)}>Quiz</span>
          <span style={styles.navItem} onClick={() => scrollToSection(3)}>AI Tutor</span>
          <span style={styles.navItem} onClick={() => navigate('/about')}>About Us</span>
          <button 
            className="notification-area"
            style={styles.notificationButton} 
            onClick={toggleNotifications}
            title="Notifications"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 138, 0, 0.2)';
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 138, 0, 0.5)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🔔
            {unreadCount > 0 && (
              <span style={styles.notificationBadge}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <button 
            style={styles.profileButton} 
            onClick={() => navigate('/profile')}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 25px rgba(255, 138, 0, 0.8)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'scale(1)';
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>

      {/* Section Navigation Dots with Golden Ball */}
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
          >
            {currentSection === index && (
              <div style={styles.goldenBall}></div>
            )}
          </div>
        ))}
      </div>


      {/* Scrollable Content */}
      <div id="scroll-container" style={styles.scrollContainer}>
        {/* Section 1: Greeting Section */}
        <div id="section-0" style={{ ...styles.section, ...styles.heroSection }}>
          <div style={styles.heroCard}>
            <div style={styles.heroGlow}></div>
            <h1 style={styles.greeting}>
              {isNewUser ? `Welcome, ${userName}! 👋` : `Welcome Back, ${userName}! 👋`}
            </h1>
              <p style={styles.dailyTip}>Ready to continue your amazing learning journey?</p>
            <div style={{...styles.tipBox, background: 'rgba(255, 138, 0, 0.1)', borderLeft: '4px solid var(--accent)', borderRadius: '12px', marginBottom: '0px'}}>
              💡 Today's Focus: "Success is the sum of small efforts repeated day in and day out." - Robert Collier
            </div>
            {/* Scroll Down Animation */}
            <div style={{ marginTop: '-5px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  style={{ 
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30px',
                    height: '30px'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    width: '14px',
                    height: '4px',
                    opacity: 0,
                    transform: 'scale(0.3)',
                    animation: 'moveChevron1 3s ease-out infinite'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '50%',
                      background: '#c0c0c0',
                      transform: 'skewY(30deg)',
                      filter: 'drop-shadow(0 0 8px rgba(255, 138, 0, 0.6))'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      height: '100%',
                      width: '50%',
                      background: '#c0c0c0',
                      transform: 'skewY(-30deg)',
                      filter: 'drop-shadow(0 0 8px rgba(255, 138, 0, 0.6))'
                    }}></div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    width: '14px',
                    height: '4px',
                    opacity: 0,
                    transform: 'scale(0.3)',
                    animation: 'moveChevron2 3s ease-out infinite'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '50%',
                      background: '#c0c0c0',
                      transform: 'skewY(30deg)',
                      filter: 'drop-shadow(0 0 8px rgba(255, 138, 0, 0.6))'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      height: '100%',
                      width: '50%',
                      background: '#c0c0c0',
                      transform: 'skewY(-30deg)',
                      filter: 'drop-shadow(0 0 8px rgba(255, 138, 0, 0.6))'
                    }}></div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    width: '14px',
                    height: '4px',
                    opacity: 0,
                    transform: 'scale(0.3)',
                    animation: 'moveChevron3 3s ease-out infinite'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '50%',
                      background: '#c0c0c0',
                      transform: 'skewY(30deg)',
                      filter: 'drop-shadow(0 0 8px rgba(255, 138, 0, 0.6))'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      height: '100%',
                      width: '50%',
                      background: '#c0c0c0',
                      transform: 'skewY(-30deg)',
                      filter: 'drop-shadow(0 0 8px rgba(255, 138, 0, 0.6))'
                    }}></div>
                  </div>
                </div>
                <p 
                  style={{ 
                    fontSize: '16px', 
                    color: 'var(--muted)', 
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => scrollToSection(1)}
                >
                  Scroll down to explore more!
                </p>
              </div>
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
            
            {/* Quick Schedule Options - Horizontal Layout */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '30px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)', cursor: 'pointer', minWidth: '180px', flex: '1', maxWidth: '220px' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚡</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Quick Schedule</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Generate in 30 seconds</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 200, 107, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 200, 107, 0.1)', cursor: 'pointer', minWidth: '180px', flex: '1', maxWidth: '220px' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎯</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Exam Focused</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Target specific exams</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)', cursor: 'pointer', minWidth: '180px', flex: '1', maxWidth: '220px' }}>
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
            
            {/* AI Features - Horizontal Layout */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)', minWidth: '160px', flex: '1', maxWidth: '200px' }}>
                <div style={{ fontSize: '28px', marginBottom: '15px' }}>💬</div>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)' }}>Ask Questions</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Get instant answers to your study questions</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 200, 107, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 200, 107, 0.1)', minWidth: '160px', flex: '1', maxWidth: '200px' }}>
                <div style={{ fontSize: '28px', marginBottom: '15px' }}>📹</div>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)' }}>Video Summaries</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Summarize educational videos quickly</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)', minWidth: '160px', flex: '1', maxWidth: '200px' }}>
                <div style={{ fontSize: '28px', marginBottom: '15px' }}>📄</div>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)' }}>Text Analysis</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Analyze and explain complex texts</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 200, 107, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 200, 107, 0.1)', minWidth: '160px', flex: '1', maxWidth: '200px' }}>
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
            
            {/* Quiz Types - Horizontal Layout */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '30px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)', cursor: 'pointer', minWidth: '180px', flex: '1', maxWidth: '220px' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚡</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Quick Quiz</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>5-10 questions, 5 mins</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 200, 107, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 200, 107, 0.1)', cursor: 'pointer', minWidth: '180px', flex: '1', maxWidth: '220px' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>📚</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Subject Quiz</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Topic-specific questions</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 138, 0, 0.05)', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255, 138, 0, 0.1)', cursor: 'pointer', minWidth: '180px', flex: '1', maxWidth: '220px' }}>
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
        <div id="section-5" style={{ ...styles.section, ...styles.endSection, minHeight: '30vh', justifyContent: 'center', padding: '15px 10px' }}>
          <div style={{...styles.sectionCard, maxWidth: '1200px', width: '100%', padding: '40px 30px'}}>
            {/* Site Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎆</div>
              <h2 style={{...styles.sectionTitle, fontSize: '36px', marginBottom: '15px'}}>StudyBuddy</h2>
              <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
                Your intelligent learning companion powered by AI. Transforming the way you study, 
                one personalized lesson at a time.
              </p>
            </div>

            {/* Horizontal Navigation Layout */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', marginBottom: '40px', flexWrap: 'wrap' }}>
              {/* My Account */}
              <div style={{ flex: '1', minWidth: '250px', textAlign: 'center' }}>
                <h3 
                  style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    marginBottom: '30px', 
                    color: 'var(--accent)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow = '0 0 20px rgba(255, 138, 0, 0.8)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  My Account
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                  {[
                    { icon: '👤', text: 'Profile', path: '/profile' },
                    { icon: '📚', text: 'My Schedules', path: '/my-schedules' },
                    { icon: '🏆', text: 'My Quizzes', path: '/quizzes' },
                    { icon: '❓', text: 'Help & Support', path: '/general-questions' }
                  ].map((item, index) => (
                    <span 
                      key={index}
                      style={{ 
                        color: 'var(--muted)', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease',
                        fontSize: '16px',
                        padding: '8px 16px',
                        borderRadius: '20px'
                      }} 
                      onClick={() => navigate(item.path)}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'var(--accent)';
                        e.target.style.backgroundColor = 'rgba(255, 138, 0, 0.1)';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 138, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'var(--muted)';
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {item.icon} {item.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Study Tools */}
              <div style={{ flex: '1', minWidth: '250px', textAlign: 'center' }}>
                <h3 
                  style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    marginBottom: '30px', 
                    color: 'var(--accent)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow = '0 0 20px rgba(255, 138, 0, 0.8)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Study Tools
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                  {[
                    { icon: '🏠', text: 'Dashboard', path: '/dashboard' },
                    { icon: '📅', text: 'Schedule Generator', path: '/schedule' },
                    { icon: '🤖', text: 'AI Tutor', path: '/ai-tutor' },
                    { icon: '📝', text: 'Quiz Generator', path: '/quiz' }
                  ].map((item, index) => (
                    <span 
                      key={index}
                      style={{ 
                        color: 'var(--muted)', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease',
                        fontSize: '16px',
                        padding: '8px 16px',
                        borderRadius: '20px'
                      }} 
                      onClick={() => navigate(item.path)}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'var(--accent)';
                        e.target.style.backgroundColor = 'rgba(255, 138, 0, 0.1)';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 138, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'var(--muted)';
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {item.icon} {item.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* About StudyBuddy */}
              <div style={{ flex: '1', minWidth: '250px', textAlign: 'center' }}>
                <h3 
                  style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    marginBottom: '30px', 
                    color: 'var(--accent)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow = '0 0 20px rgba(255, 138, 0, 0.8)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  About StudyBuddy
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                  {[
                    { icon: 'ℹ️', text: 'About Us', path: '/about' },
                    { icon: '📧', text: 'Contact', path: '#' },
                    { icon: '🔒', text: 'Privacy Policy', path: '#' },
                    { icon: '📜', text: 'Terms of Service', path: '#' }
                  ].map((item, index) => (
                    <span 
                      key={index}
                      style={{ 
                        color: 'var(--muted)', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease',
                        fontSize: '16px',
                        padding: '8px 16px',
                        borderRadius: '20px'
                      }} 
                      onClick={() => item.path !== '#' && navigate(item.path)}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'var(--accent)';
                        e.target.style.backgroundColor = 'rgba(255, 138, 0, 0.1)';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 138, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'var(--muted)';
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {item.icon} {item.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Back to Top Button */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <button 
                style={{...styles.actionButton, padding: '15px 40px', fontSize: '16px'}}
                onClick={() => scrollToSection(0)}
              >
                Back to Top
              </button>
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
          {/* Speech bubble tail pointing to notification button */}
          <div style={{
            position: 'absolute',
            top: '-18px',
            right: '30px',
            width: '0',
            height: '0',
            borderLeft: '18px solid transparent',
            borderRight: '18px solid transparent',
            borderBottom: '18px solid var(--accent)',
            zIndex: 10000
          }}></div>
          <div style={{
            position: 'absolute',
            top: '-15px',
            right: '33px',
            width: '0',
            height: '0',
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderBottom: '15px solid var(--surface)',
            zIndex: 10001
          }}></div>
          
          <div style={styles.notificationHeader}>
            <span>🔔 Notifications</span>
            <div style={styles.notificationActions}>
              {unreadCount > 0 && (
                <button 
                  style={styles.notificationActionBtn}
                  onClick={handleMarkAllAsRead}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 138, 0, 0.2), rgba(255, 200, 107, 0.2))';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 138, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 138, 0, 0.1), rgba(255, 200, 107, 0.1))';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 138, 0, 0.15)';
                  }}
                >
                  ✓ Read All
                </button>
              )}
              {notifications.length > 0 && (
                <button 
                  style={{...styles.notificationActionBtn, borderColor: 'rgba(255, 68, 68, 0.3)', color: '#ff4444'}}
                  onClick={handleClearAll}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 68, 68, 0.15)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 68, 68, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 138, 0, 0.1), rgba(255, 200, 107, 0.1))';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 138, 0, 0.15)';
                  }}
                >
                  🗑️ Clear
                </button>
              )}
            </div>
          </div>

          {notifications.length === 0 ? (
            <div style={styles.emptyNotifications}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔕</div>
              <div style={{ fontWeight: '600', marginBottom: '5px' }}>No notifications yet</div>
              <div>You're all caught up!</div>
            </div>
          ) : (
            notifications.map((notification) => {
              const notificationIcon = 
                notification.type === 'motivational' ? '💪' :
                notification.type === 'success' ? '✅' :
                notification.type === 'warning' ? '⚠️' : 'ℹ️';

              return (
                <div 
                  key={notification.id}
                  style={{
                    ...styles.notificationItem,
                    ...(notification.read ? {} : styles.notificationItemUnread)
                  }}
                  onClick={() => handleNotificationClick(notification)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 138, 0, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notification.read ? 'transparent' : 'rgba(255, 138, 0, 0.05)'}
                >
                  <div style={styles.notificationIcon}>{notificationIcon}</div>
                  <div style={styles.notificationContent}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {notification.title}
                      {notification.route && (
                        <span style={{ fontSize: '10px', color: 'var(--accent)', opacity: 0.8 }} title="Click to navigate">
                          →
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.4' }}>
                      {notification.message}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '6px', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{notificationService.getTimeAgo(notification.timestamp)}</span>
                      {notification.route && (
                        <span style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: '600' }}>
                          • Click to view
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    style={styles.notificationDelete}
                    onClick={(e) => handleDeleteNotification(e, notification.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.background = 'rgba(255, 68, 68, 0.2)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 68, 68, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.7';
                      e.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    title="Delete notification"
                  >
                    ×
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 3D Robot Chatbot - Always visible */}
      <div 
        className="robot-float"
        style={styles.robotChatbot}
        onClick={() => handleChatToggle(!showChatbot)}
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

      {/* Chat Overlay - Full Viewport */}
      {showChatbot && (
        <div 
          style={styles.chatOverlay}
          onClick={(e) => e.target === e.currentTarget && handleChatToggle(false)}
        >
          <div style={styles.chatPanel} role="dialog" aria-modal="true">
            {/* Speech bubble tail */}
            <div style={{
              position: 'absolute',
              bottom: '-18px',
              left: '30px',
              width: '0',
              height: '0',
              borderLeft: '18px solid transparent',
              borderRight: '18px solid transparent',
              borderTop: '18px solid var(--accent)',
              zIndex: 10000
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-15px',
              left: '33px',
              width: '0',
              height: '0',
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              borderTop: '15px solid var(--surface)',
              zIndex: 10001
            }}></div>

            {/* Chat Header */}
            <header style={{
              ...styles.chatHeader,
              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
              color: 'var(--background)',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🤖</span>
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>StudyBuddy AI</span>
              </div>
              <button 
                onClick={() => handleChatToggle(false)}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  border: 'none', 
                  color: 'var(--background)', 
                  fontSize: '22px', 
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                ×
              </button>
            </header>

            {/* Chat Body - Scrollable Content Area */}
            <div style={styles.chatBody}>
              <div style={{
                backgroundColor: 'rgba(255, 138, 0, 0.1)',
                padding: '15px',
                borderRadius: '15px',
                border: '2px solid rgba(255, 138, 0, 0.2)',
                marginBottom: '15px'
              }}>
                <p style={{ color: 'var(--text)', fontSize: '16px', lineHeight: '1.5', marginBottom: '10px' }}>
                  🎯 Hi there! I'm your AI Study Assistant. I'm here to help you with:
                </p>
                <ul style={{ marginTop: '8px', paddingLeft: '20px', color: 'var(--muted)', lineHeight: '1.6' }}>
                  <li>Study planning & scheduling</li>
                  <li>Subject explanations</li>
                  <li>Quiz generation & practice</li>
                  <li>Learning strategies</li>
                </ul>
                <p style={{ color: 'var(--accent)', marginTop: '12px', fontWeight: 'bold', fontSize: '15px' }}>
                  What would you like to study today?
                </p>
              </div>
              
              {/* Sample messages to show scrolling */}
              <div style={{
                backgroundColor: 'rgba(255, 138, 0, 0.05)',
                padding: '12px',
                borderRadius: '12px',
                marginBottom: '10px',
                borderLeft: '3px solid var(--accent)'
              }}>
                <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: '1.4' }}>
                  💡 <strong>Quick Tip:</strong> Try asking me about any subject you're studying. I can help explain concepts, create practice questions, or suggest study strategies!
                </p>
              </div>

              <div style={{
                backgroundColor: 'rgba(255, 138, 0, 0.05)',
                padding: '12px',
                borderRadius: '12px',
                marginBottom: '10px',
                borderLeft: '3px solid var(--accent-2)'
              }}>
                <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: '1.4' }}>
                  📚 <strong>Popular Commands:</strong>
                </p>
                <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '5px', lineHeight: '1.4' }}>
                  • "Create a quiz on [topic]"<br/>
                  • "Explain [concept]"<br/>
                  • "Help me plan my schedule"
                </p>
              </div>
            </div>

            {/* Chat Input */}
            <footer style={{...styles.chatInput, backgroundColor: 'var(--surface)', borderRadius: '0 0 22px 22px', flexShrink: 0}}>
              <input 
                type="text" 
                placeholder="Ask me anything about your studies..." 
                style={{ 
                  flex: 1, 
                  padding: '12px 16px', 
                  border: '2px solid rgba(255, 138, 0, 0.3)', 
                  borderRadius: '25px', 
                  backgroundColor: 'var(--background)', 
                  color: 'var(--text)', 
                  fontSize: '14px', 
                  outline: 'none' 
                }} 
              />
              <button 
                style={{ 
                  marginLeft: '12px', 
                  padding: '12px 20px', 
                  backgroundColor: 'var(--accent)', 
                  color: 'var(--background)', 
                  border: 'none', 
                  borderRadius: '25px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold', 
                  fontSize: '14px', 
                  transition: 'all 0.3s ease',
                  minWidth: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(255, 138, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 138, 0, 0.5)';
                  e.target.style.backgroundColor = '#ff9500';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 2px 8px rgba(255, 138, 0, 0.3)';
                  e.target.style.backgroundColor = 'var(--accent)';
                }}
              >
                Send
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
