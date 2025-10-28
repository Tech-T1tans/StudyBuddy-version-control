// Notification Helper Functions
// Import this in any component that needs to send notifications

import notificationService from '../services/notificationService';

/**
 * Send a notification when a quiz is started
 */
export const notifyQuizStarted = (quizName, quizRoute = '/quizzes') => {
  notificationService.addNotification(
    '📝 Quiz Started',
    `You've started the ${quizName} quiz. Good luck!`,
    'info',
    quizRoute
  );
};

/**
 * Send a notification when a quiz is completed
 * Automatically formats the message based on score
 */
export const notifyQuizCompleted = (score, total, resultRoute = '/quizzes') => {
  notificationService.addQuizCompletion(score, total);
};

/**
 * Send a notification when a schedule is created
 */
export const notifyScheduleCreated = (scheduleName) => {
  notificationService.notifyScheduleChange('created', scheduleName);
};

/**
 * Send a notification for an upcoming study session
 */
export const notifyStudyReminder = (subject, time) => {
  notificationService.addStudyReminder(subject, time);
};

/**
 * Send a notification when user achieves a milestone
 */
export const notifyMilestone = (milestone, description) => {
  notificationService.addAchievement(milestone, description);
};

/**
 * Send a notification for study streak
 */
export const notifyStreak = (days) => {
  notificationService.addStreakNotification(days);
};

/**
 * Send a notification when new content is available
 */
export const notifyNewContent = (contentType, contentName) => {
  notificationService.addNotification(
    `📚 New ${contentType} Available`,
    `${contentName} has been added to your library`,
    'info'
  );
};

/**
 * Send a notification for AI Tutor response
 */
export const notifyAIResponse = () => {
  notificationService.addNotification(
    '🤖 AI Tutor Response',
    'Your AI tutor has responded to your question',
    'info'
  );
};

/**
 * Send a notification for deadline reminder
 */
export const notifyDeadline = (taskName, timeLeft) => {
  notificationService.addNotification(
    '⏰ Deadline Reminder',
    `${taskName} is due in ${timeLeft}`,
    'warning'
  );
};

/**
 * Send a notification when goal is achieved
 */
export const notifyGoalAchieved = (goalName) => {
  notificationService.addNotification(
    '🎯 Goal Achieved!',
    `Congratulations! You've achieved your goal: ${goalName}`,
    'success'
  );
};

/**
 * Send a notification for daily study time
 */
export const notifyDailyStudyTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  
  notificationService.addNotification(
    '⏱️ Study Time Today',
    `You've studied for ${timeStr} today. Keep it up!`,
    'info'
  );
};

/**
 * Send a notification when a badge is earned
 */
export const notifyBadgeEarned = (badgeName, badgeDescription) => {
  notificationService.addNotification(
    `🏅 Badge Earned: ${badgeName}`,
    badgeDescription,
    'success'
  );
};

/**
 * Send a notification for level up
 */
export const notifyLevelUp = (newLevel) => {
  notificationService.addNotification(
    '🎊 Level Up!',
    `Congratulations! You've reached Level ${newLevel}!`,
    'success'
  );
};

/**
 * Send a notification for friend activity
 */
export const notifyFriendActivity = (friendName, activity) => {
  notificationService.addNotification(
    '👥 Friend Activity',
    `${friendName} ${activity}`,
    'info'
  );
};

/**
 * Send a notification for system updates
 */
export const notifySystemUpdate = (updateMessage) => {
  notificationService.addNotification(
    '🔄 System Update',
    updateMessage,
    'info'
  );
};

/**
 * Send a custom notification
 */
export const notifyCustom = (title, message, type = 'info', route = null) => {
  notificationService.addNotification(title, message, type, route);
};

/**
 * Send welcome journey for new users
 */
export const sendWelcomeJourney = () => {
  notificationService.sendWelcomeJourney();
};

/**
 * Check and notify about profile completion
 */
export const checkProfileCompletion = () => {
  notificationService.checkProfileCompletion();
};

/**
 * Notify when profile is updated
 */
export const notifyProfileUpdated = () => {
  notificationService.notifyProfileUpdated();
};

/**
 * Announce a new feature
 */
export const announceFeature = (featureName, description, route = null) => {
  notificationService.addFeatureAnnouncement(featureName, description, route);
};

/**
 * Announce an event to all users
 */
export const announceEvent = (eventName, description, route = null, date = null) => {
  notificationService.addEventNotification(eventName, description, route, date);
};

/**
 * Notify about schedule changes
 */
export const notifyScheduleUpdate = (scheduleName) => {
  notificationService.notifyScheduleChange('updated', scheduleName);
};

/**
 * Notify about schedule deletion
 */
export const notifyScheduleDeleted = (scheduleName) => {
  notificationService.notifyScheduleChange('deleted', scheduleName);
};

/**
 * Notify about quiz availability
 */
export const notifyQuizAvailable = (quizName, route = '/quizzes') => {
  notificationService.notifyQuizEvent('available', quizName, route);
};

/**
 * Send quiz reminder
 */
export const notifyQuizReminder = (quizName, route = '/quizzes') => {
  notificationService.notifyQuizEvent('reminder', quizName, route);
};

// Export the notification service for direct access if needed
export { notificationService };
