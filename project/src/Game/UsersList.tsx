import React from 'react';
import { X, Crown, Wifi, WifiOff } from 'lucide-react';

interface UsersListProps {
  onClose: () => void;
}

const MOCK_USERS = [
  { id: 1, username: 'Alex', status: 'online', isHost: true, level: 12 },
  { id: 2, username: 'Jamie', status: 'online', isHost: false, level: 8 },
  { id: 3, username: 'Taylor', status: 'online', isHost: false, level: 15 },
  { id: 4, username: 'Morgan', status: 'offline', isHost: false, level: 5 },
  { id: 5, username: 'Casey', status: 'online', isHost: false, level: 10 },
];

const UsersList: React.FC<UsersListProps> = ({ onClose }) => {
  return (
    <div className="absolute bottom-20 right-4 w-80 md:w-96 h-96 bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center px-4 py-3 bg-slate-700">
        <h3 className="text-white font-medium">Players ({MOCK_USERS.filter(u => u.status === 'online').length})</h3>
        <button 
          onClick={onClose}
          className="text-slate-300 hover:text-white transition-colors"
          aria-label="Close users list"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {MOCK_USERS.map(user => (
          <div 
            key={user.id} 
            className={`flex items-center p-3 rounded-lg mb-2 ${
              user.status === 'online' 
                ? 'bg-slate-700/80 hover:bg-slate-700' 
                : 'bg-slate-700/30 text-slate-400'
            } transition-colors`}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              {user.username.charAt(0)}
            </div>
            
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <span className="font-medium text-white">{user.username}</span>
                {user.isHost && (
                  <Crown className="w-4 h-4 ml-2 text-yellow-400" />
                )}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-slate-300">Level {user.level}</span>
                <div className="flex items-center ml-3">
                  {user.status === 'online' ? (
                    <>
                      <Wifi className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400 ml-1">Online</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400 ml-1">Offline</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="p-1.5 text-white bg-slate-600 hover:bg-slate-500 rounded-full transition-colors"
                aria-label={`Send message to ${user.username}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;