const Student = require("../models/student");
const sendResponse = require("../utils/response");

// GET ALL STUDENTS
const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find();

        sendResponse(
            res,
            200,
            true,
            "All Students",
            students
        );
    } catch (error) {
        next(error);
    }
};

// GET STUDENT BY ID
const getStudentById = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return sendResponse(
                res,
                404,
                false,
                "Student Not Found"
            );
        }

        sendResponse(
            res,
            200,
            true,
            "Student Found",
            student
        );
    } catch (error) {
        next(error);
    }
};

// SEARCH STUDENTS
const searchStudents = async (req, res, next) => {
    try {
        const { course } = req.query;

        if (!course) {
            return sendResponse(
                res,
                400,
                false,
                "Please provide course"
            );
        }

        const students = await Student.find({
            course: {
                $regex: course,
                $options: "i"
            }
        });

        sendResponse(
            res,
            200,
            true,
            "Search Result",
            students
        );

    } catch (error) {
        next(error);
    }
};

// ADD STUDENT (MongoDB)
const addStudent = async (req, res, next) => {
    try {
        const { name, age, course } = req.body;

        const student = await Student.create({
            name,
            age,
            course
        });

        sendResponse(
            res,
            201,
            true,
            "Student Added",
            student
        );

    } catch (error) {
        next(error);
    }
};

// UPDATE STUDENT
const updateStudent = async (req, res, next) => {
    try {
        const { name, age, course } = req.body;

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {
                name,
                age,
                course
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return sendResponse(
                res,
                404,
                false,
                "Student Not Found"
            );
        }

        sendResponse(
            res,
            200,
            true,
            "Student Updated",
            student
        );
    } catch (error) {
        next(error);
    }
};

// DELETE STUDENT
const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return sendResponse(
                res,
                404,
                false,
                "Student Not Found"
            );
        }

        sendResponse(
            res,
            200,
            true,
            "Student Deleted",
            student
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStudents,
    getStudentById,
    searchStudents,
    addStudent,
    updateStudent,
    deleteStudent
};