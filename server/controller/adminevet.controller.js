const { image } = require('qr-image');
const {
  EventType,
  Venue,
  Accommodation,
  Transportation
} = require('../models/admineventcraetion');

// POST - Add Event Type
exports.addEventType = async (req, res) => {
  try {
    const images = req.files.map((file) => "http://localhost:4000/" + file.path);
    const eventData = { ...req.body, images };
    const newEvent = new EventType(eventData);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET - All Event Types
exports.getEventType = async (req, res) => {
  try {
    const allEvents = await EventType.find();
    res.status(200).json(allEvents);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST - Add Venue
exports.addVenue = async (req, res) => {
  try {
    const images = req.files.map((file) => "http://localhost:4000/" + file.path);
    const newVenueData = { ...req.body, images };
    const newVenue = new Venue(newVenueData);
    await newVenue.save();
    res.status(201).json(newVenue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET - All Venues
exports.getVenue = async (req, res) => {
  try {
    const allVenues = await Venue.find();
    res.status(200).json(allVenues);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST - Add Accommodation
exports.addAccommodation = async (req, res) => {
  try {
    const newAccommodation = new Accommodation(req.body);
    await newAccommodation.save();
    res.status(201).json(newAccommodation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET - All Accommodations
exports.getAccommodation = async (req, res) => {
  try {
    const allAccommodations = await Accommodation.find();
    res.status(200).json(allAccommodations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST - Add Transportation
exports.addTransportation = async (req, res) => {
  try {
    const newTransport = new Transportation(req.body);
    await newTransport.save();
    res.status(201).json(newTransport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET - All Transportation
exports.getTransportation = async (req, res) => {
  try {
    const allTransports = await Transportation.find();
    res.status(200).json(allTransports);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
