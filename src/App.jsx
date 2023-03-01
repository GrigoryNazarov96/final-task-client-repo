import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import '../src/App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';

const light = {
  palette: {
    mode: 'light',
  },
};

const dark = {
  palette: {
    mode: 'dark',
  },
};

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(
    JSON.parse(localStorage.getItem('isDarkTheme')) ?? false,
  );

  const setIsDarkThemeInStorage = (bool) => {
    localStorage.setItem('isDarkTheme', bool);
  };

  const getIsDarkThemeInStorage = () => {
    return localStorage.getItem('isDarkTheme');
  };

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    setIsDarkThemeInStorage(!isDarkTheme);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
        <CssBaseline />
        <Navbar
          changeTheme={changeTheme}
          isDarkTheme={isDarkTheme}
          setIsDarkThemeInStorage={setIsDarkThemeInStorage}
          getIsDarkThemeInStorage={getIsDarkThemeInStorage}
        />
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
