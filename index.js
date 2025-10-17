import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";

import fileUpload from "express-fileupload";
import {v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";




dotenv.config();
const app = express();
const port = 4001; // Force port 4001
const MONGO_URL = process.env.MONGO_URI;

// CORS configuration first
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY
});

//middleware

app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp"
})
);


//DB code
mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
//defining routes
app.use("/api/users",userRoute);
app.use("/api/blogs",blogRoute);


//Cloudinary
cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_SECRET_KEY,
    });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});