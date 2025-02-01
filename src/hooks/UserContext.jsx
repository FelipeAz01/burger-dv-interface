import { createContext, useContext, useState, useEffect } from 'react';

const UseContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const putUserData = (userInfo) => {
    setUserInfo(userInfo);

    localStorage.setItem('devburger:userData', JSON.stringify(userInfo));
  };

  const logout = () => {
    setUserInfo({});
    localStorage.removeItem('devburger:userData');
  };

  useEffect(() => {
    const UserInfoLocalStorage = localStorage.getItem('devburger:userData');

    if (UserInfoLocalStorage) {
      setUserInfo(JSON.parse(UserInfoLocalStorage));
    }
  }, []);

  return (
    <UseContext.Provider value={{ userInfo, putUserData, logout }}>
      {children}
    </UseContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UseContext);

  if (!context) {
    throw new Error('useUser must be a valid context');
  }
  return context;
};
