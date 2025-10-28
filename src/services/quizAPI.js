// Quiz API Service for communicating with the quiz generator backend
const API_BASE_URL = 'http://localhost:3000';

class QuizAPI {
  async generateQuiz(prompt, difficulty = 'medium', numQuestions = 30, pattern = 'fun') {
    try {
      // Construct the system and user messages for the AI
      const messages = [
        {
          role: 'system',
          content: `You are an expert educator creating quiz questions for JEE and Class 12 Non-Medical students.
          
          STRICT REQUIREMENTS:
          1. Generate EXACTLY ${numQuestions} multiple-choice questions
          2. ONLY create questions for Physics, Chemistry, and Mathematics topics
          3. Each question must have 4 options with only ONE correct answer
          4. Difficulty level: ${difficulty}
          5. Scoring pattern: ${pattern === 'jee' ? '+4 for correct, -1 for wrong' : pattern === 'boards' ? 'No negative marking' : '+1 for correct, -1 for wrong'}
          
          Return the response in this EXACT JSON format:
          {
            "quiz": [
              {
                "question": "question text",
                "options": ["option1", "option2", "option3", "option4"],
                "correct": 0,
                "explanation": "brief explanation of the answer",
                "difficulty": "${difficulty}"
              }
            ],
            "topic": "${prompt}",
            "totalQuestions": ${numQuestions}
          }`
        },
        {
          role: 'user',
          content: `Generate a quiz on: ${prompt}`
        }
      ];

      const response = await fetch(`${API_BASE_URL}/api/generate-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          messages
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Parse the AI response
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const content = data.choices[0].message.content;
        let quizData;
        
        try {
          // Try to parse the content as JSON
          quizData = typeof content === 'string' ? JSON.parse(content) : content;
        } catch (e) {
          console.error('Failed to parse quiz data:', e);
          // Return a fallback quiz if parsing fails
          quizData = this.generateFallbackQuiz(prompt, numQuestions, difficulty);
        }
        
        return {
          success: true,
          data: {
            ...quizData,
            pattern,
            difficulty,
            timestamp: new Date().toISOString()
          }
        };
      }
      
      throw new Error('Invalid response format from AI');
    } catch (error) {
      console.error('Error generating quiz:', error);
      
      // Return a fallback quiz for demo purposes
      return {
        success: true,
        data: this.generateFallbackQuiz(prompt, numQuestions, difficulty, pattern)
      };
    }
  }

  generateFallbackQuiz(topic, numQuestions, difficulty, pattern) {
    // Generate a sample quiz for demonstration when API fails
    const sampleQuestions = {
      physics: [
        {
          question: "What is the SI unit of force?",
          options: ["Joule", "Newton", "Watt", "Pascal"],
          correct: 1,
          explanation: "The SI unit of force is Newton (N), defined as kg⋅m/s²",
          difficulty: "easy"
        },
        {
          question: "In uniform circular motion, which quantity remains constant?",
          options: ["Velocity", "Acceleration", "Speed", "Force"],
          correct: 2,
          explanation: "Speed remains constant while velocity changes direction continuously",
          difficulty: "medium"
        },
        {
          question: "What is the escape velocity from Earth's surface?",
          options: ["11.2 km/s", "7.8 km/s", "15.4 km/s", "9.8 km/s"],
          correct: 0,
          explanation: "The escape velocity from Earth is approximately 11.2 km/s",
          difficulty: "hard"
        }
      ],
      chemistry: [
        {
          question: "Which is the most electronegative element?",
          options: ["Oxygen", "Fluorine", "Chlorine", "Nitrogen"],
          correct: 1,
          explanation: "Fluorine is the most electronegative element in the periodic table",
          difficulty: "easy"
        },
        {
          question: "What is the IUPAC name of CH₃CH₂OH?",
          options: ["Methanol", "Ethanol", "Propanol", "Butanol"],
          correct: 1,
          explanation: "CH₃CH₂OH is ethanol (ethyl alcohol)",
          difficulty: "easy"
        }
      ],
      mathematics: [
        {
          question: "What is the derivative of sin(x)?",
          options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
          correct: 0,
          explanation: "The derivative of sin(x) is cos(x)",
          difficulty: "easy"
        },
        {
          question: "What is the value of ∫(1/x)dx?",
          options: ["x + C", "ln|x| + C", "1/x² + C", "e^x + C"],
          correct: 1,
          explanation: "The integral of 1/x is ln|x| + C",
          difficulty: "medium"
        }
      ]
    };

    // Determine subject based on topic
    let subject = 'physics';
    if (topic.toLowerCase().includes('chemistry') || topic.toLowerCase().includes('organic') || topic.toLowerCase().includes('inorganic')) {
      subject = 'chemistry';
    } else if (topic.toLowerCase().includes('math') || topic.toLowerCase().includes('calculus') || topic.toLowerCase().includes('algebra')) {
      subject = 'mathematics';
    }

    const questions = [];
    const availableQuestions = sampleQuestions[subject];
    
    // Generate requested number of questions
    for (let i = 0; i < numQuestions; i++) {
      questions.push({
        ...availableQuestions[i % availableQuestions.length],
        id: i + 1
      });
    }

    return {
      quiz: questions,
      topic: topic,
      totalQuestions: numQuestions,
      pattern: pattern || 'fun',
      difficulty: difficulty,
      timestamp: new Date().toISOString()
    };
  }

  async checkServerHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      return response.ok;
    } catch (error) {
      console.error('Server health check failed:', error);
      return false;
    }
  }
}

export default new QuizAPI();
