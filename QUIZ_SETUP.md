# AI Quiz Generator - Setup Guide

## 🎯 Overview
The StudyBuddy project now includes an **AI-powered Quiz Generator** that creates personalized quizzes for JEE & Class 12 Non-Medical topics (Physics, Chemistry, Mathematics).

## ✨ Features
- **AI-Generated Questions**: Powered by OpenRouter AI API
- **Multiple Quiz Patterns**: 
  - Fun Quiz (+1/-1 marking)
  - JEE Pattern (+4/-1 marking)
  - Boards Pattern (No negative marking)
- **Difficulty Levels**: Easy, Medium, Hard, Random
- **Quiz History**: Tracks your past quizzes with scores
- **Customizable**: Choose number of questions (10, 20, or 30)
- **Timer**: Track time spent on each quiz
- **Detailed Results**: View correct/wrong/unanswered statistics

## 📋 Prerequisites
- Node.js installed (v14 or higher)
- OpenRouter API Key

## 🚀 Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React dependencies (frontend)
- Express, CORS, dotenv, node-fetch (backend)

### Step 2: Configure API Key
Create a `.env` file in the project root with your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=anthropic/claude-3-haiku
```

**Important**: Replace `your_api_key_here` with your actual OpenRouter API key.

### Step 3: Start the Application

#### Option A: Run Both Servers Simultaneously (Recommended)
```bash
npm run dev
```
This starts both the React app (port 3001) and the quiz server (port 3000).

#### Option B: Run Servers Separately

**Terminal 1 - Start Quiz Server:**
```bash
npm run quiz-server
```

**Terminal 2 - Start React App:**
```bash
npm start
```

### Step 4: Access the Application
- **React App**: http://localhost:3001
- **Quiz Server**: http://localhost:3000
- **Quiz Generator**: Navigate to Dashboard → Quiz Generator

## 📁 Project Structure

```
StudyBuddy-version-control-main/
├── src/
│   ├── pages/
│   │   └── QuizGenerator.js       # Main quiz component
│   └── services/
│       └── quizAPI.js              # API service for quiz generation
├── quiz-server.js                  # Backend server for AI quiz generation
├── .env                            # API configuration (create this)
├── package.json                    # Dependencies and scripts
└── QUIZ_SETUP.md                   # This file
```

## 🎮 How to Use

1. **Navigate to Quiz Generator**
   - Go to Dashboard
   - Click on "Quiz Generator"

2. **Generate a Quiz**
   - Enter a topic (e.g., "Thermodynamics", "Organic Chemistry", "Calculus")
   - Select difficulty level
   - Choose number of questions
   - Select quiz pattern (marking scheme)
   - Click "Generate Quiz"

3. **Take the Quiz**
   - Answer questions by clicking on options
   - Use Previous/Next buttons to navigate
   - Submit when finished

4. **View Results**
   - See your score and percentage
   - Review correct/wrong/unanswered counts
   - View time spent
   - Option to retake or start new quiz

5. **Quiz History**
   - View recent quizzes on the welcome screen
   - See past scores and dates
   - Clear history if needed

## 🔧 API Configuration

### OpenRouter API
The quiz generator uses OpenRouter AI to generate questions. To get an API key:

1. Visit: https://openrouter.ai/
2. Sign up for an account
3. Navigate to API Keys
4. Create a new API key
5. Add it to your `.env` file

### Supported Topics
- **Physics**: Mechanics, Thermodynamics, Optics, Electromagnetism, Quantum Physics, etc.
- **Chemistry**: Organic Chemistry, Inorganic Chemistry, Physical Chemistry, etc.
- **Mathematics**: Calculus, Algebra, Trigonometry, Coordinate Geometry, etc.

## 🐛 Troubleshooting

### Quiz Server Not Starting
- Check if port 3000 is already in use
- Verify `.env` file exists with valid API key
- Check Node.js version (should be v14+)

### Quiz Generation Fails
- Verify OpenRouter API key is correct
- Check internet connection
- Ensure quiz server is running
- Check browser console for errors

### "Failed to generate quiz" Error
- The app will use fallback questions if API fails
- Check if API key has sufficient credits
- Verify the topic is valid (Physics/Chemistry/Math only)

## 📝 Scripts Reference

- `npm start` - Start React development server (port 3001)
- `npm run quiz-server` - Start quiz backend server (port 3000)
- `npm run dev` - Start both servers simultaneously
- `npm run build` - Build production version
- `npm test` - Run tests

## 🔒 Security Notes

- Never commit the `.env` file to version control
- Keep your OpenRouter API key private
- The `.env` file is already in `.gitignore`
- Consider using environment variables for production

## 📊 Quiz Patterns Explained

### Fun Quiz (+1/-1)
- Correct answer: +1 point
- Wrong answer: -1 point
- Best for: Casual practice

### JEE Pattern (+4/-1)
- Correct answer: +4 points
- Wrong answer: -1 point
- Best for: JEE preparation

### Boards Pattern (No Penalty)
- Correct answer: +1 point
- Wrong answer: 0 points
- Best for: Board exam preparation

## 🎓 Tips for Best Results

1. **Be Specific**: Use specific topic names (e.g., "Thermodynamics" instead of "Physics")
2. **Valid Topics**: Only JEE/Class 12 Non-Medical topics are supported
3. **Internet Required**: Quiz generation requires internet connection
4. **Take Your Time**: No rush - the timer is just for tracking

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all setup steps are completed
3. Check console logs for error messages
4. Ensure all dependencies are installed

## 📜 License
This project is part of the StudyBuddy application.

---

Happy Learning! 🎉
