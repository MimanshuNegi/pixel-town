import React from 'react';
import { Users, Paintbrush, Wand2, Zap, Share2, ShieldCheck } from 'lucide-react';
import Card from '../ui/Card';

const features = [
  {
    icon: <Paintbrush className="h-6 w-6 text-primary-500" />,
    title: 'Customize Your Space',
    description: 'Choose from a variety of themes, furniture, and decorations to create your perfect virtual environment.',
  },
  {
    icon: <Users className="h-6 w-6 text-primary-500" />,
    title: 'Connect with Others',
    description: 'Invite friends, colleagues, or new connections to join your space for meetings, events, or casual hangouts.',
  },
  {
    icon: <Wand2 className="h-6 w-6 text-primary-500" />,
    title: 'Interactive Elements',
    description: 'Add games, whiteboards, media players, and other interactive tools to enhance collaboration and fun.',
  },
  {
    icon: <Zap className="h-6 w-6 text-primary-500" />,
    title: 'Real-time Interaction',
    description: 'Experience lag-free communication with crystal-clear audio and video chat built right into your virtual space.',
  },
  {
    icon: <Share2 className="h-6 w-6 text-primary-500" />,
    title: 'Easy Sharing',
    description: 'Generate a simple link that lets anyone join your space, no downloads or complex setup required.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary-500" />,
    title: 'Privacy Controls',
    description: 'Set permissions, create private rooms, and control who can access different areas of your virtual space.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-500/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-500/10 rounded-full filter blur-[120px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Everything You Need to Create Amazing Virtual Spaces
          </h2>
          <p className="text-dark-300 text-lg">
            Pixel Town provides all the tools and features you need to build engaging virtual environments for any purpose.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              hoverEffect={true}
              className="flex flex-col items-start h-full transition-all duration-300"
            >
              <div className="p-3 bg-dark-800 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-dark-300">
                {feature.description}
              </p>
            </Card>
          ))}
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
                From professional meeting spaces to fun game rooms, create custom environments that perfectly suit your needs. Drag and drop furniture, change wall colors, add decorations, and more.
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
                src="https://images.pexels.com/photos/7873567/pexels-photo-7873567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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

export default Features;