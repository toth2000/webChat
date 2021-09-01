import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles({
  title: {
    color: "#FFF",
    textDecoration: "none",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  userBox: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  },

  userName: {
    "@media screen and (max-width:800px)": {
      display: "none",
    },
  },

  avatar: {
    cursor: "pointer",
  },
});
