import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MySchedules = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [schedules, setSchedules] = useState({
    active: [],
    history: []
  });

  useEffect(() => {
    // Mock schedule data
    const mockSchedules = {
      active: [
        {
          id: 1,
          name: 'JEE Physics Intensive',
          created: '2024-10-01',
          deadline: '2024-12-15',
          progress: 65,
          subjects: ['Mechanics', 'Thermodynamics', 'Optics'],
          status: 'In Progress'
        },
        {
          id: 2,
          name: 'Mathematics Board Prep',
          created: '2024-10-05',
          deadline: '2024-11-30',
          progress: 40,
          subjects: ['Calculus', 'Algebra', 'Trigonometry'],
          status: 'Active'
        }
      ],
      history: [
        {
          id: 3,
          name: 'Chemistry Organic Complete',
          created: '2024-08-15',
          deadline: '2024-09-30',
          progress: 100,
          subjects: ['Organic Chemistry', 'Reactions'],
          status: 'Completed'
        },
        {
          id: 4,
          name: 'English Literature Review',
          created: '2024-07-01',
          deadline: '2024-08-15',
          progress: 85,
          subjects: ['Poetry', 'Prose', 'Drama'],
          status: 'Incomplete'
        }
      ]
    };
    setSchedules(mockSchedules);
  }, []);

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#4CAF50';
    if (progress >= 50) return '#FFA500';
    return '#ff6b6b';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return '#4CAF50';
      case 'In Progress': case 'Active': return '#667eea';
      case 'Incomplete': return '#ff6b6b';
      default: return '#999';
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'var(--background)',
      padding: '20px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    header: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.95), rgba(23, 19, 22, 0.7))',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      borderRadius: '25px',
      padding: '35px',
      marginBottom: '35px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 100px rgba(255, 138, 0, 0.05)',
      border: '1px solid rgba(255, 138, 0, 0.15)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    backButton: {
      padding: '12px 28px',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 8px 25px rgba(255, 138, 0, 0.3)'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'white'
    },
    createButton: {
      padding: '12px 25px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'background-color 0.3s'
    },
    mainCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '40px',
      width: '100%',
      maxWidth: '1200px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      minHeight: '600px'
    },
    tabContainer: {
      display: 'flex',
      marginBottom: '30px',
      borderBottom: '2px solid #e0e0e0'
    },
    tab: {
      flex: 1,
      padding: '15px 30px',
      fontSize: '18px',
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderBottom: '3px solid transparent'
    },
    activeTab: {
      color: '#667eea',
      borderBottomColor: '#667eea'
    },
    inactiveTab: {
      color: '#999'
    },
    scheduleGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '25px'
    },
    scheduleCard: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '25px',
      padding: '35px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(255, 138, 0, 0.03)',
      border: '1px solid rgba(255, 138, 0, 0.1)',
      marginBottom: '25px',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'pointer'
    },
    scheduleCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    scheduleHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px'
    },
    scheduleName: {
      fontSize: '38px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, var(--text), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
      letterSpacing: '-1px'
    },
    scheduleStatus: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white'
    },
    scheduleInfo: {
      fontSize: '16px',
      color: 'var(--muted)',
      marginBottom: '8px',
      opacity: 0.9
    },
    progressSection: {
      marginBottom: '15px'
    },
    progressLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#666',
      marginBottom: '8px'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      transition: 'width 0.3s ease',
      borderRadius: '4px'
    },
    subjectTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '15px'
    },
    subjectTag: {
      padding: '4px 8px',
      backgroundColor: '#f0f4ff',
      color: '#667eea',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600'
    },
    scheduleActions: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px'
    },
    actionButton: {
      flex: 1,
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    primaryAction: {
      backgroundColor: '#667eea',
      color: 'white'
    },
    secondaryAction: {
      backgroundColor: '#f0f0f0',
      color: '#666'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#999'
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '20px'
    },
    emptyTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    emptyDescription: {
      fontSize: '16px',
      marginBottom: '30px'
    }
  };

  const renderScheduleCard = (schedule) => (
    <div 
      key={schedule.id}
      style={styles.scheduleCard}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={styles.scheduleHeader}>
        <div>
          <div style={styles.scheduleName}>{schedule.name}</div>
          <div style={styles.scheduleDetails}>
            Created: {new Date(schedule.created).toLocaleDateString()} | 
            Deadline: {new Date(schedule.deadline).toLocaleDateString()}
          </div>
        </div>
        <div 
          style={{
            ...styles.scheduleStatus,
            backgroundColor: getStatusColor(schedule.status)
          }}
        >
          {schedule.status}
        </div>
      </div>

      <div style={styles.progressSection}>
        <div style={styles.progressLabel}>
          <span>Progress</span>
          <span>{schedule.progress}%</span>
        </div>
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${schedule.progress}%`,
              backgroundColor: getProgressColor(schedule.progress)
            }}
          />
        </div>
      </div>

      <div style={styles.subjectTags}>
        {schedule.subjects.map((subject, index) => (
          <span key={index} style={styles.subjectTag}>
            {subject}
          </span>
        ))}
      </div>

      <div style={styles.scheduleActions}>
        {activeTab === 'active' ? (
          <>
            <button style={{...styles.actionButton, ...styles.primaryAction}}>
              Continue
            </button>
            <button style={{...styles.actionButton, ...styles.secondaryAction}}>
              Edit
            </button>
          </>
        ) : (
          <>
            <button style={{...styles.actionButton, ...styles.secondaryAction}}>
              View Details
            </button>
            <button style={{...styles.actionButton, ...styles.primaryAction}}>
              Restart
            </button>
          </>
        )}
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>
        {activeTab === 'active' ? '📅' : '📚'}
      </div>
      <div style={styles.emptyTitle}>
        {activeTab === 'active' ? 'No Active Schedules' : 'No Schedule History'}
      </div>
      <div style={styles.emptyDescription}>
        {activeTab === 'active' 
          ? 'Create your first study schedule to get started!'
          : 'Your completed and past schedules will appear here.'}
      </div>
      {activeTab === 'active' && (
        <button 
          style={{...styles.actionButton, ...styles.primaryAction, maxWidth: '200px'}}
          onClick={() => navigate('/schedule')}
        >
          Create Schedule
        </button>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button 
          style={styles.backButton} 
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>📅 My Schedules</h1>
        <button 
          style={styles.createButton}
          onClick={() => navigate('/schedule')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          + Create New Schedule
        </button>
      </div>

      <div style={styles.mainCard}>
        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'active' ? styles.activeTab : styles.inactiveTab)
            }}
            onClick={() => setActiveTab('active')}
          >
            Active Schedules ({schedules.active.length})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'history' ? styles.activeTab : styles.inactiveTab)
            }}
            onClick={() => setActiveTab('history')}
          >
            History ({schedules.history.length})
          </button>
        </div>

        {schedules[activeTab].length > 0 ? (
          <div style={styles.scheduleGrid}>
            {schedules[activeTab].map(renderScheduleCard)}
          </div>
        ) : (
          renderEmptyState()
        )}
      </div>
    </div>
  );
};

export default MySchedules;
