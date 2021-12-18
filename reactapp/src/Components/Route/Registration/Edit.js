import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

export default function TextFieldSizes() {
  const [courses,setCourses] = useState([]);
  const [students,setStudents] = useState([]);
  const [course,setCourse] = useState('');
  const [student,setStudent] = useState('');
  const [updated,setUpdated] = useState(false);
  const id = useState(useParams());
  const rid = id[0].id; 
  const navigate = useNavigate();
  const [stdname,setStdname] = useState('');
  const [crnamecode,setCrnamecode] = useState('');

  useEffect(()=>{
      if(updated) {
          navigate('/');
      }
  })

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/registrations/show/${rid}`).then(res=>{
      setStdname(res.data.student.firstName + " " + res.data.student.fatherName + " " + res.data.student.lastName);
      setCrnamecode(res.data.course.name + "(" + res.data.course.code + ")");
    }).catch((err) => console.log(err));
  },[rid])

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/courses").then(res=>{
      setCourses(res.data);
    }).catch((err) => console.log(err));
    axios.get("http://127.0.0.1:8000/api/students").then(res=>{
      setStudents(res.data);
    }).catch((err) => console.log(err));
  },[]);

  const updateStudent = ()=>{
    if(student === "" ||course === "") {
     alert("fill all fields");
    }
    else {
        const data = {
        id:rid,
        course:course,
        student:student
        }
        axios.post("http://127.0.0.1:8000/api/registrations/update",data).then(res => {
            console.log(res.data);
            window.location.reload(false);
        }).catch((err) => console.log(err));
        setUpdated(true);
    }
  }

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',margin:20}}>
    <div style={{display:'flex',flexDirection:'row',alignItems:'center',margin:20}}>
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
    {stdname}
    <Box sx={{ minWidth: 200,marginRight:2,border:'1px solid #1976d2',borderRadius:1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Students</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={student}
          label="Students"
          onChange={e=>setStudent(e.target.value)}
        >
          {students.map((student)=> (
            <MenuItem value={student.id}>{student.firstName} {student.fatherName} {student.lastName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      {crnamecode}
      <Box sx={{ minWidth: 200,marginLeft:2,border:'1px solid #1976d2',borderRadius:1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Courses</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={course}
          label="Courses"
          onChange={e=>setCourse(e.target.value)}
        >
          {courses.map((course)=> (
            <MenuItem value={course.id}>{course.name} ({course.code})</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    </div>
    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
    <Button onClick={updateStudent}><SaveIcon/><h3>Save</h3></Button>
    <Button><Link to={'/'} style={{display:'flex',flexDirection:'row',alignItems:'center'}}><CancelIcon/><h3>Cancel</h3></Link></Button>
    </div>
    </div>
    </div>
  );
}
