const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // if you have user login
  eventType: { type: mongoose.Schema.Types.ObjectId, ref: 'EventType' },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  accommodation: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation' },
  transportation: { type: mongoose.Schema.Types.ObjectId, ref: 'Transportation' },
  bookingDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  },
  payment: {
    method: String,
    transactionId: String,
    amount: Number,
    status: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' }
  }
});

module.exports = mongoose.model('PrivateBooking', BookingSchema);
