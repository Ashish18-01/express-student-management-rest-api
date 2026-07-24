import { useEffect, useState } from "react";
import api from "../../services/api";

function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get("/students");
            setStudents(response.data.data);
        } catch (error) {
            console.log(error);
            alert("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    };

    const addStudent = async (e) => {
        e.preventDefault();

        try {
            await api.post("/students", {
                name,
                age,
                course
            });

            alert("Student Added Successfully");

            setName("");
            setAge("");
            setCourse("");

            fetchStudents();

        } catch (error) {
            console.log(error);
            alert("Failed to add student");
        }
    };

    const deleteStudent = async (id) => {
        try {
           await api.delete(`/students/${id}`);

           alert("Student Deleted Successfully");

           fetchStudents();

        } catch (error) {
            console.log(error);
             alert("Failed to delete student");
        }
    };
    const editStudent = (student) => {
    setEditingId(student._id);

    setName(student.name);
    setAge(student.age);
    setCourse(student.course);
    };

    const updateStudent = async (e) => {
    e.preventDefault();

    try {
        await api.put(`/students/${editingId}`, {
            name,
            age,
            course
        });

        alert("Student Updated Successfully");

        setEditingId(null);

        setName("");
        setAge("");
        setCourse("");

        fetchStudents();

    } catch (error) {
        console.log(error);
        alert("Failed to update student");
    }
};

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>Students</h1>

            <form onSubmit={editingId ? updateStudent : addStudent}>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                />
                

                <button type="submit">
                    {editingId ? "Update Student" : "Add Student"}
                </button>

            </form>

            <br />

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Course</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.course}</td>
                            <td>
                                <button
                                    onClick={() => editStudent(student)}
                                >
                                    Edit 
                                </button>

                                <button
                                    onClick={()=> deleteStudent(student._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Students;