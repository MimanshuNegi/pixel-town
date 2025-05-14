import React from 'react';
import { Gamepad2, Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900/70 border-t border-dark-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="h-6 w-6 text-primary-500" />
              <span className="font-display text-lg font-bold text-white">Pixel Town</span>
            </div>
            <p className="text-dark-400 text-sm">
              Create and customize your own 2D virtual spaces for meetings, events, and hangouts.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Features</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Pricing</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Templates</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Documentation</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Privacy</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 mt-10 pt-6 text-center text-dark-500 text-sm">
          <p>© {new Date().getFullYear()} Pixel Town. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;