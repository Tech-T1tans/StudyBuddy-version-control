import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CPATScreen = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      id: 1,
      question: "How easily do you get distracted while studying?",
      options: ["Never", "Rarely", "Sometimes", "Often"],
      parameter: "attention"
    },
    {
      id: 2,
      question: "How long can you typically focus on a single task?",
      options: ["< 15 minutes", "15-30 minutes", "30-60 minutes", "> 60 minutes"],
      parameter: "focus"
    },
    {
      id: 3,
      question: "What's your preferred learning style?",
      options: ["Visual", "Auditory", "Reading/Writing", "Kinesthetic"],
      parameter: "learningStyle"
    },
    {
      id: 4,
      question: "How do you prefer to take notes?",
      options: ["Handwritten", "Digital", "Mind maps", "No notes"],
      parameter: "noteStyle"
    },
    {
      id: 5,
      question: "What time of day are you most productive?",
      options: ["Early morning", "Late morning", "Afternoon", "Evening/Night"],
      parameter: "productivity"
    },
    {
      id: 6,
      question: "How often do you review your study material?",
      options: ["Daily", "Weekly", "Before exams", "Rarely"],
      parameter: "revision"
    },
    {
      id: 7,
      question: "How comfortable are you with technology for learning?",
      options: ["Very comfortable", "Comfortable", "Somewhat comfortable", "Not comfortable"],
      parameter: "techComfort"
    },
    {
      id: 8,
      question: "How do you handle exam pressure?",
      options: ["Very well", "Well", "Average", "Poorly"],
      parameter: "pressure"
    },
    {
      id: 9,
      question: "What's your current preparation level?",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      parameter: "prepLevel"
    },
    {
      id: 10,
      question: "How many hours do you study daily?",
      options: ["< 2 hours", "2-4 hours", "4-6 hours", "> 6 hours"],
      parameter: "studyHours"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScores = () => {
    // Mock score calculation
    const scores = {
      attention: Math.floor(Math.random() * 40 + 50),
      focus: Math.floor(Math.random() * 30 + 60),
      learningStyle: questions[2].options[answers[3] || 0],
      memory: Math.floor(Math.random() * 35 + 55),
      comprehension: Math.floor(Math.random() * 40 + 50),
      speed: Math.floor(Math.random() * 30 + 45)
    };
    return scores;
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    const scores = calculateScores();
    localStorage.setItem('cpatResults', JSON.stringify(scores));
    navigate('/result');
  };

  const allAnswered = Object.keys(answers).length === questions.length;
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

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
      maxWidth: '800px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333'
    },
    timer: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: timeLeft < 60 ? '#ff6b6b' : '#667eea',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    backButton: {
      padding: '8px 16px',
      backgroundColor: '#f0f0f0',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600'
    },
    progressBar: {
      width: '100%',
      maxWidth: '800px',
      height: '8px',
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius: '4px',
      marginBottom: '30px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundColor: 'white',
      transition: 'width 0.3s ease',
      width: `${progressPercentage}%`
    },
    questionCard: {
      backgroundColor: 'var(--surface)',
      borderRadius: '20px',
      padding: '40px',
      width: '100%',
      maxWidth: '700px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      minHeight: '500px',
      border: '1px solid rgba(255, 138, 0, 0.1)'
    },
    questionNumber: {
      fontSize: '14px',
      color: '#999',
      marginBottom: '10px'
    },
    question: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'var(--text)',
      marginBottom: '30px',
      lineHeight: '1.4'
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    option: {
      padding: '20px',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    optionSelected: {
      borderColor: '#667eea',
      backgroundColor: '#f0f4ff'
    },
    radioButton: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: '2px solid #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    radioButtonSelected: {
      borderColor: '#667eea'
    },
    radioButtonInner: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#667eea'
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
    prevButton: {
      backgroundColor: '#f0f0f0',
      color: '#666'
    },
    nextButton: {
      backgroundColor: '#667eea',
      color: 'white'
    },
    submitButton: {
      backgroundColor: '#4CAF50',
      color: 'white'
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQ.id];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button 
          style={styles.backButton}
          onClick={() => navigate('/welcome')}
        >
          ← Back
        </button>
        <h1 style={styles.title}>C-PAT Assessment</h1>
        <div style={styles.timer}>
          ⏰ {formatTime(timeLeft)}
        </div>
      </div>

      <div style={styles.progressBar}>
        <div style={styles.progressFill}></div>
      </div>

      <div style={styles.questionCard}>
        <div style={styles.questionNumber}>
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <h2 style={styles.question}>{currentQ.question}</h2>
        
        <div style={styles.optionsContainer}>
          {currentQ.options.map((option, index) => (
            <div
              key={index}
              style={{
                ...styles.option,
                ...(selectedAnswer === index ? styles.optionSelected : {})
              }}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
            >
              <div style={{
                ...styles.radioButton,
                ...(selectedAnswer === index ? styles.radioButtonSelected : {})
              }}>
                {selectedAnswer === index && (
                  <div style={styles.radioButtonInner}></div>
                )}
              </div>
              <span>{option}</span>
            </div>
          ))}
        </div>

        <div style={styles.navigation}>
          <button
            style={{
              ...styles.navButton,
              ...styles.prevButton,
              ...(currentQuestion === 0 ? styles.disabledButton : {})
            }}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          
          {currentQuestion === questions.length - 1 ? (
            <button
              style={{
                ...styles.navButton,
                ...styles.submitButton,
                ...(!allAnswered ? styles.disabledButton : {})
              }}
              onClick={handleSubmit}
              disabled={!allAnswered}
            >
              Submit Assessment
            </button>
          ) : (
            <button
              style={{
                ...styles.navButton,
                ...styles.nextButton
              }}
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CPATScreen;
