import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { Loading } from "./Loading";

const Course = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const init = async () => {
        console.log('from intn methode')
        const response = await axios.get(`${BASE_URL}/admin/getCourseById/` + courseId, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        })
        console.log(response.data.course)
        setCourse(response.data.course);
        setIsLoading(false);
    }
    useEffect(() => {
        init()
    }, [])
    if (isLoading)
        return <Loading />
    return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}  >
        <Card style={{
            margin: 10,
            width: 600,
            minHeight: 400,
            padding: 20
        }}>
            <Typography textAlign={'center'} variant="h5">{course.title}</Typography>
            <img alt="car pic" style={{ width: 300, maxHeight: 300 }} src={course.imageLink} />
            <Typography textAlign={'center'} variant="h5">{course.description}</Typography>
            <Typography variant="subtitle1" textAlign={"center"}>Price : {course.price}</Typography>
            <Button variant="contained" size="large" onClick={async  () => {
                await axios.post(`${BASE_URL}/user/addToCart`,{courseId:course._id},{
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem('token')
                }})
                navigate("/Courses")
                alert("item added to your cart")
            }}>Add to cart</Button>
        </Card></div>
}

export default Course; 