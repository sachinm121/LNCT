const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_DB, {

    })
    .then(() => console.log("Database connected successfully"))
    .catch((error) => {
        console.log("Database connection failed");
        // confirm.error(error)
        process.exit(1)
    })
}