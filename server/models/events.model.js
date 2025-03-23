const mongoose = require('mongoose');


// Define a single schema for Event Management
const EventSchema = new mongoose.Schema({
    eventType: { type: String, required: true }, // Birthday, Marriage, etc.
    date: { type: Date, required: true },
    location: { type: String, required: true },
    
    // Accommodation Details
    roomType: { type: String }, // Deluxe, Standard, etc.
    roomSharing: { type: Number }, // No. of people sharing
    roomPrice: { type: Number },
    
    // Transportation Details
    transportType: { type: String }, // Train, Car, Bus, Airplane
    distance: { type: Number }, // In KM
    transportPrice: { type: Number },
    transportCategory: { type: String }, // VIP, Normal
    
    // Seating Arrangements
    seatingType: { type: String }, // VIP, Front Row, Back Row, Others
    seatingPrice: { type: Number },
    
    // Total Price
    totalPrice: { type: Number },
    images: { type: [String] }

}, { timestamps: true });   

const Event = mongoose.model('PraivateEvents', EventSchema);

module.exports = Event;