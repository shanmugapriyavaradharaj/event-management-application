const express = require('express');
const router = express.Router();
const bookingController = require('../controller/Booking.privatecontroller');

// Routes
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.get('/my-bookings/:id', bookingController.getMyAllBookings);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
