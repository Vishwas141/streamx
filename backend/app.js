const express = require("express");
const app = express();
const eventRoutes = require("./routes/Event");
const cors = require("cors");
const router=require('./routes/AuthRoute')
require("dotenv").config();
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");


//use cookie-parse
app.use(cookieParser());

//for cloudinary connection
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//middlewares
app.use(express.json());

//removing cors errors
app.use(
	cors({
		origin:process.env.REACT_APP_BASE_URL,
		credentials:true,
		methods:['GET','POST','PUT','DELETE'],
	})
)

//apply endpoints to Auth Routes

app.use("/user", router);

//pply endpoints for events
app.use("/api/v1",eventRoutes);


//def route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

