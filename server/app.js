import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import storyRoutes from './routes/storyRouter.js';
import userRoutes from './routes/userRouter.js';
import cookieParser from 'cookie-parser'
import credentials from './middleware/credentials.js';
import errorHandler from './middleware/errorHandler.js';
import corsOptions from './config/corsOptions.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));

app.use(credentials)
app.use(cors(corsOptions));
app.use(cookieParser())

app.use("/stories", storyRoutes);
app.use("/user", userRoutes)

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

const connectDB = async () => {

    try {
        await mongoose.connect(MONGO_URI);
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    } catch (err) {
        console.error("Connection to MongoDB failed", err.message);
    }
}

connectDB();

mongoose.connection.on("open", () => console.log("Connection to database has been established successfully"));
mongoose.connection.on("error", (err) => console.log(err));

app.all('*', (req, res) => {
    res.status(404);
    
    if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } 
});

app.use(errorHandler);