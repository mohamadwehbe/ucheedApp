import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

export default function TextFieldSizes() {
  const [code,setCode] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [fatherName,setFatherName] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [dateOfBirth,setDateOfBirth] = useState('');
  const [updated,setUpdated] = useState(false);
  const [student,setStudent] = useState({});
  const id = useState(useParams());
  const sid = id[0].id; 
  const navigate = useNavigate();

  useEffect(()=>{
      if(updated) {
          navigate('/student');
      }
  })

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/students/show/${sid}`).then(res=>{
      setStudent(res.data);
    }).catch((err) => console.log(err));
  },[sid])


  const updateStudent = ()=>{
    if(code === "" ||firstName === "" || fatherName === "" || lastName === "" || 
    phone === "" || email === "" || password === "" || dateOfBirth === "") {
     alert("fill all fields");
    }
    else {
        const data = {
        id:sid,
        code:code,firstName:firstName,fatherName:fatherName,
        lastName:lastName,phone:phone,email:email,
        password:password,dateOfBirth:dateOfBirth
        }
        axios.post("http://127.0.0.1:8000/api/students/update",data).then(res => {
            console.log(res.data);
            window.location.reload(false);
        }).catch((err) => console.log(err));
        setUpdated(true);
    }
  }

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',margin:20}}>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',margin:20}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',}}>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        {student.code}
        <TextField
          label="New Code"
          value={code}
          onChange={e=>setCode(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        {student.firstName}
        <TextField
          label="New First Name"
          value={firstName}
          onChange={e=>setFirstName(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        {student.fatherName}
        <TextField
          label="New Father Name"
          value={fatherName}
          onChange={e=>setFatherName(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        {student.lastName}
        <TextField
          label="New Last Name"
          value={lastName}
          onChange={e=>setLastName(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',margin:0.5}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        {student.phone}
      <TextField
          label="New Mobile Number"
          value={phone}
          onChange={e=>setPhone(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        {student.email}
        <TextField
          label="New Email Address"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        {student.password}
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        {student.dateOfBirth}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="New Date of birth"
            value={dateOfBirth}
            onChange={(newDate) => {
              setDateOfBirth(newDate.toString().slice(4,15));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </div>
      </div>
      </div>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
      <Button onClick={updateStudent}><SaveIcon/><h3>Save</h3></Button>
      <Button><Link to={'/student'} style={{display:'flex',flexDirection:'row',alignItems:'center'}}><CancelIcon/><h3>Cancel</h3></Link></Button>
      </div>
      </div>
    </Box>
    </div>
  );
}