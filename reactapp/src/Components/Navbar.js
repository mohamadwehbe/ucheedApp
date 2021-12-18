import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from 'react-router-dom';

const ResponsiveAppBar = () => {
  const linkStyle = {marginRight : 30};

  return (
    <div>
    <AppBar position="static" style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Typography variant="h5" noWrap style={{marginLeft:20}}>
            Course Registration
        </Typography>
        <Toolbar>
          <ul className="list-container">
                    <li>
                        <NavLink activeClassName="active" style={linkStyle} to="/" >
                        Registration
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" style={linkStyle} to="/student" >
                        Students
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" style={linkStyle} to="/course" >
                        Courses
                        </NavLink>
                    </li>
                </ul>
        </Toolbar>
    </AppBar>
    </div>
  );
};
export default ResponsiveAppBar;
