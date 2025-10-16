# StudyAI Assistant - StudyBuddy Prototype

An AI-powered study assistant web application built with React.js to help students optimize their learning through personalized assessments, schedule generation, and interactive quizzes.

![StudyAI Assistant](https://img.shields.io/badge/React-18.2.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Status](https://img.shields.io/badge/status-MVP-orange)

## 🚀 Features

### Core Functionality
- **🔐 User Authentication** - Simple login/signup system with localStorage
- **📝 C-PAT Assessment** - 3-minute Cognitive & Personality Assessment Test
- **🎯 Personalization Flow** - Multi-step wizard for customized study plans
- **📊 Interactive Dashboard** - Central hub with progress tracking
- **📅 Schedule Management** - AI-powered study schedule creator with active/history views
- **🧠 Quiz System** - Generate and take quizzes with performance tracking
- **🤖 AI Study Assistant** - Video summarizer and chat-based help

### User Experience
- **📱 Mobile-First Design** - Responsive across all devices
- **🎨 Modern UI** - Clean, notebook-style aesthetic with gradient backgrounds
- **🔔 Smart Notifications** - Dropdown notification system
- **⚡ Fast Navigation** - Intuitive routing with React Router
- **💾 Data Persistence** - localStorage for user data and progress

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.15.0
- **Styling**: Inline CSS (no external UI libraries)
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: localStorage (for MVP)
- **Build Tool**: Create React App

## 📁 Project Structure

```
StudyBuddy Prototype/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── WelcomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   ├── GeneralQuestions.js
│   │   ├── CPATScreen.js
│   │   ├── ResultScreen.js
│   │   ├── PersonalizationFlow.js
│   │   ├── Dashboard.js
│   │   ├── MySchedules.js
│   │   ├── ScheduleCreator.js
│   │   ├── Quizzes.js
│   │   ├── QuizGenerator.js
│   │   ├── AITutor.js
│   │   ├── AboutUsScreen.js
│   │   └── ProfileScreen.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tech-T1tans/StudyBuddy-Prototype01.git
   cd StudyBuddy-Prototype01
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to the URL manually

### Build for Production

To create a production build:

```bash
npm run build
```

The build files will be generated in the `build/` folder.

## 📋 User Journey

### New User Flow
1. **Welcome Screen** → Sign up
2. **General Questions** → Grade, subjects, study time
3. **C-PAT Assessment** → Optional 3-minute cognitive test
4. **Results & Personalization** → Learning preferences setup
5. **Dashboard** → Main hub with all features

### Returning User Flow
1. **Welcome Screen** → Login
2. **Dashboard** → Direct access to all features

## 🎯 Key Pages & Features

### 📊 Dashboard
- **Hero Section**: Personalized welcome with daily tips
- **Progress Tracking**: Weekly study progress visualization
- **Quick Access**: Schedule creator, quiz generator, AI tutor
- **Side Navigation**: Fast access to core features
- **Notifications**: Dropdown system with study reminders

### 📅 My Schedules
- **Active Schedules**: Current study plans with progress tracking
- **Schedule History**: Past schedules with completion status
- **Create New**: Direct access to schedule creator

### 📝 Quizzes
- **Available Quizzes**: Ready-to-take quizzes by subject
- **Completed Quizzes**: Performance history and retry options
- **Recommended**: AI-suggested quizzes based on weak areas

### 🤖 AI Study Assistant
- **Video Summarizer**: YouTube URL input with key points extraction
- **Chat Assistant**: Interactive Q&A for study help
- **Additional Tools**: Note generator, quiz creator, concept extraction

## 🎨 Design Philosophy

- **Minimalistic**: Clean, distraction-free interface
- **Notebook Style**: Academic aesthetic with soft gradients
- **Color Scheme**: Purple/blue gradients with accent colors
- **Typography**: Modern, readable fonts optimized for studying
- **Responsive**: Mobile-first approach with desktop optimization

## 🔧 Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (⚠️ irreversible)

### Key Technologies Used

- **React Functional Components** with Hooks
- **React Router DOM** for client-side routing
- **CSS-in-JS** with inline styles for component isolation
- **localStorage API** for data persistence
- **Modern JavaScript (ES6+)** features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Team - Tech T1tans

- **Project Type**: MVP Study Assistant Application
- **Development Duration**: October 2024
- **Status**: Active Development

## 🚀 Future Enhancements

- [ ] Backend integration with real AI APIs
- [ ] User authentication with JWT
- [ ] Database integration for data persistence
- [ ] Real-time progress synchronization
- [ ] Advanced analytics and insights
- [ ] Collaborative study features
- [ ] Mobile app development

## 📞 Support

If you have any questions or need help getting started:

1. Check the [Issues](https://github.com/Tech-T1tans/StudyBuddy-Prototype01/issues) page
2. Create a new issue if you encounter bugs
3. Star the repository if you find it helpful! ⭐

---

**Made with ❤️ by Tech T1tans | Empowering students through AI-driven learning**
