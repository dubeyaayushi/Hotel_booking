import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// @desc    Register user
export const register = async (req, res) => {
    try {
        const { username, email, password, image, role } = req.body;
        
        const user = await User.create({
            _id: new mongoose.Types.ObjectId().toString(),
            username,
            email,
            password,
            image,
            role: role || 'user'
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                image: user.image,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        const token = generateToken(user._id);
        
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                image: user.image,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get current user
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                image: user.image,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};