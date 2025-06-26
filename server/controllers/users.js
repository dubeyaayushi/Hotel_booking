import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';


// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    // Check if the requesting user is the owner or admin
    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to access this user`, 403));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    // Check if the requesting user is the owner or admin
    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to update this user`, 403));
    }

    // Prevent role escalation (non-admins can't make themselves admin)
    if (req.body.role && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to change roles`, 403));
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    // Check if the requesting user is the owner or admin
    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to delete this user`, 403));
    }

     await User.deleteOne({ _id: req.params.id });

    

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};