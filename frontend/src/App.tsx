import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { useAuthStore } from './stores/authStore';

function App() {
  const { session } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          session ? <Navigate to="/dashboard" /> : <LandingPage />
        } />
        <Route path="/dashboard" element={
          session ? <Dashboard /> : <Navigate to="/" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;