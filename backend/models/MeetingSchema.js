const mongoose=require('../config/database');
// createdBy: uid,
//         meetingid:meetingId,
//         meetingName:meetingName,
//         meetingType: "1-on-1",
//         invitedUsers: [selectedUser[0].uid],
//         meetingDate: startDate.format("L"),
//         maxUsers: 1,
//         status: true,
const meetingSchema=new mongoose.Schema({
    createdBy:{
        type:String,
        required:true,
    },
    meetingid:{
        type:String,
        required:true,
    },
    meetingName:{
        type:String,
        required:true,
    },
    meetingType:{
        type:String,
        required:true,
    },
    invitedUsers:{
        type:Array,
        required:true,
    },
    meetingDate:{
        type:Date,
        required:true,
    },
    maxUsers:{
        type:Number,
        required:true,
    },
    meetingStatus:{
        type:Boolean,
        required:true,
    },
});
const meetingModel=mongoose.model('Meeting',meetingSchema);
module.exports=meetingModel;