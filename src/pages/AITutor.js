import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AITutor = () => {
  const navigate = useNavigate();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m your AI Study Assistant. How can I help you today? 🚀' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSummarize = () => {
    if (youtubeUrl) {
      setSummary(`📹 Video Summary Generated:

🎯 Key Points:
• Introduction to the main concept discussed
• Three fundamental principles explained in detail
• Practical examples and real-world applications
• Common mistakes to avoid while studying this topic
• Summary of best practices for implementation
• Recommended next steps for deeper understanding

⏱️ Estimated study time: 15-20 minutes
🔗 Related topics: Check your personalized schedule for connected subjects

💡 Study Tip: Create flashcards for the key concepts mentioned above for better retention!`);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { type: 'user', message: inputMessage },
        { 
          type: 'bot', 
          message: `Great question! Based on your study profile, I recommend focusing on the fundamentals first. Here are some specific tips for "${inputMessage}"...` 
        }
      ]);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
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
      filter: 'blur(100px)',
      opacity: 0.15,
      animation: 'orbitFloat 25s infinite ease-in-out'
    },
    bgOrb1: {
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, var(--accent), transparent)',
      top: '-200px',
      right: '-200px'
    },
    bgOrb2: {
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, var(--accent-2), transparent)',
      bottom: '-200px',
      left: '-200px',
      animationDelay: '12s'
    },
    header: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.95), rgba(23, 19, 22, 0.7))',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      borderRadius: '25px',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 100px rgba(255, 138, 0, 0.05)',
      border: '1px solid rgba(255, 138, 0, 0.15)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    },
    backButton: {
      padding: '12px 28px',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 8px 25px rgba(255, 138, 0, 0.3)'
    },
    title: {
      fontSize: '32px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, var(--text), var(--accent-2))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-1px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    mainContent: {
      display: 'flex',
      gap: '25px',
      height: 'calc(100vh - 160px)',
      position: 'relative',
      zIndex: 10
    },
    summarizer: {
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '25px',
      padding: '35px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(255, 138, 0, 0.03)',
      border: '1px solid rgba(255, 138, 0, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: 'var(--text)',
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      opacity: 0.9
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '12px',
      fontSize: '14px',
      color: 'var(--muted)',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      opacity: 0.8
    },
    input: {
      width: '100%',
      padding: '14px 18px',
      fontSize: '16px',
      border: '2px solid rgba(255, 138, 0, 0.1)',
      borderRadius: '15px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      backgroundColor: 'rgba(15, 14, 16, 0.5)',
      color: 'var(--text)',
      backdropFilter: 'blur(10px)'
    },
    button: {
      padding: '14px 35px',
      fontSize: '15px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 10px 30px rgba(255, 138, 0, 0.3)',
      textTransform: 'uppercase',
      letterSpacing: '1.5px'
    },
    summaryBox: {
      background: 'rgba(15, 14, 16, 0.6)',
      borderRadius: '20px',
      padding: '25px',
      marginTop: '25px',
      whiteSpace: 'pre-line',
      fontSize: '15px',
      lineHeight: '1.8',
      color: 'var(--text)',
      border: '1px solid rgba(255, 138, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      boxShadow: 'inset 0 0 30px rgba(255, 138, 0, 0.02)'
    },
    chatContainer: {
      flex: '1',
      background: 'linear-gradient(135deg, rgba(23, 19, 22, 0.9), rgba(23, 19, 22, 0.6))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '25px',
      padding: '30px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(255, 138, 0, 0.03)',
      border: '1px solid rgba(255, 138, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 160px)'
    },
    chatMessages: {
      flex: 1,
      overflowY: 'auto',
      marginBottom: '20px',
      padding: '20px',
      background: 'rgba(15, 14, 16, 0.4)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 138, 0, 0.05)',
      backdropFilter: 'blur(5px)'
    },
    message: {
      margin: '10px 0',
      padding: '10px 15px',
      borderRadius: '10px',
      maxWidth: '80%'
    },
    userMessage: {
      background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
      color: 'var(--background)',
      marginLeft: 'auto',
      textAlign: 'right',
      boxShadow: '0 5px 20px rgba(255, 138, 0, 0.2)'
    },
    botMessage: {
      backgroundColor: 'rgba(23, 19, 22, 0.8)',
      color: 'var(--text)',
      border: '1px solid rgba(255, 138, 0, 0.1)',
      backdropFilter: 'blur(10px)'
    },
    chatInput: {
      display: 'flex',
      gap: '10px'
    },
    chatInputField: {
      flex: 1,
      padding: '14px 18px',
      fontSize: '16px',
      border: '2px solid rgba(255, 138, 0, 0.1)',
      borderRadius: '15px',
      outline: 'none',
      backgroundColor: 'rgba(15, 14, 16, 0.5)',
      color: 'var(--text)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    leftPanel: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      gap: '25px'
    },
    features: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginTop: '30px'
    },
    featureCard: {
      padding: '20px',
      background: 'rgba(15, 14, 16, 0.5)',
      borderRadius: '15px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255, 138, 0, 0.1)',
      backdropFilter: 'blur(10px)'
    },
    featureIcon: {
      fontSize: '32px',
      marginBottom: '10px'
    },
    featureTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'var(--text)',
      marginBottom: '5px'
    },
    featureDesc: {
      fontSize: '12px',
      color: 'var(--muted)'
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.animatedBg}>
        <div style={{...styles.bgOrb, ...styles.bgOrb1}}></div>
        <div style={{...styles.bgOrb, ...styles.bgOrb2}}></div>
      </div>

      {/* Header */}
      <div style={styles.header}>
      <h2 style={styles.title}>
        <span style={{fontSize: '36px'}}>🤖</span>
        AI Study Assistant
      </h2>
      <button 
        style={styles.backButton} 
        onClick={() => navigate('/dashboard')}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px) scale(1.05)';
          e.target.style.boxShadow = '0 12px 35px rgba(255, 138, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 8px 25px rgba(255, 138, 0, 0.3)';
        }}
      >
        Back to Dashboard
      </button>
      </div>

      <div style={styles.mainContent}>
      {/* Video Summarizer Section */}
      <div style={styles.leftPanel}>
        <div style={styles.summarizer}>
          <h2 style={styles.sectionTitle}>
          <span>🎥</span> Video Summarizer
        </h2>
        <div style={styles.inputGroup}>
          <label style={styles.label}>YouTube URL</label>
          <input
            type="text"
            placeholder="Paste YouTube video URL here..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            style={styles.input}
          />
        </div>
        <button 
          style={styles.button} 
          onClick={handleSummarize}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px) scale(1.05)';
            e.target.style.boxShadow = '0 15px 40px rgba(255, 138, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 10px 30px rgba(255, 138, 0, 0.3)';
          }}
        >
          Generate Summary 📄
        </button>
        {summary && (
          <div style={styles.summaryBox}>
            {summary}
          </div>
        )}

        {/* Additional Features */}
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📝</div>
            <div style={styles.featureTitle}>Note Generator</div>
            <div style={styles.featureDesc}>Convert videos to structured notes</div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>❓</div>
            <div style={styles.featureTitle}>Quiz Creator</div>
            <div style={styles.featureDesc}>Generate questions from content</div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎯</div>
            <div style={styles.featureTitle}>Key Concepts</div>
            <div style={styles.featureDesc}>Extract important topics</div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⏰</div>
            <div style={styles.featureTitle}>Time Stamps</div>
            <div style={styles.featureDesc}>Find specific moments</div>
          </div>
        </div>
        </div>
      </div>

      {/* AI Chat Section */}
      <div style={styles.chatContainer}>
        <h2 style={styles.sectionTitle}>
          <span>💬</span> Ask AI Anything
        </h2>
          <div style={styles.chatMessages}>
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(msg.type === 'user' ? styles.userMessage : styles.botMessage)
                }}
              >
                {msg.message}
              </div>
            ))}
          </div>
          <div style={styles.chatInput}>
            <input
              type="text"
              placeholder="Ask me anything about your studies..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.chatInputField}
            />
            <button 
              style={styles.button} 
              onClick={handleSendMessage}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 15px 40px rgba(255, 138, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 10px 30px rgba(255, 138, 0, 0.3)';
              }}
            >
              Send 📨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
