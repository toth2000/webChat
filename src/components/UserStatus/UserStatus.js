import React, { useEffect, useState } from "react";
import { ref, onDisconnect, onValue, set, remove } from "@firebase/database";
import { Grid, Container } from "@material-ui/core";
import ScrollToBottom from "react-scroll-to-bottom";

import { database } from "../../firebase";
import { useStyles } from "./style";
import User from "../User/User";

const UserStatus = ({ chatList, currentUid }) => {
  const statusRef = ref(database, `status/${currentUid}`);
  const classes = useStyles();

  const [activeUser, setActiveUser] = useState([]);

  /**Getting List of active users */
  useEffect(() => {
    onValue(ref(database, "/status"), (snapshot) => {
      try {
        if (!snapshot.exists) return;
        const data = snapshot.val();
        const mutualActive = [];
        Object.keys(chatList).forEach((key) => {
          if (data[key] && key !== currentUid) mutualActive.push(key);
        });
        setActiveUser(mutualActive);
      } catch (error) {}
    });
  }, [chatList]);

  /**Checking User Online Status of current User*/
  useEffect(() => {
    const infoRef = ref(database, "/info/connected");
    onValue(infoRef, (snapshot) => {
      if (snapshot.val() === false) return;

      onDisconnect(statusRef)
        .remove(statusRef)
        .then(() => {
          set(statusRef, true);
        });
    });
  }, [currentUid]);

  /**For Message Delivery status, deleting all messages of the current user from delivery node when user is online */
  useEffect(() => {
    const deliveredRef = ref(database, `delivered/${currentUid}`);
    onValue(
      deliveredRef,
      (snapshot) => {
        if (snapshot.exists()) remove(deliveredRef);
      },
      [currentUid]
    );
  });

  return (
    <Grid
      className={classes.statusGrid}
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Container maxWidth="xs">
        <h4>Active Users</h4>
        <ScrollToBottom mode="top" className={classes.scroll}>
          {activeUser.map((key) => (
            <User uid={key} key={key} />
          ))}
        </ScrollToBottom>
      </Container>
    </Grid>
  );
};

export default UserStatus;
