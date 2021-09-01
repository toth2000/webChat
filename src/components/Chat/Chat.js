import React, { useEffect, useState } from "react";
import { onValue, ref, update } from "@firebase/database";
import { Grid, Container, TextField, Button } from "@material-ui/core";
import ScrollToBottom from "react-scroll-to-bottom";

import { database } from "../../firebase";
import { useStyles } from "./style";
import User from "../User/User";

const Chat = ({ user, setChatId, setOtherUid, chatId, chat, setChat }) => {
  const classes = useStyles();
  const [addUser, setAddUser] = useState("");

  /**Fetting all chats/conversations */
  useEffect(() => {
    const chatRef = ref(database, `chats/${user?.uid}`);
    onValue(chatRef, (snapshot) => {
      try {
        const data = snapshot.val();
        setChat(data);
      } catch (error) {
        console.log("Chat.js useEffect fetch chat", error);
      }
    });
  }, [user?.uid]);

  const handleInputChange = (event) => {
    setAddUser(event.target.value);
  };

  const writeUser = (addUserUid) => {
    const chatRef = ref(database, `chats/${user.uid}/${addUserUid}`);

    onValue(
      chatRef,
      (snapshot) => {
        if (snapshot.exists()) {
          alert("User is already available in your chat.");
          return;
        }

        const chat = {
          chatId: `${user.uid}-${addUserUid}`,
        };

        const updates = {};
        updates[`chats/${user.uid}/${addUserUid}`] = chat;
        updates[`chats/${addUserUid}/${user.uid}`] = chat;
        setAddUser("");
        update(ref(database), updates);
      },
      { onlyOnce: true }
    );
  };

  const checkIfUserExists = () => {
    if (user.email === addUser) {
      alert("You can not add yourself");
      return;
    }

    const userRef = ref(database, "users");
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        try {
          for (var key in snapshot.val()) {
            if (snapshot.val()[key].email === addUser) {
              writeUser(snapshot.val()[key].uid);
              return;
            }
          }
        } catch (error) {
          console.log("checkIfUserExists method", error);
        }
      }
      alert("Invalid Email, User does not exist");
    });
  };

  return (
    <Grid
      className={classes.chatGrid}
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Container maxWidth="xs">
        <h4>Conversations</h4>
        <ScrollToBottom mode="top" className={classes.scroll}>
          {chat &&
            Object.keys(chat).map((key) => (
              <User
                activeChat={
                  chatId && chatId === chat[key].chatId ? true : false
                }
                uid={key}
                chatId={chat[key].chatId}
                key={key}
                setChatId={setChatId}
                setOtherUid={setOtherUid}
              />
            ))}
        </ScrollToBottom>
        <Grid
          className={classes.inputGrid}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            className={classes.input}
            variant="outlined"
            label="Enter Email"
            type="text"
            value={addUser}
            margin="dense"
            onChange={(e) => handleInputChange(e)}
            onKeyPress={(event) =>
              event.key === "Enter" ? checkIfUserExists() : null
            }
          />

          <Button variant="outlined" onClick={checkIfUserExists}>
            Add User
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Chat;
