import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import ResponssiveAppBar from './components/ResponssiveAppBar.jsx'
import AdminCourses from './components/AdminCourses.jsx'
import Home from './components/Home.jsx';
import AdminCourse from './components/AdminCourse.jsx';
function App() {

  return (
    <div>
      <Router>
        <ResponssiveAppBar />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/Login'} element={<Login />} />
          <Route path={'/Signup'} element={<Signup />} />
          <Route path={'/Admin/Courses'} element={<AdminCourses />}></Route>
          <Route path={'/Admin/Courses/:courseId'} element={<AdminCourse />}></Route>
          <Route path={'/Admin/Course/'} element={<AdminCourse />}></Route> </Routes>
      </Router>
    </div>

  );
}

export default App;
