import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Registration from './Route/Registration/Registration';
import Edit from './Route/Registration/Edit';
import Student from './Route/Student/Student';
import EditStudent from './Route/Student/EditStudent';
import Course from './Route/Course/Course';
import EditCourse from './Route/Course/EditCourse';

export default function Nav() {
  return (
    <div>
        <Router>
            <Navbar/>
            <Routes>
                <Route exact path = '/' element={<Registration/>} />
                <Route path = '/student' element={<Student/>} />
                <Route path = '/course' element={<Course/>} />
                <Route path = '/edit/:id' element={<Edit/>} />
                <Route path = '/student/edit/:id' element={<EditStudent/>} />
                <Route path = '/course/edit/:id' element={<EditCourse/>} />
            </Routes>
        </Router>
    </div>
  );
}
