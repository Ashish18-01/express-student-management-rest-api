const express = require("express");

const {
    registerUser,
    loginUser,
    getProfile,
    uploadProfileImage
} = require("../controller/auth.controller");

const {
    protect
} = require("../middleware/auth.middleware");

const upload=require("../middleware/upload.middleware");

const router = express.Router();

router.post(
    "/register",
    registerUser
);

router.post(
    "/login",
    loginUser
);

router.get(
    "/profile",
    protect,
    getProfile
);

//upload Profile Image;
router.patch(
    "/profile/image",
    protect,
    upload.single("profileImage"),
    uploadProfileImage
);

module.exports = router;