# 📚 StudyBuddy - AI-Powered Study Assistant

An intelligent study companion designed for JEE and Class 12 Non-Medical students, featuring AI-powered quiz generation, personalized study schedules, and comprehensive learning tools.

## 🌟 Features

### 🎯 AI Quiz Generator (NEW!)
- **AI-Powered Questions**: Generate custom quizzes using OpenRouter AI
- **Multiple Patterns**: JEE (+4/-1), Boards (No Penalty), Fun Quiz (+1/-1)
- **Difficulty Levels**: Easy, Medium, Hard, Random
- **Quiz History**: Track your performance over time
- **Customizable**: 10, 20, or 30 questions per quiz
- **Detailed Analytics**: View correct/wrong/unanswered statistics

### 📅 Study Schedule Creator
- Create personalized study schedules
- Track your study sessions
- Manage multiple schedules

### 🤖 AI Tutor
- Get instant answers to your questions
- Personalized learning assistance
- Subject-specific guidance

### 📊 Dashboard
- Overview of your study progress
- Quick access to all features
- Performance metrics

### 👤 User Profile
- Personalized learning experience
- Track your achievements
- Customize your preferences

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenRouter API Key (for quiz generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tech-T1tans/StudyBuddy-version-control.git
   cd StudyBuddy-version-control
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example env file
   copy .env.example .env
   
   # Edit .env and add your OpenRouter API key
   OPENROUTER_API_KEY=your_api_key_here
   ```

4. **Start the application**
   ```bash
   # Option 1: Run both frontend and backend
   npm run dev
   
   # Option 2: Run separately
   # Terminal 1:
   npm run quiz-server
   
   # Terminal 2:
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## 📖 Documentation

- **[Quiz Setup Guide](QUIZ_SETUP.md)** - Complete guide for the AI Quiz Generator
- **[GitHub Push Guide](PUSH_TO_GITHUB.md)** - Instructions for pushing to GitHub
- **[.env.example](.env.example)** - Environment variables template

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **OpenRouter AI** - AI quiz generation
- **CORS** - Cross-origin requests

## 📁 Project Structure

```
StudyBuddy-version-control-main/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── QuizGenerator.js       # AI Quiz Generator
│   │   ├── AITutor.js
│   │   ├── ScheduleCreator.js
│   │   ├── ProfileScreen.js
│   │   └── ...
│   ├── services/
│   │   ├── quizAPI.js             # Quiz API service
│   │   └── ...
│   ├── utils/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── quiz-server.js                  # Backend server
├── package.json
├── .env.example
├── QUIZ_SETUP.md
├── PUSH_TO_GITHUB.md
└── README.md
```

## 🎮 Usage

### Quiz Generator
1. Navigate to Dashboard → Quiz Generator
2. Enter a topic (e.g., "Thermodynamics", "Organic Chemistry")
3. Select difficulty and number of questions
4. Choose quiz pattern
5. Click "Generate Quiz"
6. Take the quiz and view results

### Schedule Creator
1. Go to Dashboard → Schedule Creator
2. Add subjects and topics
3. Set time blocks
4. Save and track your schedule

### AI Tutor
1. Access AI Tutor from Dashboard
2. Ask questions about any topic
3. Get instant, detailed explanations

## 🔐 Security

- API keys are stored in `.env` (not committed to git)
- Environment variables are gitignored
- CORS enabled for local development
- Secure API communication

## 🤝 Contributing

This is a team project. To contribute:

1. Create a new branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Commit with clear messages
   ```bash
   git commit -m "Add: your feature description"
   ```

4. Push to your branch
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request

## 📝 Available Scripts

- `npm start` - Start React app (port 3001)
- `npm run quiz-server` - Start quiz backend (port 3000)
- `npm run dev` - Start both servers
- `npm run build` - Build for production
- `npm test` - Run tests

## 🐛 Known Issues & Troubleshooting

### Quiz Server Not Starting
- Ensure port 3000 is available
- Check if `.env` file exists with valid API key

### Quiz Generation Fails
- Verify OpenRouter API key is valid
- Check internet connection
- Fallback questions will be used if API fails

### Module Not Found Errors
- Run `npm install` to install dependencies
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## 🗺️ Roadmap

- [x] AI Quiz Generator
- [x] Quiz History Tracking
- [x] Multiple Quiz Patterns
- [ ] Flashcard System
- [ ] Study Analytics Dashboard
- [ ] Mobile App Version
- [ ] Offline Mode
- [ ] Collaborative Study Rooms

## 👥 Team

**Tech Titans**
- Study Buddy Development Team

## 📄 License

This project is private and maintained by the Tech Titans team.

## 🙏 Acknowledgments

- OpenRouter AI for quiz generation
- React community for excellent tools
- All contributors and testers

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Contact the development team
- Check documentation files

---

**Made with ❤️ by Tech Titans**

*Empowering students to achieve their academic goals through AI-powered learning tools.*
