const User = require("../models/user");
const generateToken = require("../utils/generateToken");

// REGISTER USER
// POST /api/v1/auth/register
// PUBLIC
const registerUser = async (req, res, next) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        if (!username || !email || !password) {
            res.status(400);

            throw new Error(
                "Username, email and password are required"
            );
        }

        const existingEmail = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingEmail) {
            res.status(409);

            throw new Error(
                "User with this email already exists"
            );
        }

        const existingUsername = await User.findOne({
            username
        });

        if (existingUsername) {
            res.status(409);

            throw new Error(
                "Username already exists"
            );
        }

        const user = await User.create({
            username,
            email,
            password
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

// LOGIN USER
// POST /api/v1/auth/login
// PUBLIC
const loginUser = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            res.status(400);

            throw new Error(
                "Email and password are required"
            );
        }

        const user = await User
            .findOne({
                email: email.toLowerCase()
            })
            .select("+password");

        if (!user) {
            res.status(401);

            throw new Error(
                "Invalid email or password"
            );
        }

        const isPasswordCorrect =
            await user.comparePassword(password);

        if (!isPasswordCorrect) {
            res.status(401);

            throw new Error(
                "Invalid email or password"
            );
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

// GET PROFILE
// GET /api/v1/auth/profile
// PRIVATE
const getProfile = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: {
                user: {
                    id: req.user._id,
                    username: req.user.username,
                    email: req.user.email,
                    role: req.user.role,
                    createdAt: req.user.createdAt
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};