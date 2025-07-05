import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;
    //   console.log("Headers:", req.headers);
    // Check if the token is in the headers

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        //  console.log("Token extracted:", token);
    }
    
    if (!token) {
        // console.log("No token found"); 
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded token:", decoded); // Debug: Check decoded token
        req.user = await User.findById(decoded.id);
        // req.user = user;
        next();
    } catch (error) {
        //  console.log("Token verification failed:", error.message);
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `User role ${req.user.role} is not authorized to access this route` 
            });
        }
        next();
    };
};