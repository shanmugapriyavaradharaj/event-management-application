const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'PraivateEvents', required: true }, // Reference to Event
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now }, // Date of booking
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }, // Booking status
    totalAmount: { type: Number, required: true }
}, { timestamps: true });

const Booking = mongoose.model('Bookings', BookingSchema);

module.exports = Booking;
