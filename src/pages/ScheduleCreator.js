import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScheduleCreator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    syllabus: null,
    selectedTopics: [],
    deadline: '',
    studyHours: 5,
    schedule: null
  });

  const mockTopics = [
    { category: 'Physics', topics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism'] },
    { category: 'Chemistry', topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'] },
    { category: 'Mathematics', topics: ['Calculus', 'Algebra', 'Trigonometry', 'Probability'] }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, syllabus: file });
    }
  };

  const handleTopicToggle = (topic) => {
    const newTopics = formData.selectedTopics.includes(topic)
      ? formData.selectedTopics.filter(t => t !== topic)
      : [...formData.selectedTopics, topic];
    setFormData({ ...formData, selectedTopics: newTopics });
  };

  const generateSchedule = () => {
    // Mock schedule generation
    const schedule = [];
    const topics = formData.selectedTopics;
    const days = 30; // Assume 30 days for simplicity
    const hoursPerDay = formData.studyHours;
    
    for (let day = 1; day <= days && day <= 7; day++) {
      const daySchedule = {
        day: `Day ${day}`,
        date: new Date(Date.now() + (day - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        sessions: []
      };
      
      // Distribute topics across the day
      const topicsPerDay = Math.min(3, topics.length);
      for (let i = 0; i < topicsPerDay; i++) {
        const topicIndex = (day - 1 + i) % topics.length;
        daySchedule.sessions.push({
          time: `${9 + i * 3}:00 - ${11 + i * 3}:00`,
          topic: topics[topicIndex],
          type: i === topicsPerDay - 1 ? 'Quiz' : 'Study'
        });
      }
      
      schedule.push(daySchedule);
    }
    
    setFormData({ ...formData, schedule });
    setCurrentStep(5);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      generateSchedule();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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
      filter: 'blur(90px)',
      opacity: 0.12
    },
    bgOrb1: {
      width: '600px',
      height: '600px',
      background: 'radial-gradient(circle, var(--accent), transparent)',
      top: '-300px',
      left: '-300px',
      animation: 'orbitFloat 30s infinite ease-in-out'
    },
    bgOrb2: {
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, var(--accent-2), transparent)',
      bottom: '-250px',
      right: '-250px',
      animation: 'orbitFloat 25s infinite ease-in-out reverse'
    },
    header: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.95), rgba(23, 19, 22, 0.7))',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      borderRadius: '30px',
      padding: '40px',
      marginBottom: '35px',
      boxShadow: '0 25px 70px rgba(0,0,0,0.5), 0 0 120px rgba(255, 138, 0, 0.06)',
      border: '1px solid rgba(255, 138, 0, 0.15)',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: 'white'
    },
    stepTitle: {
      fontSize: '28px',
      fontWeight: '800',
      color: 'var(--text)',
      marginBottom: '35px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    uploadArea: {
      border: '3px dashed rgba(255, 138, 0, 0.3)',
      borderRadius: '20px',
      padding: '60px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      background: 'rgba(15, 14, 16, 0.4)',
      backdropFilter: 'blur(10px)'
    },
    uploadAreaActive: {
      borderColor: 'var(--accent)',
      background: 'rgba(255, 138, 0, 0.05)',
      boxShadow: 'inset 0 0 40px rgba(255, 138, 0, 0.1)'
    },
    fileInput: {
      display: 'none'
    },
    uploadIcon: {
      fontSize: '56px',
      marginBottom: '25px',
      filter: 'drop-shadow(0 5px 15px rgba(255, 138, 0, 0.3))'
    },
    subtitle: {
      fontSize: '18px',
      color: 'var(--muted)',
      opacity: 0.9
    },
    uploadSubtext: {
      fontSize: '14px',
      color: 'var(--muted)',
      opacity: 0.8
    },
    topicGrid: {
      marginTop: '20px',
      maxHeight: '350px',
      overflowY: 'auto'
    },
    categorySection: {
      marginBottom: '25px'
    },
    categoryTitle: {
      fontSize: '48px',
      fontWeight: '900',
      background: 'linear-gradient(135deg, var(--text), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '15px',
      letterSpacing: '-2px'
    },
    topicList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '10px'
    },
    topicItem: {
      padding: '12px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    topicSelected: {
      borderColor: 'var(--accent)',
      background: 'rgba(255, 138, 0, 0.05)',
      boxShadow: 'inset 0 0 40px rgba(255, 138, 0, 0.1)'
    },
    checkbox: {
      width: '20px',
      height: '20px'
    },
    inputGroup: {
      marginBottom: '30px'
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontSize: '16px',
      color: '#555',
      fontWeight: '600'
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      outline: 'none'
    },
    slider: {
      width: '100%',
      height: '8px',
      borderRadius: '4px',
      outline: 'none',
      WebkitAppearance: 'none',
      background: '#e0e0e0'
    },
    sliderValue: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#667eea',
      marginTop: '20px'
    },
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '40px',
      gap: '20px'
    },
    navButton: {
      flex: 1,
      padding: '15px 30px',
      fontSize: '16px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    prevButton: {
      backgroundColor: '#f0f0f0',
      color: '#666'
    },
    nextButton: {
      backgroundColor: '#667eea',
      color: 'white'
    },
    generateButton: {
      backgroundColor: '#4CAF50',
      color: 'white'
    },
    scheduleContainer: {
      marginTop: '20px',
      maxHeight: '400px',
      overflowY: 'auto'
    },
    scheduleDay: {
      marginBottom: '20px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px'
    },
    dayHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      fontWeight: 'bold',
      color: '#333'
    },
    sessionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '8px',
      marginBottom: '8px',
      alignItems: 'center'
    },
    sessionTime: {
      color: '#667eea',
      fontWeight: '600'
    },
    sessionTopic: {
      color: '#333',
      flex: 1,
      marginLeft: '20px'
    },
    sessionType: {
      padding: '4px 12px',
      borderRadius: '15px',
      fontSize: '12px',
      fontWeight: '600'
    },
    downloadButton: {
      marginTop: '20px',
      padding: '12px 24px',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600'
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <h2 style={styles.stepTitle}>Step 1: Upload Your Syllabus</h2>
            <div 
              style={{
                ...styles.uploadArea,
                ...(formData.syllabus ? styles.uploadAreaActive : {})
              }}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <input
                id="fileInput"
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileUpload}
                style={styles.fileInput}
              />
              <div style={styles.uploadIcon}>📁</div>
              <div style={styles.uploadText}>
                {formData.syllabus ? formData.syllabus.name : 'Click to upload syllabus'}
              </div>
              <div style={styles.uploadSubtext}>
                Supports PDF, TXT, DOC files
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 style={styles.stepTitle}>Step 2: Select Topics to Study</h2>
            <div style={styles.topicGrid}>
              {mockTopics.map((category) => (
                <div key={category.category} style={styles.categorySection}>
                  <div style={styles.categoryTitle}>{category.category}</div>
                  <div style={styles.topicList}>
                    {category.topics.map((topic) => (
                      <div
                        key={topic}
                        style={{
                          ...styles.topicItem,
                          ...(formData.selectedTopics.includes(topic) ? styles.topicSelected : {})
                        }}
                        onClick={() => handleTopicToggle(topic)}
                      >
                        <input
                          type="checkbox"
                          checked={formData.selectedTopics.includes(topic)}
                          onChange={() => {}}
                          style={styles.checkbox}
                        />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 style={styles.stepTitle}>Step 3: Set Your Deadline</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Exam/Target Date</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                style={styles.input}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2 style={styles.stepTitle}>Step 4: Daily Study Hours</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>How many hours can you study per day?</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.studyHours}
                onChange={(e) => setFormData({ ...formData, studyHours: e.target.value })}
                style={styles.slider}
              />
              <div style={styles.sliderValue}>{formData.studyHours} hours/day</div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <h2 style={styles.stepTitle}>Your Personalized Study Schedule</h2>
            <div style={styles.scheduleContainer}>
              {formData.schedule && formData.schedule.map((day, index) => (
                <div key={index} style={styles.scheduleDay}>
                  <div style={styles.dayHeader}>
                    <span>{day.day}</span>
                    <span>{day.date}</span>
                  </div>
                  {day.sessions.map((session, sIndex) => (
                    <div key={sIndex} style={styles.sessionItem}>
                      <span style={styles.sessionTime}>{session.time}</span>
                      <span style={styles.sessionTopic}>{session.topic}</span>
                      <span style={{
                        ...styles.sessionType,
                        backgroundColor: session.type === 'Quiz' ? '#FFE4B5' : '#E8F5E9',
                        color: session.type === 'Quiz' ? '#FF8C00' : '#4CAF50'
                      }}>
                        {session.type}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button 
              style={styles.downloadButton}
              onClick={() => alert('Download feature will be available soon!')}
            >
              Download Schedule (PDF)
            </button>
          </>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch(currentStep) {
      case 1: return formData.syllabus !== null;
      case 2: return formData.selectedTopics.length > 0;
      case 3: return formData.deadline !== '';
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>AI Schedule Creator</h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={styles.card}>
        {renderStepContent()}
        
        {currentStep < 5 && (
          <div style={styles.navigation}>
            <button
              style={{
                ...styles.navButton,
                ...styles.prevButton
              }}
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            <button
              style={{
                ...styles.navButton,
                ...(currentStep === 4 ? styles.generateButton : styles.nextButton),
                opacity: canProceed() ? 1 : 0.5
              }}
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === 4 ? 'Generate Schedule' : 'Next'}
            </button>
          </div>
        )}

        {currentStep === 5 && (
          <div style={styles.navigation}>
            <button
              style={{
                ...styles.navButton,
                ...styles.nextButton
              }}
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleCreator;
