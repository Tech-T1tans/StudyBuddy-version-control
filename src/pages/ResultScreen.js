import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultScreen = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('cpatResults') || '{}');
    setResults(storedResults);
  }, []);

  const parameters = [
    { 
      name: 'Attention Span', 
      icon: '🧠', 
      value: results?.attention || 75, 
      color: 'var(--accent)',
      description: 'Your ability to maintain focus on a single task'
    },
    { 
      name: 'Focus', 
      icon: '🎯', 
      value: results?.focus || 60, 
      color: 'var(--accent-2)',
      description: 'How well you concentrate without distractions'
    },
    { 
      name: 'Learning Style', 
      icon: '📚', 
      value: results?.learningStyle || 'Visual', 
      color: 'var(--accent)',
      description: 'Your preferred way of absorbing information',
      isText: true
    },
    { 
      name: 'Memory', 
      icon: '💭', 
      value: results?.memory || 80, 
      color: 'var(--accent-2)',
      description: 'Your capacity to retain and recall information'
    },
    { 
      name: 'Comprehension', 
      icon: '💡', 
      value: results?.comprehension || 70, 
      color: 'var(--accent)',
      description: 'How well you understand complex concepts'
    },
    { 
      name: 'Speed', 
      icon: '⚡', 
      value: results?.speed || 65, 
      color: '#E91E63',
      description: 'Your pace of processing new information'
    }
  ];

  const getOverallEvaluation = () => {
    const avgScore = parameters.filter(p => !p.isText).reduce((sum, p) => sum + p.value, 0) / 5;
    if (avgScore >= 75) {
      return "Excellent! You have strong cognitive abilities and are well-prepared for intensive learning.";
    } else if (avgScore >= 60) {
      return "Good foundation! You have solid learning capabilities with room for strategic improvements.";
    } else {
      return "Room for growth! Focus on building better study habits and concentration techniques.";
    }
  };

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
      maxWidth: '1000px',
      marginBottom: '30px',
      textAlign: 'center'
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
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
      color: 'var(--text)',
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '18px',
      color: 'var(--muted)'
    },
    resultsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      width: '100%',
      maxWidth: '1000px',
      marginBottom: '30px'
    },
    parameterCard: {
      backgroundColor: 'var(--surface)',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
      border: '1px solid rgba(255, 138, 0, 0.1)'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
      gap: '10px'
    },
    icon: {
      fontSize: '28px'
    },
    parameterName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'var(--text)'
    },
    scoreContainer: {
      marginBottom: '10px'
    },
    scoreText: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    progressBar: {
      width: '100%',
      height: '10px',
      backgroundColor: 'var(--background)',
      borderRadius: '5px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      transition: 'width 1s ease',
      borderRadius: '5px'
    },
    description: {
      fontSize: '14px',
      color: 'var(--muted)',
      marginTop: '10px'
    },
    evaluationCard: {
      width: '100%',
      maxWidth: '1000px',
      backgroundColor: 'var(--surface)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      marginBottom: '30px',
      border: '1px solid rgba(255, 138, 0, 0.1)'
    },
    evaluationTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'var(--text)',
      marginBottom: '15px'
    },
    evaluationText: {
      fontSize: '18px',
      color: 'var(--text)',
      lineHeight: '1.6',
      marginBottom: '20px'
    },
    infoButton: {
      padding: '12px 24px',
      backgroundColor: 'var(--muted)',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      marginRight: '15px',
      transition: 'all 0.3s ease'
    },
    continueButton: {
      padding: '12px 24px',
      backgroundColor: 'var(--accent)',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(255, 138, 0, 0.3)'
    },
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000'
    },
    modalContent: {
      backgroundColor: 'var(--surface)',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '500px',
      maxHeight: '80vh',
      overflow: 'auto',
      border: '1px solid rgba(255, 138, 0, 0.2)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'var(--text)',
      marginBottom: '20px'
    },
    modalText: {
      fontSize: '16px',
      color: 'var(--muted)',
      lineHeight: '1.6',
      marginBottom: '20px'
    },
    closeButton: {
      padding: '12px 24px',
      backgroundColor: 'var(--accent)',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600'
    }
  };

  if (!results) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate('/cpat')}>
        ← Back to Assessment
      </button>

      <div style={styles.header}>
        <h1 style={styles.title}>Your C-PAT Results</h1>
        <p style={styles.subtitle}>Cognitive & Personality Assessment Test Analysis</p>
      </div>

      <div style={styles.resultsGrid}>
        {parameters.map((param, index) => (
          <div 
            key={index} 
            style={styles.parameterCard}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.cardHeader}>
              <span style={styles.icon}>{param.icon}</span>
              <span style={styles.parameterName}>{param.name}</span>
            </div>
            <div style={styles.scoreContainer}>
              {param.isText ? (
                <div style={{ ...styles.scoreText, color: param.color }}>
                  {param.value}
                </div>
              ) : (
                <>
                  <div style={{ ...styles.scoreText, color: param.color }}>
                    {param.value}/100
                  </div>
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: `${param.value}%`,
                        backgroundColor: param.color
                      }}
                    />
                  </div>
                </>
              )}
            </div>
            <p style={styles.description}>{param.description}</p>
          </div>
        ))}
      </div>

      <div style={styles.evaluationCard}>
        <h2 style={styles.evaluationTitle}>AI Evaluation Summary</h2>
        <p style={styles.evaluationText}>{getOverallEvaluation()}</p>
        <div>
          <button 
            style={styles.infoButton}
            onClick={() => setShowModal(true)}
          >
            How evaluation works?
          </button>
          <button 
            style={styles.continueButton}
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard →
          </button>
        </div>
      </div>

      {showModal && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>How AI Evaluation Works</h3>
            <p style={styles.modalText}>
              Our AI analyzes your responses to identify patterns in your learning behavior and cognitive abilities.
            </p>
            <p style={styles.modalText}>
              <strong>The assessment evaluates:</strong><br/>
              • Your attention span and focus duration<br/>
              • Your preferred learning modalities<br/>
              • Memory retention capabilities<br/>
              • Information processing speed<br/>
              • Comprehension of complex concepts
            </p>
            <p style={styles.modalText}>
              Based on these parameters, we create a personalized study plan tailored to your unique learning profile, 
              optimizing your preparation strategy for maximum efficiency.
            </p>
            <button 
              style={styles.closeButton} 
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultScreen;
