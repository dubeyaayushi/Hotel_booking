import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  guests: { 
    type: Number, 
    required: true,
    min: [1, 'At least 1 guest required']
  },
  checkInDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(date) {
        return date > new Date(); // Future date
      },
      message: 'Check-in date must be in the future'
    }
  },
  checkOutDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(date) {
        return date > this.checkInDate;
      },
      message: 'Check-out must be after check-in'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);