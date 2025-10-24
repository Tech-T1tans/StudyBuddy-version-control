// Notification Service - Manages notifications with localStorage persistence
import notificationSoundService from './notificationSound';

const STORAGE_KEY_PREFIX = 'studybuddy_notifications_';
const LAST_MOTIVATIONAL_KEY = 'studybuddy_last_motivational';
const CURRENT_USER_KEY = 'studybuddy_current_user';

// Array of motivational quotes for daily notifications
const motivationalQuotes = [
  {
    title: "💪 Keep Pushing Forward!",
    message: "Success is the sum of small efforts repeated day in and day out. You're doing great!",
  },
  {
    title: "🌟 Believe in Yourself!",
    message: "The only limit to your impact is your imagination and commitment. Keep learning!",
  },
  {
    title: "🚀 You're Making Progress!",
    message: "Every expert was once a beginner. Every pro was once an amateur. Keep going!",
  },
  {
    title: "🎯 Stay Focused!",
    message: "Success doesn't come from what you do occasionally, it comes from what you do consistently.",
  },
  {
    title: "✨ You've Got This!",
    message: "The beautiful thing about learning is that no one can take it away from you.",
  },
  {
    title: "🔥 Keep the Fire Burning!",
    message: "Education is the passport to the future. Tomorrow belongs to those who prepare for it today.",
  },
  {
    title: "🌈 Embrace the Journey!",
    message: "Learning is not attained by chance, it must be sought for with ardor and diligence.",
  },
  {
    title: "💡 Knowledge is Power!",
    message: "The more that you read, the more things you will know. The more that you learn, the more places you'll go!",
  },
  {
    title: "🏆 Champion Mindset!",
    message: "Don't watch the clock; do what it does. Keep going. Your hard work will pay off!",
  },
  {
    title: "⭐ Shine Bright!",
    message: "The expert in anything was once a beginner. Your dedication today shapes your success tomorrow!",
  },
  {
    title: "🎓 Smart Choice!",
    message: "Investing in knowledge pays the best interest. Every minute you study is an investment in yourself!",
  },
  {
    title: "🌱 Growth Mindset!",
    message: "Challenges are what make life interesting. Overcoming them is what makes life meaningful!",
  },
  {
    title: "💎 You're Valuable!",
    message: "Your potential is endless. Keep believing, keep learning, keep growing!",
  },
  {
    title: "🎨 Create Your Future!",
    message: "The best way to predict the future is to create it through learning and hard work!",
  },
  {
    title: "🌟 Daily Reminder!",
    message: "Small daily improvements over time lead to stunning results. Keep up the great work!",
  }
];

class NotificationService {
  constructor() {
    this.checkAndSwitchUser();
    this.notifications = this.loadNotifications();
    this.initializeDailyMotivation();
    this.listeners = []; // Callback listeners for notification changes
  }

