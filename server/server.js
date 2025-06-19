/* creating our basic server */

import express from "express"
import "dotenv/config"/* using this we can use our environmental variables */

import cors  from "cors";/* cors will allow to connect any Backend with the frontend */
// import { clerkMiddleware } from '@clerk/express'/* importing clerk middleware to use clerk authentication */

import cookieParser from "cookie-parser";

import connectDB from "./configs/db.js"; /* importing the function that will connect us to the database */

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

// import clerkWebhooks from "./controllers/clerkWebhooks.js"; /* importing the clerk webhooks controller to handle clerk webhooks */
dotenv.config(); // Loads .env variables

connectDB() /* calling the function to connect to the database */


const app = express ()
app.use(cors()) //Enable Cors-origin Resource  Sharing
app.use(cookieParser());

app.use(express.json()) /* using express.json() to parse incoming JSON requests and put the parsed data in req.body */

 
// app.use(clerkMiddleware())/* using clerk middleware to authenticate the user */

//API to listen Clerk Webhooks
// app.use("/api/clerk", clerkWebhooks)


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req,res) => res.send("API is Working fine"))


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))

export default app; // Export the app for testing or further configuration