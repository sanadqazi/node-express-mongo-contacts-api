const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModule');

//@desc Register a user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const registeredUser = await User.findOne({ email });
    if (registeredUser) {
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
        console.log(`User created: `, user);
    } else {
        res.status(400);
        throw new Error("User data is invalid");
    }

    res.status(200).json({ message: "Register a user" });
});

//@desc Login a user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Email is not registered with us!");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({ "AccessToken: ": accessToken });
    } else {
        res.status(401);
        throw new Error("Login credentials are incorrect");
    }


});

//@desc Current user information
//@route GET /api/user/login
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser }