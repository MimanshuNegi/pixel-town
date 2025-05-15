import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import { supabase, getRandomAvatar } from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'verify'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              avatar_url: getRandomAvatar()
            }
          }
        });

        if (signUpError) throw signUpError;
        setMode('verify');
      } else if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) throw signInError;
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderVerificationContent = () => (
    <div className="p-6 text-center">
      <div className="mb-6">
        <CheckCircle2 className="h-16 w-16 text-success-500 mx-auto mb-4" />
        <h3 className="font-display text-xl font-semibold text-white mb-2">
          Check Your Email
        </h3>
        <p className="text-dark-300">
          We've sent a verification link to <span className="text-white">{email}</span>
        </p>
      </div>
      
      <div className="space-y-4">
        <Button
          variant="outline"
          fullWidth
          onClick={() => window.open('https://mail.google.com', '_blank')}
        >
          Open Gmail
        </Button>
        
        <div className="text-sm text-dark-400">
          <p className="mb-2">Didn't receive the email?</p>
          <button 
            className="text-primary-400 hover:text-primary-300"
            onClick={async () => {
              setIsLoading(true);
              try {
                const { error } = await supabase.auth.resend({
                  type: 'signup',
                  email,
                });
                if (error) throw error;
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to resend verification email');
              } finally {
                setIsLoading(false);
              }
            }}
          >
            Click to resend
          </button>
        </div>
        
        <div className="pt-4 border-t border-dark-700">
          <button 
            className="text-dark-400 hover:text-white text-sm"
            onClick={() => setMode('login')}
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );

  const renderAuthForm = () => (
    <form onSubmit={handleSubmit} className="p-6">
      {error && (
        <div className="mb-4 p-3 bg-error-500/10 border border-error-500/20 rounded-lg text-error-500 text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        {mode === 'signup' && (
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-dark-300">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User size={18} className="text-dark-500" />
              </div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-dark-800 border border-dark-700 rounded-lg py-2 pl-10 pr-3 text-white 
                          placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="John Doe"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-dark-300">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail size={18} className="text-dark-500" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-dark-800 border border-dark-700 rounded-lg py-2 pl-10 pr-3 text-white 
                        placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-dark-300">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock size={18} className="text-dark-500" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-dark-800 border border-dark-700 rounded-lg py-2 pl-10 pr-3 text-white 
                        placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
            />
          </div>
          {mode === 'login' && (
            <div className="flex justify-end mt-1">
              <a href="#" className="text-xs text-primary-400 hover:text-primary-300">
                Forgot password?
              </a>
            </div>
          )}
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          rightIcon={<ArrowRight size={18} />}
          className="mt-2"
        >
          {mode === 'login' ? 'Log in' : 'Sign up'}
        </Button>
      </div>
      
      <div className="mt-6 text-center text-sm text-dark-400">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <button 
              type="button"
              className="text-primary-400 hover:text-primary-300"
              onClick={() => setMode('signup')}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button 
              type="button"
              className="text-primary-400 hover:text-primary-300"
              onClick={() => setMode('login')}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </form>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-dark-900 rounded-xl border border-dark-700 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 text-dark-400 hover:text-white transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        {/* Header */}
        {mode !== 'verify' && (
          <div className="p-6 pb-0">
            <h2 className="font-display text-2xl font-bold text-white mb-1">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-dark-400 mb-6">
              {mode === 'login' 
                ? 'Enter your credentials to access your account'
                : 'Join Pixel Town to create your own virtual spaces'}
            </p>
          </div>
        )}
        
        {/* Content */}
        {mode === 'verify' ? renderVerificationContent() : renderAuthForm()}
      </div>
    </div>
  );
};

export default AuthModal;