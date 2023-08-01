import { useRecoilValue } from "recoil"
import {usernameSelector,userLoadingSelector} from '../store/selectors/userselector'
import{Button,Grid,Typography} from '@mui/material'
import { useNavigate } from "react-router-dom";
const Home = () =>{
const username = useRecoilValue(usernameSelector);
const userLoading = useRecoilValue(userLoadingSelector);
const navigate = useNavigate();
    return  <div>
    <Grid container style={{ padding: "5vw" }}>
      <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
              <Typography variant={"h2"}   >
                  Course Pool User
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
                                  navigate("/Signup")
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

export default Home ; 