import { Typography, Card, Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../store/atoms/courseState";
import { courseTitleSelector, imageLinkSlector, isCourseLoadingSelector, courseDetailsSelector, coursePriceSelector } from "../store/selectors/course";
import { Loading } from "./Loading";


function AdminCourse() {
    const { courseId } = useParams();
    // const [course, setCourse] = useState(null);
    const setCourse = useSetRecoilState(courseState)
    const isCourseLoading = useRecoilValue(isCourseLoadingSelector);
    useEffect(() => {

        axios.get(`${BASE_URL}/admin/getCourseById/` + courseId,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(res => { 
                console.log("course in admincourse "+JSON.stringify(res.data.course))
                setCourse({ course: res.data.course, isCourseLoading: false }) })
            .catch(e => {
                setCourse({ course: null, isCourseLoading: false });

            })
    }, [])
    if (!isCourseLoading) {
        return (
            <Card>
                <GrayTopper />
                <Grid container>
                    <Grid item lg={8} md={12} sm={12}>
                        <UpdateCard />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                        <CourseCard />
                    </Grid>
                </Grid>
            </Card>
        )
    }
    else {
        return <Loading />
    }
}
function GrayTopper() {
    const title = useRecoilValue(courseTitleSelector);
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
function UpdateCard() {
    const [courseDetails, setCourse] = useRecoilState(courseState)

    console.log(courseDetails);
    const [title, setTitle] = useState(courseDetails.course.title);
    console.log(title)
    const [description, setDescription] = useState(courseDetails.course.description);
    const [imageLink, setImage] = useState(courseDetails.course.imageLink);
    const [price, setPrice] = useState(courseDetails.course.price);
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
                        onChange={(e) => {
                            setImage(e.target.value)
                        }}
                        label="Image Link"
                        variant="outlined"
                        style={{ marginBottom: 10 }}
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
                            await axios.put(`${BASE_URL}/admin/updateCourse/` + courseDetails.course._id, {
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
                                _id: courseDetails.course._id,
                                title: title,
                                description: description,
                                imageLink: imageLink,
                                price
                            };
                            setCourse({ isCourseLoading: false, course: updatedCourse });

                        }}
                    > Update course</Button>
                </div>
            </Card>
        </div>
    )
}

function CourseCard() {
    const title = useRecoilValue(courseTitleSelector);
    const imageLink = useRecoilValue(imageLinkSlector)
    console.log("imagelink "+imageLink)
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
            <img src={imageLink} style={{ width: 350 }} ></img>
            <div style={{ marginLeft: 10 }}>
                <Typography variant="h5">{title}</Typography>
                <Price />
           
            </div>
        </Card>
    </div>
}
function Price() {
    const price = useRecoilValue(coursePriceSelector);
    return <>
        <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
        </Typography><Typography variant="subtitle1">
            <b>Rs  {price}</b>
        </Typography>
    </>
}

export default AdminCourse;