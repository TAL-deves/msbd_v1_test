import React, { useContext, useEffect, useRef, useState } from "react";
// import Course from '../components/course/Course';
// import coursesData from "../data/coursesData";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { width } from "@mui/system";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import Slider from "react-slick";
import Link from '@mui/material/Link';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../Store/cartSlice";
import {motion} from "framer-motion";
import api from "../../api/Axios"
import { multiStepContext } from "../../pages/StepContext";
import swal from "sweetalert";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Modal, TextField } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { WindowSharp } from "@mui/icons-material";
import { useNavigate, useLocation, Navigate } from "react-router-dom";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const PAYMENT_URL = "/api/buy";

const SideCart = (props) => {
  const {
    userRef,
    emailRef,
    errRef,
    validName,
    setValidName,
    userobj,
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
    handleSubmit,
    theme,
    username,
    setUser,
    matchPwd,
    setMatchPwd,phone, setPhone,validPhone, phoneFocus,setPhoneFocus
  } = useContext(multiStepContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checkBoxStatus, setCheckBoxStatus] = React.useState(true);

  const search = useLocation().search;
  const payment = new URLSearchParams(search).get("payment");


  if (payment==="success") {
    // window.opener.location.reload();
    swal("successful!", "payment done", "success",{timer: 1000
    }).then(()=>{
      
      window.close();
    })
    
  } else if (payment==="failed") {
    swal("Error!", "payment is not successfull", "error",).then(()=>{
      
      window.close();
    })
  }
  


  let user=localStorage.getItem("user")
  AOS.init({duration:500});
  let mail= userobj.user
  
 
  //console.log("mail",mail)
  const dispatch= useDispatch();

  const handleRemove=(course)=>{
    //console.log("removed course id",course)
    
    dispatch(remove(course))

    let courseList = JSON.parse(localStorage.getItem("courselist"))
    courseList.map((obj)=>{
      if(obj.courseID===course.id)
      {
        obj["isSelected"] = true;
        course["fullObject"]["isSelected"]=true;
      }
    })
     localStorage.setItem("courselist",JSON.stringify(courseList));
      props.setCourses(courseList);
}
 

  const courses= useSelector(state=>state.cart)
  
  const LScourses= JSON.parse(localStorage.getItem("course"))
  
   
     //console.log("lets see", courses)
     
    //  course list for api 
    let courseList=[];
    for(let i=0; i<courses.length;i++){
      courseList.push(courses[i].id);      
    }
    //

    let coursesList =props.courseList;
   
    // total cost 
    let total=0;
    let LStotal=0;
   
    for(const courseCost of courses){
      total= total+Number(courseCost.price)
      
    }
    // for(const lscourseCost of LScourses){
    //   LStotal= LStotal+Number(lscourseCost.price)
      
    // }
    // let allTotal=LStotal+total;

    // //console.log(JSON.stringify(email))

    // payment api
  //   const response =()=>{  api.post(PAYMENT_URL,
  //     JSON.stringify({  mail, courseList}),
  //     {
  //         headers: { 'Content-Type': 'application/json' },
  //         'Access-Control-Allow-Credentials': true,         
  //     }

  // ).then((res)=>{
    
  //   if (res.data.result.status === 401) {
  //     localStorage.removeItem("access_token");
  //     localStorage.removeItem("refresh_token");
  //     localStorage.removeItem("user");
  //     swal("Session expired", "Redirecting to login page" ,'success');
  //     setTimeout(function(){
  //       window.location.href = '/login';
  //    }, 1000);

  //   }
     
  // }); }

  //payment api
  let response = async () => {
    await api
      .post(
        `${process.env.REACT_APP_API_URL}/api/buy`,
        JSON.stringify({ user }),
        {
          headers: { "Content-Type": "application/json" },
          "Access-Control-Allow-Credentials": true,
        }
      )
      .then((data) => {
        // console.log(" Testing data ----- ", data.data.data.redirectGatewayURL);
        // window.open(`${data.data.data.redirectGatewayURL}`, "_self")
        var w = 620;
        var h = 575;
        var left = (window.screen.width - w) / 2;
        var top = (window.screen.height - h) / 2;

        window.open(
          `${data.data.data.redirectGatewayURL}`,
          "",
          `width=${w}, 
          height=${h}, 
          top=${top}, 
          left=${left}`
        );
        
        // swal("successful!", "This is here", "success")
      });
  };



  // payment api for gift 
  const responseForGift =()=>{  api.post(PAYMENT_URL,
    JSON.stringify({  email, courseList}),
    {
        headers: { 'Content-Type': 'application/json' },
        'Access-Control-Allow-Credentials': true,         
    }

).then((res)=>{
  if (res.data.result.status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    swal("Session expired", "Redirecting to login page" ,'success');
    setTimeout(function(){
      window.location.href = '/login';
   }, 1000);

  }
}); }
  

//checkbox value
const ref = useRef(null);

  const handleClick = () => {
    // 👇️ get checkbox value with ref
    //console.log("checkbox bool-----",ref.current.checked);
    // setCheckBoxStatus(ref.current.checked);
  };
  
   
  return (
    <>
    {/* for large device */}
      <Box 
      // sx={{display:{xs:"none", md:"block",lg:"block"}, width:"auto"}}
      >
      <Box sx={{ width: "100%", textAlign: "center", margin: { md: "0 0 1rem 0", sm: "0rem" }, padding: "5px", backgroundColor: "secondary.main", borderRadius: "5px" }}>
          <Typography sx={{ fontSize: "1.2rem", textAlign: "center", color: "primary.main" }} >
            Selected courses</Typography></Box>
          {courses[0]=== undefined ?
           <>{courses.map((course) => {
            return (
              <motion.div whileHover={{scale:1.03}}>
              <Box key={course.courseID} sx={{ maxWidth: "10rem", mb:"15px", display:"flex", justifyContent:"flex-start" }} >
              <Card sx={{
                      display: 'flex', width: "20vw", backgroundColor: "primary.main",
                      color: "other.dark"
                    }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography sx={{ fontSize: "1rem" }}>
                            {course.title}
                          </Typography>
                          <Typography sx={{ fontSize: ".8rem", color: "other.dark" }}
                            color="text.secondary">
                            {course.instructor}
                          </Typography>
                          <Typography sx={{ fontSize: "1rem", color: "secondary.main" }}
                            color="text.secondary">
                            ৳{course.price}
                          </Typography>
                        </CardContent>

                      </Box>
               
                    </Card>
                <Button  sx={{
                      color: "#DD5353",fontSize:"1.5rem",
                      "&:hover": { backgroundColor: "#DD5353", color: "other.dark" }
                    }}
                onClick={()=>handleRemove(course)
                }>X</Button>
              </Box>
              </motion.div>
            );
          })}</> : 
           <>{LScourses.map((course) => {
            return (
              <>
              
              <motion.div whileHover={{scale:1.03}}>
              <Box data-aos="fade-right" key={course.id} sx={{ maxWidth: "40rem", mb:"15px", display:"flex", justifyContent:"flex-start" }} >
              <Card sx={{
                      display: 'flex', width: "20vw", backgroundColor: "primary.main",
                      color: "other.dark"
                    }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography sx={{ fontSize: "1rem" }}>
                            {course.title}
                          </Typography>
                          <Typography sx={{ fontSize: ".8rem", color: "other.dark" }}
                            color="text.secondary">
                            {course.instructor}
                          </Typography>
                          <Typography sx={{ fontSize: "1rem", color: "secondary.main" }}
                            color="text.secondary">
                            ৳{course.price}
                          </Typography>
                        </CardContent>

                      </Box>
                      {/* <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={course.img}
        alt="Live from space album cover"
      /> */}
                    </Card>
                <Button sx={{
                      color: "#DD5353",fontSize:"1.5rem",
                      "&:hover": { backgroundColor: "#DD5353", color: "other.dark" }
                    }} 
                onClick={()=>handleRemove(course)
                }>X</Button>

              </Box>
              </motion.div>
            </>);
          })}</>
          
        }
        <Box sx={{ textAlign: "right" }}>
        <Typography sx={{ fontWeight: "800", fontSize: "1.5rem", color: "primary.main" }}>Total:৳{total}</Typography>

         {user? 
          (<>
          {/* <Checkbox {...label}  id="checked" defaultChecked/> */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem", marginTop: "1rem" }}>
                <Checkbox
                  sx={{
                    color: "primary.main",
                    '&.Mui-checked': {
                      color: "primary.main",
                    },
                  }}
                  checked={checkBoxStatus}
                  onChange={(e) => {
                    setCheckBoxStatus(e.target.checked)
                  }}
                  id="subscribe"
                  name="subscribe"
                />
               

                <Typography sx={{ marginLeft: ".0rem", color: "primary.main", fontSize: ".8rem" }} >I've read and accept the &nbsp;
                  <Link href="/terms-and-conditions" sx={{ color: "primary.main"}}>
                     terms and conditions
                    </Link>
                </Typography>
              </Box> 
          <Button
             onClick={response}
            //  disabled={(courseList.length===0)?true:false || checkBoxStatus===false}
            disabled
             variant="contained">Proceed to Payment
          </Button>
          {/* <Button 
            disabled={(courseList.length===0)?true:false}
            variant="contained" sx={{marginLeft:"1rem",  overflow:"hidden"}}
            onClick={handleOpen}>Gift
          </Button> */}
          

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}> 
          <Typography id="modal-modal-title" variant="h6" color="text.secondary" component="h2">
            Please enter the email of the person you want to gift this course below
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              // error={errMsg}
              autoComplete="email"
              // autoFocus
              value={email}
              InputProps={{
                disableUnderline: true,
              }}
              inputProps={{
                maxLength: 320,
              }}
              onChange={(e) =>
                 setEmail(e.target.value)}
              // aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              // onBlur={() => setEmailFocus(false)}
              error={emailFocus && email && !validEmail ? true : false}
              helperText={
                emailFocus && email && !validEmail
                  ? "Please provide a valid email"
                  : ""
              }
            />
          </Typography>
          <Button 
            onClick={responseForGift} 
            disabled={!validEmail}
            variant="contained">Proceed to Payment</Button>
        </Box>        
      </Modal>
              </>)
           :
           (<>
            {/* <Checkbox {...label}  id="checked" defaultChecked/> */}
            <Box sx={{ display: "flex", alignItems: "center",
            justifyContent:"flex-end", marginBottom: "1rem", marginTop: "1rem" }}>
                <Checkbox
                  sx={{
                    color: "primary.main",
                    '&.Mui-checked': {
                      color: "primary.main",
                    },
                  }}
                  checked={checkBoxStatus}
                  onChange={(e) => {
                    setCheckBoxStatus(e.target.checked)
                  }}
                  id="subscribe"
                  name="subscribe"
                />
               

                <Typography sx={{ marginLeft: ".0rem", color: "primary.main", fontSize: ".8rem" }} >I've read and accept the &nbsp;
                  <Link href="/terms-and-conditions" sx={{ color: "primary.main"}}>
                     terms and conditions
                    </Link>
                </Typography>
              </Box> 
            <Link href="/login" style={{
            textDecoration:"none"
          }}>
            <Button
              //  onClick={response}
              //  disabled={(courseList.length===0)?true:false || checkBoxStatus===false}
              disabled
               variant="contained">Proceed to Payment
            </Button>
            </Link>
            {/* <Button 
              disabled={(courseList.length===0)?true:false}
              variant="contained" sx={{marginLeft:"1rem",  overflow:"hidden"}}
              onClick={handleOpen}>Gift
            </Button> */}
            
  
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}> 
            <Typography id="modal-modal-title" variant="h6" color="text.secondary" component="h2">
              Please enter the email of the person you want to gift this course below
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // error={errMsg}
                autoComplete="email"
                // autoFocus
                value={email}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  maxLength: 320,
                }}
                onChange={(e) =>
                   setEmail(e.target.value)}
                // aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                // onBlur={() => setEmailFocus(false)}
                error={emailFocus && email && !validEmail ? true : false}
                helperText={
                  emailFocus && email && !validEmail
                    ? "Please provide a valid email"
                    : ""
                }
              />
            </Typography>

            <Button 
              onClick={responseForGift} 
              disabled={!validEmail}
              variant="contained">Proceed to Payment</Button>
          </Box>        
        </Modal>
                </>)
          } 
          </Box>
      </Box>      
    </>
  );
};

export default SideCart;