import { React, useState , useEffect} from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import useStyle from "../Auth/styles";
import Input from "./Input";
import Icon from "./Icon";
import {gapi} from 'gapi-script'
import {useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import {issignin, issignup} from '../../actions/auth'

const Auth = () => {
  const [showPassword, setshowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formdatas = {firstname: '', lastname: '', email: '', password: '', confirmPasswrod: ''}
  const[formdata,setformdata] = useState(formdatas);

  const changePasswordVisible = () =>
  setshowPassword((prevShowPassword) => !prevShowPassword);

  const classes = useStyle();
  const [signup, setsignup] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if(signup){
      dispatch(issignup(formdata, navigate))
    }else{
      dispatch(issignin(formdata, navigate))
    }
  };

  const handleChange = (e) => {
    setformdata({...formdata, [e.target.name]: e.target.value})
  };

  const switchMode = () => {
    setsignup((prevsignup)=> !prevsignup)
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try{
      dispatch({type: 'AUTH', data: {result,token}});
      navigate('/')
    }catch(err){
      console.log(err)
    }

    console.log(result);
  };

  const googleError = (err) => {
    console.log(err);
    console.log("failure in login with google");
  };

  //to handle error occuring in google Auth
  useEffect(()=>{
    function start() {
      gapi.client.init({
        clientId: '838718155561-67d4qmv7up9f5sb6eg7j78s2im23ddgc.apps.googleusercontent.com',
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  },[])

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography variant="h5">{signup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleClick}>
          <Grid container spacing={2}>
            {signup && (
              <>
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />

                <Input
                  name="lastname"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              changePasswordVisible={changePasswordVisible}
            />
            {signup && (
              <Input
                name="confirmPasswrod"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {signup ? "Sign Up" : "Sing In"}
          </Button>
          <GoogleLogin
            clientId="838718155561-67d4qmv7up9f5sb6eg7j78s2im23ddgc.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
                plugin_name = 'PLUGIN'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {signup
                  ? "Already have and? Sign In"
                  : "Don't have an account Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
