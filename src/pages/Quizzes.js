import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Quizzes = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [quizzes, setQuizzes] = useState({
    available: [],
    completed: [],
    recommended: []
  });

  useEffect(() => {
    // Mock quiz data
    const mockQuizzes = {
      available: [
        {
          id: 1,
          title: 'Physics: Mechanics Basics',
          subject: 'Physics',
          questions: 15,
          difficulty: 'Medium',
          estimatedTime: '20 min',
          topics: ['Newton\'s Laws', 'Kinematics', 'Forces'],
          lastAttempt: null,
          bestScore: null
        },
        {
          id: 2,
          title: 'Mathematics: Calculus Fundamentals',
          subject: 'Mathematics',
          questions: 20,
          difficulty: 'Hard',
          estimatedTime: '25 min',
          topics: ['Derivatives', 'Integration', 'Limits'],
          lastAttempt: null,
          bestScore: null
        },
        {
          id: 3,
          title: 'Chemistry: Organic Reactions',
          subject: 'Chemistry',
          questions: 12,
          difficulty: 'Easy',
          estimatedTime: '15 min',
          topics: ['Substitution', 'Addition', 'Elimination'],
          lastAttempt: null,
          bestScore: null
        }
      ],
      completed: [
        {
          id: 4,
          title: 'Physics: Thermodynamics',
          subject: 'Physics',
          questions: 18,
          difficulty: 'Medium',
          estimatedTime: '22 min',
          topics: ['Heat Transfer', 'Laws of Thermodynamics'],
          lastAttempt: '2024-10-10',
          bestScore: 85,
          attempts: 2
        },
        {
          id: 5,
          title: 'Mathematics: Algebra Review',
          subject: 'Mathematics',
          questions: 10,
          difficulty: 'Easy',
          estimatedTime: '12 min',
          topics: ['Linear Equations', 'Quadratic Equations'],
          lastAttempt: '2024-10-08',
          bestScore: 92,
          attempts: 1
        }
      ],
      recommended: [
        {
          id: 6,
          title: 'Physics: Optics Mastery',
          subject: 'Physics',
          questions: 16,
          difficulty: 'Hard',
          estimatedTime: '30 min',
          topics: ['Ray Optics', 'Wave Optics', 'Lenses'],
          reason: 'Based on your weak areas in C-PAT assessment',
          priority: 'High'
        },
        {
          id: 7,
          title: 'Chemistry: Periodic Table',
          subject: 'Chemistry',
          questions: 14,
          difficulty: 'Medium',
          estimatedTime: '18 min',
          topics: ['Elements', 'Properties', 'Trends'],
          reason: 'Recommended for JEE preparation',
          priority: 'Medium'
        }
      ]
    };
    setQuizzes(mockQuizzes);
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FFA500';
      case 'Hard': return '#ff6b6b';
      default: return '#999';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FFA500';
    return '#ff6b6b';
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#ff6b6b';
      case 'Medium': return '#FFA500';
      case 'Low': return '#4CAF50';
      default: return '#999';
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'var(--background)',
      padding: '20px',
      position: 'relative'
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
      fontSize: '16px',
      fontWeight: '600',
      transition: 'background-color 0.3s'
    },
    quizCard: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '25px',
      padding: '35px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(255, 138, 0, 0.03)',
      border: '1px solid rgba(255, 138, 0, 0.1)',
      marginBottom: '25px',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
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
    quizGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '25px'
    },
    quizHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px'
    },
    quizTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '5px'
    },
    quizSubject: {
      fontSize: '14px',
      color: '#667eea',
      fontWeight: '600'
    },
    difficultyBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white'
    },
    quizStats: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '15px'
    },
    statItem: {
      fontSize: '14px',
      color: '#666'
    },
    statLabel: {
      fontWeight: '600',
      color: '#333'
    },
    topicTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginBottom: '15px'
    },
    topicTag: {
      padding: '3px 8px',
      backgroundColor: '#f0f4ff',
      color: '#667eea',
      borderRadius: '10px',
      fontSize: '11px',
      fontWeight: '600'
    },
    quizActions: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px'
    },
    actionButton: {
      padding: '14px 35px',
      fontSize: '16px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '18px',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 10px 30px rgba(255, 138, 0, 0.3)',
      marginLeft: '12px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    primaryAction: {
      backgroundColor: '#667eea',
      color: 'white'
    },
    secondaryAction: {
      backgroundColor: '#f0f0f0',
      color: '#666'
    },
    scoreSection: {
      backgroundColor: '#f0f8ff',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '15px'
    },
    scoreLabel: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '5px'
    },
    scoreValue: {
      fontSize: '20px',
      fontWeight: 'bold'
    },
    recommendedBanner: {
      backgroundColor: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '15px'
    },
    recommendedReason: {
      fontSize: '12px',
      color: '#856404',
      fontStyle: 'italic'
    },
    priorityBadge: {
      padding: '2px 6px',
      borderRadius: '8px',
      fontSize: '10px',
      fontWeight: 'bold',
      color: 'white',
      marginLeft: '8px'
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

  const renderQuizCard = (quiz) => (
    <div 
      key={quiz.id}
      style={styles.quizCard}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {activeTab === 'recommended' && (
        <div style={styles.recommendedBanner}>
          <div style={styles.recommendedReason}>
            💡 {quiz.reason}
            <span 
              style={{
                ...styles.priorityBadge,
                backgroundColor: getPriorityColor(quiz.priority)
              }}
            >
              {quiz.priority}
            </span>
          </div>
        </div>
      )}

      <div style={styles.quizHeader}>
        <div>
          <div style={styles.quizTitle}>{quiz.title}</div>
          <div style={styles.quizSubject}>{quiz.subject}</div>
        </div>
        <div 
          style={{
            ...styles.difficultyBadge,
            backgroundColor: getDifficultyColor(quiz.difficulty)
          }}
        >
          {quiz.difficulty}
        </div>
      </div>

      {activeTab === 'completed' && quiz.bestScore && (
        <div style={styles.scoreSection}>
          <div style={styles.scoreLabel}>Best Score</div>
          <div 
            style={{
              ...styles.scoreValue,
              color: getScoreColor(quiz.bestScore)
            }}
          >
            {quiz.bestScore}%
          </div>
          <div style={styles.scoreLabel}>
            Last attempt: {new Date(quiz.lastAttempt).toLocaleDateString()} | 
            Attempts: {quiz.attempts}
          </div>
        </div>
      )}

      <div style={styles.quizStats}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Questions:</span> {quiz.questions}
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Time:</span> {quiz.estimatedTime}
        </div>
      </div>

      <div style={styles.topicTags}>
        {quiz.topics.map((topic, index) => (
          <span key={index} style={styles.topicTag}>
            {topic}
          </span>
        ))}
      </div>

      <div style={styles.quizActions}>
        {activeTab === 'completed' ? (
          <>
            <button 
              style={{...styles.actionButton, ...styles.primaryAction}}
              onClick={() => navigate('/quiz')}
            >
              Retake Quiz
            </button>
            <button style={{...styles.actionButton, ...styles.secondaryAction}}>
              View Results
            </button>
          </>
        ) : (
          <>
            <button 
              style={{...styles.actionButton, ...styles.primaryAction}}
              onClick={() => navigate('/quiz')}
            >
              Start Quiz
            </button>
            <button style={{...styles.actionButton, ...styles.secondaryAction}}>
              Preview
            </button>
          </>
        )}
      </div>
    </div>
  );

  const renderEmptyState = (tab) => (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>
        {tab === 'available' ? '📝' : tab === 'completed' ? '✅' : '💡'}
      </div>
      <div style={styles.emptyTitle}>
        {tab === 'available' ? 'No Quizzes Available' : 
         tab === 'completed' ? 'No Completed Quizzes' : 'No Recommendations'}
      </div>
      <div style={styles.emptyDescription}>
        {tab === 'available' ? 'New quizzes will appear here based on your study schedule.' :
         tab === 'completed' ? 'Your completed quizzes and scores will appear here.' :
         'Take the C-PAT assessment to get personalized quiz recommendations.'}
      </div>
      {tab === 'available' && (
        <button 
          style={{...styles.actionButton, ...styles.primaryAction, maxWidth: '200px'}}
          onClick={() => navigate('/quiz')}
        >
          Create Custom Quiz
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
        <h1 style={styles.title}>📝 My Quizzes</h1>
        <button 
          style={{...styles.actionButton, margin: 0}}
          onClick={() => navigate('/quiz')}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #ff9a00, #ff6b00)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 15px 40px rgba(255, 138, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-2))';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 30px rgba(255, 138, 0, 0.3)';
          }}
        >
          + Generate Quiz
        </button>
      </div>

      <div style={styles.mainCard}>
        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'available' ? styles.activeTab : styles.inactiveTab)
            }}
            onClick={() => setActiveTab('available')}
          >
            Available ({quizzes.available.length})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'completed' ? styles.activeTab : styles.inactiveTab)
            }}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({quizzes.completed.length})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'recommended' ? styles.activeTab : styles.inactiveTab)
            }}
            onClick={() => setActiveTab('recommended')}
          >
            Recommended ({quizzes.recommended.length})
          </button>
        </div>

        {quizzes[activeTab].length > 0 ? (
          <div style={styles.quizGrid}>
            {quizzes[activeTab].map(renderQuizCard)}
          </div>
        ) : (
          renderEmptyState(activeTab)
        )}
      </div>
    </div>
  );
};

export default Quizzes;
