import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import './index.css';

interface ChatPanelProps {
  onClose: () => void;
}

const MOCK_MESSAGES = [
  { id: 1, sender: 'Alex', content: 'Hey everyone!', timestamp: '12:01' },
  { id: 2, sender: 'Jamie', content: 'Hi Alex, how are you?', timestamp: '12:02' },
  { id: 3, sender: 'System', content: 'Jamie has collected a power-up!', timestamp: '12:03', isSystem: true },
  { id: 4, sender: 'Taylor', content: 'Watch out for the trap on the east side.', timestamp: '12:05' },
  { id: 5, sender: 'Alex', content: 'Thanks for the heads-up!', timestamp: '12:06' },
];

const ChatPanel: React.FC<ChatPanelProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'You',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="absolute bottom-20 right-4 w-80 md:w-96 h-96 bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center px-4 py-3 bg-slate-700">
        <h3 className="text-white font-medium">Game Chat</h3>
        <button 
          onClick={onClose}
          className="text-slate-300 hover:text-white transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}
          >
            <div className={`max-w-[85%] px-3 py-2 rounded-lg ${
              msg.isSystem 
                ? 'bg-slate-700/70 text-slate-300 italic w-full text-center'
                : msg.sender === 'You'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700 text-white'
            }`}>
              {!msg.isSystem && (
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-xs">{msg.sender}</span>
                  <span className="text-xs opacity-70">{msg.timestamp}</span>
                </div>
              )}
              <p className="text-sm break-words">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-slate-700">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-slate-600 border-none text-white placeholder-slate-400 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-r-md transition-colors ${!message.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;