import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GeneralQuestions = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    preparation: '',
    preparationProgress: 50,
    preferences: [],
    goals: {
      percentage: '',
      percentile: ''
    }
  });

  const handlePreparationSelect = (prep) => {
    setFormData({ ...formData, preparation: prep });
  };

  const handleProgressChange = (value) => {
    setFormData({ ...formData, preparationProgress: value });
  };

  const handlePreferenceToggle = (preference) => {
    const newPreferences = formData.preferences.includes(preference)
      ? formData.preferences.filter(p => p !== preference)
      : [...formData.preferences, preference];
    setFormData({ ...formData, preferences: newPreferences });
  };

  const handleGoalChange = (field, value) => {
    setFormData({ 
      ...formData, 
      goals: { ...formData.goals, [field]: value }
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save general info and move to final screen
      setCurrentStep(5);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTakeAssessment = () => {
    localStorage.setItem('generalInfo', JSON.stringify(formData));
    navigate('/cpat');
  };

  const handleSkipToDashboard = () => {
    localStorage.setItem('generalInfo', JSON.stringify(formData));
    navigate('/dashboard');
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
    card: {
      backgroundColor: 'var(--surface)',
      borderRadius: '20px',
      padding: '40px',
      width: '100%',
      maxWidth: '600px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      minHeight: '500px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'var(--text)',
      marginBottom: '30px',
      textAlign: 'center'
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
      borderColor: 'var(--accent)',
      backgroundColor: 'var(--accent)',
      color: 'var(--background)'
    },
    checkboxContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '30px'
    },
    checkboxItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 15px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      marginRight: '8px'
    },
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px',
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
    backButton: {
      backgroundColor: 'var(--muted)',
      color: 'var(--background)'
    },
    nextButton: {
      backgroundColor: 'var(--accent)',
      color: 'var(--text)'
    },
    assessmentSection: {
      textAlign: 'center',
      marginTop: '40px'
    },
    assessmentTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '20px'
    },
    assessmentDescription: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '30px',
      lineHeight: '1.6'
    },
    assessmentButtons: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center'
    },
    primaryButton: {
      padding: '15px 30px',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: 'var(--accent)',
      color: 'var(--text)',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer'
    },
    secondaryButton: {
      padding: '15px 30px',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: 'var(--muted)',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer'
    },
    slider: {
      width: '100%',
      height: '8px',
      borderRadius: '5px',
      background: 'var(--muted)',
      outline: 'none',
      marginBottom: '20px'
    },
    sliderThumb: {
      appearance: 'none',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: 'var(--accent)',
      cursor: 'pointer'
    },
    progressLabels: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: 'var(--muted)',
      marginBottom: '30px'
    },
    inputField: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid var(--muted)',
      borderRadius: '8px',
      backgroundColor: 'var(--background)',
      color: 'var(--text)',
      marginBottom: '15px'
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <h2 style={styles.title}>What are you preparing for?</h2>
            <div style={styles.optionGrid}>
              {['12th-Boards', 'JEE', '12th+JEE'].map(prep => (
                <div
                  key={prep}
                  style={{
                    ...styles.optionCard,
                    ...(formData.preparation === prep ? styles.optionSelected : {})
                  }}
                  onClick={() => handlePreparationSelect(prep)}
                >
                  {prep}
                </div>
              ))}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 style={styles.title}>How is your preparation going?</h2>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.preparationProgress}
                onChange={(e) => handleProgressChange(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '5px',
                  background: `linear-gradient(to right, 
                    #ff4444 0%, 
                    #ff8844 25%, 
                    #ffaa44 50%, 
                    #88ff44 75%, 
                    #44ff44 100%)`,
                  outline: 'none',
                  marginBottom: '20px'
                }}
              />
              <div style={styles.progressLabels}>
                <span>Pretty Bad</span>
                <span>Bad</span>
                <span>Moderate</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
              <div style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: 'var(--accent)',
                marginTop: '10px'
              }}>
                Current Progress: {formData.preparationProgress}%
              </div>
            </div>
          </>
        );

      case 3:
        const preferences = ['Lectures', 'Books', 'Notes', 'Personal Tutor'];
        return (
          <>
            <h2 style={styles.title}>What's your preference?</h2>
            <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '20px' }}>
              Select multiple options that work for you
            </p>
            <div style={styles.checkboxContainer}>
              {preferences.map(preference => (
                <div
                  key={preference}
                  style={{
                    ...styles.checkboxItem,
                    ...(formData.preferences.includes(preference) ? styles.optionSelected : {})
                  }}
                  onClick={() => handlePreferenceToggle(preference)}
                >
                  <input
                    type="checkbox"
                    checked={formData.preferences.includes(preference)}
                    onChange={() => {}}
                    style={styles.checkbox}
                  />
                  <span>{preference}</span>
                </div>
              ))}
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2 style={styles.title}>Set your goal</h2>
            <div style={{ textAlign: 'left' }}>
              {(formData.preparation === '12th-Boards' || formData.preparation === '12th+JEE') && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    color: 'var(--text)',
                    fontWeight: 'bold'
                  }}>
                    Target Percentage in 12th Boards:
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter percentage (e.g., 95)"
                    value={formData.goals.percentage}
                    onChange={(e) => handleGoalChange('percentage', e.target.value)}
                    style={styles.inputField}
                  />
                </div>
              )}
              {(formData.preparation === 'JEE' || formData.preparation === '12th+JEE') && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    color: 'var(--text)',
                    fontWeight: 'bold'
                  }}>
                    Target Percentile in JEE:
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter percentile (e.g., 99.5)"
                    value={formData.goals.percentile}
                    onChange={(e) => handleGoalChange('percentile', e.target.value)}
                    style={styles.inputField}
                  />
                </div>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch(currentStep) {
      case 1: return formData.preparation !== '';
      case 2: return true; // Always allow progress for slider
      case 3: return formData.preferences.length > 0;
      case 4: {
        if (formData.preparation === '12th-Boards') {
          return formData.goals.percentage !== '';
        } else if (formData.preparation === 'JEE') {
          return formData.goals.percentile !== '';
        } else if (formData.preparation === '12th+JEE') {
          return formData.goals.percentage !== '' && formData.goals.percentile !== '';
        }
        return false;
      }
      default: return false;
    }
  };

  if (currentStep === 5) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.assessmentSection}>
            <h2 style={{ ...styles.assessmentTitle, color: 'var(--text)' }}>Ready to Optimize Your Learning? 🧠</h2>
            <p style={{ ...styles.assessmentDescription, color: 'var(--muted)' }}>
              Take our C-PAT (Cognitive & Personality Assessment Test) to get personalized study recommendations 
              based on your learning style, attention span, and cognitive abilities. This 3-minute assessment 
              will help us create the perfect study plan for you!
            </p>
            <div style={styles.assessmentButtons}>
              <button 
                style={styles.primaryButton}
                onClick={handleTakeAssessment}
              >
                Take C-PAT Test 🎯
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={handleSkipToDashboard}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {renderStepContent()}
        
        <div style={styles.navigation}>
          <button
            style={{
              ...styles.navButton,
              ...styles.backButton
            }}
            onClick={handleBack}
            disabled={currentStep === 1}
          >
{currentStep === 1 ? 'Back' : 'Previous'}
          </button>
          <button
            style={{
              ...styles.navButton,
              ...styles.nextButton,
              opacity: canProceed() ? 1 : 0.5
            }}
            onClick={handleNext}
            disabled={!canProceed()}
          >
{currentStep === 4 ? 'Continue' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralQuestions;
