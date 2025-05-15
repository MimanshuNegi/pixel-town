import React, { useState, useEffect } from 'react';
import { Gamepad2, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  openAuthModal: (mode: 'login' | 'signup') => void;
}

const Header: React.FC<HeaderProps> = ({ openAuthModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-dark-900/90 backdrop-blur-md shadow-md' 
          : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 text-white">
          <Gamepad2 className="h-8 w-8 text-primary-500" />
          <span className="font-display text-xl font-bold">Pixel Town</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-dark-200 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-dark-200 hover:text-white transition-colors">About</a>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => openAuthModal('login')}
          >
            Log in
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => openAuthModal('signup')}
          >
            Sign up
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-900 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-dark-200 hover:text-white py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#" 
              className="text-dark-200 hover:text-white py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#" 
              className="text-dark-200 hover:text-white py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <div className="flex flex-col space-y-2 pt-2 border-t border-dark-700">
              <Button 
                variant="ghost" 
                size="md"
                fullWidth
                onClick={() => {
                  openAuthModal('login');
                  setMobileMenuOpen(false);
                }}
              >
                Log in
              </Button>
              <Button 
                variant="primary" 
                size="md"
                fullWidth
                onClick={() => {
                  openAuthModal('signup');
                  setMobileMenuOpen(false);
                }}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;