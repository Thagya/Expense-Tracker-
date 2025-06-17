const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

exports.registerUser = async (req, res) => {
try {
    const { fullName, email, password } = req.body;     
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const peofilePic = req.file ? req.file.filename : " ";

    const user = new User({
        fullName,
        email,
        password: hashedPassword,
        profileImageUrl: peofilePic
    });

    const token = jwt.sign(({ id: user._id }), process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profilePic,
        token,
    });
} catch (error) {
    res.status(500).json({
        message: 'Server error',
        error: error.message,
    });
}
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};
exports .loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //find user by email
        const user = await User.findOne({ email });

        //check password
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        //Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        // Return user data and token
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            token,
            message: 'Login successful',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        }); 
    }
};  
exports.updateUserProfile = async (req, res) => {
    try {
     const user = await User.findById(req.user.id);
     if (!user) {
         return res.status(404).json({ message: 'User not found' });
     }

      user.fullName = req.body.fullName || user.fullName;
     user.email = req.body.email || user.email;
        if(req.req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }
    //Update profile picture if provided
        if (req.file) {
            user.profilePic = req.file.filename;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};
