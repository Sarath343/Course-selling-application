import { Typography, Card, Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AdminCourse() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    useEffect(() => {
        const getCourseById = async () => {
            const data = await axios.get('http://localhost:4000/admin/getCourseById/' + courseId,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                });
            console.log(data.data.course);
            setCourse(data.data.course);
        }
        getCourseById();
    }, [])
    if (course) {
        return (
            <Card>
                <GrayTopper title={course.title} />
                <Grid container>
                    <Grid item lg={8} md={12} sm={12}>
                        <UpdateCard course={course} setCourse={setCourse} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                        <CourseCard course={course} />
                    </Grid>
                </Grid>
            </Card>
        )
    }
    else {
        return <div div style={{ height: "100vh", justifyContent: "center", flexDirection: "column" }} >Loading. . . </div>
    }
}
function UpdateCard({ course, setCourse }) {
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [imageLink, setImage] = useState(course.imageLink);
    const [price, setPrice] = useState(course.price);
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>

            <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
                <div style={{ padding: 20 }}>
                    <Typography style={{ marginBottom: 10 }}>Update course details</Typography>
                    <TextField
                        value={title}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        fullWidth={true}
                        label="Title"
                        variant="outlined"
                    />
                    <TextField
                        value={description}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        fullWidth={true}
                        label="Description"
                        variant="outlined"
                    />
                    <TextField
                        value={imageLink}
                        onChange={(e)=>{
                            setImage(e.target.value)
                        }}
                        label="Image Link"
                        variant="outlined"
                        style={{marginBottom:10}}
                        fullWidth={true}
                    />
                    <TextField
                        value={price}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                        fullWidth={true}
                        label="Price"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        onClick={async () => {
                           await  axios.put("http://localhost:4000/admin/updateCourse/" + course._id, {
                                title: title,
                                description: description,
                                imageLink: imageLink,
                                published: true,
                                price
                            }, {
                                headers: {
                                    "Content-type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            });
                            let updatedCourse = {
                                _id: course._id,
                                title: title,
                                description: description,
                                imageLink: imageLink,
                                price
                            };
                            setCourse(updatedCourse);
                        }}
                    > Update course</Button>
                </div>
            </Card>
        </div>
    )
}
function GrayTopper({ title }) {
    return <div style={{ height: 250, background: "212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div>
                <Typography style={{ color: "white", fontWeight: 600 }} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}
function CourseCard({course}) {
   
    return <div style={{ display: "flex", marginTop: 50, justifyContent: "center", width: "100%" }}>
        <Card style={{
            margin: 10,
            width: 350,
            minHeight: 200,
            borderRadius: 20,
            marginRight: 50,
            paddingBottom: 15,
            zIndex: 2
        }}>
            <img src={course.imageLink} style={{ width: 350 }} ></img>
            <div style={{ marginLeft: 10 }}>
                <Typography variant="h5">{course.title}</Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                    Price
                </Typography>
                <Typography variant="subtitle1">
                    <b>Rs {course.price} </b>
                </Typography>
            </div>
        </Card>
    </div>
}

export default AdminCourse;