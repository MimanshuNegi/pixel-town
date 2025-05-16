import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

interface HeroProps {
  openAuthModal: (mode: 'login' | 'signup') => void;
}

const Hero: React.FC<HeroProps> = ({ openAuthModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simple parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
      
      const elements = containerRef.current.querySelectorAll('.parallax');
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '1');
        const x = moveX * speed;
        const y = moveY * speed;
        (el as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden" ref={containerRef}>
      {/* Glowing orbs in background */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-500/20 rounded-full filter blur-[100px] parallax" data-speed="1.5"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full filter blur-[120px] parallax" data-speed="2"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KICA8cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgIDxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxZTI5M2IiIHN0cm9rZS13aWR0aD0iMSIgLz4KICA8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')]
        opacity-10 mix-blend-color-dodge"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Create Your Own Virtual 
            <span className="relative">
              <span className="relative z-10"> Pixel World</span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-primary-500/30 rounded-full filter blur-sm"></span>
            </span>
          </h1>
          
          <p className="text-dark-300 text-lg md:text-xl mb-8 leading-relaxed">
            Create your own 2D virtual spaces where people can meet, interact, and collaborate. Perfect for virtual events, team meetings, or casual hangouts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => openAuthModal('signup')}
              rightIcon={<ArrowRight size={20} />}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('#demo', '_blank')}
            >
              Watch Demo
            </Button>
          </div>
        </div>
        
        {/* Hero image/showcase */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="aspect-[16/9] rounded-xl overflow-hidden border border-dark-700 shadow-2xl">
            <img
              src="https://images.pexels.com/photos/7887139/pexels-photo-7887139.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Pixel Town Virtual Space"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with pixel grid effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 to-transparent mix-blend-overlay"></div>
            
            {/* Floating elements */}
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 parallax animate-float" data-speed="3">
              <div className="w-20 h-20 bg-primary-500/20 backdrop-blur-md rounded-lg border border-primary-500/30 flex items-center justify-center">
                <span className="text-primary-300 font-semibold">Events</span>
              </div>
            </div>
            
            <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 parallax animate-float" data-speed="2" style={{animationDelay: '-2s'}}>
              <div className="w-24 h-24 bg-secondary-500/20 backdrop-blur-md rounded-lg border border-secondary-500/30 flex items-center justify-center">
                <span className="text-secondary-300 font-semibold">Meetings</span>
              </div>
            </div>
            
            {/* User count badge */}
            <div className="absolute top-6 right-6 px-3 py-1.5 bg-dark-900/80 backdrop-blur-md rounded-full text-sm text-white border border-dark-700 flex items-center gap-2">
              <span className="h-2 w-2 bg-success-500 rounded-full"></span>
              <span>153 online now</span>
            </div>
          </div>
        </div>
        
        {/* Brands/Testimonials */}
        <div className="mt-16 text-center">
          <p className="text-dark-400 mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="text-dark-300 font-display font-semibold text-lg">Acme Inc</div>
            <div className="text-dark-300 font-display font-semibold text-lg">Globex</div>
            <div className="text-dark-300 font-display font-semibold text-lg">Stark Industries</div>
            <div className="text-dark-300 font-display font-semibold text-lg">Cyberdyne</div>
            <div className="text-dark-300 font-display font-semibold text-lg">Waystar</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;