import React from "react";
import {Link} from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyle from "./styles";
import memories from "../../images/logo.png";

const Navbar = () => {
  const classes = useStyle();

  const user = null;

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
                <Button className={classes.logout} color="secondary" variant="contained">Log Out</Button>
            </div>
        ) : (
            <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;