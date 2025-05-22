import React from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface VideoChatProps {
  isMicMuted: boolean;
}

const VideoChat: React.FC<VideoChatProps> = ({ isMicMuted }) => {
  const [isCameraOn, setIsCameraOn] = React.useState(true);

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-4">
      {/* Local video */}
      <div className="relative w-48 h-36 bg-slate-800 rounded-lg overflow-hidden shadow-lg">
        <video
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            className="p-1.5 bg-slate-700/80 hover:bg-slate-600/80 rounded-full text-white transition-colors"
            aria-label={isCameraOn ? "Turn camera off" : "Turn camera on"}
          >
            {isCameraOn ? (
              <Camera className="w-4 h-4" />
            ) : (
              <CameraOff className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="text-xs text-white bg-slate-900/60 px-2 py-1 rounded">You</span>
        </div>
      </div>

      {/* Remote video */}
      <div className="relative w-48 h-36 bg-slate-800 rounded-lg overflow-hidden shadow-lg">
        <video
          className="w-full h-full object-cover"
          autoPlay
          playsInline
        />
        <div className="absolute bottom-2 left-2">
          <span className="text-xs text-white bg-slate-900/60 px-2 py-1 rounded">Alex</span>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;