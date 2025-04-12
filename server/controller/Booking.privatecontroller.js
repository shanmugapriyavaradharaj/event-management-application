const Booking = require('../models/privateBooking');

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId eventType venue accommodation transportation');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId eventType venue accommodation transportation');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update booking status or details
exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
