import { Checkbox, List, ListItem, TextField, Typography, Button } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {

    const [path,setPath] = React.useState('');
    const navigate = useNavigate();
    
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center'}}>
        <img src="/bpr.png" height="300"/>
            {/* <Typography variant='h1' sx={{}} id="heading">
                Secure Text
            </Typography>
             */}
        </div>

        <div style={{display:'flex',justifyContent:'center'}}>
            <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper', }}>
                <ListItem>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={true}
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>

                    <ListItemText id={`1`} primary={`Securely Stores your data, by encrypting your data & storing only hased password`} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={true}
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>

                    <ListItemText id={`2`} primary={`Access from any where & any device`} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={true}
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>

                    <ListItemText id={`3`} primary={`Simple, Fast, Easy to get Started...`} />
                </ListItem>
            </List>
        </div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',textAlign:'center'}}>
            <br/><br/>
            <Typography variant='h5' sx={{}}>
                Enter any Path, e.g. secure-text.netlify.app/ANYTHING. Isn't occupied, then it's yours.
            </Typography>
            <br/>
            
            <Typography variant='h6'>
            
               <b> Get started,</b> &ensp;
            
                Go to secure-text.netlify.app/ <TextField label="Path Name" value={path} onChange={(e)=>setPath(e.target.value)} sx={{minHeight:'3rem'}}/> &ensp; <Button variant='outlined' onClick={()=>{navigate(`/${path}`)}} sx={{minHeight:'3rem'}} > GO! </Button>
            </Typography>
        </div>
    </div>
  )
}

export default HomePage