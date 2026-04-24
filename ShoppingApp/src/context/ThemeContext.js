import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const lightTheme = {
  backgroundPrimary: '#ffffff',
  backgroundMuted: '#f5f5f5',
  textPrimary: '#000000',
  textSecondary:'#787878',

   primary: '#F83758',

  /* icons */
  iconActive: '#F83758',
  iconInactive: '#222222',

  /* borders */
  border: '#E5E5E5',

  /* inputs */
  inputBackground: '#FFFFFF',
  inputBorder: '#C8C8C8',
};

const darkTheme = {
  backgroundPrimary: '#121212',
  backgroundMuted: '#1e1e1e',
  textPrimary: '#ffffff',
  textSecondary:'#cecece',

  /* brand */
  primary: '#F83758',

  /* icons */
  iconActive: '#F83758',
  iconInactive: '#9A9A9A',

  /* borders */
  border: '#2A2A2A',

  /* inputs */
  inputBackground: '#1E1E1E',
  inputBorder: '#333333',

};

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => setIsDark(prev => !prev);
  
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value=
    {{ 
      theme, 
      toggleTheme, 
      isDark 
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;