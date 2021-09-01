import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { set, ref } from "firebase/database";
import { Button, Container } from "@material-ui/core";

import { auth, database } from "../../firebase";
import { useStyles } from "./style";
import GoogleIcon from "./GoogleIcon";

const SignIn = () => {
  const classes = useStyles();

  const writeUserData = async (user) => {
    set(ref(database, "users/" + user.uid), {
      name: user.displayName,
      uid: user.uid,
      email: user.email,
      profile_picture: user.photoURL,
    });
  };

  const handleSignIn = async () => {
    if (auth.currentUser !== null) {
      alert("Already Signed In");
      return;
    }

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        const user = result.user;
        console.log("user", user);
        writeUserData(user);
      })
      .catch((error) => {
        alert("Sign In error. Please try again later");
        console.log("Firebase Auth getAuth", error);
      });
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      <h1>Sign In To Continue</h1>
      <Button
        variant="contained"
        onClick={handleSignIn}
        startIcon={<GoogleIcon />}
      >
        Sign In With Google
      </Button>
    </Container>
  );
};

export default SignIn;
