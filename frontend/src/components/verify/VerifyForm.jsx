import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Countdown from "react-countdown";
import api from "../../api/Axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import StepContext, { multiStepContext } from "../../pages/StepContext";
import { Alert, AlertTitle, Collapse, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalStorageService from "../../api/localstorage";
import { login } from "../../api/Axios";
import swal from "sweetalert";

//verify
const VERIFY_URL = "/api/verify";
const RESEND_VERIFY_URL = "/api/resend-otp";

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.techanalyticaltd.com/"
        target={"_blank"}
      >
        Tech Analytica Limited
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Random component
const Completionist = () => <span>Code expired!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

//

const VerifyForm = () => {
  const [open, setOpen] = useState(true);
  const [currentuser, setCurrentuser] = useState("");
  const [resendbtn, setResendbtn] = useState(false);

  const {
    userRef,
    emailRef,
    errRef,
    renderer,

    validName,
    setValidName,
    userFocus,
    setUserFocus,
    validEmail,
    setValidEmail,
    email,
    setEmail,
    emailFocus,
    setEmailFocus,
    password,
    setPwd,
    validPwd,
    setValidPwd,
    pwdFocus,
    setPwdFocus,
    validMatch,
    setValidMatch,
    matchFocus,
    setMatchFocus,
    errMsg,
    setErrMsg,
    success,
    setSuccess,
    handleSubmitRegistration,
    theme,
    username,
    setUser,
    matchPwd,
    setMatchPwd,
    registerapiresponse,
  } = useContext(multiStepContext);
  const [otp, setOTP] = useState("");
//console.log(email)
const navigate = useNavigate();
  const handleSubmitVerify = async (event) => {
    
    // event.preventDefault();
    const response = await api
      .post(VERIFY_URL, JSON.stringify({ email, otp }), {
        headers: { "Content-Type": "application/json" },
        "Access-Control-Allow-Credentials": true,
      })
      .then((response) => {
        let data = response.data.result.status;
        let dataMsg = response.data.data.data;
        if (data === 406) {
          setErrMsg("Invalid OTP");
          swal("Invalid OTP", `Please check again`, "error");
        } else if (data === 404) {
          setErrMsg("User not found");
          swal("Error", `User not found!`, "error");
        } else {
          swal("Success", `${dataMsg}, You will be redirected to login`, "success", {timer: 1000});
          const response = login(email, password, (response) => {
            const localStorageService = LocalStorageService.getService(); 
            console.log("login response ----  ", response);
              setCurrentuser(response.data.data.user);
              localStorageService.setToken(response.data.data);
              if (response.data.data.user) {
               
                navigate("/courses")
                // window.location.href = "/courses";
              }
          });
        }
      });
  };

  //

  //resend verify

  const handleSubmitResendVerify = async (event) => {
    event.preventDefault();
    const response = await api
      .post(RESEND_VERIFY_URL, JSON.stringify({ email, otp }), {
        headers: { "Content-Type": "application/json" },
        "Access-Control-Allow-Credentials": true,
      })
      .then((response) => {
        //console.log(response.data.data);
        let data = response.data.result.status
        if(data === 302){
          swal("OTP sent!", `Please verify to continue, ${response.data.data} try left`, "warning")
        } else if(data === 406){
          swal("Hold!", `Account deleted for too many otp retry`, "error")
          .then(()=>{
            window.location.href = "/registration"
          })
        } else {
          swal("Hold!", `Account deleted for too many otp retry`, "error")
          .then(()=>{
            window.location.href = "/registration"
          })
        }
      });
  };

  //

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verification
          </Typography>
          <p>OTP sent to your given mail!</p>
          {errMsg ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
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
                }
              >
                <AlertTitle>Error</AlertTitle>
                {errMsg}
              </Alert>
              {/* </Collapse> */}
            </Stack>
          ) : (
            ""
          )}
          <Box
            component="form"
            onSubmit={handleSubmitVerify}
            noValidate
            sx={{ mt: 1 }}
          >
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
                disableUnderline: true,
              }}
              inputProps={{
                maxLength: 5,
              }}
              onChange={(e) => setOTP(e.target.value)}
            />

            <Grid container sx={{ display: "flex" }}>
              <Grid item xs>
                <Countdown
                  // date={Date.now() + 10000}
                  date={Date.now() + 180000}
                  renderer={renderer}
                />
              </Grid>
              <Grid item>
                <Link
                  href="/forgotpassword"
                  variant="body2"
                  onClick={handleSubmitResendVerify}
                >
                  {"Resend code"}
                </Link>

                {/* <Button 
                variant="contained" 
                onClick={handleSubmitResendVerify} 
                // disabled="true"
              >
                  {"Resend code"}
                </Button> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Button
        // className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleSubmitVerify}
        sx={{ ml: "45%", mt: "6%", mb: "30%" }}
      >
        Submit
      </Button>
    </ThemeProvider>
  );
};

export default VerifyForm;
