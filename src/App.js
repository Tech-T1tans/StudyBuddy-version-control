import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import LoginScreen from './pages/LoginScreen';
import SignupScreen from './pages/SignupScreen';
import CPATScreen from './pages/CPATScreen';
import ResultScreen from './pages/ResultScreen';
import PersonalizationFlow from './pages/PersonalizationFlow';
import Dashboard from './pages/Dashboard';
import ScheduleCreator from './pages/ScheduleCreator';
import QuizGenerator from './pages/QuizGenerator';
import AboutUsScreen from './pages/AboutUsScreen';
import ProfileScreen from './pages/ProfileScreen';
import AITutor from './pages/AITutor';
import MySchedules from './pages/MySchedules';
import Quizzes from './pages/Quizzes';
import GeneralQuestions from './pages/GeneralQuestions';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/cpat" element={<CPATScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/personalization" element={<PersonalizationFlow />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<ScheduleCreator />} />
          <Route path="/quiz" element={<QuizGenerator />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/my-schedules" element={<MySchedules />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/general-questions" element={<GeneralQuestions />} />
          <Route path="/about" element={<AboutUsScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
