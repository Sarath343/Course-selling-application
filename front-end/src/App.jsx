import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import ResponssiveAppBar from './components/ResponssiveAppBar.jsx'
import AdminCourses from './components/AdminCourses.jsx'
import Home from './components/Home.jsx';
import AdminCourse from './components/AdminCourse.jsx';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { userState, useEffect } from './store/atoms/user.js';
import axios from 'axios';
function App() {

  return (
    <RecoilRoot>
      <div>
        <Router>
          <ResponssiveAppBar />
          <InitUser />
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/Login'} element={<Login />} />
            <Route path={'/Signup'} element={<Signup />} />
            <Route path={'/Admin/Courses'} element={<AdminCourses />}></Route>
            <Route path={'/Admin/Courses/:courseId'} element={<AdminCourse />}></Route>
            <Route path={'/Admin/Course/'} element={<AdminCourse />}></Route> </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}
const InitUser = () => {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/me', {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username
        })
      }
      else {
        setUser({
          isLoading: false,
          userEmail: null
        })
      }
    }
    catch (e) {
      setUser({
        isLoading: false,
        userEmail: null
      })
    }}
    useEffect(() => {
      init();
    }, []);
    return <></>
  
}
export default App;
