import express from 'express';
import {
  createBooking,
  getBookings,
  cancelBooking
} from '../controllers/bookingController.js';

const router = express.Router();

// POST /api/bookings - Create new booking
router.post('/', createBooking); 

// GET /api/bookings - Get all bookings (for admin)
router.get('/', getBookings);

// DELETE /api/bookings/:id - Cancel booking
router.delete('/:id', cancelBooking);

export default router;