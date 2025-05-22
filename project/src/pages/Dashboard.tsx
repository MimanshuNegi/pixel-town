import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { UserCircle2, Plus, MapPin, Mail, LogOut, X, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { api } from '../lib/api';
import type { Room } from '../lib/api';
import  GameScreen from '../Game/GameScreen';



function Dashboard() {
  const { user, token, signOut } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomIdToJoin, setRoomIdToJoin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
 const [isGameScreenOpen, setIsGameScreenOpen] = useState(false);
 

  useEffect(() => {
    fetchRooms();
  }, [token]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsCreateModalOpen(false);
        setIsJoinModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchRooms = async () => {
    if (!token) return;

    try {
      const rooms = await api.rooms.getAll(token);
      setRooms(rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !roomName.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const room = await api.rooms.create(token, {
        name: roomName.trim(),
        description: roomDescription.trim() || undefined
      });

      setRooms([...rooms, room]);
      setIsCreateModalOpen(false);
      setRoomName('');
      setRoomDescription('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create room');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !roomIdToJoin.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const room = await api.rooms.join(token, roomIdToJoin.trim());
      setRooms([...rooms, room]);
      setIsJoinModalOpen(false);
      setRoomIdToJoin('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join room');
    } finally {
      setIsLoading(false);
    }
  };

  const Modal = ({ 
    isOpen, 
    title, 
    children 
  }: { 
    isOpen: boolean; 
    title: string; 
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div 
          ref={modalRef}
          className="bg-dark-900 rounded-xl border border-dark-700 shadow-xl w-full max-w-md"
        >
          <div className="flex items-center justify-between p-6 border-b border-dark-700">
            <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
            <button
              onClick={() => {
                setIsCreateModalOpen(false);
                setIsJoinModalOpen(false);
                setError('');
              }}
              className="text-dark-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-error-500/10 border border-error-500/20 rounded-lg text-error-500 text-sm">
                {error}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  };
  if (isGameScreenOpen ) {
  return <GameScreen  />;
}

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navigation */}
      <nav className="bg-dark-900 border-b border-dark-800 relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-primary-500" />
              <span className="font-display text-lg font-bold text-white">Pixel Town</span>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 group"
              >
                <span className="text-dark-200 group-hover:text-white">
                  {user?.fullName}
                </span>
                <div className="h-8 w-8 rounded-full overflow-hidden bg-dark-800 flex items-center justify-center">
                  <UserCircle2 className="h-6 w-6 text-dark-400" />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-dark-800 rounded-lg shadow-lg border border-dark-700 py-1 animate-fade-in">
                  <div className="px-4 py-3 border-b border-dark-700">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-dark-700 flex items-center justify-center">
                        <UserCircle2 className="h-8 w-8 text-dark-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{user?.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-dark-300">
                      <Mail size={14} className="mr-1.5" />
                      <span className="truncate">{user?.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={signOut}
                    className="w-full text-left px-4 py-2 text-sm text-dark-200 hover:text-white hover:bg-dark-700 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display font-bold text-white">My Rooms</h1>
          <div className="flex gap-4">
            <Button
              variant="outline"
              leftIcon={<Users size={20} />}
              onClick={() => setIsJoinModalOpen(true)}
            >
              Join Room
            </Button>
            <Button
              variant="primary"
              leftIcon={<Plus size={20} />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Room
            </Button>
          </div>
        </div>
        


        {rooms.length === 0 ? (
          <Card className="text-center py-12">
            <UserCircle2 className="h-12 w-12 text-dark-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Rooms Yet</h3>
            <p className="text-dark-400 mb-6">
              Create your first virtual room to start hosting meetings and events.
            </p>
            <Button
              variant="primary"
              leftIcon={<Plus size={20} />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Your First Room
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Card key={room._id} className="flex flex-col">
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {room.name}
                </h3>
                {room.description && (
                  <p className="text-dark-300 text-sm mb-4">{room.description}</p>
                )}
                <div className="mt-auto pt-4 flex items-center justify-between text-sm text-dark-400">
                  <span>ID: {room._id}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
  setIsGameScreenOpen(true);
}}

                  >
                    Enter Room
                  </Button>
                </div>
              </Card> 
            ))}
          </div>
        )}
      </main>

      {/* Create Room Modal */}
      <Modal isOpen={isCreateModalOpen} title="Create New Room">
        <form onSubmit={handleCreateRoom}>
          <div className="space-y-4">
            <div>
              <label htmlFor="roomName" className="block text-sm font-medium text-dark-300 mb-1">
                Room Name
              </label>
              <input
                id="roomName"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg py-2 px-3 text-white 
                          placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="My Awesome Room"
                required
              />
            </div>
            
            <div>
              <label htmlFor="roomDescription" className="block text-sm font-medium text-dark-300 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="roomDescription"
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg py-2 px-3 text-white 
                          placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="What's this room about?"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Create Room
            </Button>
          </div>
        </form>
      </Modal>

      {/* Join Room Modal */}
      <Modal isOpen={isJoinModalOpen} title="Join Room">
        <form onSubmit={handleJoinRoom}>
          <div className="space-y-4">
            <div>
              <label htmlFor="roomId" className="block text-sm font-medium text-dark-300 mb-1">
                Room ID
              </label>
              <input
                id="roomId"
                type="text"
                value={roomIdToJoin}
                onChange={(e) => setRoomIdToJoin(e.target.value)}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg py-2 px-3 text-white 
                          placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter room ID"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Join Room
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;