  // Add listener for notification changes
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  // Notify all listeners of changes
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback();
      } catch (e) {
        // Silent error handling for notification listeners
      }
    });
  }

  // Get current user identifier
  getCurrentUserId() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.email || user.username || 'guest';
  }

  // Get storage key for current user
  getStorageKey() {
    return STORAGE_KEY_PREFIX + this.getCurrentUserId();
  }

  // Check if user has changed and clear old notifications
  checkAndSwitchUser() {
    const currentUserId = this.getCurrentUserId();
    const lastUserId = localStorage.getItem(CURRENT_USER_KEY);
    
    // If user has changed, switch to new user's notifications
    if (lastUserId && lastUserId !== currentUserId && currentUserId !== 'guest') {
      // Don't clear old user's notifications, just switch to new user's notifications
    }
    
    // Update current user
    if (currentUserId !== 'guest') {
      localStorage.setItem(CURRENT_USER_KEY, currentUserId);
    }
  }

  // Load notifications from localStorage (per user)
  loadNotifications() {
    try {
      const storageKey = this.getStorageKey();
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  // Save notifications to localStorage (per user)
  saveNotifications() {
    try {
      const storageKey = this.getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(this.notifications));
      // Notify listeners of changes
      this.notifyListeners();
    } catch (error) {
      // Silent error handling
    }
  }

  // Sync notifications (reload from storage)
  syncNotifications() {
    this.notifications = this.loadNotifications();
    // Notify listeners of sync
    this.notifyListeners();
  }

  // Add a new notification
  addNotification(title, message, type = 'info', route = null, action = null) {
    const notification = {
      id: Date.now() + Math.random(),
      title,
      message,
      type, // 'info', 'success', 'warning', 'motivational'
      timestamp: new Date().toISOString(),
      read: false,
      route, // Route to navigate when clicked
      action // Optional action data
    };

    // Play notification sound
    notificationSoundService.playNotificationSound(type);

    this.notifications.unshift(notification);
    
    // Keep only last 50 notifications
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50);
    }

    this.saveNotifications();
    return notification;
  }

  // Get all notifications
  getAllNotifications() {
    return this.notifications;
  }

  // Get unread notifications
  getUnreadNotifications() {
    return this.notifications.filter(n => !n.read);
  }

  // Get unread count
  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  // Mark notification as read
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveNotifications();
    }
  }

  // Mark all as read
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.saveNotifications();
  }

  // Delete a notification
  deleteNotification(notificationId) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.saveNotifications();
  }

  // Clear all notifications
  clearAll() {
    this.notifications = [];
    this.saveNotifications();
  }

  // Get time ago string
  getTimeAgo(timestamp) {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffMs = now - notificationTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  }

  // Initialize daily motivational notification
  initializeDailyMotivation() {
    const lastMotivational = localStorage.getItem(LAST_MOTIVATIONAL_KEY);
    const today = new Date().toDateString();

    // Check if we've already sent a motivational notification today
    if (lastMotivational !== today) {
      this.sendDailyMotivation();
      localStorage.setItem(LAST_MOTIVATIONAL_KEY, today);
    }
  }

  // Send daily motivational notification
  sendDailyMotivation() {
    // Get a random motivational quote
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    this.addNotification(
      randomQuote.title,
      randomQuote.message,
      'motivational'
    );
  }

  // Add study reminder notification
  addStudyReminder(subject, time) {
    this.addNotification(
      `📚 Study Reminder: ${subject}`,
      `Time to study ${subject}! Scheduled for ${time}`,
      'info'
    );
  }

  // Add quiz completion notification
  addQuizCompletion(score, total) {
    const percentage = Math.round((score / total) * 100);
    let message = '';
    
    if (percentage >= 90) {
      message = `Outstanding! You scored ${score}/${total} (${percentage}%). Keep up the excellent work! 🌟`;
    } else if (percentage >= 70) {
      message = `Great job! You scored ${score}/${total} (${percentage}%). You're doing well! 👏`;
    } else if (percentage >= 50) {
      message = `Good effort! You scored ${score}/${total} (${percentage}%). Keep practicing! 💪`;
    } else {
      message = `You scored ${score}/${total} (${percentage}%). Don't give up, practice makes perfect! 🎯`;
    }

    this.addNotification(
      '✅ Quiz Completed!',
      message,
      'success'
    );
  }

  // Add streak notification
  addStreakNotification(days) {
    const emoji = days >= 30 ? '🏆' : days >= 14 ? '🔥' : '⭐';
    this.addNotification(
      `${emoji} ${days}-Day Streak!`,
      `Congratulations on maintaining your study streak for ${days} days! Keep it up!`,
      'success'
    );
  }

  // Add achievement notification
  addAchievement(achievementName, description) {
    this.addNotification(
      `🏅 Achievement Unlocked: ${achievementName}`,
      description,
      'success'
    );
  }

  // Send welcome journey notifications for new users
  sendWelcomeJourney() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userWelcomeKey = `studybuddy_welcome_shown_${user.email || user.username || 'guest'}`;
    const hasShownWelcome = localStorage.getItem(userWelcomeKey);
    
    // Show welcome journey if not shown for this specific user
    if (!hasShownWelcome && (user.email || user.username)) {
      // Welcome message
      this.addNotification(
        '🎉 Welcome to StudyBuddy!',
        'We\'re excited to help you on your learning journey! Let\'s get started by completing your profile.',
        'motivational',
        '/profile'
      );

      // Step 1: Complete Profile
      setTimeout(() => {
        this.addNotification(
          '📝 Step 1: Complete Your Profile',
          'Add your details, subjects, and goals to personalize your experience. Click here to get started!',
          'info',
          '/profile'
        );
      }, 2000);

      // Step 2: Take CPAT Test
      setTimeout(() => {
        this.addNotification(
          '🧠 Step 2: Take the CPAT Test',
          'Discover your learning style and get personalized recommendations. Click to begin!',
          'info',
          '/cpat'
        );
      }, 4000);

      // Step 3: Create Schedule
      setTimeout(() => {
        this.addNotification(
          '📅 Step 3: Create Your Study Schedule',
          'Plan your study sessions and stay organized. Click to create your first schedule!',
          'info',
          '/schedule'
        );
      }, 6000);

      // Step 4: Try AI Tutor
      setTimeout(() => {
        this.addNotification(
          '🤖 Step 4: Meet Your AI Tutor',
          'Get instant help with any subject! Click to start chatting with your AI tutor.',
          'info',
          '/ai-tutor'
        );
      }, 8000);

      // Mark welcome as shown for this specific user
      localStorage.setItem(userWelcomeKey, 'true');
    }
  }

  // Check and notify about profile completion
  checkProfileCompletion() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userProfileKey = `studybuddy_profile_completion_notified_${user.email || user.username || 'guest'}`;
    const hasNotified = localStorage.getItem(userProfileKey);
    
    // Check if profile is incomplete
    const isIncomplete = !user.email || !user.phone || !user.subjects || !user.goals;
    
    if (isIncomplete && !hasNotified && (user.email || user.username)) {
      this.addNotification(
        '⚠️ Complete Your Profile',
        'Your profile is incomplete! Add your details to unlock personalized features and recommendations.',
        'warning',
        '/profile'
      );
      localStorage.setItem(userProfileKey, 'true');
    }
  }

  // Notify when profile is updated
  notifyProfileUpdated() {
    this.addNotification(
      '✅ Profile Updated Successfully',
      'Your profile has been updated! Your personalized experience is now even better.',
      'success',
      '/profile'
    );
  }

  // Add new feature announcement
  addFeatureAnnouncement(featureName, description, route = null) {
    this.addNotification(
      `🎊 New Feature: ${featureName}`,
      description,
      'info',
      route
    );
  }

  // Add event notification (for all users)
  addEventNotification(eventName, eventDescription, eventRoute = null, eventDate = null) {
    const message = eventDate 
      ? `${eventDescription} - Scheduled for ${eventDate}`
      : eventDescription;

    this.addNotification(
      `📢 Event: ${eventName}`,
      message,
      'info',
      eventRoute
    );
  }

  // Notify about schedule changes
  notifyScheduleChange(action, scheduleName) {
    const messages = {
      created: `Your schedule "${scheduleName}" has been created successfully!`,
      updated: `Your schedule "${scheduleName}" has been updated.`,
      deleted: `Your schedule "${scheduleName}" has been deleted.`
    };

    this.addNotification(
      `📅 Schedule ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      messages[action] || `Schedule ${action}`,
      'success',
      '/my-schedules'
    );
  }

  // Notify about quiz events
  notifyQuizEvent(action, quizName, route = '/quizzes') {
    const messages = {
      available: `New quiz "${quizName}" is now available!`,
      started: `You've started "${quizName}". Good luck!`,
      reminder: `Don't forget to complete "${quizName}"!`
    };

    this.addNotification(
      `📝 Quiz ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      messages[action] || `Quiz ${action}`,
      'info',
      route
    );
  }

  // Notify about system changes or updates
  notifySystemUpdate(updateTitle, updateDescription) {
    this.addNotification(
      `🔄 ${updateTitle}`,
      updateDescription,
      'info'
    );
  }

  // Get notification route (for navigation)
  getNotificationRoute(notification) {
    return notification.route || null;
  }

  // Check if user is new (for welcome journey)
  isNewUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userWelcomeKey = `studybuddy_welcome_shown_${user.email || user.username || 'guest'}`;
    return !localStorage.getItem(userWelcomeKey) && (user.email || user.username);
  }

  // Reset welcome journey for current user (useful for testing or re-onboarding)
  resetWelcomeJourney() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userWelcomeKey = `studybuddy_welcome_shown_${user.email || user.username || 'guest'}`;
    localStorage.removeItem(userWelcomeKey);
  }

  // Reset profile completion notification for current user
  resetProfileCompletion() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userProfileKey = `studybuddy_profile_completion_notified_${user.email || user.username || 'guest'}`;
    localStorage.removeItem(userProfileKey);
  }

  // Clear all notifications for a specific user (cleanup)
  clearUserNotifications(userId) {
    const storageKey = STORAGE_KEY_PREFIX + userId;
    localStorage.removeItem(storageKey);
  }

  // Clear old/inactive user notifications (keep only current user)
  cleanupOldNotifications() {
    const currentUserId = this.getCurrentUserId();
    const keysToRemove = [];
    
    // Find all notification keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
        // Extract user ID from key
        const userId = key.replace(STORAGE_KEY_PREFIX, '');
        // If not current user and not guest, mark for removal
        if (userId !== currentUserId && userId !== 'guest') {
          keysToRemove.push(key);
        }
      }
    }
    
    // Remove old notification keys
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    return keysToRemove.length;
  }

  // Get total notification count across all users (for admin)
  getTotalNotificationCount() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
        try {
          const notifications = JSON.parse(localStorage.getItem(key) || '[]');
          total += notifications.length;
        } catch (e) {
          // Silent error handling
        }
      }
    }
    return total;
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;
