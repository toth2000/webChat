import { Avatar, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { onValue, ref } from "@firebase/database";

import { useStyles } from "./style";
import { database } from "../../firebase";

const User = ({ chatId, uid, setChatId, setOtherUid, activeChat }) => {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  /**Getting User Data */
  useEffect(() => {
    const userRef = ref(database, `users/${uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUser(data);
    });
  }, []);

  return (
    <Grid
      className={activeChat ? classes.active : classes.grid}
      container
      justifyContent="flex-start"
      alignItems="center"
      onClick={() => {
        if (!setChatId || !setOtherUid) return;
        setOtherUid(uid);
        setChatId(chatId);
      }}
    >
      {user ? (
        <img
          className={classes.image}
          src={user.profile_picture}
          alt="profile_picture"
        />
      ) : (
        <Avatar className={classes.image} />
      )}

      <Typography variant="h6">{user ? user.name : "User Name"}</Typography>
    </Grid>
  );
};

export default User;
