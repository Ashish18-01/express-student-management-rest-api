const User = require("../models/user");

// Get all users
// GET /api/v1/users
// ADMIN ONLY
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            count: users.length,
            data: {
                users
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get one user
// GET /api/v1/users/:id
// TEACHER AND ADMIN
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404);

            throw new Error("User not found");
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update user role
// PATCH /api/v1/users/:id/role
// ADMIN ONLY
const updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;

        const allowedRoles = [
            "student",
            "teacher",
            "admin"
        ];

        if (!role) {
            res.status(400);

            throw new Error("Role is required");
        }

        if (!allowedRoles.includes(role)) {
            res.status(400);

            throw new Error(
                "Role must be student, teacher or admin"
            );
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404);

            throw new Error("User not found");
        }

        user.role = role;

        await user.save();

        res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
};

// Delete user
// DELETE /api/v1/users/:id
// ADMIN ONLY
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404);

            throw new Error("User not found");
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser
};