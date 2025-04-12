const mongoose = require('mongoose');

const EventTypeSchema = new mongoose.Schema({
  eventType: String,
  decorationTheme: String,
  stageDecorationCost: Number,
  hallDecorationCost: Number,
  images: { type: [String] },
  totalCost: Number
});

const VenueSchema = new mongoose.Schema({
  venueName: String,
  location: String,
  capacity: Number,
  images:{ type: [String] },
  description: String,
  cost: Number
});

const AccommodationSchema = new mongoose.Schema({
  hotelName: String,
  location: String,
  roomType: String,
  stayDuration: String,
  cost: Number
});

const TransportationSchema = new mongoose.Schema({
  transportType: String,
  distance: String,
  category: String,
  price: Number
});

module.exports = {
  EventType: mongoose.model('EventType', EventTypeSchema),
  Venue: mongoose.model('Venue', VenueSchema),
  Accommodation: mongoose.model('Accommodation', AccommodationSchema),
  Transportation: mongoose.model('Transportation', TransportationSchema),
};
