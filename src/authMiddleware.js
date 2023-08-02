// authMiddleware.js
const isAuthenticated = () => {
    const isLoggedIn = localStorage.getItem('accessToken') !== null;
    return isLoggedIn;
  };
  
  const authMiddleware = (to, from, next) => {
    if (to.name !== 'login' && !isAuthenticated()) {
      next({ path: '/login' });
    } else {
      next();
    }
  };
  
  export default authMiddleware;
  