// SETUP - Import depencies and create app obj
import express from "express"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import middleware from "./middleware/mid.js"
import Router from "./controllers/routes.js"
const PORT = 3000;
// const PORT = process.env.PORT || 3000;

dotenv.config()
const mongoURI = process.env.mongoURI // Secret URI password and login


// CONNECT TO DATABASE
const db = mongoose.connection
mongoose.connect(mongoURI, {}, (err) => {
    console.log("MongoDB is ON");
})

const app = express()


// DECLARE MIDDLEWARE
middleware(app)

// DECLARE ROUTES AND ROUTERS
app.use("/", Router)

// SERVER LISTENER
app.listen(PORT, console.log("Server is ON"))
