import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

const DEFAULT_AVATARS = [
  'https://images.pexels.com/photos/7519033/pexels-photo-7519033.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/7519052/pexels-photo-7519052.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/7519027/pexels-photo-7519027.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/7519036/pexels-photo-7519036.jpeg?auto=compress&cs=tinysrgb&w=300',
];

export const getRandomAvatar = () => {
  return DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];
};