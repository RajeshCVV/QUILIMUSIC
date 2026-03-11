import { TRIAL_DURATION_MS } from './dataModels';

const TRIAL_KEY = 'qmms_trial_token';

export const trialService = {
  getTrialInfo: () => {
    const stored = localStorage.getItem(TRIAL_KEY);
    if (!stored) {
      const startTime = Date.now();
      const expirationTime = startTime + TRIAL_DURATION_MS;
      const info = { startTime, expirationTime };
      localStorage.setItem(TRIAL_KEY, JSON.stringify(info));
      return info;
    }
    return JSON.parse(stored);
  },

  isTrialValid: () => {
    const info = trialService.getTrialInfo();
    return Date.now() < info.expirationTime;
  },

  getTimeLeft: () => {
    const info = trialService.getTrialInfo();
    const diff = info.expirationTime - Date.now();
    return Math.max(0, diff);
  },

  formatTimeLeft: (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }
};
