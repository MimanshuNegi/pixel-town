import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { UserCircle2, Plus, Gamepad2Icon, Mail, LogOut, Camera, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { supabase, getRandomAvatar } from '../lib/supabase';

function Dashboard() {
  const { profile, session, setProfile } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAvatarChange = async () => {
    if (isUpdatingAvatar || !session) return;
    
    setIsUpdatingAvatar(true);
    try {
      const newAvatarUrl = getRandomAvatar();
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', session.user.id);

      if (error) throw error;

      setProfile({ ...profile, avatar_url: newAvatarUrl });
    } catch (error) {
      console.error('Error updating avatar:', error);
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navigation */}
      <nav className="bg-dark-900 border-b border-dark-800 relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Gamepad2Icon className="h-6 w-6 text-primary-500" />
              <span className="font-display text-lg font-bold text-white">Pixel Town</span>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 group"
              >
                <span className="text-dark-200 group-hover:text-white">
                  {profile?.full_name}
                </span>
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <img
                    src={profile?.avatar_url}
                    alt={profile?.full_name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-dark-800 rounded-lg shadow-lg border border-dark-700 py-1 animate-fade-in z-50">
                  <div className="px-4 py-3 border-b border-dark-700">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="relative group">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img
                            src={profile?.avatar_url}
                            alt={profile?.full_name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <button
                          onClick={handleAvatarChange}
                          disabled={isUpdatingAvatar}
                          className="absolute inset-0 flex items-center justify-center bg-dark-900/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                        >
                          {isUpdatingAvatar ? (
                            <Loader2 size={16} className="text-white animate-spin" />
                          ) : (
                            <Camera size={16} className="text-white" />
                          )}
                        </button>
                      </div>
                      <div>
                        <p className="font-medium text-white">{profile?.full_name}</p>
                        <p className="text-xs text-dark-400">Click avatar to change</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-dark-300">
                      <Mail size={14} className="mr-1.5" />
                      <span className="truncate">{session?.user.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => useAuthStore.getState().signOut()}
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
      <main className="container mx-auto px-4 py-8 relative z-0">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display font-bold text-white">My Rooms</h1>
          <Button
            variant="primary"
            leftIcon={<Plus size={20} />}
            onClick={() => {/* We'll implement room creation later */}}
          >
            Create Room
          </Button>
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
              onClick={() => {/* We'll implement room creation later */}}
            >
              Create Your First Room
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* We'll add room cards here later */}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;