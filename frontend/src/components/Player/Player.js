import { Box, Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import videosample from "./homepagevideo.mp4";
import { Grid } from "@mui/material";

const ResponsiveStyledPlayer = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    let options = {
      rootMargin: "0px",
      threshold: [0.25, 0.75],
    };

    let handlePlay = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      });
    };
    let observer = new IntersectionObserver(handlePlay, options);

    observer.observe(videoRef.current);
  });

  // const Player = ({ className }) => (
  //   <ReactPlayer
  //     url={videosample}
  //     className={className}
  //     playing={true}
  //     autoplay={true}
  //     width="100%"
  //     height="100%"
  //     controls={false}
  //     muted
  //     loop={true}
  //     ref={videoRef}
  //   />
  // );

  // const AbsolutelyPositionedPlayer = styled(Player)`
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  // `;

  // const RelativePositionWrapper = styled.div`
  //   position: relative;
  //   padding-top: 56.25%;
  // `;

  return (
    <Box>
      <Container>
        <Grid 
          // xs={12}
        >
        <video ref={videoRef} src={videosample} width="100%" loop={true} controls={false} autoPlay={true}></video>
        </Grid>
      </Container>
    </Box>
  );
};

export default ResponsiveStyledPlayer;
