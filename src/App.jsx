import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme'
import AuthScreen from './screens/AuthScreen'
import { AuthProvider } from './Context/AuthContext';
import HomeScreen from './screens/HomeScreen';
import Navbar from './components/NavBar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<HomeScreen
            />} />
            <Route path="/auth" element={<AuthScreen />} />
          </Routes>

        </BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App