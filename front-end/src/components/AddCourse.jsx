import { Typography, Card, Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from '../config'
function AddCourse() {
    const [title, setName] = useState("");
    const [description, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [imageLink, setImagelink] = useState("")
    //const [published,setPublished] = useState(false)
    const navigate = useNavigate();
    return <div
        style={{ display: "flex", justifyContent: 'center', minHeight: '70vh', flexDirection: 'column' }}
    >
        <div style={{ display: "flex", justifyContent: 'center' }}>
            <Card varint={"outlined"} style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}>
 <TextField
                    style={{ marginBottom: 10 }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                    onChange={(e) => {
                        setName(e.target.value)
                    }}></TextField>
                <TextField
                    style={{ marginBottom: 10 }}
                    fullWidth={true}
                    label="Despription"
                    variant="outlined"
                    onChange={(e) => {
                        setDesc(e.target.value)
                    }}></TextField>
                <TextField
                    style={{ marginBottom: 10 }}
                    fullWidth={true}
                    label="Price"
                    variant="outlined"
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}></TextField>
                <TextField
                    style={{ marginBottom: 10 }}
                    fullWidth={true}
                    label="Image Link"
                    variant="outlined"
                    onChange={(e) => {
                        setImagelink(e.target.value)
                    }}></TextField>
                {/* <Typography variant="">Published</Typography>
            <TextField onChange={(e) => {
                setPublished(e.target.value)
            }}></TextField> */}
                <Button variant="contained" size="large" onClick={async() => {
                    const newCourse = {
                        title, description, price, imageLink,published:false
                    }
                    await axios.post(`${BASE_URL}/admin/addCourse`,newCourse,{
                        headers:{
                            'Authorization':'Bearer '+localStorage.getItem('token')
                        }
                    })
                    alert("Successfully added course")
                    navigate('/Admin/Courses')
                }}>Add course</Button>
            </Card>
        </div>
    </div>
}

export default AddCourse;