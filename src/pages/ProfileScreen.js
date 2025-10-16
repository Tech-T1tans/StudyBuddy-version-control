import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    examType: '',
    targetPercentile: '',
    targetYear: ''
  });
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    // Load user data from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const personalization = JSON.parse(localStorage.getItem('personalization') || '{}');
    const cpatResults = JSON.parse(localStorage.getItem('cpatResults') || '{}');
    
    setProfileData({
      name: user.name || 'Student',
      email: user.email || 'student@example.com',
      phone: '',
      examType: personalization.examType || 'Not Set',
      targetPercentile: personalization.targetPercentile || 'Not Set',
      targetYear: personalization.targetYear || 'Not Set',
      prepLevel: personalization.prepLevel || 50,
      ...cpatResults
    });
    
    setEditedData({
      name: user.name || 'Student',
      email: user.email || 'student@example.com',
      phone: ''
    });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Update localStorage with edited data
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.name = editedData.name;
    user.email = editedData.email;
    localStorage.setItem('user', JSON.stringify(user));
    
    setProfileData({ ...profileData, ...editedData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('personalization');
    localStorage.removeItem('cpatResults');
    navigate('/welcome');
  };

  const handleInputChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'var(--background)',
      padding: '20px',
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
      filter: 'blur(100px)',
      opacity: 0.1,
      animation: 'orbitFloat 25s infinite ease-in-out'
    },
    bgOrb1: {
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, var(--accent), transparent)',
      top: '-200px',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    header: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.95), rgba(23, 19, 22, 0.7))',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      borderRadius: '30px',
      padding: '35px',
      marginBottom: '35px',
      boxShadow: '0 25px 70px rgba(0,0,0,0.5), 0 0 120px rgba(255, 138, 0, 0.05)',
      border: '1px solid rgba(255, 138, 0, 0.15)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    },
    backButton: {
      padding: '10px 20px',
      backgroundColor: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'white'
    },
    profileCard: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '30px',
      padding: '50px',
      boxShadow: '0 25px 70px rgba(0,0,0,0.4), 0 0 100px rgba(255, 138, 0, 0.04)',
      border: '1px solid rgba(255, 138, 0, 0.12)',
      maxWidth: '850px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '40px',
      paddingBottom: '30px',
      borderBottom: '2px solid #e0e0e0'
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: '#667eea',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: 'bold',
      marginRight: '30px'
    },
    profileInfo: {
      flex: 1
    },
    title: {
      fontSize: '40px',
      fontWeight: '900',
      background: 'linear-gradient(135deg, var(--text), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
      letterSpacing: '-1.5px'
    },
    userEmail: {
      fontSize: '18px',
      color: '#666'
    },
    editButton: {
      padding: '10px 25px',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'background-color 0.3s'
    },
    section: {
      marginBottom: '30px'
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: 'var(--text)',
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      opacity: 0.9
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px'
    },
    infoItem: {
      padding: '15px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px'
    },
    infoLabel: {
      fontSize: '14px',
      color: '#999',
      marginBottom: '5px',
      fontWeight: '600'
    },
    infoValue: {
      fontSize: '16px',
      color: '#333'
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
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '15px'
    },
    statCard: {
      backgroundColor: '#f0f4ff',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      borderLeft: '4px solid #667eea'
    },
    statValue: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#667eea',
      marginBottom: '5px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#666'
    },
    progressBar: {
      width: '100%',
      height: '10px',
      backgroundColor: '#e0e0e0',
      borderRadius: '5px',
      overflow: 'hidden',
      marginTop: '10px'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#667eea',
      transition: 'width 0.3s ease'
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      marginTop: '20px'
    },
    saveButton: {
      padding: '16px 40px',
      fontSize: '16px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '18px',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 12px 35px rgba(255, 138, 0, 0.35)',
      textTransform: 'uppercase',
      letterSpacing: '1.5px'
    },
    cancelButton: {
      padding: '10px 25px',
      backgroundColor: '#f0f0f0',
      color: '#666',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600'
    },
    dangerZone: {
      marginTop: '40px',
      padding: '20px',
      backgroundColor: '#fff5f5',
      borderRadius: '10px',
      border: '2px solid #ffdddd'
    },
    dangerTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#d32f2f',
      marginBottom: '15px'
    },
    logoutButton: {
      padding: '10px 25px',
      backgroundColor: '#d32f2f',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'background-color 0.3s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button 
          style={styles.backButton} 
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>My Profile</h1>
        <div style={{ width: '160px' }}></div>
      </div>

      <div style={styles.mainCard}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>
            {profileData.name.charAt(0).toUpperCase()}
          </div>
          <div style={styles.profileInfo}>
            <h2 style={styles.userName}>{profileData.name}</h2>
            <p style={styles.userEmail}>{profileData.email}</p>
          </div>
          {!isEditing && (
            <button 
              style={styles.editButton}
              onClick={handleEdit}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#764ba2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
            >
              Edit Profile
            </button>
          )}
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <span>📝</span> Personal Information
          </h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Full Name</div>
              {isEditing ? (
                <input
                  style={styles.input}
                  value={editedData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                <div style={styles.infoValue}>{profileData.name}</div>
              )}
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Email Address</div>
              {isEditing ? (
                <input
                  style={styles.input}
                  type="email"
                  value={editedData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                <div style={styles.infoValue}>{profileData.email}</div>
              )}
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Phone Number</div>
              {isEditing ? (
                <input
                  style={styles.input}
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              ) : (
                <div style={styles.infoValue}>{profileData.phone || 'Not provided'}</div>
              )}
            </div>
          </div>
          {isEditing && (
            <div style={styles.buttonGroup}>
              <button 
                style={styles.saveButton}
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button 
                style={styles.cancelButton}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <span>🎯</span> Study Goals
          </h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Exam Type</div>
              <div style={styles.infoValue}>{profileData.examType}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Target Percentile</div>
              <div style={styles.infoValue}>{profileData.targetPercentile}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Target Year</div>
              <div style={styles.infoValue}>{profileData.targetYear}</div>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <span>📊</span> C-PAT Assessment Results
          </h3>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{profileData.attention || 0}%</div>
              <div style={styles.statLabel}>Attention</div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${profileData.attention || 0}%` }}></div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{profileData.focus || 0}%</div>
              <div style={styles.statLabel}>Focus</div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${profileData.focus || 0}%` }}></div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{profileData.memory || 0}%</div>
              <div style={styles.statLabel}>Memory</div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${profileData.memory || 0}%` }}></div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{profileData.speed || 0}%</div>
              <div style={styles.statLabel}>Speed</div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${profileData.speed || 0}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.dangerZone}>
          <h3 style={styles.dangerTitle}>⚠️ Account Settings</h3>
          <button 
            style={styles.logoutButton}
            onClick={handleLogout}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#b71c1c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#d32f2f'}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
