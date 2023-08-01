import { Card, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";


function AdminCourses() {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        const fetchCourses = async () => {
            const data = await axios.get(`${BASE_URL}/admin/getAllCourses`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            setCourses(data.data.courses);
        }
        fetchCourses();
    }, [])

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}  >
            {courses.map((element) => {
                return <Course course={element} />
            })
            }</div>
    )
}
const Image = ({ src }) => {
    return <img src={src} alt="car pic" style={{ width: 300, maxHeight: 300 }} />
}
function Course({ course }) {
    const navigate = useNavigate();
    return (
        <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200,
            padding: 20
        }}>
            <Typography textAlign={'center'} variant="h5">{course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
            <Image src={course.imageLink} />
            <Typography variant="subtitle1" textAlign={"center"}>Price : {course.price}</Typography>
            <Button variant="contained" size="large" onClick={() => {
                console.log(course._id);
                navigate("/Admin/Courses/" + course._id)
            }}>Edit</Button>
        </Card>

    )
}
export default AdminCourses;