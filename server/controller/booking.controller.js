const Booking = require('../models/Booking');
const Event = require('../models/events.model'); 
const {  sendBookingConfirmationmailForPrivateEvenetsEmail, sendStatusupdatedmail } = require('../utils/email');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { eventId, customerName, customerEmail, customerPhone, totalAmount } = req.body;

        const eventExists = await Event.findById(eventId);
        if (!eventExists) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const newBooking = new Booking({
            eventId,
            customerName,
            customerEmail,
            customerPhone,
            totalAmount
        });

        await newBooking.save();



        await sendBookingConfirmationmailForPrivateEvenetsEmail (customerEmail,newBooking)


        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('eventId', 'eventType date location totalPrice');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Get all bookings
exports.getmyAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({customerEmail:req.params.email});
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('eventId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });


         await sendStatusupdatedmail(booking.customerEmail,booking.status,booking.customerName,booking.customerEmail)

        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
