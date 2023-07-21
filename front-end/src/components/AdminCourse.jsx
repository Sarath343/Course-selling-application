import { Typography , Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AdminCourse() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    useEffect(() => {
        console.log("Bearer " + localStorage.getItem('token'))

        const getCourseById = async () => {
            const data = await axios.get('http://localhost:4000/admin/getCourseById/' + courseId,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                });
            console.log(data.data);
            setCourse(data.data);
        }
        getCourseById();
       

    }, [])

    return (
        <>        <div>Hi course  {courseId}</div>
            <Card>
                <Typography>{course}</Typography>
            </Card>
        </>
    )
}

export default AdminCourse;