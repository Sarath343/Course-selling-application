import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResponssiveAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Profile />
      </Toolbar>
    </AppBar>)
}
function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  console.log("from profiel ")
  useEffect(() => {
    console.log("from profiel  from useeffer")
  const isLoggedIn = async () => {
      const user = await axios.get("http://localhost:4000/admin/me",
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          }
        })
        console.log("user | "+JSON.stringify(user.data))
      setUsername(user.data.username)
    }
    isLoggedIn()
    // if(localStorage.getItem('token'))
    // isLoggedIn()
    // else
    // setUsername(null)
  }, [])
  if (username) {

    return (
      <div> <Button variant='contained'
        onClick={() => {
          localStorage.setItem('token', null)
          window.location="/"
        }}
      >Logout</Button><p>{username}</p></div>
    )
  }
  return (
    <div>
      <Button
        variant='contained'
        onClick={() => {
          navigate('/Signup')
        }}>SignUP
        </Button>
      <Button
       variant='contained'
       onClick={() => {
         navigate('/Login')
       }}>SignIn</Button>

    </div>
  )

}

export default ResponssiveAppBar


