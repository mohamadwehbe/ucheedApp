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
import AddStudent from './AddStudent';
import axios from 'axios';

export default function BasicTable() {
  const [students,setStudents] = useState([]);

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/students").then(res=>{
      setStudents(res.data);
    }).catch((err) => console.log(err));
  },[]);

  const deleteS = (sid)=> {
    const data = { id : sid }
    axios.post("http://127.0.0.1:8000/api/students/delete",data).then(res=>{
      console.log(res.data);
      window.location.reload(false);
    }).catch((err) => console.log(err));
  }
  
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',margin:20}}>
    <AddStudent/>
    <TableContainer component={Paper} style={{width:'100%',border:'3px solid #1976d2'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>ID</TableCell>
            <TableCell align="center">Student Code</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Father Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Mobile Phone Number</TableCell>
            <TableCell align="center">Email Address</TableCell>
            <TableCell align="center">Date of birth</TableCell>
            <TableCell align="center">Date Created</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{student.id}</TableCell>
              <TableCell align="center">{student.code}</TableCell>
              <TableCell align="center">{student.firstName}</TableCell>
              <TableCell align="center">{student.fatherName}</TableCell>
              <TableCell align="center">{student.lastName}</TableCell>
              <TableCell align="center">{student.phone}</TableCell>
              <TableCell align="center">{student.email}</TableCell>
              <TableCell align="center">{student.dateOfBirth}</TableCell>
              <TableCell align="center">{student.created_at}</TableCell>
              <TableCell align="center">
              <Button style={{marginRight:5}}><Link to={`edit/${student.id}`}><EditIcon/></Link></Button>
              <Button style={{marginLeft:5,color:'red'}} onClick={()=>deleteS(student.id)}><DeleteIcon/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
