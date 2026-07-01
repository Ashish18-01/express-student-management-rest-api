const students=require("../data/students")
const sendResponse=require("../utils/response");

//GET ALL STUDENTS;

const getStudents=(req,res)=>{
    sendResponse(
        res,
        200,
        true,
        "All Students",
        students
    );
};

//getStudent by id
const getStudentById=(req,res)=>{
    const id=Number(req.params.id);
    const student=students.find(
        s=>s.id===id
    );
    if(!student){
        return sendResponse(
            res,
            404,
            false,
            "student not found"
        );
    }

    sendResponse(
        res,
        200,
        true,
        "student Found",
        student
    );
};

//SEARCCH

const searchStudents=(req,res)=>{
    const {course}=req.query;
    if(!course){
        return sendResponse(
            res,
            400,
            false,
            "please provide course"
        );
    }
    const result=students.filter(
        student=>
            student.course.toLowerCase()
        ===
        course.toLowerCase()

    );
    sendResponse(
        res,
        200,
        true,
        "Search Result",
        result
    );
};

//Add STUDENT
const addStudent=(req,res)=>{
    const {name,age,course}=req.body;
    const newStudent={
        id:students.length+1,
        name,
        age,
        course
    };
    students.push(newStudent);
    sendResponse(
        res,
        201,
        true,
        "Student Added",
        newStudent
    );
};

//UPDATE STUDENT
const updateStudent=(req,res)=>{
    const id =Number(req.params.id);
    const student=students.find(
        s=>s.id===id
    );

 if (!student) {

        return sendResponse(

            res,

            404,

            false,

            "Student Not Found"

        );

    }

    student.name = req.body.name;
    student.age = req.body.age;
    student.course = req.body.course;

    sendResponse(

        res,

        200,

        true,

        "Student Updated",

        student

    );

};


// DELETE STUDENT

const deleteStudent = (req, res) => {

    const id = Number(req.params.id);

    const index = students.findIndex(

        s => s.id === id

    );

    if (index === -1) {

        return sendResponse(

            res,

            404,

            false,

            "Student Not Found"

        );

    }

    const deleted = students.splice(index, 1);

    sendResponse(

        res,

        200,

        true,

        "Student Deleted",

        deleted

    );

};

module.exports={
    getStudents,
    getStudentById,
    searchStudents,
    addStudent,
    updateStudent,
    deleteStudent
};
