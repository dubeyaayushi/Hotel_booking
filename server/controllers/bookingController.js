import Booking from '../models/Booking.js';
import { sendBookingEmail } from '../utils/emailService.js';

// Create booking
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    
    // Send confirmation email
    await sendBookingEmail(booking.email, {
      guests: booking.guests,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      fields: error.errors // Mongoose validation errors
    });
  }
};

// Get all bookings (admin)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};