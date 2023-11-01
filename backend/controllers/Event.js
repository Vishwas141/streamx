const Event = require("../models/EventSchema");
const mongoose = require("mongoose");
const { uploadImageToCloudinary } = require("../common/CloudinaryConnect");
const MailSender = require("../common/MailSender");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const createEvent = async (req, res) => {
  try {
    // console.log(req.files.posterImage);
    const image = await uploadImageToCloudinary(
      req.files.posterImage,
      "vishwas",
      1000,
      1000
    );
    // console.log(image);
    req.body.posterImage = image.url;
    const createdEvent = await Event.create(req.body);
    // console.log(createdEvent);

    const token = req.cookies.token;
    // console.log("create", token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // Push the event ID to the user's events array
    await User.findByIdAndUpdate(userId, {
      $push: { events: createdEvent._id },
    });

    return res.status(200).json({
      success: true,
      message: "Event created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GETTING ALL EVENTS FROM DATABASE

const getAllEvent = async (req, res) => {
  try {
    const Events = await Event.find({});
    return res.status(200).json({
      success: true,
      message: "Events taken successfully",
      data: Events,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
};

// getting single detail of event

const getSingleDetail = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById({ _id: eventId });

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: err.message,
    });
  }
};
//sending email to users of the website

const sendEmail = async (req, res) => {
  try {
    let ids = [
      "satarkar424@gmail.com",
      "nalawadevishwas14@gmail.com",
      "saurabhsalunke91@gmail.com",
    ];

    const users = await User.find({}, "email");

    const emails = users.map((user) => user.email);

    for (let i = 0; i < emails.length; i++) {
      let response = await MailSender(emails[i], req.body);
    }

    return res.status(200).json({
      success: true,
      message: "Notification sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAdmin = async (req, res) => {
  try {
    // Extract the user's ID from the token
    const token = req.cookies.token;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // Find the user in the database and populate the events
    const user = await User.findById(userId).populate("events");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Extract event details into a separate array
    const eventDetails = user.events.map((event) => ({
      _id: event._id,
      eventName: event.eventName,
      eventDescription: event.eventDescription,
      registrationLink: event.registrationLink,
      registrationDate: event.registrationDate,
      closingDate: event.closingDate,
      venue: event.venue,
      organisation: event.organisation,
      modeOfConduction: event.modeOfConduction,
      posterImage: event.posterImage,
    }));

    return res.status(200).json({
      success: true,
      data: eventDetails,
      role:user.role
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// edit event

const editEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const image = await uploadImageToCloudinary(
      req.files.posterImage,
      "vishwas",
      1000,
      1000
    );
    // console.log(image);
    req.body.posterImage = image.url;
    const createdEvent = await Event.findByIdAndUpdate(
      { _id: eventId },
      req.body
    );
    console.log(createdEvent);

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    console.log("event", eventId);
    
    

    // Use the eventIdAsObjectId in the query
    const deletedEvent = await Event.deleteOne({ _id: eventId});

    console.log(deletedEvent);

    const token = req.cookies.token;
    console.log("token", token);
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // Update your $pop operation to remove the eventId from the events array
    await User.findByIdAndUpdate(userId, {
      $pull: { events: eventId},
    });

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getRole=

module.exports = {
  createEvent,
  getAllEvent,
  sendEmail,
  getSingleDetail,
  getAdmin,
    editEvent,
  deleteEvent
};
