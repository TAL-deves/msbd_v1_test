import { Button, CardMedia, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
// import "./DownloadApp.css";
import appimage from "./appimg.png";
import googlebtn from "./playstore.png";
import applebtn from "./applestore.png";
// import googlebtn from "./googlebtn.png";
// import applebtn from "./5.png";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
// import { Link } from 'react-router-dom';
import Link from "@mui/material/Link";
import {motion} from "framer-motion";
import { globalContext } from "../../pages/GlobalContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

const DownloadApp = () => {
  AOS.init({duration:2000});
  const {t}= useContext(globalContext)
  return (
    <Container  
    // data-aos="fade-up"
      sx={{
        border: "1px solid primary.main",
        boxShadow: "1px 1px 14px 1px rgba(102,102,102,0.83);",
        borderRadius: "10px",
        // marginBottom: "0%",
        color: "primary.main",
        alignContent: "center",
        marginTop:"5rem"
      }}
    >
      <Box>
        <Grid
          container
          // rowSpacing={1}
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            // display: {md:"flex",lg:"flex", sm:"flex"},
            // flexDirection:{md:"row",lg:"row", sm:"row" },
            justifyContent: "center",
          }}
        >
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid>
              <Typography
                gutterBottom
                sx={{
                  fontSize: { lg: "2rem" },
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {t("download_app")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                {t("to_take_care_of_your_health")}
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: { xs: "1rem" },
              }}
            >
              <motion.div whileHover={{scale:1.03}}>
              <Link href="https://techanalyticaltd.com/" target="new">
                <Box
                  sx={{
                    backgroundColor: "other.footercolor",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "20px",
                    boxShadow:"4",
                    "&:hover":{boxShadow:"5"}
                  }}
                >
                  <img src={googlebtn} alt="google" width="72%" />
                </Box>
              </Link>
              </motion.div>
              &nbsp;
              <motion.div whileHover={{scale:1.03}}>
              <Link href="https://techanalyticaltd.com/" target="new">
                <Box
                  sx={{
                    // backgroundColor: "secondary.main",
                    backgroundColor: "other.footercolor",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "20px",
                    boxShadow:"4",
                    "&:hover":{boxShadow:"5"}
                  }}
                >
                  <img src={applebtn} alt="google" width="60%" />
                </Box>
              </Link>
              </motion.div>
            </Grid>
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              display: { md: "flex", lg: "flex", sm: "flex", xs: "none" },
              justifyContent: "space-around",
            }}
          >
            <img
              src={appimage}
              alt="app"
              loading="lazy"
              width="60%"
              style={{
                objectFit: "contain",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      {/* </Grid> */}
    </Container>
  );
};

export default DownloadApp;
