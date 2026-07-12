const multer = require("multer");
const path = require("path");

// Configure where uploaded files will be stored
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profile-images");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`;

        cb(null, uniqueName);
    }
});

// Allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only JPEG, PNG and WEBP images are allowed"
            ),
            false
        );
    }
};

// Configure Multer
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;