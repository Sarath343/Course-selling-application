import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userEmailState } from '../store/selectors/userEmail';
import {isUserLoading} from '../store/selectors/isUserLoading'
import { userState } from '../store/atoms/user';
import { Loading } from './Loading';

function ResponssiveAppBar() {
  const navigate = useNavigate();
  const username = useRecoilValue(userEmailState)
  const isUser = useRecoilValue(isUserLoading)
  const setUser = useSetRecoilState(userState)
   if (isUser)
    return <Loading />
  if (username) {
 return <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: 4,
      zIndex: 1
    }}>
      <div style={{ marginLeft: 10,cursor: "pointer" }}
      onClick={()=>{
        navigate('/');
      }}>
        <Typography variant={"h6"}>Course Pool</Typography>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10, display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              onClick={() => {
                navigate("/Addcourse")
              }}
            >Add course</Button>
          </div>

          {/* <div style={{ marginRight: 10 }}>
            <Button
              onClick={() => {
                navigate("/Admin/Courses")
              }}
            >Courses</Button>
          </div> */}

          <Button
            variant={"contained"}
            onClick={() => {
              localStorage.setItem("token", null);
              navigate('/')
              setUser({
                isLoading:false,
                userEmail:null
               })
            }}
          >Logout</Button>
        </div>
        <p>{username}</p>
      </div>
    </div>
  }
  return <div style={{
    display: "flex",
    justifyContent: "space-between",
    padding: 4,
    zIndex: 1
  }}>
    <div style={{ marginLeft: 10 ,cursor: "pointer"}}
    onClick={()=>{
      navigate('/')
    }}>
      <Typography variant={"h6"}>Courses Pool</Typography>
    </div>

    <div style={{ display: "flex" }}>
      <div style={{ marginRight: 10 }}>
        <Button
          variant={"contained"}
          onClick={() => {
            navigate("/Signup")
          }}
        >Signup</Button>
      </div>
      <div>
        <Button
          variant={"contained"}
          onClick={() => {
           navigate('/Login')
          }}
        >Signin</Button>
      </div>
    </div>
  </div>


}

export default ResponssiveAppBar


