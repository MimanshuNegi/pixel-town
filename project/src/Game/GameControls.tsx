import React from 'react';
import { MessageSquare, Users, Mic, MicOff } from 'lucide-react';

interface GameControlsProps {
  isChatOpen: boolean;
  isUsersListOpen: boolean;
  isMicMuted: boolean;
  onChatToggle: () => void;
  onUsersToggle: () => void;
  onMicToggle: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  isChatOpen,
  isUsersListOpen,
  isMicMuted,
  onChatToggle,
  onUsersToggle,
  onMicToggle
}) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-slate-800/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
      <button 
        onClick={onChatToggle}
        className={`game-control-btn ${isChatOpen ? 'bg-green-600' : 'bg-slate-700 hover:bg-green-600/80'}`}
        aria-label="Toggle chat"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="ml-2 hidden md:inline">Chat</span>
      </button>

      <button 
        onClick={onMicToggle}
        className={`game-control-btn ${isMicMuted ? 'bg-red-600' : 'bg-slate-700 hover:bg-slate-600'}`}
        aria-label={isMicMuted ? "Unmute microphone" : "Mute microphone"}
      >
        {isMicMuted ? 
          <MicOff className="w-5 h-5" /> : 
          <Mic className="w-5 h-5" />
        }
        <span className="ml-2 hidden md:inline">{isMicMuted ? "Unmute" : "Mute"}</span>
      </button>

      <button 
        onClick={onUsersToggle}
        className={`game-control-btn ${isUsersListOpen ? 'bg-blue-600' : 'bg-slate-700 hover:bg-blue-600/80'}`}
        aria-label="Show users"
      >
        <Users className="w-5 h-5" />
        <span className="ml-2 hidden md:inline">Players</span>
      </button>
    </div>
  );
};

export default GameControls;