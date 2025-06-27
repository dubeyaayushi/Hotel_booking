
// // For routes
// import authRoutes from "./routes/authRoute.js";  // Changed from auth.js to authRoute.js
// import userRoutes from "./routes/userRoute.js"; // Changed from users.js to userRoute.js
 
// // server.js
// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./configs/db.js";

// connectDB() /* calling the function to connect to the database */


// const app = express ()

// app.use(cors({
//   origin: 'http://localhost:5173', // Your frontend URL
//   credentials: true,               // Allow cookies/auth headers
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization']     // Allowed headers
// }));


// app.use(express.json());/* using express.json() to parse incoming JSON requests and put the parsed data in req.body */


//  //Enable Cors-origin Resource  Sharing
// app.use(cookieParser());


 
// // app.use(clerkMiddleware())/* using clerk middleware to authenticate the user */

// //API to listen Clerk Webhooks
// // app.use("/api/clerk", clerkWebhooks)


// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// app.get('/', (req,res) => res.send("API is Working fine"))


// const PORT = process.env.PORT || 3000;

// app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))

// export default app; // Export the app for testing or further configuration  


import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";

// Routes
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";

connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully!" });
});

// Error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; // Export the app for testing or further configuration
// This allows for easier testing and integration with other modules.