const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"]
    },

    email: {
        type: String,
        required: [true, "Please enter user email"],
        unique: [true, "Email has already taken"]
    },

    password: {
        type: String,
        required: [true, "Please enter user password"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);

