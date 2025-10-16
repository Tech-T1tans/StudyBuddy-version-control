import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizGenerator = () => {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResults, setShowResults] = useState(false);

  const topics = [
    'Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism',
    'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry',
    'Calculus', 'Algebra', 'Trigonometry', 'Probability'
  ];

  const mockQuestions = [
    {
      id: 1,
      topic: 'Mechanics',
      question: "What is Newton's second law of motion?",
      options: [
        "F = ma",
        "Every action has an equal and opposite reaction",
        "An object at rest stays at rest",
        "Energy cannot be created or destroyed"
      ],
      correct: 0
    },
    {
      id: 2,
      topic: 'Thermodynamics',
      question: "What is the first law of thermodynamics?",
      options: [
        "Energy can be created",
        "Energy is conserved",
        "Entropy always decreases",
        "Temperature is constant"
      ],
      correct: 1
    },
    {
      id: 3,
      topic: 'Calculus',
      question: "What is the derivative of x²?",
      options: ["x", "2x", "x²/2", "2x²"],
      correct: 1
    },
    {
      id: 4,
      topic: 'Organic Chemistry',
      question: "Which is the simplest alkane?",
      options: ["Ethane", "Propane", "Methane", "Butane"],
      correct: 2
    },
    {
      id: 5,
      topic: 'Algebra',
      question: "Solve for x: 2x + 5 = 15",
      options: ["x = 5", "x = 10", "x = 7.5", "x = 20"],
      correct: 0
    }
  ];

  const handleTopicToggle = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const startQuiz = () => {
    if (selectedTopics.length > 0) {
      setQuizStarted(true);
      startTimer();
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    let correct = 0;
    mockQuestions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    setShowResults(true);
  };

  const resetQuiz = () => {
    setSelectedTopics([]);
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(30);
    setShowResults(false);
  };

  const getScore = () => {
    let correct = 0;
    mockQuestions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return (correct / mockQuestions.length) * 100;
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
      fontSize: '32px',
      fontWeight: 'bold',
      color: 'white'
    },
    mainContent: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '30px',
      padding: '50px',
      boxShadow: '0 25px 70px rgba(0,0,0,0.4), 0 0 100px rgba(255, 138, 0, 0.04)',
      border: '1px solid rgba(255, 138, 0, 0.12)',
      maxWidth: '950px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    },
    sectionTitle: {
      fontSize: '40px',
      fontWeight: '900',
      background: 'linear-gradient(135deg, var(--text), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
      letterSpacing: '-1.5px'
    },
    topicGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '15px',
      marginBottom: '30px'
    },
    topicCard: {
      padding: '15px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '600'
    },
    topicSelected: {
      borderColor: '#667eea',
      backgroundColor: '#f0f4ff',
      color: '#667eea'
    },
    generateButton: {
      padding: '15px 30px',
      fontSize: '18px',
      fontWeight: 'bold',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    timer: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: timeLeft < 10 ? '#ff6b6b' : '#667eea',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    questionNumber: {
      fontSize: '14px',
      color: '#999',
      marginBottom: '10px'
    },
    question: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '30px',
      lineHeight: '1.4'
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '30px'
    },
    option: {
      padding: '20px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
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
    nextButton: {
      padding: '15px 30px',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    resultsCard: {
      textAlign: 'center',
      padding: '40px'
    },
    scoreCircle: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      margin: '0 auto 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: 'bold',
      color: 'white'
    },
    resultText: {
      fontSize: '20px',
      color: '#666',
      marginBottom: '30px'
    },
    resultGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '30px'
    },
    resultItem: {
      padding: '15px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px'
    },
    resultLabel: {
      fontSize: '14px',
      color: '#999',
      marginBottom: '5px'
    },
    resultValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333'
    },
    retryButton: {
      padding: '15px 30px',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      marginRight: '15px'
    }
  };

  if (showResults) {
    const score = getScore();
    const scoreColor = score >= 70 ? '#4CAF50' : score >= 40 ? '#FFA500' : '#ff6b6b';
    
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h1 style={styles.title}>Quiz Results</h1>
          <div style={{ width: '120px' }}></div>
        </div>

        <div style={styles.card}>
          <div style={styles.resultsCard}>
            <div style={{ ...styles.scoreCircle, backgroundColor: scoreColor }}>
              {Math.round(score)}%
            </div>
            <p style={styles.resultText}>
              {score >= 70 ? 'Excellent work!' : score >= 40 ? 'Good effort!' : 'Keep practicing!'}
            </p>
            <div style={styles.resultGrid}>
              <div style={styles.resultItem}>
                <div style={styles.resultLabel}>Questions</div>
                <div style={styles.resultValue}>{mockQuestions.length}</div>
              </div>
              <div style={styles.resultItem}>
                <div style={styles.resultLabel}>Correct</div>
                <div style={styles.resultValue}>
                  {mockQuestions.filter(q => answers[q.id] === q.correct).length}
                </div>
              </div>
              <div style={styles.resultItem}>
                <div style={styles.resultLabel}>Incorrect</div>
                <div style={styles.resultValue}>
                  {mockQuestions.filter(q => answers[q.id] !== q.correct).length}
                </div>
              </div>
              <div style={styles.resultItem}>
                <div style={styles.resultLabel}>Score</div>
                <div style={styles.resultValue}>{Math.round(score)}%</div>
              </div>
            </div>
            <button style={styles.retryButton} onClick={resetQuiz}>
              Try Another Quiz
            </button>
            <button style={styles.nextButton} onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizStarted) {
    const currentQ = mockQuestions[currentQuestion];
    
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={resetQuiz}>
            ← Exit Quiz
          </button>
          <h1 style={styles.title}>Quiz in Progress</h1>
          <div style={styles.timer}>
            ⏰ {timeLeft}s
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.questionNumber}>
            Question {currentQuestion + 1} of {mockQuestions.length}
          </div>
          <h2 style={styles.question}>{currentQ.question}</h2>
          
          <div style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                style={{
                  ...styles.option,
                  ...(answers[currentQ.id] === index ? styles.optionSelected : {})
                }}
                onClick={() => handleAnswerSelect(currentQ.id, index)}
              >
                <span>{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
              </div>
            ))}
          </div>

          <button
            style={{
              ...styles.nextButton,
              ...(answers[currentQ.id] === undefined ? styles.disabledButton : {})
            }}
            onClick={handleNextQuestion}
            disabled={answers[currentQ.id] === undefined}
          >
            {currentQuestion === mockQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>Quiz Generator</h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>Select Topics for Your Quiz</h2>
        
        <div style={styles.topicGrid}>
          {topics.map(topic => (
            <div
              key={topic}
              style={{
                ...styles.topicCard,
                ...(selectedTopics.includes(topic) ? styles.topicSelected : {})
              }}
              onClick={() => handleTopicToggle(topic)}
            >
              {topic}
            </div>
          ))}
        </div>

        <button
          style={{
            ...styles.generateButton,
            ...(selectedTopics.length === 0 ? styles.disabledButton : {})
          }}
          onClick={startQuiz}
          disabled={selectedTopics.length === 0}
          onMouseEnter={(e) => {
            if (selectedTopics.length > 0) {
              e.target.style.backgroundColor = '#764ba2';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedTopics.length > 0) {
              e.target.style.backgroundColor = '#667eea';
            }
          }}
        >
          Generate Quiz ({selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} selected)
        </button>
      </div>
    </div>
  );
};

export default QuizGenerator;
