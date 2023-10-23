const Event = require("../models/EventSchema");
const mongoose = require("mongoose");
const { uploadImageToCloudinary } = require("../common/CloudinaryConnect");
const MailSender = require("../common/MailSender");




const createEvent = async (req, res) =>
{
    try
    {
        console.log(req.files.posterImage);
         const image = await uploadImageToCloudinary(
        req.files.posterImage,
        "vishwas",
        1000,
        1000
        )
        console.log(image);
        req.body.posterImage = image.url;
        const createdEvent = await Event.create(req.body);
        console.log(createdEvent);

        return res.status(200).json({
            success: true,
            message:"Event created successfully"
        })

    }
    catch (err)
    {
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

// GETTING ALL EVENTS FROM DATABASE

const getAllEvent = async (req, res) =>
{
    try
    {
       
        const Events= await Event.find({});
        console.log(Events);

        return res.status(200).json({
            success: true,
            message: "Events taken successfully",
            data:Events
        })

    }
    catch (err)
    {
        return res.status(500).json({
            success: false,
            message: err.message,
            data:null,
        })
    }
}

//sending email to users of the website

const sendEmail = async (req, res) =>
{
    try
    {
        let ids = ["satarkar424@gmail.com", "nalawadevishwas14@gmail.com", "nalawadevishwas96@gmail.com"];
      
        console.log(req.body.eventName);
        for (let i = 0; i < ids.length; i++)
        {
            let response = await MailSender(ids[i],req.body);
            
        }

        return res.status(200).json({
            success: true,
            message:"Notification sent successfully"
        })
        

    }
    catch (err)
    {
        return res.status(500).json({
            success: false,
            message:err.message
        })

    }
}

module.exports = { createEvent, getAllEvent, sendEmail }