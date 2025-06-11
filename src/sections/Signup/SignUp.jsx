import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';import axios from "axios"
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

const SignUp = (
  dataContext
) => {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [emailErrorText, setEmailErrorText] = useState("");
  const [firstNameErrorText, setFirstNameErrorText] = useState("");
  const [lastNameErrorText, setLastNameErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [phoneErrorText, setPhoneErrorText] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    //script.async = true;
    //script.defer = true;
    document.head.appendChild(script);
  }, []);

  function validateInput() {
    let isValid = true;
    if (!email) {
      setEmailErrorText("Email required!");
      isValid = false;
    } else {
      if (!email.includes("@")) {
        setEmailErrorText("Email not valid!");
      } else {
        setEmailErrorText("");
      }
    }
    if (!firstName) {
      setFirstNameErrorText("First name required");
      isValid = false;
    } else {
      setFirstNameErrorText("");
    }
    if (!lastName) {
      setLastNameErrorText("Last name required");
      isValid = false;
    } else {
      setLastNameErrorText("");
    }
    if (!phone) {
      setPhoneErrorText("Phone number required");
      isValid = false;
    } else {
      setPhoneErrorText("");
    }
    if (!password || !repeatPassword) {
      setPasswordErrorText("Password required!");
      isValid = false;
    } else {
      if (password !== repeatPassword) {
        setPasswordErrorText("Passwords does not match!");
        isValid = false;
      } else {
        setPasswordErrorText("");
      }
    }

    return isValid;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // form validation
    if (!validateInput()) {
      return;
    }
    try {
    const response = await axios.post("http://localhost:8080/signup", { firstName, lastName, email, password, phoneNumber: phone }); // Replace "/api/login" with your actual backend login endpoint
    console.log(response);
    setSnackBarMessage("Sign Up successful! Please check your email!");
    setOpenSnackBar(true);
    }catch(error) {
        console.log("Error", error.message);
        setSnackBarMessage(error.message.toString());
        setOpenSnackBar(true);
    }
  }

  function handleCloseSnackBar(
    event,
    reason
  ) {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  }

  function handleCloseSnackBarOnSignUpSuccessful(
    event,
    reason
  ) {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
    navigate("/login");
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

  const actionIfSignUpSuccessful = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackBarOnSignUpSuccessful}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

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
          <Avatar sx={{ m: 1, bgcolor: "#fbe9c3", width: 70, height: 70 }}>
            <NewspaperRoundedIcon color="warning" sx={{ width: 40, height: 40 }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => setFirstName(event.target.value)}
                  error={!!firstNameErrorText}
                  helperText={firstNameErrorText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(event) => setLastName(event.target.value)}
                  error={!!lastNameErrorText}
                  helperText={lastNameErrorText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  error={!!emailErrorText}
                  helperText={emailErrorText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => setPassword(event.target.value)}
                  error={!!passwordErrorText}
                  helperText={passwordErrorText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password-confirm"
                  label="Confirm password"
                  type="password"
                  id="password-confirm"
                  autoComplete="new-password"
                  onChange={(event) => setRepeatPassword(event.target.value)}
                  error={!!passwordErrorText}
                  helperText={passwordErrorText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  type="tel"
                  inputProps={{ maxLength: 10 }}
                  onChange={(event) => setPhone(event.target.value)}
                  error={!!phoneErrorText}
                  helperText={phoneErrorText}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3, mb: 2, fontSize: 18 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Log in
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
            <Snackbar
              open={openSnackBar}
              autoHideDuration={6000}
              onClose={handleCloseSnackBarOnSignUpSuccessful}
              message={snackBarMessage}
              action={actionIfSignUpSuccessful}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            />
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;