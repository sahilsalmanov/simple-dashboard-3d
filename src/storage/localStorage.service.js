export const load = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value, null, 2));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const remove = (key) => {
  localStorage.removeItem(key);
};
