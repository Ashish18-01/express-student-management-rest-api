const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Check if user is logged in
const protect = async (req, res, next) => {
    try {
        let token;

        const authHeader = req.headers.authorization;

        if (
            authHeader &&
            authHeader.startsWith("Bearer ")
        ) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            res.status(401);

            throw new Error(
                "Access denied. Please login first"
            );
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(
            decoded.id
        );

        if (!user) {
            res.status(401);

            throw new Error(
                "User belonging to this token no longer exists"
            );
        }

        req.user = user;

        next();
    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            res.status(401);
        }

        next(error);
    }
};

// Check if user's role is allowed
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403);

            throw new Error(
                `Role '${req.user.role}' is not allowed to access this route`
            );
        }

        next();
    };
};

module.exports = {
    protect,
    authorize
};