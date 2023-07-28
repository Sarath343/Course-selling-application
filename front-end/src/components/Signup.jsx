import { useState } from "react";
import axios from 'axios';
import { Card, Typography, Button, Container, TextField, Grid } from "@mui/material";
import '../App.css'
import { makeStyles } from '@mui/styles';
import { signupcontainer } from "../classes";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { BASE_URL } from "../config";
const useStyles = makeStyles((theme) => ({
    signupcontainer
}));
function Signup() {
    const classes = useStyles();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
const setUser = useSetRecoilState(userState)

    return (
        <div >
            <Grid container className={classes.signupcontainer}>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant={"h6"} >
                        Welcome to our application. Sign up below
                    </Typography>
                    <div >
                    <Card varint={"outlined"} style={{width: 400, padding: 20}}>
                        <TextField fullWidth={true}
                            label="Email"
                            variant="outlined"
                            onChange={(e) => { setUserName(e.target.value) }}></TextField>
                        <br /><br />
                        <TextField fullWidth={true}
                            label="Password"
                            variant="outlined"
                            type={"password"}
                            onChange={(e) => { setPassword(e.target.value) }}></TextField>
                        <br /><br />
                        <Button size={"large"}
                            variant="contained"
                            onClick={async () => {
                                console.log("usernamepassword " + username + " " + password)
                                const signup = await axios.post(`${BASE_URL}/admin/signup`, { username, password })
                                let data = signup.data;
                                localStorage.setItem("token", data.token);
                                setUser({userEmail:username,isLoading:false})
                                navigate('/Admin/Courses');

                            }}>Sign-up</Button>
                    </Card>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
export default Signup;