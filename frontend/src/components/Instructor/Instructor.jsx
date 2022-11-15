import { styled, alpha } from "@mui/material/styles";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { instructorData } from "../../data/instructorData";
import Slider from "react-slick";
import { Box, display } from "@mui/system";
import { Link } from "react-router-dom";
import InstructorCard from "../InstructorCard/InstructorCard";
import { Height } from "@mui/icons-material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import api from '../../api/Axios'
import { useRef } from "react";
import { globalContext } from "../../pages/GlobalContext";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const Instructor = () => {
  const {t}= useContext(globalContext)
  const sliderRef = useRef(null);
  
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <ChevronLeftIcon sx={{color:"primary.main", "&:hover":{color:"secondary.main"}}} {...props}/>
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <ChevronRightIcon sx={{color:"primary.main", "&:hover":{color:"secondary.main"}}} {...props}/>
  );
  var settings = {
    arrows: true,

    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 2,
    // centerMode: true, // enable center mode
  // centerPadding: '50px', // set center padding
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [instructorState, setInstructorState] = useState([]);

  let fetchData = async () => {
    await api.post(`${process.env.REACT_APP_API_URL}/api/allinstructors`)
      // .then((res) => res.json())
      .then((data) => {
        // //console.log(" data", data)
        setInstructorState(data.data.data.instructorData)
                
      });
  };
  //console.log("instructor data",instructorState)
  useEffect(() => {   
     fetchData();
  }, []);

 


  return ( <Box
    sx={{

    }}
  >
    <Container>
    <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent:"space-between",
            marginTop:"2rem"
            
          }}
        >
    <Typography gutterBottom 
    // gutter
      sx={{
        fontSize:"1.8rem",
        color: "primary.main",
        fontWeight:"500"
      }}>
      {t("meet_our_instructors")}
    </Typography>
    <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* <Link to={"/instructor-details"} style={{textDecoration:"none"}}>
              <Typography
                mr={2}
                sx={{
                  color: "primary.main",
                }}
              >
                See All{" "}
              </Typography>
            </Link> */}

            {/* <ArrowBackIosNewIcon
              onClick={() => {
                sliderRef.current.slickPrev();
                //console.log(sliderRef.current);
              }}
              sx={{
                fontSize: "2rem",
                marginRight: "10px",
                cursor:"pointer",
                bgcolor:"secondary.main",
                borderRadius:"50%",
                color:"other.white",
                padding:"5px"
              }}
            /> */}
            {/* <ArrowForwardIosIcon
              // color="#fff"
              onClick={() => {
                sliderRef.current.slickNext();
                // //console.log(sliderRef.current);
              }}
              sx={{
                fontSize: "2rem",
                cursor:"pointer",
                bgcolor:"secondary.main",
                borderRadius:"50%",
                color:"other.white",
                padding:"5px"
              }}
            /> */}
          </Box>
          </Box>
        <Slider {...settings} ref={sliderRef}>
        {instructorState.map((obj) => {
          return (
            <Box key={obj._id} sx={{padding:".5rem"}}>
              <InstructorCard
                title={obj.name}
                instructor={obj.designation}
                img={obj.image}
                fullObject={obj}
              ></InstructorCard>
              {/* <h1>{obj.name}</h1> */}
            </Box>
          );
        })}
       </Slider>
     
        </Container>
      </Box>
  );
};

export default Instructor;
