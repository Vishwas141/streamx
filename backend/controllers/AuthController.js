const userModel = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const data=req.body;
    const user=await userModel.find({email:data.email});
    console.log(user);
    if(!user){
        return res.status(400).json({
            success:false,
            message:'User not found'
        })
    }
    try{
        console.log(data.password,user[0].password);
    bcrypt.compare(data.password,user[0].password,async (err,isMatch)=>{
        if(isMatch){
            const token=jwt.sign({
                name:user[0].name,
                email:user[0].email,
                id:user[0]._id,
            },process.env.JWT_SECRET,{
                expiresIn:'7d',
            })
            res.cookie('token',token,{
                httpOnly:true,
                secure:true,
            })
            return res.status(200).json({
                success:true,
                message:'User logged in successfully',
                data:token,
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:'Incorrect password'
            })
        }
    })
}
catch(err){
    return res.status(500).json({
        success:false,
        message:err.message
    })
}
}



// to check whether the user is authenticated


const Validate = async (req,res) =>
{
    try
    {
      const token = req.cookies.token;
      console.log("token", token);
        if (!token)
        {
            return res.status(404).json({
                success: false,
                message:"User Not Found"
           })
        }
        const decode =jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        console.log(decode);


        return res.status(200).json({
            success: true,
            data:decode
        })
    }
    catch (err)
    {
        return res.status(500).json({
            success: false,
            message:"Credentials could not be decoded"
        })
    }
}

module.exports = { Register, Login ,Validate};