import axios from "axios";
import { useEffect, useState } from "react";


function AdminCourses() {
    console.log(localStorage.getItem('token'));
    const [courses, setCourses] = useState([])
    useEffect(() => {
        const fetchCourses = async () => {
            console.log(localStorage.getItem('token'));
            const data = await axios.get('http://localhost:4000/admin/getAllCourses', {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            //console.log(courses.data.courses);
            setCourses(data.data.courses);
        }
        fetchCourses();
    }, [])

    return (
        <div>
            <div>courseds </div>
            <div>{
                courses.map((element) => {
                    return <Course course = {element} />
                })
            }</div></div>
    )
}

function Course(props) {
    return (
        <div>
               {props.course.title}
        </div>
    )
}
export default AdminCourses;