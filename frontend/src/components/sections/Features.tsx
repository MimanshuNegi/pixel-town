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
        </div>
    </section>
  );
};

// Add missing import
import { ArrowRight } from 'lucide-react';

export default Features;