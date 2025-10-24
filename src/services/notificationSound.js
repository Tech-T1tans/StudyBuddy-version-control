// Notification Sound Service
// Handles playing notification sounds using Web Audio API

class NotificationSoundService {
  constructor() {
    this.audioContext = null;
    this.soundEnabled = this.loadSoundPreference();
    this.initAudioContext();
  }

  // Initialize Audio Context
  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      // Web Audio API not supported
    }
  }

  // Load sound preference from localStorage
  loadSoundPreference() {
    const preference = localStorage.getItem('studybuddy_notification_sound');
    return preference !== 'false'; // Default to true
  }

  // Save sound preference
  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
    localStorage.setItem('studybuddy_notification_sound', enabled.toString());
  }

  // Play notification sound using Web Audio API
  playNotificationSound(type = 'default') {
    if (!this.soundEnabled || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Different sounds for different notification types
      switch (type) {
        case 'success':
          // Success: Pleasant ascending tones
          oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
          oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1); // E5
          oscillator.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.2); // G5
          break;
        
        case 'warning':
          // Warning: Two quick beeps
          oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime); // A4
          oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime + 0.15);
          break;
        
        case 'motivational':
          // Motivational: Uplifting chord
          oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
          oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.08);
          oscillator.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.16);
          break;
        
        default:
          // Default: Single pleasant tone
          oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
          break;
      }

      oscillator.type = 'sine';
      
      // Envelope for smooth sound
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
    } catch (e) {
      // Silent error handling
    }
  }

  // Alternative: Play using HTML5 Audio with data URI
  playSimpleBeep() {
    if (!this.soundEnabled) return;

    try {
      // Create a simple beep sound using data URI
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnMpBSl+zPLaizsIGGS57OihUBELTKXh8bllHAU2jdXzzn0vBSF1xe/glEILElyx6OyrWBUIQ5zd8sFuJAUuhM/z1YU2Bhxqvu7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+CRZiturqpVITC0mi4PK8aB8GM4nU8tGAMQYfcsLu45ZFDBFYr+ftrVoXCECY3PLEcSYELIHO8diJOQcZaLvt559NEAxPqOPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjMGHW/A7eSaRw0PVqzl77BeGQc9ltvyxnUoBSh+zPDaizsIGGS56+mjTxELTKXh8bllHAU1jdT0z3wvBSJ0xe/glEILElyx6OyrWRUIRJve8sFuJAUug8/y1oU2Bhxqvu3mnEoPDlOq5O+zYRsGPJLZ88p3KgUme8rx3I4+CRVht+rqpVMSC0mh4fK8aiAFM4nU8tGAMQYfccPu45ZFDBFYr+ftrVwWCECY3PLEcSYGK4DN8tiIOQcZZ7zs56BODwxPpuPxt2IdBjiP1/PMeywGI3fH8N+RQAoUXrTp66hWEwlGnt/yv2wiBDCG0fPTgzIGHm/A7eSaSQ0PVqvm77BeGQc9ltrzxnUoBSh9y/HajDsIF2W56+mjUREKTKPi8blnGwU1jdTy0HwvBSF0xPDglEQKElux6eyrWRUJQ5vd88FwJAQug8/y1oY2Bhxqvu3mnEwODVKp5e+zYRsGOpHY88p3KgUme8rx3I8+CRVht+rqpVMSC0mh4fK9aiAFM4nU8tGBMQYfccPu45dGCxFYr+ftrVwWCECY3PLEcicFKoDN8tiIOQcZZ7zs56BODwxPpuPxt2IdBjiP1/PMey4FI3bH8d+RQQkUXbPq66hWEwlGnt/yv2wiBDCG0fPTgzIGHm/A7eSaSQ0PVqvm77BeGQc9ltrzxnUoBSh9y/HajDsIF2W56+mjUREKTKPi8blnGwU1jdTy0HwvBSF0xPDglEQKElux6eyrWRUJQ5vd88FwJAQug8/y1oY2Bhxqvu3mnEwODVKp5e+zYRsGOpHY88p3KgUme8rx3I8+CRVht+rqpVMSC0mh4fK9aiAFM4nU8tGBMQYfccPu45dGCxFYr+ftrVwWCECY3PLEcicFKoDN8tiIOQcZZ7zs56BODwxPpuPxt2IdBjiP1/PMey4FI3bH8d+RQQkUXbPq66hWEwlGnt/yv2wiBDCG0fPTgzIGHm/A7eSaSQ0PVqvm77BeGQc9ltrzxnUoBSh9y/HajDsIF2W56+mjUREKTKPi8blnGwU1jdTy0HwvBSF0xPDglEQKElux6eyrWRUJQ5vd88FwJAQug8/y1oY2Bhxqvu3mnEwODVKp5e+zYRsGOpHY88p3KgUme8rx3I8+CRVht+rqpVMSC0mh4fK9aiAFM4nU8tGBMQYfccPu45dGCxFYr+ftrVwWCECY3PLEcicFKoDN8tiIOQcZZ7zs56BODwxPpuPxt2IdBjiP1/PMey4FI3bH8d+RQQkUXbPq66hWEwlGnt/yv2wiBDCG0fPTgzIGHm/A7eSaSQ0PVqvm77BeGQc9ltrzxnUoBSh9y/HajDsIF2W56+mjUREKTKPi8blnGwU1jdTy0HwvBSF0xPDglEQKElux6eyrWRUJQ5vd88FwJAQug8/y1oY2Bhxqvu3mnEwODVKp5e+zYRsGOpHY88p3KgUme8rx');
      audio.volume = 0.3;
      audio.play().catch(e => {});
    } catch (e) {
      // Silent error handling
    }
  }

  // Toggle sound on/off
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.setSoundEnabled(this.soundEnabled);
    return this.soundEnabled;
  }

  // Check if sound is enabled
  isSoundEnabled() {
    return this.soundEnabled;
  }
}

// Create singleton instance
const notificationSoundService = new NotificationSoundService();

export default notificationSoundService;
