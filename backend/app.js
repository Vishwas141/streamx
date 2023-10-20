const express = require("express");
const app = express();
const eventRoutes = require("./routes/Event");
const database = require("./config/database");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();



const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());

app.use(
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
)


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

