import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUsScreen = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality for team cards
  useEffect(() => {
    const teamMembers = [
      { name: 'Sarah Johnson', role: 'Lead Developer', emoji: '👩‍💻' },
      { name: 'Mike Chen', role: 'AI Specialist', emoji: '🤖' },
      { name: 'Emily Davis', role: 'UX Designer', emoji: '🎨' },
      { name: 'Alex Kumar', role: 'Backend Engineer', emoji: '⚙️' }
    ];
    
    const autoSlideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
    }, 5000); // 5 seconds

    return () => clearInterval(autoSlideInterval);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'var(--background)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowX: 'hidden'
    },
    header: {
      width: '100%',
      maxWidth: '900px',
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    backButton: {
      padding: '10px 20px',
      backgroundColor: 'var(--accent)',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 4px 15px rgba(255, 138, 0, 0.3)'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'var(--text)'
    },
    card: {
      backgroundColor: 'var(--surface)',
      borderRadius: '20px',
      padding: '50px',
      width: '100%',
      maxWidth: '1100px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      border: '1px solid rgba(255, 138, 0, 0.1)',
      overflowX: 'hidden'
    },
    section: {
      marginBottom: '40px'
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'var(--text)',
      marginBottom: '20px',
      borderBottom: '2px solid var(--accent)',
      paddingBottom: '10px'
    },
    paragraph: {
      fontSize: '16px',
      color: 'var(--muted)',
      lineHeight: '1.8',
      marginBottom: '15px'
    },
    missionBox: {
      backgroundColor: 'var(--surface)',
      borderLeft: '4px solid var(--accent)',
      padding: '20px',
      borderRadius: '15px',
      marginBottom: '30px',
      border: '1px solid rgba(255, 138, 0, 0.1)'
    },
    missionText: {
      fontSize: '18px',
      color: 'var(--text)',
      fontStyle: 'italic',
      lineHeight: '1.6'
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '30px',
      marginTop: '30px'
    },
    teamMember: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: 'var(--background)',
      borderRadius: '15px',
      transition: 'transform 0.3s ease',
      border: '1px solid rgba(255, 138, 0, 0.1)'
    },
    memberIcon: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: 'var(--accent)',
      color: 'var(--background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 15px',
      fontSize: '32px',
      fontWeight: 'bold'
    },
    memberName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'var(--text)',
      marginBottom: '5px'
    },
    memberRole: {
      fontSize: '14px',
      color: 'var(--muted)'
    },
    featureList: {
      listStyle: 'none',
      padding: 0
    },
    featureItem: {
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: 'var(--background)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      border: '1px solid rgba(255, 138, 0, 0.1)'
    },
    featureIcon: {
      fontSize: '24px'
    },
    featureText: {
      fontSize: '16px',
      color: 'var(--text)'
    },
    contactSection: {
      backgroundColor: 'var(--surface)',
      padding: '30px',
      borderRadius: '15px',
      textAlign: 'center',
      border: '1px solid rgba(255, 138, 0, 0.1)'
    },
    contactTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'var(--text)',
      marginBottom: '20px'
    },
    contactInfo: {
      fontSize: '16px',
      color: 'var(--muted)',
      marginBottom: '10px'
    },
    contactLink: {
      color: 'var(--accent)',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    ctaButton: {
      padding: '15px 40px',
      fontSize: '18px',
      backgroundColor: 'var(--accent)',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: '0 4px 15px rgba(255, 138, 0, 0.3)',
      marginTop: '30px',
      transition: 'all 0.3s ease'
    },
    // New Carousel Styles
    carouselContainer: {
      position: 'relative',
      width: '100%',
      marginTop: '30px',
      overflow: 'hidden',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    carouselWrapper: {
      display: 'flex',
      transition: 'transform 0.6s ease-in-out',
      gap: '30px',
      padding: '40px 20px'
    },
    teamCard: {
      minWidth: '350px',
      maxWidth: '350px',
      backgroundColor: '#1a1a1a',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
      border: '1px solid rgba(255, 138, 0, 0.3)',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      alignItems: 'center',
      animation: 'float 6s ease-in-out infinite',
      flexShrink: 0
    },
    teamCardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 40px rgba(255, 138, 0, 0.3)',
      border: '2px solid rgba(255, 138, 0, 0.6)'
    },
    teamCardSide: {
      filter: 'blur(3px)',
      opacity: 0.6,
      transform: 'scale(0.85)'
    },
    photoFrame: {
      width: '120px',
      height: '140px',
      borderRadius: '15px',
      border: '3px solid var(--accent)',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'var(--accent)',
      backgroundImage: 'linear-gradient(135deg, #f5f5f5 0%, rgba(255, 138, 0, 0.1) 100%)'
    },
    photoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    cardContent: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      textAlign: 'center'
    },
    cardName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '3px'
    },
    cardRole: {
      fontSize: '14px',
      color: 'var(--accent)',
      fontWeight: '600',
      marginBottom: '8px'
    },
    cardDetails: {
      fontSize: '12px',
      color: '#cccccc',
      lineHeight: '1.6',
      textAlign: 'left',
      width: '100%',
      paddingLeft: '0'
    },
    detailItem: {
      marginBottom: '6px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px'
    },
    bullet: {
      color: 'var(--accent)',
      fontSize: '10px',
      marginTop: '4px',
      flexShrink: 0
    },
    cardDetailsExpanded: {
      fontSize: '13px',
      color: '#cccccc',
      lineHeight: '1.7',
      textAlign: 'left',
      width: '100%'
    },
    detailItemExpanded: {
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px'
    },
    cardContactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontSize: '12px',
      color: '#999',
      marginTop: '10px'
    },
    cardContactLink: {
      color: 'var(--accent)',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      transition: 'opacity 0.3s ease'
    },
    navigationButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: 'var(--accent)',
      border: 'none',
      color: '#000',
      fontSize: '24px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(255, 138, 0, 0.4)',
      transition: 'all 0.3s ease',
      zIndex: 10
    },
    navButtonLeft: {
      left: '10px'
    },
    navButtonRight: {
      right: '10px'
    },
    expandedCard: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      minWidth: '450px',
      maxWidth: '450px',
      backgroundColor: '#1a1a1a',
      borderRadius: '25px',
      padding: '35px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      border: '2px solid var(--accent)',
      zIndex: 1001,
      animation: 'expandCard 0.3s ease-out'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 138, 0, 0.2)',
      border: 'none',
      color: 'var(--accent)',
      fontSize: '18px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    }
  };

  const teamMembers = [
    { 
      name: 'Tanisq Verma', 
      role: 'Team Leader & Backend Engineer',
      details: [
        'Class 12th Science student',
        'PM Shri Kendriya Vidyalaya Sector 25 Rohini Delhi',
        'Main Backend Developer',
        'Building robust server-side architecture',
        'Passionate about scalable systems'
      ],
      email: 'tanisq.verma@studyai.com',
      linkedin: '#',
      photo: null
    },
    { 
      name: 'Parth Verma', 
      role: 'Backend Engineer & Quiz Creator',
      details: [
        'Class 12th Science student',
        'PM Shri Kendriya Vidyalaya Sector 25 Rohini Delhi',
        'Backend Developer & Main Quiz Maker',
        'Designing intelligent quiz systems',
        'Expert in creating engaging assessments'
      ],
      email: 'parth.verma@studyai.com',
      linkedin: '#',
      photo: null
    },
    { 
      name: 'Sudhanshu Thakur', 
      role: 'Frontend Developer & AI Specialist',
      details: [
        'Class 12th Science student',
        'PM Shri Kendriya Vidyalaya Sector 25 Rohini Delhi',
        'Frontend Developer & AI Specialist',
        'Implementing AI-powered features',
        'Bridging AI and user experience'
      ],
      email: 'sudhanshu.thakur@studyai.com',
      linkedin: '#',
      photo: null
    },
    { 
      name: 'Armaan', 
      role: ' Main Designer',
      details: [
        'Class 12th Science student',
        'PM Shri Kendriya Vidyalaya Sector 25 Rohini Delhi',
        'Frontend Developer & UI/UX Designer',
        'Leading the team vision and design',
        'Creating beautiful and intuitive interfaces'
      ],
      email: 'armaan@studyai.com',
      linkedin: '#',
      photo: null
    },
  ];

  const handleCardClick = (index) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const features = [
    { icon: '🤖', text: 'AI-powered personalized study plans' },
    { icon: '📊', text: 'Advanced analytics and progress tracking' },
    { icon: '🎯', text: 'Targeted practice based on weak areas' },
    { icon: '⚡', text: 'Efficient revision techniques' },
    { icon: '📱', text: 'Mobile-first responsive design' },
    { icon: '🔒', text: 'Secure and private data handling' }
  ];

  return (
    <>
      <style>{`
        /* Hide Scrollbar but keep scroll functionality */
        .carouselContainer::-webkit-scrollbar {
          display: none;
        }
        
        .carouselContainer {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes expandCard {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
      
    <div style={styles.container}>
      <div style={styles.header}>
        <button 
          style={styles.backButton} 
          onClick={() => navigate('/welcome')}
        >
          ← Back
        </button>
        <h1 style={styles.title}>About StudyAI</h1>
        <div style={{ width: '80px' }}></div>
      </div>

      <div style={styles.card}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <div style={styles.missionBox}>
            <p style={styles.missionText}>
              "To democratize quality education by leveraging artificial intelligence, 
              making personalized learning accessible to every student preparing for 
              competitive exams."
            </p>
          </div>
          <p style={styles.paragraph}>
            StudyAI Assistant was born from the understanding that every student learns differently. 
            Traditional one-size-fits-all approaches often leave students struggling to keep up or 
            feeling unchallenged. We believe that with the right tools and personalization, 
            every student can achieve their academic goals.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>What We Do</h2>
          <p style={styles.paragraph}>
            We combine cutting-edge AI technology with proven educational methodologies to create 
            a comprehensive learning platform. Our system analyzes your learning patterns, identifies 
            strengths and weaknesses, and creates customized study plans that adapt as you progress.
          </p>
          <ul style={styles.featureList}>
            {features.map((feature, index) => (
              <li key={index} style={styles.featureItem}>
                <span style={styles.featureIcon}>{feature.icon}</span>
                <span style={styles.featureText}>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Team</h2>
          <p style={styles.paragraph}>
            We're a group of passionate Class 12th Science students from PM Shri Kendriya Vidyalaya 
            Sector 25 Rohini Delhi, united by our vision to transform education through technology. 
            As classmates and friends, we combined our skills in backend development, frontend design, 
            AI, and UX to create this innovative study platform for students like us.
          </p>
          
          {/* Team Carousel - Side Arrows */}
          <div style={styles.carouselContainer}>
            <div 
              style={{
                ...styles.carouselWrapper,
                transform: `translateX(calc(-${currentSlide * 350}px + 50% - 175px))`
              }}
            >
              {teamMembers.map((member, index) => {
                const isCenter = index === currentSlide;
                const cardStyle = {
                  ...styles.teamCard,
                  ...(isCenter ? {} : styles.teamCardSide)
                };
                
                return (
                  <div
                    key={index}
                    style={cardStyle}
                    onClick={() => handleCardClick(index)}
                    onMouseEnter={(e) => {
                      if (isCenter) {
                        Object.assign(e.currentTarget.style, styles.teamCardHover);
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isCenter) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.5)';
                        e.currentTarget.style.border = '1px solid rgba(255, 138, 0, 0.3)';
                      }
                    }}
                  >
                  {/* Photo Frame */}
                  <div style={styles.photoFrame}>
                    {member.photo ? (
                      <img 
                        src={member.photo} 
                        alt={member.name}
                        style={styles.photoImage}
                      />
                    ) : (
                      <span>📷</span>
                    )}
                  </div>

                    {/* Card Content */}
                    <div style={styles.cardContent}>
                      <h3 style={styles.cardName}>{member.name}</h3>
                      <p style={styles.cardRole}>{member.role}</p>
                      <div style={styles.cardDetails}>
                        {member.details.slice(0, 3).map((detail, idx) => (
                          <div key={idx} style={styles.detailItem}>
                            <span style={styles.bullet}>●</span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <button
              style={{...styles.navigationButton, ...styles.navButtonLeft}}
              onClick={handlePrevSlide}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ff9d4d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--accent)'}
            >
              ‹
            </button>
            <button
              style={{...styles.navigationButton, ...styles.navButtonRight}}
              onClick={handleNextSlide}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ff9d4d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--accent)'}
            >
              ›
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Journey</h2>
          <p style={styles.paragraph}>
            StudyBuddy started as a Class 12th project by four classmates from PM Shri Kendriya 
            Vidyalaya Sector 25 Rohini Delhi. As students preparing for competitive exams ourselves, 
            we understood the challenges of managing study schedules, creating effective quizzes, 
            and tracking progress. This inspired us to build a platform that could help students like us.
          </p>
          <p style={styles.paragraph}>
            What began as a simple idea has evolved into a comprehensive AI-powered study assistant. 
            We combined our individual expertise - Armaan's design vision, Tanisq and Parth's backend 
            prowess, and Sudhanshu's AI integration - to create something that truly makes a difference 
            in how students learn and prepare for exams.
          </p>
        </div>

        <div style={styles.contactSection}>
          <h3 style={styles.contactTitle}>Get in Touch</h3>
          <p style={styles.contactInfo}>
            Email: <a href="mailto:support@studybuddy.com" style={styles.contactLink}>support@studybuddy.com</a>
          </p>
          <p style={styles.contactInfo}>
            School: <span style={styles.contactLink}>PM Shri Kendriya Vidyalaya Sector 25 Rohini Delhi</span>
          </p>
          <p style={styles.contactInfo}>
            Created by: Class 12th Science Students
          </p>
          <button 
            style={styles.ctaButton}
            onClick={() => navigate('/signup')}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#764ba2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
          >
            Start Your Journey Today
          </button>
        </div>
      </div>

      {/* Expanded Card View with Blur Overlay */}
      {selectedCard !== null && (
        <>
          <div 
            style={styles.overlay}
            onClick={() => setSelectedCard(null)}
          />
          <div style={styles.expandedCard}>
            <button
              style={styles.closeButton}
              onClick={() => setSelectedCard(null)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--accent)';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 138, 0, 0.2)';
                e.target.style.color = 'var(--accent)';
              }}
            >
              ✕
            </button>

            {/* Photo Frame */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                ...styles.photoFrame,
                width: '160px',
                height: '190px'
              }}>
                {teamMembers[selectedCard].photo ? (
                  <img 
                    src={teamMembers[selectedCard].photo} 
                    alt={teamMembers[selectedCard].name}
                    style={styles.photoImage}
                  />
                ) : (
                  <span style={{fontSize: '48px'}}>📷</span>
                )}
              </div>

              {/* Detailed Information */}
              <div style={{width: '100%', textAlign: 'center'}}>
                <h2 style={{...styles.cardName, fontSize: '26px', marginBottom: '8px'}}>
                  {teamMembers[selectedCard].name}
                </h2>
                <p style={{...styles.cardRole, fontSize: '16px', marginBottom: '20px'}}>
                  {teamMembers[selectedCard].role}
                </p>
                <div style={styles.cardDetailsExpanded}>
                  {teamMembers[selectedCard].details.map((detail, idx) => (
                    <div key={idx} style={styles.detailItemExpanded}>
                      <span style={{...styles.bullet, fontSize: '12px', marginTop: '2px'}}>●</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '2px solid rgba(255, 138, 0, 0.2)',
                  paddingTop: '20px',
                  marginTop: '25px'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    color: '#ffffff',
                    marginBottom: '12px',
                    fontWeight: 'bold'
                  }}>
                    Contact Information
                  </h4>
                  <div style={styles.cardContactInfo}>
                    <a 
                      href={`mailto:${teamMembers[selectedCard].email}`}
                      style={{...styles.cardContactLink, fontSize: '14px', justifyContent: 'center'}}
                      onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      📧 {teamMembers[selectedCard].email}
                    </a>
                    <a 
                      href={teamMembers[selectedCard].linkedin}
                      style={{...styles.cardContactLink, fontSize: '14px', justifyContent: 'center'}}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      💼 Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default AboutUsScreen;
