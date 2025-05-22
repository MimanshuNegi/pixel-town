import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import { useAuthStore } from './stores/authStore';

function App() {
  const { token } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          token ? <Navigate to="/dashboard" /> : <LandingPage />
        } />
        <Route path="/login" element={
          token ? <Navigate to="/dashboard" /> : <LoginPage />
        } />
        <Route path="/signup" element={
          token ? <Navigate to="/dashboard" /> : <SignupPage />
        } />
        <Route path="/dashboard" element={
          token ? <Dashboard /> : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;