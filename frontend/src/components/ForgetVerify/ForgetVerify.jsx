import  {React, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Countdown from 'react-countdown';
import api from '../../api/Axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { multiStepContext } from '../../pages/StepContext';
import { multiForgotContext } from '../../pages/ForgotContext';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle, Collapse, IconButton, Stack } from '@mui/material';

const ForgetVerify = () => {
  const [open, setOpen] = useState(true);
  const { renderer,otp, setOTP,handleSubmitMailForget,handleSubmitForgetOTP,handleSubmitVerify, validName, setValidName,
   userFocus, setUserFocus,validEmail, setValidEmail,
     email, setEmail,emailFocus, setEmailFocus,
    password, setPwd,validPwd, setValidPwd,pwdFocus, setPwdFocus,
     validMatch, setValidMatch,matchFocus, setMatchFocus,
    errMsg, setErrMsg, success, setSuccess,handleSubmitRegistration,theme,
    username, setUser,matchPwd, setMatchPwd, handleSubmitResendVerify}= useContext(multiForgotContext)

  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Verification
          </Typography>
          {errMsg?
       <Stack sx={{ width: '100%' }} spacing={2}>
      {/* <Collapse in={open}> */}
      <Alert
       severity="error"
       action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          {/* <CloseIcon fontSize="inherit" /> */}
        </IconButton>
      } >
        <AlertTitle>
          Error
        </AlertTitle>
        {errMsg}
      </Alert>
      {/* </Collapse> */}
      </Stack>:""}
          <Box component="form" onSubmit={handleSubmitVerify} noValidate sx={{ mt: 1 }}>
           
            <TextField
              margin="normal"
              required
              fullWidth
              name="otp"
              label="OTP"
              type="otp"
              id="otp"
              error={errMsg}
              InputProps={{ 
                disableUnderline: true
              }}
              inputProps={{
                maxLength: 5
                
              }}
              onChange={(e) => setOTP(e.target.value)}
            />
          
            <Grid container sx={{display:'flex', alignItems:"center"}}>
              <Grid item xs>
              <Countdown 
                date={Date.now() + 180000}
                renderer={renderer}/>
              </Grid>
              <Grid item>
               
               <Button variant="contained" onClick={handleSubmitResendVerify} >
                  {"Resend code"}
                </Button>
              </Grid>
            </Grid>
          
          </Box>
          
        </Box>
   
        
      </Container>
      <Button
         
            variant="contained"
            color="primary"
            // disabled={password !== matchPwd}
            onClick={handleSubmitForgetOTP}
            sx={{ ml:"45%", mt: "6%",mb: "30%" }}
            
          >
            Submit
          </Button> 
    </ThemeProvider>
  )
}

export default ForgetVerify