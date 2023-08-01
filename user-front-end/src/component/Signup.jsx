import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/userstate";
import { Button, TextField, Grid, Typography, Card } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";
import { makeStyles } from '@mui/styles';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupcontainer } from "../classes";
const useStyles = makeStyles((theme) => ({
    signupcontainer
}));
const Signup = () => {
    const classes = useStyles();
    const setUser = useSetRecoilState(userState);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div >
            <Grid container className={classes.signupcontainer}>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant={"h6"} >
                    Welcome to our application. Sign up below
                </Typography>
                <div >
                    <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
                        <TextField fullWidth={true}
                            label="Email"
                            variant="outlined"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}></TextField>    <br /><br />
                        <TextField variant="outlined"
                            type={"password"}
                            label="Password" onChange={(e) => {
                                setPassword(e.target.value)
                            }}></TextField> <br /><br />
                        <Button  size={"large"}
                            variant="contained" 
                            onClick={async () => {
                            const response = await axios.post(`${BASE_URL}/user/signup`, { username, password });
                            localStorage.setItem('token', response.data.token);
                            navigate('/Courses')
                            setUser({
                                username, userLoading: false
                            })
                        }}>Signup</Button>
                    </Card></div></Grid></Grid>
    </div>
}
export default Signup; 