import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
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
  const [added,setAdded] = useState(false);

  useEffect(()=>{
    if(added) {
      setCode('');
      setFirstName('');
      setFatherName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setDateOfBirth('');
      setAdded(false);
    }
  },[added])

  const addStudent = ()=>{
    if(code === "" ||firstName === "" || fatherName === "" || lastName === "" || 
       phone === "" || email === "" || password === "" || dateOfBirth === "") {
        alert("fill all fields");
    }
    else {
        const data = {
          code:code,firstName:firstName,fatherName:fatherName,
          lastName:lastName,phone:phone,email:email,
          password:password,dateOfBirth:dateOfBirth
        }
        axios.post("http://127.0.0.1:8000/api/students/add",data).then(res => {
            console.log(res.data);
            window.location.reload(false);
        }).catch((err) => console.log(err));
        setAdded(true);
    }
  }

  return (
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
      <TextField
          label="Student Code"
          value={code}
          onChange={e=>setCode(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        <TextField
          label="First Name"
          value={firstName}
          onChange={e=>setFirstName(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        <TextField
          label="Father Name"
          value={fatherName}
          onChange={e=>setFatherName(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={e=>setLastName(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
      </div>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',margin:0.5}}>
      <TextField
          label="Mobile Phone Number"
          value={phone}
          onChange={e=>setPhone(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        <TextField
          label="Email Address"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of birth"
            value={dateOfBirth}
            onChange={(newDate) => {
              setDateOfBirth(newDate.toString().slice(4,15));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      </div>
      <Button style={{marginRight:5}} onClick={addStudent}><AddIcon fontSize='large'/><h2>Add</h2></Button>
      </div>
    </Box>
  );
}
