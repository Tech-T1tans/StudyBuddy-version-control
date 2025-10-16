import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalizationFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    examType: '',
    prepLevel: 50,
    preferences: [],
    targetPercentile: '',
    targetYear: ''
  });

  const handleExamTypeSelect = (type) => {
    setFormData({ ...formData, examType: type });
  };

  const handlePrepLevelChange = (e) => {
    setFormData({ ...formData, prepLevel: e.target.value });
  };

  const handlePreferenceToggle = (preference) => {
    const newPreferences = formData.preferences.includes(preference)
      ? formData.preferences.filter(p => p !== preference)
      : [...formData.preferences, preference];
    setFormData({ ...formData, preferences: newPreferences });
  };

  const handleGoalChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save personalization data
      localStorage.setItem('personalization', JSON.stringify(formData));
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/result');
    }
  };

  const canProceed = () => {
    switch(currentStep) {
      case 1: return formData.examType !== '';
      case 2: return true;
      case 3: return formData.preferences.length > 0;
      case 4: return formData.targetPercentile !== '' && formData.targetYear !== '';
      default: return false;
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'var(--background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
      opacity: 0.15,
      animation: 'orbitFloat 30s infinite ease-in-out'
    },
    bgOrb1: {
      width: '600px',
      height: '600px',
      background: 'radial-gradient(circle, var(--accent), transparent)',
      top: '-300px',
      left: '-300px'
    },
    bgOrb2: {
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, var(--accent-2), transparent)',
      bottom: '-250px',
      right: '-250px',
      animationDelay: '15s'
    },
    progressContainer: {
      width: '100%',
      maxWidth: '600px',
      marginBottom: '30px'
    },
    progressSteps: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px'
    },
    step: {
      flex: 1,
      textAlign: 'center',
      position: 'relative'
    },
    stepNumber: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'white',
      color: '#667eea',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 10px',
      fontWeight: 'bold',
      fontSize: '18px',
      border: '3px solid white',
      transition: 'all 0.3s ease'
    },
    stepActive: {
      backgroundColor: '#667eea',
      color: 'white'
    },
    stepCompleted: {
      backgroundColor: '#4CAF50',
      color: 'white'
    },
    stepLabel: {
      fontSize: '14px',
      color: 'white',
      fontWeight: '600'
    },
    stepLine: {
      position: 'absolute',
      top: '20px',
      left: '50%',
      width: '100%',
      height: '2px',
      backgroundColor: 'rgba(255,255,255,0.3)',
      zIndex: -1
    },
    stepLineCompleted: {
      backgroundColor: '#4CAF50'
    },
    card: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.95), rgba(23, 19, 22, 0.7))',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderRadius: '35px',
      padding: '50px',
      width: '100%',
      maxWidth: '650px',
      boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 120px rgba(255, 138, 0, 0.06)',
      border: '1px solid rgba(255, 138, 0, 0.15)',
      position: 'relative',
      zIndex: 10,
      minHeight: '400px'
    },
    title: {
      fontSize: '42px',
      fontWeight: '900',
      background: 'linear-gradient(135deg, var(--text), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '15px',
      textAlign: 'center',
      letterSpacing: '-1.5px'
    },
    optionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '15px',
      marginBottom: '30px'
    },
    optionCard: {
      padding: '20px',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: '600'
    },
    optionSelected: {
      borderColor: '#667eea',
      backgroundColor: '#f0f4ff',
      color: '#667eea'
    },
    sliderContainer: {
      marginTop: '30px',
      marginBottom: '30px'
    },
    slider: {
      width: '100%',
      height: '8px',
      borderRadius: '4px',
      outline: 'none',
      WebkitAppearance: 'none',
      background: `linear-gradient(to right, #ff6b6b 0%, #ffd93d 50%, #4CAF50 100%)`
    },
    sliderLabels: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',
      fontSize: '14px',
      color: '#666'
    },
    sliderValue: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#667eea',
      marginTop: '20px'
    },
    checkbox: {
      width: '20px',
      height: '20px',
      marginRight: '10px'
    },
    preferenceOption: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '10px',
      fontSize: '16px'
    },
    preferenceSelected: {
      borderColor: '#667eea',
      backgroundColor: '#f0f4ff'
    },
    inputGroup: {
      marginBottom: '20px'
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
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px',
      gap: '20px'
    },
    button: {
      width: '100%',
      padding: '18px',
      fontSize: '18px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '18px',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 12px 35px rgba(255, 138, 0, 0.35)',
      marginTop: '25px',
      textTransform: 'uppercase',
      letterSpacing: '1.5px'
    },
    backButton: {
      backgroundColor: '#f0f0f0',
      color: '#666'
    },
    nextButton: {
      backgroundColor: '#667eea',
      color: 'white'
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <h2 style={styles.title}>What are you preparing for?</h2>
            <div style={styles.optionGrid}>
              {['JEE', 'Boards', 'Both'].map(exam => (
                <div
                  key={exam}
                  style={{
                    ...styles.optionCard,
                    ...(formData.examType === exam ? styles.optionSelected : {})
                  }}
                  onClick={() => handleExamTypeSelect(exam)}
                >
                  {exam === 'JEE' && '🎯 '}
                  {exam === 'Boards' && '📖 '}
                  {exam === 'Both' && '📚 '}
                  {exam}
                </div>
              ))}
            </div>
          </>
        );

      case 2:
        const getPrepLevelText = () => {
          if (formData.prepLevel < 33) return 'Needs Improvement';
          if (formData.prepLevel < 66) return 'Average';
          return 'Good';
        };
        
        return (
          <>
            <h2 style={styles.title}>How is your preparation going?</h2>
            <div style={styles.sliderContainer}>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.prepLevel}
                onChange={handlePrepLevelChange}
                style={styles.slider}
              />
              <div style={styles.sliderLabels}>
                <span>Bad</span>
                <span>Average</span>
                <span>Good</span>
              </div>
              <div style={styles.sliderValue}>{getPrepLevelText()}</div>
            </div>
          </>
        );

      case 3:
        const preferences = [
          { id: 'lectures', label: '📹 Video Lectures', icon: '📹' },
          { id: 'books', label: '📚 Books', icon: '📚' },
          { id: 'handwritten', label: '✍️ Handwritten Notes', icon: '✍️' },
          { id: 'tutoring', label: '👨‍🏫 Personal Tutoring', icon: '👨‍🏫' },
          { id: 'practice', label: '📝 Practice Tests', icon: '📝' },
          { id: 'groups', label: '👥 Study Groups', icon: '👥' }
        ];
        
        return (
          <>
            <h2 style={styles.title}>What's your learning preference?</h2>
            <div>
              {preferences.map(pref => (
                <div
                  key={pref.id}
                  style={{
                    ...styles.preferenceOption,
                    ...(formData.preferences.includes(pref.id) ? styles.preferenceSelected : {})
                  }}
                  onClick={() => handlePreferenceToggle(pref.id)}
                >
                  <input
                    type="checkbox"
                    checked={formData.preferences.includes(pref.id)}
                    onChange={() => {}}
                    style={styles.checkbox}
                  />
                  <span>{pref.label}</span>
                </div>
              ))}
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2 style={styles.title}>Set your goal</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Target Percentile/Score</label>
              <input
                type="number"
                placeholder="Enter target percentile (e.g., 95)"
                value={formData.targetPercentile}
                onChange={(e) => handleGoalChange('targetPercentile', e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Target Year</label>
              <input
                type="number"
                placeholder="Enter target year (e.g., 2025)"
                value={formData.targetYear}
                onChange={(e) => handleGoalChange('targetYear', e.target.value)}
                style={styles.input}
                min="2024"
                max="2030"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const stepLabels = ['Exam Type', 'Prep Level', 'Preferences', 'Goals'];

  return (
    <div style={styles.container}>
      <div style={styles.progressContainer}>
        <div style={styles.progressSteps}>
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} style={styles.step}>
              {index > 0 && (
                <div 
                  style={{
                    ...styles.stepLine,
                    ...(currentStep > step ? styles.stepLineCompleted : {})
                  }}
                />
              )}
              <div 
                style={{
                  ...styles.stepNumber,
                  ...(currentStep === step ? styles.stepActive : {}),
                  ...(currentStep > step ? styles.stepCompleted : {})
                }}
              >
                {currentStep > step ? '✓' : step}
              </div>
              <div style={styles.stepLabel}>{stepLabels[index]}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        {renderStepContent()}
        
        <div style={styles.navigation}>
          <button
            style={{
              ...styles.navButton,
              ...styles.backButton
            }}
            onClick={handleBack}
          >
            {currentStep === 1 ? 'Back to Results' : 'Previous'}
          </button>
          <button
            style={{
              ...styles.navButton,
              ...styles.nextButton,
              ...(!canProceed() ? styles.disabledButton : {})
            }}
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === 4 ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationFlow;
