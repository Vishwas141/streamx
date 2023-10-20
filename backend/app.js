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

app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hello from server');
})
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})

