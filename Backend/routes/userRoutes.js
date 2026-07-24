const express = require("express");

const {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser
} = require("../controller/userController");

const {
    protect,
    authorize
} = require("../middleware/auth.middleware");

const router = express.Router();

// Admin can view all users
router.get(
    "/",
    protect,
    authorize("admin"),
    getAllUsers
);

// Teacher and admin can view one user
router.get(
    "/:id",
    protect,
    authorize("teacher", "admin"),
    getUserById
);

// Admin can change user role
router.patch(
    "/:id/role",
    protect,
    authorize("admin"),
    updateUserRole
);

// Admin can delete user
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteUser
);

module.exports = router;