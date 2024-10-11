const express = require("express");
const app = express();
const path = require("path")

// Import Routes
const userRoutes = require("./routers/User");
const companyRoutes = require("./routers/Company")

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const {cloudniaryConnect} = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

app.use(cors({
    origin: "http://lnct-campus.vercel.app",
    credentials: true,
}))

dotenv.config();
const PORT = process.env.PORT;

// Database connectivity
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/"
// }))

cloudniaryConnect();

// Route mount
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/company", companyRoutes)

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Home Page"
    })
})



app.listen(PORT, (error) => {
    console.log(`Server is running on port ${PORT}`)
})