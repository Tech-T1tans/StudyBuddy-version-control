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
    header: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.95), rgba(23, 19, 22, 0.7))',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      borderRadius: '20px',
      padding: '25px 35px',
      marginBottom: '30px',
      maxWidth: '1100px',
      margin: '0 auto 30px',
      boxShadow: '0 15px 50px rgba(0,0,0,0.4), 0 0 80px rgba(255, 138, 0, 0.05)',
      border: '1px solid rgba(255, 138, 0, 0.15)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    },
    backButton: {
      padding: '10px 20px',
      backgroundColor: 'rgba(255, 138, 0, 0.1)',
      color: 'var(--accent)',
      border: '1px solid var(--accent)',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    card: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '25px',
      padding: '50px',
      maxWidth: '1100px',
      margin: '0 auto',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 100px rgba(255, 138, 0, 0.04)',
      border: '1px solid rgba(255, 138, 0, 0.12)',
      position: 'relative',
      zIndex: 10
    },
    title: {
      fontSize: '26px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, var(--text), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.5px'
    },
    stepTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: 'var(--text)',
      marginBottom: '25px',
      letterSpacing: '0.5px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    uploadArea: {
      border: '2px dashed rgba(255, 138, 0, 0.3)',
      borderRadius: '15px',
      padding: '40px',
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
      fontSize: '48px',
      marginBottom: '15px',
      filter: 'drop-shadow(0 4px 12px rgba(255, 138, 0, 0.3))'
    },
    uploadText: {
      fontSize: '16px',
      color: 'var(--text)',
      fontWeight: '600',
      marginBottom: '8px'
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
      maxHeight: '400px',
      overflowY: 'auto',
      padding: '10px'
    },
    categorySection: {
      marginBottom: '25px'
    },
    categoryTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: 'var(--accent)',
      marginBottom: '12px',
      letterSpacing: '0.5px',
      textTransform: 'uppercase'
    },
    topicList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '12px'
    },
    topicItem: {
      padding: '12px 15px',
      border: '2px solid rgba(255, 138, 0, 0.2)',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'rgba(15, 14, 16, 0.3)',
      fontSize: '14px',
      color: 'var(--text)'
    },
    topicSelected: {
      borderColor: 'var(--accent)',
      background: 'rgba(255, 138, 0, 0.15)',
      boxShadow: '0 4px 15px rgba(255, 138, 0, 0.3)',
      transform: 'translateY(-2px)'
    },
    checkbox: {
      width: '20px',
      height: '20px'
    },
    inputGroup: {
      marginBottom: '25px',
      maxWidth: '600px',
      margin: '0 auto 25px'
    },
    label: {
      display: 'block',
      marginBottom: '12px',
      fontSize: '15px',
      color: 'var(--text)',
      fontWeight: '600'
    },
    input: {
      width: '100%',
      padding: '14px',
      fontSize: '15px',
      border: '2px solid rgba(255, 138, 0, 0.2)',
      borderRadius: '12px',
      outline: 'none',
      background: 'rgba(15, 14, 16, 0.5)',
      color: 'var(--text)',
      transition: 'all 0.3s ease'
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
      fontSize: '28px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginTop: '20px'
    },
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '35px',
      gap: '15px',
      maxWidth: '600px',
      margin: '35px auto 0'
    },
    navButton: {
      flex: 1,
      padding: '14px 28px',
      fontSize: '15px',
      fontWeight: '700',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    prevButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'var(--muted)',
      border: '2px solid rgba(255, 138, 0, 0.2)'
    },
    nextButton: {
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      boxShadow: '0 8px 25px rgba(255, 138, 0, 0.4)'
    },
    generateButton: {
      background: 'linear-gradient(135deg, #4CAF50, #45a049)',
      color: 'white',
      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)'
    },
    scheduleContainer: {
      marginTop: '20px',
      maxHeight: '450px',
      overflowY: 'auto',
      padding: '10px'
    },
    scheduleDay: {
      marginBottom: '15px',
      padding: '20px',
      background: 'rgba(15, 14, 16, 0.5)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 138, 0, 0.15)'
    },
    dayHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      fontWeight: '700',
      fontSize: '16px',
      color: 'var(--text)'
    },
    sessionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 15px',
      background: 'rgba(255, 138, 0, 0.05)',
      borderRadius: '10px',
      marginBottom: '10px',
      alignItems: 'center',
      border: '1px solid rgba(255, 138, 0, 0.1)'
    },
    sessionTime: {
      color: 'var(--accent)',
      fontWeight: '700',
      fontSize: '14px'
    },
    sessionTopic: {
      color: 'var(--text)',
      flex: 1,
      marginLeft: '20px',
      fontSize: '15px',
      fontWeight: '500'
    },
    sessionType: {
      padding: '4px 12px',
      borderRadius: '15px',
      fontSize: '12px',
      fontWeight: '600'
    },
    downloadButton: {
      marginTop: '25px',
      padding: '14px 30px',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '700',
      boxShadow: '0 8px 25px rgba(255, 138, 0, 0.4)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      transition: 'all 0.3s ease'
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
      <style>{`
      `}</style>
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
