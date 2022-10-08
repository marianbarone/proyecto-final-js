import mongoose from "mongoose";
import dotenv from 'dotenv'
import logger from "../middlewares/logs.js";

dotenv.config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.URLMongo)
        logger.info(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        logger.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB

// mongoose.connect(process.env.URLMongo, (err, res) => {

//     if (err) throw err;
//     console.log("Base de datos MONGO conectada.");
// })