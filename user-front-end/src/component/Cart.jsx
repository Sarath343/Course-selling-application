import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { Typography, Button, Card } from "@mui/material";

const Cart = () => {
    const [courses, setWishCourses] = useState([])
    const init = async () => {
        const response = await axios.get(`${BASE_URL}/user/getCart`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        setWishCourses(response.data.courses)
    }
    useEffect(() => {
        init();
    }, [])
    return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}  >
        {courses.map(course => {
            return <Course course={course} />
        })}
    </div>
}
const Course = ({ course }) => {
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={'center'} variant="h5">{course.title}</Typography>
        <img alt="car pic" style={{ width: 300, maxHeight: 300 }} src={course.imageLink} />
        <Typography textAlign={'center'} variant="h5">{course.description}</Typography>
        <Typography variant="subtitle1" textAlign={"center"}>Price : {course.price}</Typography>
        <Button variant="contained" size="large"
            onClick={() => {
                console.log(course._id);

            }}>Remove</Button>
    </Card>
}
export default Cart; 