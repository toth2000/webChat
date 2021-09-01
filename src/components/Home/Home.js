import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { CircularProgress, Grid } from "@material-ui/core";

import { auth } from "../../firebase";
import SignIn from "../SignIn/SignIn";
import { useStyles } from "./style";
import Messages from "../Messages/Messages";
import Chat from "../Chat/Chat";
import UserStatus from "../UserStatus/UserStatus";
import Appbar from "../AppBar/AppBar";

const Home = () => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(null);
  const [progress, setProgress] = useState(true);
  const [chatId, setChatId] = useState(null);
  const [otherUid, setOtherUid] = useState(null);
  const [chat, setChat] = useState(null);

  /**Checking if user is logged in */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
      else setCurrentUser(null);

      setProgress(false);
    });
  }, []);

  return (
    <>
      <Appbar user={currentUser} setChatId={setChatId} />
      <Grid
        className={classes.grid}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: "92vh" }}
      >
        {progress && <CircularProgress />}
        {!currentUser ? (
          <SignIn />
        ) : (
          <>
            <Grid
              container
              direction="row"
              alignItems="stretch"
              justifyContent="center"
            >
              <Chat
                chat={chat}
                setChat={setChat}
                chatId={chatId}
                user={currentUser}
                setChatId={setChatId}
                setOtherUid={setOtherUid}
              />
              <Messages
                currentUid={currentUser?.uid}
                chatId={chatId}
                otherUid={otherUid}
              />
              <UserStatus chatList={chat} currentUid={currentUser?.uid} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Home;
