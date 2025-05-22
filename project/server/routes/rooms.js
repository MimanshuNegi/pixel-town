import express from 'express';
import Room from '../models/Room.js';
import User from '../models/User.js';

const router = express.Router();

// Get user's rooms (owned and joined)
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({
      $or: [
        { ownerId: req.userId },
        { members: req.userId }
      ]
    }).populate('ownerId', 'fullName avatarUrl');
    
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new room
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const room = new Room({
      name,
      description,
      ownerId: req.userId
    });
    
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Join a room
router.post('/:roomId/join', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.members.includes(req.userId)) {
      return res.status(400).json({ message: 'Already a member of this room' });
    }

    room.members.push(req.userId);
    await room.save();
    
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;