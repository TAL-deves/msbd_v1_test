import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
// import './Navigationbar.css';
import { styled } from "@mui/material/styles";
import { alignProperty } from "@mui/material/styles/cssUtils";
import api, { baseURL } from "../../api/Axios";
import {
  createTheme,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  NativeSelect,
  Paper,
  Select,
  Switch,
  ThemeProvider,
} from "@mui/material";
import i18n from "i18next";
import { useTranslation, initReactI18next, Trans } from "react-i18next";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SchoolIcon from "@mui/icons-material/School";
import primarytheme from "../../style/style";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useSelector } from "react-redux";

import logo from "./msbdlogo.png";

import logo1 from "./logo1.png";
import logo2 from "./logo2.png";

import { translationsEn, translationsBn } from "./language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { globalContext } from "../../pages/GlobalContext";
import swal from "sweetalert";
import { multiStepContext } from "../../pages/StepContext";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  // margin:0,
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#001F54"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#F8B120" : "#001F54",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#001F54" : "#F8B120",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#001F54"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#001F54" : "#F8B120",
    borderRadius: 20 / 2,
  },
}));


// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources: {
//       en: { translation: translationsEn },
//       bn: { translation: translationsBn },
//     },
//     lng: "en",
//     fallbackLng: "en",
//     interpolation: { escapeValue: false },
//   });

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navigationbar = (props) => {
  const { userobj } = useContext(multiStepContext);

  const { t, onChange } = useContext(globalContext);

  const userId = localStorage.getItem("access_token");
  // //console.log("user local:",userId)

  // const user = props.user;
  const user = userobj.user;
  // const localstoragedata = localStorage.getItem("access_token");
  //  //console.log("user",user,"localstoragedata",localstoragedata)
  const fromtoken = props.fromtoken;

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/api/logout`, "_self");
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const textstyle = {
    textDecoration: "none",
  };

  const pages = [
    { title: `${t("course")}`, href: "/courses" },
    // { title: `${t("bookAnAppoinment")}`, href: "/apointment" },
    // { title: `${t("live")}`, href: "/live" },
    // { title: `${t("group")}`, href: "/group" },
    // { title: `${t("store")}`, href: "/store" },
    { title: `${t("about")}`, href: "/about" },
  ];

  return (
    <AppBar
      position="sticky"
      // className="AppBar"
      sx={{
        backgroundColor: "primary",
      }}
    >
      {/* <Paper> */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
            {/* <SchoolIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1, mt:1 }}>
              <img src={logo2} alt="logo" width="50" />
            </Box>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "none", lg: "flex" },
              // fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: ".3rem",
              color: "other.white",
              textDecoration: "none",
            }}
          >
            {/* Mind School */}
            {t("brand")}
          </Typography>
          </Box>
          {/* <h1>{t("welcome")}</h1> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "other.white" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link
                  key={page.title}
                  to={page.href}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ color: "other.black" }}>
                      {page.title}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          {/* <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: { xs: "center" }
              }}
            > */}
          <Typography
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 0,
              display: { xs: "flex", md: "none" },
              fontSize: "1.2rem",
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo2} alt="logo" width="30" />
            {t("brand")}
          </Typography>
          {/* </Box>
          </Link> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "none", lg: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "other.white",
              textDecoration: "none",
            }}
          >
            {t("brand")}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
            
                <Link
                  to={page.href}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                    <Button
                className="NavMenus"
                key={page.title}
                onClick={handleCloseNavMenu}
                textAlign="center"
                sx={{
                  // py: 2,
                  color: "white",
                  display: "block",
                  padding: "0 55px",
                  fontSize:"1rem"
                }}
              >
                  {page.title}
                  </Button>
                </Link>
            ))}
          </Box>
          <FormControl
            sx={{
              minWidth: 90,
              marginRight: "5px",
              // display: { xs: "none", md: "block" },
            }}
          >
            <Select
              defaultValue={"en"}
              variant="outlined"
              displayEmpty
              name="language"
              notched={false}
              size="small"
              onChange={onChange}
              sx={{
                color: "other.white",
                border: "2px",
                "&:hover": {
                  border: "2px",
                },
              }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="bn">বাংলা</MenuItem>
            </Select>
          </FormControl>
          {userId ? (
            // localstoragedata
            <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
              
                <Button
                  variant="outlined"
                  // onClick={handleOpenUserMenu}
                  onMouseOver={handleOpenUserMenu}
                  sx={{
                    borderColor: "other.white",
                    color: "other.white",
                    marginRight: "15px",
                  }}
                >
                 <Link to="/userprofile" style={{ textDecoration: "none", color:"white"}}>
                  {t("myAccount")}
                  </Link>
                </Button>
                
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  // onClose={handleCloseUserMenu}
                  onMouseLeave={()=>handleCloseUserMenu}
                >
                  <Link to="/userprofile" style={textstyle}>
                    <MenuItem
                      sx={{ textDecoration: "none" }}
                      onClick={handleCloseUserMenu}
                    >
                      {t("profile")}
                    </MenuItem>
                  </Link>
                  <Link to="/mycourses" style={textstyle}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      {t("myCourses")}
                    </MenuItem>
                  </Link>
                  <Link to="/paymenthistory" style={textstyle}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      {t("paymentHistory")}
                    </MenuItem>
                  </Link>
                  <Link to="/myfeedback" style={textstyle}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      {t("myFeedbacks")}
                    </MenuItem>
                  </Link>
                  {/* <Link to="/dectivateaccount" style={textstyle}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      {t("deactivateAccount")}
                    </MenuItem>
                  </Link> */}
                </Menu>

                <Button
                  className="Login"
                  variant="contained"
                  sx={{
                  color: "other.white",
                  backgroundColor: "secondary.main",
                    "&:hover": {
                      color: "other.white",
                      backgroundColor: "secondary.main",
                      border: "1px solid",
                      borderColor: "other.white",
                    },
                  }}
                  onClick={() => {
                    api
                      .post(baseURL + "/api/logout")
                      .then((res) => {
                        // //console.log("After logout clicked ", res.data.result);
                        if (res.data.result.status === 200) {
                          localStorage.removeItem("access_token");
                          localStorage.removeItem("refresh_token");
                          localStorage.removeItem("user");
                          swal(
                            "Log out success",
                            "Redirecting to login page",
                            "success"
                          );
                          setTimeout(function () {
                            window.location.href = "/login";
                          }, 1000);
                        } else if (res.data.result.status === 404) {
                          localStorage.removeItem("access_token");
                          localStorage.removeItem("refresh_token");
                          localStorage.removeItem("user");
                          swal(
                            "You are already logged out!",
                            "Please login again!",
                            "error"
                          );
                          setTimeout(function () {
                            window.location.href = "/login";
                          }, 1000);
                        }
                      })
                      .catch((err) => {
                        swal("Opps!", "There is a server error", "error");
                        // window.location.href = "/login";
                      });
                  }}
                >
                  {t("logout")}
                </Button>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <AccountCircleIcon
                  onClick={handleOpenUserMenu}
                  sx={{
                    cursor: "pointer",
                    fontSize: "2rem",
                    color: "other.white",
                    transition: "0.3s ease-in-out",
                    padding: "5px",
                    "&:hover": {
                      color: "secondary.main",
                      backgroundColor: "other.white",
                      borderRadius: "5px",
                    },
                  }}
                />
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link to="/userprofile" style={textstyle}>
                    <MenuItem
                      sx={{ color: "other.black" }}
                      onClick={handleCloseUserMenu}
                    >
                      {t("profile")}
                    </MenuItem>
                  </Link>
                  <Link to="/mycourses" style={textstyle}>
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{ color: "other.black" }}
                    >
                      {t("myCourses")}
                    </MenuItem>
                  </Link>
                  <Link to="/paymenthistory" style={textstyle}>
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{ color: "other.black" }}
                    >
                      {t("paymentHistory")}
                    </MenuItem>
                  </Link>
                  <Link to="/myfeedback" style={textstyle}>
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{ color: "other.black" }}
                    >
                      {t("myFeedbacks")}
                    </MenuItem>
                  </Link>
                  {/* <Link to="/dectivateaccount" style={textstyle}>
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{ color: "other.black" }}
                    >
                      {t("deactivateAccount")}
                    </MenuItem>
                  </Link> */}
                </Menu>
                <LogoutIcon
                  onClick={() => {
                    api
                      .post(baseURL + "/api/logout")
                      .then((res) => {
                        if (res.data.result.status === 200) {
                          localStorage.removeItem("access_token");
                          localStorage.removeItem("refresh_token");
                          localStorage.removeItem("user");
                          swal(
                            "Log out success",
                            "Redirecting to login page",
                            "success"
                          );
                          setTimeout(function () {
                            window.location.href = "/login";
                          }, 1000);
                        } else if (res.data.result.status === 404) {
                          localStorage.removeItem("access_token");
                          localStorage.removeItem("refresh_token");
                          localStorage.removeItem("user");
                          swal(
                            "You are already logged out!",
                            "Please login again!",
                            "error"
                          );
                          setTimeout(function () {
                            window.location.href = "/login";
                          }, 1000);
                        }
                      })
                      .catch((err) => {
                        swal("Opps!", "There is a server error", "error");
                        // window.location.href = "/login";
                      });
                  }}
                  sx={{
                    cursor: "pointer",
                    fontSize: "2rem",
                    color: "other.white",
                    transition: "0.3s ease-in-out",
                    padding: "5px",
                    "&:hover": {
                      color: "secondary.main",
                      backgroundColor: "other.white",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Box>
            </Stack>
          ) : (
            <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Link
                  className="Link"
                  style={{ textDecoration: "none" }}
                  to="/login"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      color: "other.white",
                      backgroundColor: "secondary.main",
                      "&:hover": {
                        color: "other.white",
                        backgroundColor: "secondary.main",
                        border: "1px solid",
                        borderColor: "other.white",
                      },
                    }}
                  >
                    {t("login")}
                  </Button>
                </Link>
                <Link
                  className="Link"
                  style={{ textDecoration: "none" }}
                  to="/registration"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "other.white",
                      color: "other.white",
                      marginLeft: "15px",
                      "&:hover": {
                        backgroundColor: "other.white",
                        color: "secondary.main",
                      },
                    }}
                  >
                    {t("signUp")}
                  </Button>
                </Link>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <Link
                  className="Link"
                  style={{ textDecoration: "none" }}
                  to="/login"
                >
                  <Typography
                    sx={{
                      color: "other.white",
                      transition: "0.3s ease-in-out",
                      padding: "5px",
                      "&:hover": {
                        color: "secondary.main",
                        backgroundColor: "other.white",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    <LoginIcon />
                  </Typography>
                </Link>
                <Link
                  className="Link"
                  style={{ textDecoration: "none" }}
                  to="/registration"
                >
                  <Typography
                    sx={{
                      marginLeft: "10px",
                      transition: "0.2s ease-in-out",
                      padding: "5px",
                      color: "other.white",
                      "&:hover": {
                        color: "secondary.main",
                        backgroundColor: "other.white",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    <HowToRegIcon />
                  </Typography>
                </Link>
              </Box>
            </Stack>
          )}
          <MaterialUISwitch
            sx={{ m: 0 }}
            checked={!props.darkmode}
            onClick={() => {
              if (props.currentstatus === "theme") {
                props.themestatus("darkTheme");
                localStorage.setItem("theme", props.currentstatus);
              } else {
                props.themestatus("theme");
                localStorage.setItem("theme", props.currentstatus);
              }

              // setmode
            }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigationbar;
