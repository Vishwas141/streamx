const mongoose = require('../config/database');

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  registrationLink: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  closingDate: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  organisation: {
    type: String,
    required: true,
  },
  modeOfConduction: {
    type: String,
    required: true,
  },
  posterImage: {
    type: String, // Assuming you're storing the image as a Buffer
  },
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
