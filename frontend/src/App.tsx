import React, { useState } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import CallToAction from './components/sections/CallToAction';
import Footer from './components/layout/Footer';
import About from './components/sections/About';
import AuthModal from './components/layout/AuthModal';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 flex flex-col">
      <Header openAuthModal={openAuthModal} />
      <main className="flex-grow">
        <Hero openAuthModal={openAuthModal} />
        <Features />
        <CallToAction openAuthModal={openAuthModal} />
        <About />
      </main>
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        initialMode={authMode}
      />
    </div>
  );
}

export default App;