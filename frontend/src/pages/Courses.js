import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios"

import { Button, Container } from "@mui/material";
import { add } from '../Store/cartSlice';
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../components/CourseCard/CourseCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SideCart from "../components/SideCart/SideCart";
import StepContext, { multiStepContext } from "./StepContext";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Courses = (props) => {
  const {
    userRef,
    emailRef,
    errRef,
    renderer,
    userobj,
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
  let mail = props.mail;

  //console.log("registration_er_user", userobj)


  AOS.init();

  const [courses, setCourses] = useState([]);
  const [load, setLoad] = useState(true);

  let fetchData = async () => {

    await api.post(`${process.env.REACT_APP_API_URL}/api/allcourses`)
      // .then((res) => res.json())
      .then((data) => {
        // //console.log(" THis is the data -----  "+data.data.data.coursesData);
        let listOfCourse = data.data.data.coursesData;
        let localCourseList = JSON.parse(localStorage.getItem("courselist"));
        //console.log(localCourseList);
        listOfCourse.map((course) => {
          if (localCourseList !== null) {
            let localCourse = localCourseList.find(obj => obj.courseID === course.courseID)
            //console.log(localCourse.courseID,course.courseID)
            course["isSelected"] = localCourse !== null ? localCourse["isSelected"] : true;
             
          }
          else{
            course["isSelected"] =true
          }
        })
        setCourses(listOfCourse)
        setLoad(false);
        //console.log((courses))
      });
  };

  let updateCourse = (course, isSelected) => {
    //console.log(course, isSelected)
    let update = courses;
    update.map((obj) => {
      if (obj.courseID === course.courseID) {
        obj["isSelected"] = isSelected;
        course["isSelected"] = isSelected;
      }
    })
    setCourses(update)
    localStorage.setItem("courselist", JSON.stringify(update));
    //console.log("update", update)

  }


  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();



  return (
    <Box >
      <Container>
        <Typography
          sx={{
            fontSize: "2rem",
            m: "5px",
          }}
        >
          Browse all our courses
        </Typography>

        <Box
        //  {sm:"column", lg:"row", xs:"column"}}}
        >
          <Grid sx={{
            display: "flex",
            flexDirection: { sm: "column", lg: "row", xs: "column" }
          }}>
            <Grid
              container
              // columns={{ xs: 10, sm: 10, md: 10, lg: 10 }}
              xs={11}
              // lg={8}
              justifyContent="center"
            >
              {load ? (
                <CircularProgress sx={{
                  color: "primary.main"
                }} />
              ) : (
                <>
                  {courses.map((course) => {
                    return (
                      <Box key={course.courseID}
                        sx={{ maxWidth: 345, mb: "15px" }}
                      >
                        <CourseCard
                          title={course.title}
                          id={course.courseID}
                          img={course.thumbnail}
                          instructor={course.instructor.name}
                          price={course.price}
                          hour={course.courseLength}
                          lecture={course.totalLecture}
                          fullObject={{ ...course }}
                          updateCourse={updateCourse}
                          
                        />
                        {/* <Button variant="contained" 
                    onClick={()=>handleAdd(course)}
                    //  disabled=
                    >
                   <ShoppingCartIcon/>
                    </Button> */}

                      </Box>
                    );
                  })}
                </>
              )}
            </Grid>
            <Grid
              // columns={{ xs: 2, sm: 2, md: 1, lg: 1 }}
              xs={1}
            // lg={8}
            >
              {/* <Box sx={{ marginTop: "2rem" }}>
                
                <>
                  <SideCart
                    mail={mail}
                    setCourses={setCourses}
                  /></>

                
              </Box> */}
              <Box sx={{border: "1px solid rgb(210 206 206 / 87%)",
               borderRadius: "10px"}}>
              <Box sx={{ margin: "1rem"}}>
                {/* <StepContext> */}
                <>
                  <SideCart
                    mail={mail}
                    setCourses={setCourses}
                  /></>

                {/* </StepContext>        */}
              </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Courses;