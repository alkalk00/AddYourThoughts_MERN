import {React, useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyle from "./styles";
import memories from "../../images/logo.png";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation} from 'react-router-dom'
import decode from 'jwt-decode'

const Navbar = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setuser] = useState(
    JSON.parse(localStorage.getItem('profile'))
  );

  console.log(user)

  const logout = ()=>{
    dispatch({type: 'LOGOUT' })
    navigate('/')
    setuser(null)
  }

  useEffect(()=>{
    const token = user?.token

    if(token){
      const decodeToken = decode(token);
      if(decodeToken.exp * 1000 < new Date().getTime()) logout()
    }

    setuser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to='/' className={classes.heading} variant="h2" align="centre">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="70"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imgUrl}>
                    {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button className={classes.logout} color="secondary" variant="contained" onClick={logout}>Log Out</Button>
            </div>
        ) : (
            <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
