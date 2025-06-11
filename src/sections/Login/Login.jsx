import * as React from "react";
import axios from "axios"
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import background from "../../resources/images/background.jpg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import { getSavedNews } from "../../network/newsApi";
import { useEffect } from "react";
import jwt_decode from "jwt-decode"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PetRescue
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Login = ({
}) => {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);  
    console.log(userObject);
    setUser(userObject);
  }
  
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "826939595349-p5a1egmkp20nqq8bij3bb7giiipqft5e.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
  
    const signInDiv = document.getElementById("signInDiv");
    if (signInDiv) {
      google.accounts.id.renderButton(signInDiv, { type: "standard", theme: "outline", size: "large" });
    }
  }, [])

  function handleCloseSnackBar(
    event,
    reason
  ) {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackBar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const navigate = useNavigate();

  console.log("token ");

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("suntem in handle submit")
    try {
      const response = await axios.post("http://localhost:8080/login", {email,password}); // Replace "/api/login" with your actual backend login endpoint
      console.log("raspunsul")
      // Assuming the response contains a token or user object
      const  token  = response.data;
  
      // Store the token in localStorage or any other state management solution
      localStorage.setItem("token", token.token);
      
      localStorage.setItem("email", token.email);
      localStorage.setItem("id", token.id.toString());
      //toast.success("Login Success");
      console.log("inainte de fetch saved articles")

      getSavedNews(token.id)
      .then(data=>{
        console.log("fetching...")
        console.log("news",data)
        const res = [];
        data.forEach(newItem=>{
        const i = {
            content: newItem.content,
            description: newItem.description,
            image: newItem.image,
            publishedAt: newItem.publishedAt,
            source: {name:newItem.sourceName,
            url: newItem.sourceUrl},
            title: newItem.title,
            url: newItem.url
          }
          res.push({
            content: newItem.content,
            description: newItem.description,
            image: newItem.image,
            publishedAt: newItem.publishedAt,
            source: {name:newItem.sourceName,
            url: newItem.sourceUrl},
            title: newItem.title,
            url: newItem.url
          });
          console.log("am ajuns la append")
        })
        localStorage.setItem("newsList", JSON.stringify(res)); // Convert to JSON string before storing in localStorage
        console.log("localStorageNewsList",localStorage.getItem("newsList"))
      })
      navigate("/");
    } catch (error) {
      console.log(error.message)
      //toast.error("Login Failed");
      setSnackBarMessage("Invalid credentials!");
      setOpenSnackBar(true);
      console.log(error);
    }

  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#fbe9c3", width: 70, height: 70 }}>
              <NewspaperRoundedIcon color="warning" sx={{ width: 40, height: 40 }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
              >
                {email}
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              >
                {password}
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <div id="signInDiv" style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", border: "1px solid transparent", padding: "10px", marginTop: "10px" }}></div>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2"></Link>
                </Grid>
                <Grid item>
                  <Link href="signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message={snackBarMessage}
                action={action}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              />
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
