const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController.js');

// Add feedback
router.post('/', feedbackController.createFeedback);

// Get all feedbacks
router.get('/', feedbackController.getAllFeedbacks);

// Get feedback by booking ID
router.get('/booking/:bookingId', feedbackController.getFeedbackByBooking);

// Get feedback by user ID
router.get('/user/:userId', feedbackController.getFeedbackByUser);

// Delete feedback
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
