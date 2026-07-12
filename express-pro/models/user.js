const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            minlength: [
                3,
                "Username must be at least 3 characters"
            ],
            maxlength: [
                30,
                "Username cannot exceed 30 characters"
            ]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [
                6,
                "Password must be at least 6 characters"
            ],
            select: false
        },

        role: {
            type: String,
            enum: ["student", "teacher", "admin"],
            default: "student"
        },
        profileImage: {
          type: String,
         default: null
}
    },
    {
        timestamps: true
    }
);

// Hash password before saving
userSchema.pre("save", async function () {

    // If password is not changed, do not hash it again
    if (!this.isModified("password")) {
        return;
    }

    // Generate salt
    const salt = await bcrypt.genSalt(12);

    // Hash password
    this.password = await bcrypt.hash(
        this.password,
        salt
    );
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (
    enteredPassword
) {
    return await bcrypt.compare(
        enteredPassword,
        this.password
    );
};

module.exports = mongoose.model("User", userSchema);