const userModel = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const meetingModel=require('../models/MeetingSchema');
const { validate } = require('../models/EventSchema');
//encrypt password before saving
const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
//register user
const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await encryptPassword(password);
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//login user and make use of jwt
const Login = async (req, res) => {
    try {   
        const currentUser = await userModel.findOne({ email: req.body.email });
        // console.log(currentUser);
        if (currentUser) {
            const isPasswordCorrect = bcrypt.compareSync(
                req.body.password,
                currentUser.password
            );
            if (isPasswordCorrect) {
                const token = jwt.sign(
                    { id: currentUser._id },
                    process.env.JWT_SECRET,
                );
                res.cookie('token', token, {
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: 24 * 60 * 60 * 1000
                  });
                res.status(200).json({user:currentUser,message: "User Logged In", token });
            } else {
                res.status(400).json({ message: "Password is Incorrect" });
            }
        }
        else {
            res.status(400).json({ message: "User not found" });
        }
    }
    catch (err) {
        res.status(400).json({ message:"server error" });
    }
}



// to check whether the user is authenticated


const Validate = async (req,res) =>
{
    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await userModel.findById(payload.id);
        // console.log("validate",currentUser);
        if (!currentUser) {
            const err = new Error("User not found");
            err.status = 400;
            throw err;
        }
        else {
        // req.currentUser = currentUser;
        res.status(200).json({message:"Valid User"})
        }
    } catch (err) {
        res.status(400).json({ message: "undefined behaviour" });
    }
}
const filterUser = (user) => {
    const { password, __v,events,role, ...filteredUser } = user;
    return filteredUser;
}
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        const filteredUsers = users.map((user) => filterUser(user._doc));
        return res.status(200).json({
            success: true,
            data: filteredUsers
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const postMeetings=async(req,res)=>{
    try{
        const {createdBy,meetingid,meetingName,meetingType,invitedUsers,meetingDate,maxUsers,meetingStatus}=req.body;
        const meeting=await meetingModel.create({
            createdBy,
            meetingid,
            meetingName,
            meetingType,
            invitedUsers,
            meetingDate,
            maxUsers,
            meetingStatus,
        });
        return res.status(201).json({
            success:true,
            message:"Meeting created successfully",
            data:meeting,
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const getById=async(req,res)=>{
    try{
        // console.log(req.params.id)
        const meeting=await meetingModel.find({createdBy:req.params.id});
        if(!meeting){
            return res.status(404).json({
                success:false,
                message:"Meeting not found",
            })
        }
        return res.status(200).json({
            success:true,
            data:meeting,
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const patchById=async(req,res)=>{
    const id=req.params.id;
    const meeting=req.body;
    console.log(meeting)
    try{
        const data=await meetingModel.updateOne({meetingid:id},meeting)
        if(!data){
            return res.status(404).json({
                success:false,
                message:"Meeting not found",
            })
        }
        // console.log(data)
        return res.status(200).json({
            success:true,
            message:"Meeting updated successfully",
            data:data,
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const getByMeetId= async(req,res)=>{
    try{
        const meeting=await meetingModel.findOne({meetingid:req.params.id});
        if(!meeting){
            return res.status(404).json({
                success:false,
                message:"Meeting not found",
            })
        }
        return res.status(200).json({
            success:true,
            data:meeting,
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
const getInviteMeetings = async (req, res) => {
    try {
      const { id } = req.params; // Assuming you get the 'id' from the request parameters
        // console.log(id)
      // Find meetings where the 'invitedUsers' array contains the specified 'id'
      const meetings = await meetingModel.find({
        invitedUsers: { $in: [id] }
      });
    //   console.log(meetings)
      res.json({ data: meetings });
    } catch (error) {
    //   console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
module.exports = { Register, Login ,getAllUsers,postMeetings,getById,patchById,getByMeetId,getInviteMeetings};
