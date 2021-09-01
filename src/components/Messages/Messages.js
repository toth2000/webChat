import React, { useEffect, useState } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import ScrollToBottom from "react-scroll-to-bottom";
import { onValue, ref, push, update } from "@firebase/database";
import moment from "moment";

import { useStyles } from "./style";
import Message from "./Message/Message";
import { database } from "../../firebase";

const Messages = ({ currentUid, otherUid, chatId }) => {
  const classes = useStyles();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState(null);

  /**Getting Messages from firebase */
  useEffect(() => {
    let mounted = true;

    const chatRef = ref(database, `messages/${chatId}`);
    onValue(chatRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (mounted) setMessages(data);
      } catch (error) {
        console.log("Messages useEffect fetch Message", error);
      }
    });

    return () => (mounted = false);
  }, [chatId]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSend = (event) => {
    if (!inputMessage) return;

    const chatRef = ref(database, `messages/${chatId}`);

    const messageKey = push(chatRef, "message").key;

    const message = {
      senderUid: currentUid,
      receiverUid: otherUid,
      status: "sent",
      chatId: chatId,
      messageId: messageKey,
      text: inputMessage,
      time: moment().toDate(),
    };

    const updates = {};
    updates[`messages/${chatId}/${messageKey}`] = message;
    updates[`delivered/${otherUid}/${chatId}/${messageKey}`] = false;
    setInputMessage("");

    update(ref(database), updates);
  };

  return (
    <Grid
      className={classes.messageGrid}
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <ScrollToBottom className={classes.scrollToBottom}>
        {messages &&
          Object.keys(messages).map((key) => (
            <Message currentUid={currentUid} msg={messages[key]} key={key} />
          ))}
      </ScrollToBottom>
      <Grid
        className={classes.inputGrid}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          className={classes.input}
          variant="outlined"
          type="text"
          margin="dense"
          value={inputMessage}
          disabled={!chatId}
          onChange={(e) => handleInputChange(e)}
          onKeyPress={(event) =>
            event.key === "Enter" ? handleSend(event) : null
          }
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => handleSend(e)}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

export default Messages;
