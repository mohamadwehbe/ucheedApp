import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export default function BasicSelect() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [student, setStudent] = useState('');
  const [course, setCourse] = useState('');
  const [registered,setRegistered] = useState(false);

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/courses").then(res=>{
      setCourses(res.data);
    }).catch((err) => console.log(err));
    axios.get("http://127.0.0.1:8000/api/students").then(res=>{
      setStudents(res.data);
    }).catch((err) => console.log(err));
  },[]);

  useEffect(()=>{
    if(registered) {
      setStudent('');
      setCourse('');
      setRegistered(false);
    }
  },[registered])

  const register = ()=>{
    if(student === '' || course === '')
      alert("fill all fields");
    else{
      const data = {
        student:student,
        course:course
      }
      axios.post("http://127.0.0.1:8000/api/registrations/add",data).then(res => {
          console.log(res.data);
          window.location.reload(false);
      }).catch((err) => console.log(err));
      setRegistered(true);
    }
  }

  return (
    <div style={{display:'flex',flexDirection:'row',alignItems:'center',padding:20}}>
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
    <Button style={{marginLeft:5}} onClick={register}><AddIcon fontSize='large'/><h2>Add</h2></Button>
    </div>
  );
}
