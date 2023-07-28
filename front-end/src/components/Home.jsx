import { Button, Grid, Typography } from "@mui/material"
import { useRecoilValue } from "recoil"
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";
import { useNavigate } from "react-router-dom";

function Home() {
    const userLoading = useRecoilValue(isUserLoading);
    const username = useRecoilValue(userEmailState)
    const navigate = useNavigate();
  
    return <div>
          <Grid container style={{ padding: "5vw" }}>
            <Grid item xs={12} md={6} lg={6}>
                <div style={{ marginTop: 100 }}>
                    <Typography variant={"h2"}>
                        Course Pool Admin
                    </Typography>
                    <Typography variant={"h5"}>
                        A place to learn, earn and grow
                    </Typography>
                    {!userLoading && !username &&
                        <div style={{ display: "flex", marginTop: 20 }}>
                            <div style={{ marginRight: 10 }}>
                                <Button
                                    size={"large"}
                                    variant={"contained"}
                                    onClick={() => {
                                        navigate("/signup")
                                    }}
                                >Signup</Button>
                            </div>
                            <div>
                                <Button
                                    size={"large"}
                                    variant={"contained"}
                                    onClick={() => {
                                        navigate("/Login")
                                    }}
                                >Signin</Button>
                            </div>
                        </div>}
                </div>
                <div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
                <img src="https://img.freepik.com/free-photo/business-desk-arrangement-with-laptop-high-angle_23-2149073040.jpg" alt="courses_image" width={"100%"} />
            </Grid>
        </Grid>
    </div>
}
export default Home