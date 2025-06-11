import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import "../../css/UserProfile.css";
import { Textarea } from "@mui/joy";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { getUserByEmail, updateUser, uploadPicture } from "../../network/usersApi";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const UserProfile = ({

}) => {
 
  const [loggedUserEmail,setLoggedUserEmail] = useState(localStorage.getItem("email"))
  const [disabled, setDisabled] = useState(true);
  const [hideButton, setHideButton] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);
  const [biography, setBiography] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState(0);
  const [image, setImage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const hiddenFileInput = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Logged user email", loggedUserEmail);
    setLoggedUserEmail(localStorage.getItem("email") || loggedUserEmail);
    if (loggedUserEmail && loggedUserEmail !== "") {
      getUserByEmail(loggedUserEmail)
        .then((user) => {
          setLoggedUser(user);
          if (user.biography) {
            setBiography(user.biography);
          }
          setLastName(user.lastName);
          setFirstName(user.firstName);
          setPhoneNumber(user.phoneNumber);
          setEmail(user.email);
          setUserId(user.id);
        })
        .catch((error) => {
          console.log("the user does not exist");
        });
    } else {
      navigate("/login");
    }
  }, [loggedUserEmail]);

  useEffect(() => {
    console.log("USE EFFECT ", loggedUserEmail);
  }, [loggedUserEmail]);

  function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    setHideButton(true);
    if (loggedUser) {
      updateUser({
        ...loggedUser,
        biography: biography,
        firstName,
        lastName,
        phoneNumber,
      })
        .then(() => {
          console.log("Update user");
          getUserByEmail(loggedUserEmail)
            .then((user) => {
              console.log("after update ", user);
              setLoggedUser(user);
              setSnackBarMessage("Info updated successfully!");
              setOpenSnackBar(true);
            })
            .catch((error) => {
              console.log("the user does not exist");
            });
        })
        .catch((error) => {
          console.log(error.response.data, " could not make the update");
          setSnackBarMessage("Sorry, something went wrong! :(");
          setOpenSnackBar(true);
        });
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

  const handleUploadImage = (event) => {
    if (
      event.target.files &&
      (event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpg" ||
        event.target.files[0].type === "image/jpeg")
    ) {
      const fileUploaded = event.target.files[0];
      let data = new FormData();
      data.append("image", fileUploaded, fileUploaded.name);
      uploadPicture(userId, data, {
        headers: {
          "Content-Type": `multipart/form-data;`,
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
        .then(() => {
          const updatedUser = {
            ...loggedUser,
            picture: `user_${userId}.png`,
          };
          setImage(URL.createObjectURL(fileUploaded));
          setLoggedUser(updatedUser);
        })
        .catch((error) => {
          console.log(error.response.data, " could not make the update");
          setSnackBarMessage("Sorry, something went wrong! :(");
          setOpenSnackBar(true);
        });
    }
  };

  console.log("RENDEEEEEEER");

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <div className="MainProfileDiv">
          <div className="profile-container">
            <div className="top-portion">
              <div className="user-profile-bg-image">
                <img src="" alt=""></img>
              </div>
              <Avatar
                sx={{
                  width: 250,
                  height: 250,
                  position: "absolute",
                  transform: "translateX(50%)",
                  right: "50%",
                  bottom: "-1rem",
                  boxShadow: "1px 1px 12px 3px rgba(0,0,0,.8)",
                }}
                alt="Remy Sharp"
                src={
                  image ||
                  (loggedUser && loggedUser.picture !== ""
                    ? `http://localhost:8080/users/download/${loggedUser.picture}`
                    : require("../../resources/images/profile_picture.jpg"))
                }
                className="avatar"
                onClick={() => {
                  if (hiddenFileInput && hiddenFileInput.current) {
                    hiddenFileInput.current.click();
                  }
                }}
              />
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleUploadImage}
                style={{
                  display: "none",
                }} /* Make the file input element invisible */
              />
              <div>
                <div className="userName">{`${firstName} ${lastName}`}</div>
                <div
                  className="icon-div"
                  onClick={() => {
                    setDisabled(false);
                    setHideButton(false);
                  }}
                >
                  <BorderColorIcon></BorderColorIcon>
                </div>
              </div>
            </div>
            <div className="bottom-portion">
              <Box
                component="form"
                noValidate
                sx={{
                  marginTop: "7rem",
                }}
                onSubmit={handleSubmit}
              >
                <div className="bio-component">
                  <Textarea
                    minRows={3}
                    variant="plain"
                    sx={{
                      width: "100%",
                    }}
                    slotProps={{
                      textarea: {
                        id: "description",
                      },
                    }}
                    defaultValue={biography}
                    disabled={disabled}
                    onChange={(e) => {
                      setBiography(e.target.value);
                    }}
                  />
                </div>
                <div className="text-fields-grouped-2">
                  <TextField
                    label="First Name"
                    color="warning"
                    focused
                    sx={{
                      marginRight: "2rem",
                    }}
                    className="text-field-separated"
                    value={firstName}
                    disabled={disabled}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <TextField
                    label="Last Name"
                    color="warning"
                    className="text-field-separated"
                    focused
                    disabled={disabled}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
                <div className="text-fields-grouped-2">
                  <TextField
                    label="Email"
                    color="warning"
                    className="text-field-separated"
                    sx={{
                      marginRight: "2rem",
                    }}
                    disabled={disabled}
                    focused
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <TextField
                    label="Phone Number"
                    color="warning"
                    className="text-field-separated"
                    focused
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]{1,10}",
                    }}
                    disabled={disabled}
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="button-div" hidden={hideButton}>
                  <Button type="submit" variant="contained" color="warning">
                    Submit changes
                  </Button>
                </div>
                <div className="backButton">
                  <Button
                    onClick={() => {
                      navigate("/news");
                    }}
                    color="secondary"
                  >
                    <KeyboardBackspaceIcon color="warning"></KeyboardBackspaceIcon>
                  </Button>
                </div>
              </Box>

              <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message={snackBarMessage}
                action={action}
              />
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default UserProfile;