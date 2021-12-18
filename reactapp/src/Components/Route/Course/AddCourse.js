import React, {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export default function TextFieldSizes() {
  const [code,setCode] = useState('');
  const [name,setName] = useState('');
  const [added,setAdded] = useState(false);

  useEffect(()=>{
    if(added) {
      setCode('');
      setName('');
      setAdded(false);
    }
  },[added])

  const addCourse = ()=>{
    if(code === "" ||name === "") {
        alert("fill all fields");
    }
    else {
        const data = {
          code:code,
          name:name
        }
        axios.post("http://127.0.0.1:8000/api/courses/add",data).then(res => {
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
        <TextField
          label="Course Code"
          id="outlined-size-small"
          size="small"
          value={code}
          onChange={e=>setCode(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        <TextField
          label="Course Name"
          id="outlined-size-small"
          size="small"
          value={name}
          onChange={e=>setName(e.target.value)}
          style={{border:'1px solid #1976d2',borderRadius:5}}
        />
        <Button style={{marginRight:5}} onClick={addCourse}><AddIcon fontSize='large'/><h2>Add</h2></Button>
      </div>
    </Box>
  );
}
