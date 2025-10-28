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
    title: {
      fontSize: '26px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, var(--text), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.5px'
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
    mainContent: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '25px',
      padding: '50px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 100px rgba(255, 138, 0, 0.04)',
      border: '1px solid rgba(255, 138, 0, 0.12)',
      maxWidth: '1100px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: 'var(--text)',
      margin: '0 0 25px 0',
      letterSpacing: '0.5px'
    },
    topicGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '12px',
      marginBottom: '30px'
    },
    topicCard: {
      padding: '14px',
      border: '2px solid rgba(255, 138, 0, 0.2)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '600',
      background: 'rgba(15, 14, 16, 0.3)',
      color: 'var(--text)'
    },
    topicSelected: {
      borderColor: 'var(--accent)',
      background: 'rgba(255, 138, 0, 0.15)',
      color: 'var(--accent)',
      boxShadow: '0 4px 15px rgba(255, 138, 0, 0.3)',
      transform: 'translateY(-2px)'
    },
    generateButton: {
      padding: '14px 32px',
      fontSize: '15px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(255, 138, 0, 0.4)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    timer: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      fontSize: '22px',
      fontWeight: 'bold',
      color: timeLeft < 10 ? '#ff6b6b' : 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 18px',
      background: 'rgba(15, 14, 16, 0.5)',
      borderRadius: '12px',
      border: `2px solid ${timeLeft < 10 ? '#ff6b6b' : 'var(--accent)'}`
    },
    questionNumber: {
      fontSize: '13px',
      color: 'var(--muted)',
      marginBottom: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    question: {
      fontSize: '20px',
      fontWeight: '700',
      color: 'var(--text)',
      marginBottom: '28px',
      lineHeight: '1.5'
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '30px'
    },
    option: {
      padding: '16px 20px',
      border: '2px solid rgba(255, 138, 0, 0.2)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      background: 'rgba(15, 14, 16, 0.3)',
      color: 'var(--text)'
    },
    optionSelected: {
      borderColor: 'var(--accent)',
      background: 'rgba(255, 138, 0, 0.15)',
      boxShadow: '0 4px 15px rgba(255, 138, 0, 0.3)',
      transform: 'translateX(5px)'
    },
    nextButton: {
      padding: '14px 32px',
      fontSize: '15px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(255, 138, 0, 0.4)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    resultsCard: {
      textAlign: 'center',
      padding: '35px'
    },
    scoreCircle: {
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      margin: '0 auto 25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: '900',
      color: 'white',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
    },
    resultText: {
      fontSize: '18px',
      color: 'var(--text)',
      marginBottom: '25px',
      fontWeight: '600'
    },
    resultGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '25px',
      maxWidth: '500px',
      margin: '0 auto 25px'
    },
    resultItem: {
      padding: '18px',
      background: 'rgba(15, 14, 16, 0.5)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 138, 0, 0.15)'
    },
    resultLabel: {
      fontSize: '13px',
      color: 'var(--muted)',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontWeight: '600'
    },
    resultValue: {
      fontSize: '26px',
      fontWeight: 'bold',
      color: 'var(--accent)'
    },
    retryButton: {
      padding: '14px 30px',
      fontSize: '15px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #4CAF50, #45a049)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      marginRight: '15px',
      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      transition: 'all 0.3s ease'
    }
  };

  if (showResults) {
    const score = getScore();
    const scoreColor = score >= 70 ? '#4CAF50' : score >= 40 ? '#FFA500' : '#ff6b6b';
    
    return (
      <div style={styles.container}>
        <style>{`
          @keyframes particleFloat1 {
            0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
            50% { transform: translate(100px, -150px) scale(1.2); opacity: 0.3; }
            100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          }
          @keyframes particleFloat2 {
            0% { transform: translate(0, 0) scale(1); opacity: 0.5; }
            50% { transform: translate(-120px, 180px) scale(0.8); opacity: 0.8; }
            100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          }
          @keyframes particleFloat3 {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0.4; }
            50% { transform: translate(80px, 120px) rotate(180deg); opacity: 0.7; }
            100% { transform: translate(0, 0) rotate(360deg); opacity: 0.4; }
          }
        `}</style>
        {/* Animated Particle Background */}
        <div style={styles.animatedBg}>
          <div style={{...styles.bgOrb, ...styles.bgOrb1}}></div>
          <div style={{...styles.bgOrb, ...styles.bgOrb2}}></div>
          <div style={{...styles.bgOrb, 
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, var(--accent), transparent)',
            top: '25%',
            right: '15%',
            animation: 'orbitFloat 35s infinite ease-in-out',
            animationDelay: '8s'
          }}></div>
          
          {/* Small Moving Particles */}
          {[...Array(15)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              borderRadius: '50%',
              background: i % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.4,
              animation: `particleFloat${(i % 3) + 1} ${15 + Math.random() * 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}></div>
          ))}
        </div>
        
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
