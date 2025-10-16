import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUsScreen = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'var(--background)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
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
      maxWidth: '900px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      border: '1px solid rgba(255, 138, 0, 0.1)'
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
    }
  };

  const teamMembers = [
    { name: 'Alex Chen', role: 'CEO & Founder', initial: 'AC' },
    { name: 'Sarah Johnson', role: 'CTO', initial: 'SJ' },
    { name: 'Mike Davis', role: 'Head of AI', initial: 'MD' },
    { name: 'Emily Wang', role: 'Lead Designer', initial: 'EW' }
  ];

  const features = [
    { icon: '🤖', text: 'AI-powered personalized study plans' },
    { icon: '📊', text: 'Advanced analytics and progress tracking' },
    { icon: '🎯', text: 'Targeted practice based on weak areas' },
    { icon: '⚡', text: 'Efficient revision techniques' },
    { icon: '📱', text: 'Mobile-first responsive design' },
    { icon: '🔒', text: 'Secure and private data handling' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button 
          style={styles.backButton} 
          onClick={() => navigate(-1)}
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
            We're a passionate team of educators, engineers, and designers united by the vision 
            of transforming education through technology.
          </p>
          <div style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                style={styles.teamMember}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={styles.memberIcon}>
                  {member.initial}
                </div>
                <div style={styles.memberName}>{member.name}</div>
                <div style={styles.memberRole}>{member.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Journey</h2>
          <p style={styles.paragraph}>
            Founded in 2024, StudyAI started as a simple idea: what if we could use AI to 
            understand how each student learns best? From humble beginnings with a small beta 
            group, we've grown to help thousands of students achieve their dreams.
          </p>
          <p style={styles.paragraph}>
            Today, our platform serves students preparing for JEE, board exams, and various 
            competitive tests. We're constantly evolving, adding new features based on student 
            feedback and the latest advances in educational technology.
          </p>
        </div>

        <div style={styles.contactSection}>
          <h3 style={styles.contactTitle}>Get in Touch</h3>
          <p style={styles.contactInfo}>
            Email: <a href="mailto:support@studyai.com" style={styles.contactLink}>support@studyai.com</a>
          </p>
          <p style={styles.contactInfo}>
            Phone: <span style={styles.contactLink}>+91 98765 43210</span>
          </p>
          <p style={styles.contactInfo}>
            Address: Innovation Hub, Bangalore 560001, India
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
    </div>
  );
};

export default AboutUsScreen;
