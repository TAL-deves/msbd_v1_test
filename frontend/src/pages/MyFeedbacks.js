import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import api from "../api/Axios";
import { multiStepContext } from './StepContext';


const REVIEWS_URL = "/api/user-reviews";

const MyFeedbacks = () => {
  const {
    userobj
  } = useContext(multiStepContext);
    
    const [username, setUser] = useState(localStorage.getItem('user'))
    const[reviewData, setReviewData]=useState([])

    let handleWatchReview=async()=>{
        const response =await api.post(REVIEWS_URL,
          JSON.stringify({username }),
          {
              headers: { 'Content-Type': 'application/json' },
              'Access-Control-Allow-Credentials': true
          }          
      );
      if(response.data.result.status === 200){
        setReviewData(response.data.data)
      }
    }
    
    useEffect(() => {  
        handleWatchReview();
        //console.log("review Data == ", reviewData)
     }, []);


    
    return (
        <>
         <Container>
        

         {reviewData.map((reviews) => {
            return (
                <Box sx={{border:"1px solid white",borderRadius:"5px",boxShadow: "1px 1px 14px 1px rgba(102,102,102,0.83);", display:"flex",
                flexDirection:"column", alignItems:"center", padding:"5%",
                margin:"5%"}}>
               <Typography variant='h5'>{reviews.username}</Typography>
               <Typography>Course ID:{reviews.courseID} <br/>Review Date:{reviews.reviewDate} </Typography>
               <Typography sx={{padding:"3%"}} variant='h6'>{reviews.review}</Typography>
               
              </Box>
            );
          })} 
        
         
   
    
        </Container>
        </>
    );
};

export default MyFeedbacks;