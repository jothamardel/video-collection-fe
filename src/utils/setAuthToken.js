export const setAuthToken = (token) => {
  try {
    if (token) {
      localStorage.setItem('bazaar', token);
    } else {
      localStorage.removeItem('bazaar');
    }
  } catch (error) {
    console.log('>>>>: src/utils.js : setAuthToken -> error', error);
  }
};