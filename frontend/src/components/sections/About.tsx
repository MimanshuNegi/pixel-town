import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-500/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-500/10 rounded-full filter blur-[120px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            About US
          </h2>
          <p className="text-dark-300 text-lg">
            This is a project which we're developing as our final year project using our knowledge of React, Node.js, and WebRTC. 
            The goal is to create a virtual space where users can interact with each other in real-time, similar to a social media platform but with a focus on immersive experiences.
          </p>
        </div>
        
        {/* Feature showcase */}
        <div className="mt-20 bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-900/30 text-primary-400 text-sm font-medium mb-4">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-primary-500"></span>
                Popular Feature
              </div>
              
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Create Custom Rooms for Any Occasion
              </h3>
              
              <p className="text-dark-300 mb-6 text-lg">
                From professional meeting spaces to fun game rooms, create custom environments that perfectly suit your needs.
              </p>
              
              <ul className="space-y-3 mb-8">
                {['Room templates for quick setup', 'Unlimited customization options', 'Save and share your designs'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-success-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <svg className="h-4 w-4 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-dark-200">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div>
                <a href="#" className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium">
                  Learn more about customization
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="./assets/images/about.png"
                alt="Custom room design in Pixel Town"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-dark-900/30 to-transparent lg:bg-gradient-to-t lg:from-dark-900/80 lg:via-dark-900/30 lg:to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add missing import
import { ArrowRight } from 'lucide-react';

export default About;