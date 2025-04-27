// src/App.jsx
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import theme from './theme';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import Board from './components/Board';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './Context/AuthContext';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Home */}
            <Route path="/" element={<HomeScreen />} />

            {/* Authentication Route */}
            <Route path="/auth" element={<AuthScreen />} />

            {/* Protected Board Route */}
            <Route
              path="/board"
              element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>

        <ToastContainer position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
