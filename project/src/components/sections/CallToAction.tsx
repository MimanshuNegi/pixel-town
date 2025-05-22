import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

interface CTAProps {
  openAuthModal: (mode: 'login' | 'signup') => void;
}

const CallToAction: React.FC<CTAProps> = ({ openAuthModal }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
      <div className="absolute -top-40 right-0 w-80 h-80 bg-primary-500/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute -bottom-20 left-0 w-80 h-80 bg-secondary-500/10 rounded-full filter blur-[100px]"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KICA8cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgIDxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxZTI5M2IiIHN0cm9rZS13aWR0aD0iMSIgLz4KICA8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')]
        opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-900/20 to-secondary-900/20 backdrop-blur-sm 
                      rounded-2xl border border-dark-700 p-8 md:p-12 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="flex-1 mb-8 lg:mb-0 lg:pr-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Create Your Virtual Space?
              </h2>
              <p className="text-dark-300 text-lg mb-6">
                Join thousands of users who are already creating and sharing amazing virtual spaces for work and play.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  onClick={() => openAuthModal('signup')}
                  rightIcon={<ArrowRight size={20} />}
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '#contact'}
                >
                  Contact Sales
                </Button>
              </div>
              
              <p className="mt-4 text-dark-400 text-sm">
                No credit card required. Free plan includes all the basics.
              </p>
            </div>
            
            <div className="lg:w-2/5">
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-success-500/20 flex items-center justify-center">
                    <svg className="h-5 w-5 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-white">Free Forever Plan</h4>
                    <p className="text-dark-400 text-sm">Get started with no cost</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {[
                    'Up to 5 custom spaces',
                    '10 visitors at a time',
                    'Basic customization options',
                    'Standard templates',
                    'Community support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-dark-700 flex items-center justify-center mt-0.5 mr-2">
                        <svg className="h-3 w-3 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-dark-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => openAuthModal('signup')}
                >
                  Create Free Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;