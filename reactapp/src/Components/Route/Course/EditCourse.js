import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

export default function TextFieldSizes() {
  const [code,setCode] = useState('');
  const [name,setName] = useState('');
  const [updated,setUpdated] = useState(false);
  const [course,setCourse] = useState({});
      const id = useState(useParams());
  const cid = id[0].id; 
  const navigate = useNavigate();

  useEffect(()=>{
      if(updated) {
          navigate('/course');
      }
  })

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/courses/show/${cid}`).then(res=>{
      setCourse(res.data);
    }).catch((err) => console.log(err));
  },[cid])

  const updateCourse = ()=>{
    if(code === "" ||name === "") {
     alert("fill all fields");
    }
    else {
        const data = {
            id:cid,
            code:code,
            name:name,
        }
        axios.post("http://127.0.0.1:8000/api/courses/update",data).then(res => {
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
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        {course.code}
        <TextField
          label="New Code"
          value={code}
          onChange={e=>setCode(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        {course.name}
        <TextField
          label="New Name"
          value={name}
          onChange={e=>setName(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        </div>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
      <Button onClick={updateCourse}><SaveIcon/><h3>Save</h3></Button>
      <Button><Link to={'/course'} style={{display:'flex',flexDirection:'row',alignItems:'center'}}><CancelIcon/><h3>Cancel</h3></Link></Button>
      </div>
      </div>
    </Box>
    </div>
  );
}
