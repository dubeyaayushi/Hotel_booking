
// For routes
import authRoutes from "./routes/authRoute.js";  // Changed from auth.js to authRoute.js
import userRoutes from "./routes/userRoute.js"; // Changed from users.js to userRoute.js
// server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";

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