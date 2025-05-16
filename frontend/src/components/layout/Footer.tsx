import React from 'react';
import { Gamepad2, GithubIcon, LinkedinIcon, MailboxIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900/70 border-t border-dark-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="h-6 w-6 text-primary-500" />
              <span className="font-display text-lg font-bold text-white">Pixel Town</span>
            </div>
            <p className="text-dark-400 text-sm">
              Create your own 2D virtual spaces for meetings, events, and hangouts.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.linkedin.com/in/mimanshunegi" className="text-dark-400 hover:text-white transition-colors">
                <LinkedinIcon size={20} />
              </a>
              <a href="https://www.github.com/mimanshunegi" className="text-dark-400 hover:text-white transition-colors">
                <GithubIcon size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Project</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-dark-400 hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <MailboxIcon className="h-6 w-6 text-primary-100 mb-4"/>
              <h3 className="font-display font-semibold text-white mb-4">Contact us</h3>
            </div>
            <ul className="space-y-2">
              <li><a href="mailto:www.mimanshunegi@gmail.com" className="text-dark-400 hover:text-white text-sm transition-colors">mimanshunegi@gmail.com</a></li>
              <li><a href="mailto:www.ayushbalodhi@gmail.com" className="text-dark-400 hover:text-white text-sm transition-colors">ayushbalodhi@gmail.com</a></li>
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