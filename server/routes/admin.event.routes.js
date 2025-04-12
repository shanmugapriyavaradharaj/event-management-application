const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminevet.controller');
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage: storage })

// Event Type
router.post('/add-event-type', upload.array("images", 5),adminController.addEventType);


// Venue
router.post('/add-venue', upload.array("images", 3),adminController.addVenue);

// Accommodation
router.post('/add-accommodation', adminController.addAccommodation);

// Transportation
router.post('/add-transportation', adminController.addTransportation);
router.get('/event-type', adminController.getEventType);
router.get('/venue', adminController.getVenue);
router.get('/accommodation', adminController.getAccommodation);
router.get('/transportation', adminController.getTransportation);


module.exports = router;
