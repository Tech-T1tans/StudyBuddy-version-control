import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import quizAPI from '../services/quizAPI';

const QuizGenerator = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(30);
  const [pattern, setPattern] = useState('fun');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(1);
  const [loadingTip, setLoadingTip] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (quizStarted && !showResults) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizStarted, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const loadingTips = [
    "Did you know? Regular practice improves memory retention by up to 60%!",
    "Tip: Review your mistakes to learn faster!",
    "Fun fact: The brain processes visual information 60,000x faster than text!",
    "Study tip: Take breaks every 25-30 minutes for better focus!",
    "Did you know? Teaching others helps you retain 90% of what you learn!",
    "Tip: Active recall is more effective than passive reading!"
  ];

  const isValidTopic = (topic) => {
    const lowerTopic = topic.toLowerCase().trim();
    const cleanText = lowerTopic.replace(/\s+/g, '');
    if (cleanText.length < 2) return false;
    
    const consonantPattern = /[bcdfghjklmnpqrstvwxyz]{6,}/i;
    if (consonantPattern.test(cleanText)) return false;
    
    const vowelCount = (cleanText.match(/[aeiou]/gi) || []).length;
    const vowelRatio = vowelCount / cleanText.length;
    if (vowelRatio < 0.15 && cleanText.length > 3) return false;
    
    const validKeywords = [
      'physics', 'mechanics', 'thermodynamics', 'optics', 'electromagnetism',
      'quantum', 'nuclear', 'atomic', 'kinematics', 'dynamics', 'waves',
      'magnetism', 'electricity', 'gravitation', 'motion', 'force', 'energy',
      'chemistry', 'organic', 'inorganic', 'physical chemistry', 'chemical',
      'reaction', 'equilibrium', 'thermochemistry', 'electrochemistry',
      'mathematics', 'math', 'calculus', 'algebra', 'trigonometry', 'geometry',
      'probability', 'statistics', 'permutation', 'combination', 'matrix'
    ];
    
    return validKeywords.some(keyword => lowerTopic.includes(keyword));
  };

  const generateQuiz = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic for the quiz');
      return;
    }

    if (!isValidTopic(topic)) {
      alert('Please enter a valid JEE/Class 12 Non-Medical topic (Physics, Chemistry, or Mathematics)');
      return;
    }

    setIsLoading(true);
    setLoadingStep(1);
    setLoadingTip(loadingTips[Math.floor(Math.random() * loadingTips.length)]);

    setTimeout(() => setLoadingStep(2), 1500);
    setTimeout(() => setLoadingStep(3), 3000);

    try {
      const response = await quizAPI.generateQuiz(topic, difficulty, numQuestions, pattern);
      
      if (response.success && response.data) {
        setCurrentQuiz(response.data);
        setUserAnswers(new Array(response.data.quiz.length).fill(null));
        setQuizStarted(true);
        setTimeElapsed(0);
        setCurrentQuestion(0);
      } else {
        alert('Failed to generate quiz. Please try again.');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('An error occurred while generating the quiz. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingStep(1);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuiz.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let correctCount = 0;
    let wrongCount = 0;

    currentQuiz.quiz.forEach((question, index) => {
      if (userAnswers[index] !== null) {
        if (userAnswers[index] === question.correct) {
          correctCount++;
          totalScore += pattern === 'jee' ? 4 : 1;
        } else {
          wrongCount++;
          if (pattern === 'jee' || pattern === 'fun') {
            totalScore -= 1;
          }
        }
      }
    });

    const percentage = Math.round((correctCount / currentQuiz.quiz.length) * 100);
    
    return {
      totalScore,
      correctCount,
      wrongCount,
      unanswered: currentQuiz.quiz.length - correctCount - wrongCount,
      percentage,
      maxScore: pattern === 'jee' ? currentQuiz.quiz.length * 4 : currentQuiz.quiz.length
    };
  };

  const submitQuiz = () => {
    const result = calculateScore();
    const quizResult = {
      id: Date.now(),
      topic: currentQuiz.topic,
      date: new Date().toLocaleDateString(),
      time: formatTime(timeElapsed),
      score: result.totalScore,
      maxScore: result.maxScore,
      percentage: result.percentage,
      correct: result.correctCount,
      wrong: result.wrongCount,
      unanswered: result.unanswered,
      pattern: pattern,
      difficulty: difficulty,
      questions: currentQuiz.quiz,
      answers: userAnswers
    };

    const newHistory = [quizResult, ...quizHistory].slice(0, 10);
    setQuizHistory(newHistory);
    localStorage.setItem('quizHistory', JSON.stringify(newHistory));

    setShowResults(true);
  };

  const startNewQuiz = () => {
    setQuizStarted(false);
    setShowResults(false);
    setCurrentQuiz(null);
    setUserAnswers([]);
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setTopic('');
  };

  const reviewAnswers = () => {
    setShowResults(false);
    setCurrentQuestion(0);
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
      borderRadius: '20px',
      padding: '25px 35px',
      marginBottom: '30px',
      maxWidth: '1100px',
      margin: '0 auto 30px',
      boxShadow: '0 15px 50px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255, 138, 0, 0.15)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    backButton: {
      padding: '10px 20px',
      backgroundColor: 'rgba(255, 138, 0, 0.1)',
      color: 'var(--accent)',
      border: '1px solid var(--accent)',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600'
    },
    title: {
      fontSize: '26px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, var(--text), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    timer: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    centralCard: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      borderRadius: '25px',
      padding: '50px',
      maxWidth: '900px',
      margin: '0 auto',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255, 138, 0, 0.12)',
      textAlign: 'center'
    },
    promptInput: {
      width: '100%',
      maxWidth: '600px',
      padding: '18px 24px',
      fontSize: '16px',
      borderRadius: '15px',
      border: '2px solid rgba(255, 138, 0, 0.3)',
      background: 'rgba(15, 14, 16, 0.5)',
      color: 'var(--text)',
      outline: 'none'
    },
    customizationPanel: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      width: '100%',
      maxWidth: '600px'
    },
    optionGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      textAlign: 'left'
    },
    optionSelect: {
      padding: '10px 15px',
      borderRadius: '10px',
      border: '1px solid rgba(255, 138, 0, 0.3)',
      background: 'rgba(15, 14, 16, 0.7)',
      color: 'var(--text)',
      fontSize: '14px',
      cursor: 'pointer'
    },
    generateButton: {
      padding: '16px 40px',
      fontSize: '18px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      boxShadow: '0 8px 25px rgba(255, 138, 0, 0.4)'
    },
    quizCard: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      borderRadius: '25px',
      padding: '40px',
      maxWidth: '900px',
      margin: '0 auto',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255, 138, 0, 0.12)'
    },
    question: {
      fontSize: '20px',
      fontWeight: '700',
      color: 'var(--text)',
      marginBottom: '30px',
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
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      background: 'rgba(15, 14, 16, 0.3)',
      color: 'var(--text)',
      transition: 'all 0.3s ease'
    },
    optionSelected: {
      borderColor: 'var(--accent)',
      background: 'rgba(255, 138, 0, 0.15)',
      transform: 'translateX(5px)'
    },
    navigationButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '15px'
    },
    navButton: {
      padding: '14px 30px',
      fontSize: '15px',
      fontWeight: '600',
      background: 'rgba(255, 138, 0, 0.1)',
      color: 'var(--accent)',
      border: '1px solid var(--accent)',
      borderRadius: '12px',
      cursor: 'pointer'
    },
    primaryButton: {
      padding: '14px 30px',
      fontSize: '15px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer'
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    loadingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '40px'
    },
    resultsCard: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      borderRadius: '25px',
      padding: '50px',
      maxWidth: '700px',
      margin: '0 auto',
      textAlign: 'center',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255, 138, 0, 0.12)'
    },
    scoreCircle: {
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      margin: '0 auto 30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
    },
    resultGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
      marginBottom: '30px'
    },
    resultItem: {
      padding: '15px',
      background: 'rgba(15, 14, 16, 0.5)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 138, 0, 0.15)'
    },
    resultLabel: {
      fontSize: '12px',
      color: 'var(--muted)',
      marginBottom: '5px',
      textTransform: 'uppercase'
    },
    resultValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'var(--accent)'
    }
  };

  // Results Screen
  if (showResults && currentQuiz) {
    const result = calculateScore();
    const scoreColor = result.percentage >= 70 ? '#4CAF50' : result.percentage >= 40 ? '#FFA500' : '#ff6b6b';
    
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h1 style={styles.title}>Quiz Complete! 🎉</h1>
          <div style={{ width: '120px' }}></div>
        </div>

        <div style={styles.resultsCard}>
          <div style={{ ...styles.scoreCircle, backgroundColor: scoreColor }}>
            <div style={{ fontSize: '48px', fontWeight: '900' }}>{result.percentage}%</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>{result.totalScore}/{result.maxScore}</div>
          </div>
          
          <p style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '25px' }}>
            {result.percentage >= 70 ? 'Excellent work! Keep it up!' : 
             result.percentage >= 40 ? 'Good effort! Room for improvement.' : 
             'Keep practicing! You\'ll get better!'}
          </p>

          <div style={styles.resultGrid}>
            <div style={styles.resultItem}>
              <div style={styles.resultLabel}>Correct</div>
              <div style={styles.resultValue}>{result.correctCount}</div>
            </div>
            <div style={styles.resultItem}>
              <div style={styles.resultLabel}>Wrong</div>
              <div style={styles.resultValue}>{result.wrongCount}</div>
            </div>
            <div style={styles.resultItem}>
              <div style={styles.resultLabel}>Unanswered</div>
              <div style={styles.resultValue}>{result.unanswered}</div>
            </div>
            <div style={styles.resultItem}>
              <div style={styles.resultLabel}>Time Spent</div>
              <div style={styles.resultValue}>{formatTime(timeElapsed)}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button style={styles.primaryButton} onClick={startNewQuiz}>
              New Quiz
            </button>
            <button style={styles.navButton} onClick={reviewAnswers}>
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (quizStarted && currentQuiz) {
    const currentQ = currentQuiz.quiz[currentQuestion];
    
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={startNewQuiz}>
            ← Exit Quiz
          </button>
          <h1 style={styles.title}>{currentQuiz.topic}</h1>
          <div style={styles.timer}>
            ⏰ {formatTime(timeElapsed)}
          </div>
        </div>

        <div style={styles.quizCard}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '10px' }}>
              Question {currentQuestion + 1} of {currentQuiz.quiz.length}
            </div>
            <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,138,0,0.2)', borderRadius: '2px' }}>
              <div style={{
                width: `${((currentQuestion + 1) / currentQuiz.quiz.length) * 100}%`,
                height: '100%',
                backgroundColor: 'var(--accent)',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }}/>
            </div>
          </div>

          <h2 style={styles.question}>{currentQ.question}</h2>
          
          <div style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                style={{
                  ...styles.option,
                  ...(userAnswers[currentQuestion] === index ? styles.optionSelected : {})
                }}
                onClick={() => handleAnswerSelect(index)}
              >
                <span style={{ fontWeight: '600' }}>{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
              </div>
            ))}
          </div>

          <div style={styles.navigationButtons}>
            <button
              style={{
                ...styles.navButton,
                ...(currentQuestion === 0 ? styles.disabledButton : {})
              }}
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </button>
            <button
              style={{
                ...styles.primaryButton,
                ...(userAnswers[currentQuestion] === null ? styles.disabledButton : {})
              }}
              onClick={nextQuestion}
              disabled={userAnswers[currentQuestion] === null}
            >
              {currentQuestion === currentQuiz.quiz.length - 1 ? 'Submit Quiz' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (isLoading) {
    return (
      <div style={styles.loadingOverlay}>
        <div style={styles.loadingContainer}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧠</div>
          
          <h2 style={{ color: 'var(--text)', fontSize: '24px', marginBottom: '10px' }}>
            Generating Your Quiz
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>
            AI is crafting personalized questions...
          </p>
          
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginBottom: '30px' }}>
            <div style={{ opacity: loadingStep >= 1 ? 1 : 0.3 }}>
              <div style={{ fontSize: '24px' }}>🔍</div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>Analyzing Topic</div>
            </div>
            <div style={{ opacity: loadingStep >= 2 ? 1 : 0.3 }}>
              <div style={{ fontSize: '24px' }}>🧠</div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>Generating Questions</div>
            </div>
            <div style={{ opacity: loadingStep >= 3 ? 1 : 0.3 }}>
              <div style={{ fontSize: '24px' }}>✅</div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>Finalizing Quiz</div>
            </div>
          </div>
          
          <div style={{ width: '300px', height: '4px', backgroundColor: 'rgba(255,138,0,0.2)', borderRadius: '2px', margin: '0 auto 20px' }}>
            <div style={{
              width: `${(loadingStep / 3) * 100}%`,
              height: '100%',
              backgroundColor: 'var(--accent)',
              borderRadius: '2px',
              transition: 'width 0.5s ease'
            }}/>
          </div>
          
          <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
            💡 {loadingTip}
          </div>
        </div>
      </div>
    );
  }

  // Welcome Screen
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>AI Quiz Generator</h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={styles.centralCard}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
          <span style={{ fontSize: '48px' }}>🧠</span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text)' }}>Quiz Generator</h2>
        </div>
        
        <p style={{ color: '#d47c09', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>
          <strong>JEE & Class 12th Non-Medical Topics Only</strong><br />
          Physics • Chemistry • Mathematics
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
          <input
            type="text"
            style={styles.promptInput}
            placeholder="Enter topic (e.g., 'Thermodynamics', 'Organic Chemistry', 'Calculus')"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateQuiz()}
          />
          
          <div style={styles.customizationPanel}>
            <div style={styles.optionGroup}>
              <label style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Difficulty Level
              </label>
              <select 
                style={styles.optionSelect} 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="random">Random</option>
              </select>
            </div>
            
            <div style={styles.optionGroup}>
              <label style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Number of Questions
              </label>
              <select 
                style={styles.optionSelect}
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
              >
                <option value={10}>10 Questions</option>
                <option value={20}>20 Questions</option>
                <option value={30}>30 Questions</option>
              </select>
            </div>
            
            <div style={styles.optionGroup}>
              <label style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Quiz Pattern
              </label>
              <select 
                style={styles.optionSelect}
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              >
                <option value="fun">Fun Quiz (+1/-1)</option>
                <option value="jee">JEE Pattern (+4/-1)</option>
                <option value="boards">Boards (No Penalty)</option>
              </select>
            </div>
          </div>
          
          <button 
            style={styles.generateButton} 
            onClick={generateQuiz}
          >
            ✨ Generate Quiz
          </button>
        </div>

        {quizHistory.length > 0 && (
          <div style={{ marginTop: '50px', padding: '30px', background: 'rgba(0,0,0,0.3)', borderRadius: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text)' }}>Recent Quizzes</h3>
              <button 
                style={{ ...styles.navButton, padding: '8px 16px', fontSize: '13px' }}
                onClick={() => {
                  if (window.confirm('Clear all quiz history?')) {
                    setQuizHistory([]);
                    localStorage.removeItem('quizHistory');
                  }
                }}
              >
                Clear History
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
              {quizHistory.slice(0, 6).map((item) => (
                <div key={item.id} style={{
                  padding: '15px',
                  background: 'rgba(255, 138, 0, 0.05)',
                  border: '1px solid rgba(255, 138, 0, 0.2)',
                  borderRadius: '10px'
                }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--accent)', marginBottom: '8px', 
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.topic}
                  </h4>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '5px' }}>
                    {item.date} • {item.time}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)' }}>
                    Score: {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;
