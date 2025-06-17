const express = require('express');

const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
}  = require('../controllers/authController');
    const { protect } = require('../middleware/authMiddleware');
    const upload = require('../middleware/uploadMiddleware');
const router = express.Router();
// Route for user registration
router.post('/register', upload.single('profilePic'), registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for getting user information
router.get('/getUser', protect, getUserProfile);
// Route for updating user profile
router.put('/updateProfile', protect, upload.single('profilePic'), updateUserProfile);


module.exports = router;
