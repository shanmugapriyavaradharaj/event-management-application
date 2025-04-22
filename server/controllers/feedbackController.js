const Feedback = require('../models/Feedback');

// Create feedback
exports.createFeedback = async (req, res) => {
  try {
    const { bookingId, userId, rating, comment } = req.body;
    const newFeedback = new Feedback({ bookingId, userId, rating, comment });
    const saved = await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted', data: saved });
  } catch (error) {
    res.status(500).json({ message: 'Error adding feedback', error });
  }
};

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('userId bookingId');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error });
  }
};

// Get feedback by Booking ID
exports.getFeedbackByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const feedbacks = await Feedback.find({ bookingId }).populate('userId');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error });
  }
};

// Get feedback by User ID
exports.getFeedbackByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const feedbacks = await Feedback.find({ userId }).populate('bookingId');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error });
  }
};
