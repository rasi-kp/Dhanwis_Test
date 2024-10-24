const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
    mobileno: {
        type: String,
    },
    otp: {
        type: String,
    },
});

// Export the User model
module.exports = mongoose.model('Otp', userSchema);
