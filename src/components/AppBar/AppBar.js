import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { signOut } from "@firebase/auth";
import { ref, remove } from "firebase/database";

import { useStyle } from "./style";
import { auth } from "../../firebase";
import { database } from "../../firebase";

const Appbar = ({ user, setChatId }) => {
  const classes = useStyle();
  const [anchor, setAnchor] = useState({ open: false, anchorE1: null });

  const handleMenuOpen = (event) => {
    setAnchor({ open: true, anchorE1: event.currentTarget });
  };

  const handleMenuClose = () => {
    setAnchor({ open: false, anchorE1: null });
  };

  const handleLogout = () => {
    const uid = user?.uid;
    remove(ref(database, `status/${uid}`)).then(() => {
      signOut(auth);
      setChatId(null);
    });
    handleMenuClose();
  };

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h6">
          WebChat
        </Typography>
        <div className={classes.userBox}>
          <Typography variant="h6" className={classes.userName}>
            {user?.displayName}
          </Typography>
          {user && (
            <Avatar
              src={user?.photoURL}
              className={classes.avatar}
              aria-controls="simple-menu"
              aria-haspopup="false"
              onClick={(e) => handleMenuOpen(e)}
            />
          )}
          <Menu
            id="simple-menu"
            anchorEl={anchor.anchorE1}
            keepMounted
            open={Boolean(anchor.open)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
