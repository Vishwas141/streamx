const express = require("express");
const app = express();
const eventRoutes = require("./routes/Event");
const cors = require("cors");
const router=require('./routes/AuthRoute')
require("dotenv").config();
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
const PORT = process.env.PORT || 4000;

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

app.use(
	cors({
		origin:process.env.REACT_APP_BASE_URL,
		credentials:true,
	})
)

app.use("/user",router)
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

