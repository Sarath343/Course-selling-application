import { useEffect, useState } from "react"
import { BASE_URL } from "../config";
import axios from 'axios'
import { Button ,Typography,Card} from "@mui/material";

const Orders = () => {
    const [courses, setCourses] = useState([]);
    const init = async () => {
        const response = await axios.get(`${BASE_URL}/user/getPurchasedCourses`,{headers:{
            'Authorization':"Bearer "+localStorage.getItem('token')
        }});
        setCourses(response.data.courses);

    }
    useEffect(() => {
        init();
    }, [])
    return <div> <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}  >
    {courses.map(course => {
        return <Course course={course}   />
    })}
</div>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <Button variant="contained"   >Proceed and pay</Button></div>
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
        
    </Card>
}
export default Orders