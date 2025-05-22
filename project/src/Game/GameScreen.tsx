import React, { useState } from 'react';
import GameControls from './GameControls';
import ChatPanel from './ChatPanel';
import UsersList from './UsersList';
import GameCanvas from './GameCanvas';
import VideoChat from './VideoChat';
import { LogOut } from 'lucide-react';

const GameScreen: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isUsersListOpen, setIsUsersListOpen] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
    if (!isChatOpen) setIsUsersListOpen(false);
  };
  
  const toggleUsersList = () => {
    setIsUsersListOpen(prev => !prev);
    if (!isUsersListOpen) setIsChatOpen(false);
  };
  
  const toggleMic = () => {
    setIsMicMuted(prev => !prev);
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit the game?')) {
      // Here you would typically handle cleanup and navigation
      window.location.href = '/';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      <GameCanvas />
      <VideoChat isMicMuted={isMicMuted} />
      
      <button 
        onClick={handleExit}
        className="absolute top-4 left-4 flex items-center px-6 py-2.5 bg-red-600/90 hover:bg-red-700 text-white rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 backdrop-blur-sm shadow-lg hover:shadow-red-600/25"
        aria-label="Exit game"
      >
        <LogOut className="w-5 h-5" />
        <span className="ml-2 font-medium">Exit</span>
      </button>
      
      <GameControls 
        isChatOpen={isChatOpen}
        isUsersListOpen={isUsersListOpen}
        isMicMuted={isMicMuted}
        onChatToggle={toggleChat}
        onUsersToggle={toggleUsersList}
        onMicToggle={toggleMic}
      />
      
      {isChatOpen && <ChatPanel onClose={() => setIsChatOpen(false)} />}
      {isUsersListOpen && <UsersList onClose={() => setIsUsersListOpen(false)} />}
    </div>
  );
};

export default GameScreen;