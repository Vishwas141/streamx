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
    try {   
        const currentUser = await userModel.findOne({ email: req.body.email });
        console.log(currentUser);
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
                res.status(200).json({ message: "User Logged In", token });
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
        res.status(400).json({ message: err.message });
    }
}

module.exports = { Register, Login ,Validate};