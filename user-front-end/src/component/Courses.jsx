import { Card, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";


const Courses = () => {
    const [courses, setCourses] = useState([]);
    const init = async () => {
        const response = await axios.get(`${BASE_URL}/admin/getAllCourses`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        });
        setCourses(response.data.courses);
    }
    useEffect(() => {
        init()
    }, [])
    return <>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}  >
            {courses.map(course => {
                return <Course course={course} />
            })}


        </div>
    </>
}

const Course = ({ course }) => {
    const navigate = useNavigate();
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={'center'} variant="h5">{course.title}</Typography>
        <img alt="car pic" style={{ width: 300, maxHeight: 300 }} src={course.imageLink} />
        <Typography variant="subtitle1" textAlign={"center"}>Price : {course.price}</Typography>
        <Button variant="contained" size="large" onClick={() => {
            console.log(course._id);
            navigate("/Course/" + course._id)
        }}>View</Button>
    </Card>
}
export default Courses; 