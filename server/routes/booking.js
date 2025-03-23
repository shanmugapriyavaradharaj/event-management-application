const express = require('express');
const router = express.Router();
const bookingController = require('../controller/booking.controller');

// Create a new booking
router.post('/bookings', bookingController.createBooking);

// Get all bookings
router.get('/bookings', bookingController.getAllBookings);

// Get a booking by ID
router.get('/bookings/:id', bookingController.getBookingById);

// Update booking status
router.put('/bookings/:id', bookingController.updateBookingStatus);

// Delete a booking
router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = router;
