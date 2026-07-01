const express=require("express");
const router=express.Router();
const{
    getStudents,
    getStudentById,
    searchStudents,
    addStudent,
    updateStudent,
    deleteStudent
}=require("../controller/studentController");
const validateStudent=require("../middleware/validateStudent");

//GET ALL REQUEST;
router.get("/",getStudents);

//SEARCH USING QUERY PARAM
//examples:
///student/search?course=MERN
router.get("/search",searchStudents);

//getSTUDENT BY ID
//EXAMPLE:
// /STUDENT/2
router.get("/:id",getStudentById);

//add student
router.post("/",validateStudent,addStudent);

//update Student
router.put("/:id",validateStudent,updateStudent);

//delete student
router.delete("/:id",deleteStudent);

module.exports=router;