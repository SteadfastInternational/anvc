const localStorageUtil = {
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    if (typeof window !== "undefined") {
      try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
      } catch (error) {
        console.error(`Error retrieving key "${key}" from localStorage:`, error);
        return defaultValue;
      }
    }
    return defaultValue;
  },

  set: (key: string, value: unknown): void => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting key "${key}" in localStorage:`, error);
      }
    }
  },

  remove: (key: string): void => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing key "${key}" from localStorage:`, error);
      }
    }
  },

  clear: (): void => {
    if (typeof window !== "undefined") {
      try {
        localStorage.clear();
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    }
  },
};

export default localStorageUtil;
