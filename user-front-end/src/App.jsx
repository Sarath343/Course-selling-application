

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './component/Home.jsx'
import Login from './component/Login.jsx'
import Signup from './component/Signup.jsx'
import Courses from './component/Courses.jsx'
import Cart from './component/Cart.jsx'
import Course from './component/Course.jsx'
import Appbar from './component/Appbar.jsx'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import { userState } from './store/atoms/userstate.js'
import { BASE_URL } from '../src/config.js'
import Menubar from './component/Menubar.jsx'
import Orders  from './component/Orders.jsx'
import axios from 'axios'
function App() {
  return <RecoilRoot>
    <Router>
      <InitUser />
      <Appbar />
      <Menubar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Courses' element={<Courses />} />
        <Route path='/Course/:courseId' element={<Course />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Orders' element={<Orders/>}></Route>
      </Routes>
    </Router>
  </RecoilRoot>
}
const InitUser = () => {
  const setUser = useSetRecoilState(userState)
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`,
        {
          headers: {
            'Authorization': "Beaer " + localStorage.getItem('token')
          }
        }
      )
      if (response.data.username)
        setUser({
          username: response.data.username,
          userLoading: false
        })
      else
        setUser({
          username: null,
          userLoading: false
        })
    }
    catch (e) {
      setUser({
        userLoading: false,
        username: null
      })
    }
  }
  useEffect(() => {
    init();
  }, [])
  return <></>
}
export default App;
