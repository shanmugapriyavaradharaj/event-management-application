const Event = require("../models/events.model");
const UserModel = require("../models/User");
const { sendEventLaunchforPrivate } = require("../utils/email");

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        
        console.log(req.files);
        

        const images = req.files.map((file) =>"http://localhost:4000/"+ file.path);
        const eventData = {
            ...req.body,
            images,
        };
        const event = new Event(eventData);
        await event.save();

        const user= await UserModel.find()
        user.map(async(user)=>{

            if(user.role="user"){
                await sendEventLaunchforPrivate(user.email,event)
            }


        }) 



        res.status(201).json({ success: true, message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ success: true, events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: "Event not found" });
        res.status(200).json({ success: true, event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) return res.status(404).json({ success: false, message: "Event not found" });
        res.status(200).json({ success: true, message: "Event updated successfully", event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: "Event not found" });
        res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
