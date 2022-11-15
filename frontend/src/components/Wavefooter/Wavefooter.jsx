import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, CardMedia, makeStyles, Paper, Typography } from '@mui/material';
import googlebtn from "../downloadApp/playstore.png"
import applebtn from "../downloadApp/applestore.png";
import facebook_yellow from "../downloadApp/facebook_yellow.json";
import yellow_youtube from "../downloadApp/yellow_youtube.json";
import yellow_insta from "../downloadApp/yellow_insta.json";
import yellow_twitter from "../downloadApp/yellow_twitter.json";
import SSLCommerz from "../downloadApp/SSLCommerz.png";
import logo from "../navbar/msbdlogo.png";
import logo1 from "../navbar/logo1.png";
import logo2 from "../navbar/logo2.png";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Lottie from "lottie-react";



export default function Wavefooter() {

  const style = {
    height: 50,
    width: 50,
    borderRadius: "50px",
    margin:"5px",

  };

  return (
    <Paper sx={{
      marginTop: '4rem',
      width: '100%',

      bottom: 0,

    }} component="footer" >
      
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 1, sm: 1 }}
        pt={{xs:1, sm:5}}
        sx={{
          backgroundColor: "other.footercolor",
          animation: "wave",
          color: "other.white"
        }}
      >
        <Container maxWidth="lg" >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}
            >

              <Box sx={{
                display: "flex", flexDirection: "column",
                padding: "2rem", alignItems: "center"
              }}>
                <Typography variant='h5' sx={{
                  color: "other.white"
                }}>Reach Us</Typography>
                
            
                <Box sx={{ display: "flex" , alignItems:"center"}}>
                <Link href='https://google.com'>
                      <Lottie
          animationData={yellow_twitter}
          style={style}
          
        />
                </Link>
                <Link href='https://google.com'>
                  <Lottie
          animationData={yellow_youtube}
          style={style}          
        />
                </Link>
                <Link href='https://google.com'>
                  
                  <Lottie
          animationData={facebook_yellow}
          style={style}          
        />
                </Link>
                <Link href='https://google.com'>
                  
                  <Lottie
          animationData={yellow_insta}
          style={style}          
        />
                </Link>
              </Box>
                
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} sx={{
              color: "other.white"
            }}>
              <Box borderBottom={1}>Pages</Box>
              <Box>
                <Link href="/login" sx={{ textDecoration: "none" }} color="inherit">
                  Login
                </Link>
              </Box>
              <Box>
                <Link href="/registration" sx={{ textDecoration: "none" }} color="inherit">
                  Signup
                </Link>
              </Box>
              <Box>
                <Link href="/courses" sx={{ textDecoration: "none" }} color="inherit">
                  Courses
                </Link>
              </Box>
              <Box>
                <Link href="/store" sx={{ textDecoration: "none" }} color="inherit">
                  Store
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ textDecoration: "none" }} sm={3}>
              <Box borderBottom={1}>Mind School BD</Box>
              <Box>
                <Link href="/about" sx={{ textDecoration: "none" }} color="inherit">
                  About
                </Link>
              </Box>
              <Box>
                <Link href="/privacy-policy" sx={{ textDecoration: "none" }} color="inherit">
                  Privacy Policy
                </Link>
              </Box>
              <Box>
                <Link href="/refund-policy" sx={{ textDecoration: "none" }} color="inherit">
                  Refund Policy
                </Link>
              </Box>
              <Box>
                <Link href="/terms-and-conditions" sx={{ textDecoration: "none" }} color="inherit">
                  Terms & Conditions
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{
              textDecoration: "none", display: "flex",
              flexDirection: "column", alignItems: "center"
            }} sm={3}>

              <Box sx={{
                display: { xs: "flex" }
              }}>
                <img src={logo2} alt="logo"
                  width="50" />
              </Box>
              <Typography
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 0,
                  display: { xs: "flex" },
                  fontSize: "2rem",
                  flexGrow: 1,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {/* //!  This is mobile view */}
                <Typography

                  variant='h5'
                >
                  Mind School
                </Typography>
              </Typography>
              <Typography>
                Download Our Mobile App
              </Typography>
              {/* app */}
              <Box sx={{ display: "flex" }}>
                <Link href="https://techanalyticaltd.com/" target="new">
                  <Box
                    sx={{
                      // backgroundColor: "other.logocolor",
                      backgroundColor: "secondary.main",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      padding: "10px",
                      borderRadius: "10px",
                      margin: "2%"
                    }}
                  >
                    <img src={googlebtn} alt="google" width="96%" />
                  </Box>
                </Link>
                <Link href="https://techanalyticaltd.com/" target="new">
                  <Box
                    sx={{
                      // backgroundColor: "other.footercolor",
                      backgroundColor: "secondary.main",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                      borderRadius: "10px",
                      margin: "2%"
                    }}
                  >
                    <img src={applebtn} alt="google" width="80%" />
                  </Box>
                </Link>
              </Box>

            </Grid>
          </Grid>
          <Box
            pt={{ xs: 1, sm: 5 }}
            pb={{ xs: 5, sm: 0 }}
            sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
            <Link sx={{ textDecoration: "none", color: "other.white" }} href="https://techanalyticaltd.com/" target="new">Powered By Tech Analytica Limited &reg; {new Date().getFullYear()} || Version 1.0</Link>
            {/* <img src={SSLCommerz} alt=''/> */}

          </Box>

          <Grid sx={{ textAlign: "center" }}
            mt={5}>
            <Grid sx={{ display: { xs: "none", md: "none", lg: "block", xl: "block" } }}>
              <img width={1200} src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-03.png" alt='' />

            </Grid>
            <Grid sx={{ display: { xs: "block", md: "block", lg: "none", xl: "none" } }}>
              <img width={300} src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-04.png" title="SSLCommerz" alt="SSLCommerz" alt='' />

            </Grid>

          </Grid>

          {/* <Box sx={{height:"100px"}} >
        <img src={instructorImage} alt=''/>
        </Box> */}
        </Container>

      </Box>
      {/* </footer> */}
    </Paper>
  );
}