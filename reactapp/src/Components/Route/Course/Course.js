import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCourse from './AddCourse';
import axios from 'axios';

export default function BasicTable() {
  const [courses,setCourses] = useState([]);
  
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/courses").then(res=>{
      setCourses(res.data);
    }).catch((err) => console.log(err));
  },[]);

  const deleteC = (cid)=> {
    const data = { id : cid }
    axios.post("http://127.0.0.1:8000/api/courses/delete",data).then(res=>{
      console.log(res.data);
      window.location.reload(false);
    }).catch((err) => console.log(err));
  }

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',margin:20}}>
    <AddCourse/>
    <TableContainer component={Paper} style={{width:'80%',border:'3px solid #1976d2'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Course Code</TableCell>
            <TableCell align="center">Course Name</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow
              key={course.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{course.id}</TableCell>
              <TableCell align="center">{course.code}</TableCell>
              <TableCell align="center">{course.name}</TableCell>
              <TableCell align="center">
              <Button style={{marginRight:5}}><Link to={`edit/${course.id}`}><EditIcon/></Link></Button>
              <Button style={{marginLeft:5,color:'red'}} onClick={()=>deleteC(course.id)}><DeleteIcon/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
