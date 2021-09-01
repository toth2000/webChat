import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  grid: {
    gap: "8px",
    marginBottom: "15px",
    backgroundColor: "gray",
    padding: "5px",
    borderRadius: "15px",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#c2c7ed",
    },

    "&:hover:active": {
      backgroundColor: "#cecfd6",
    },

    "&:hover:visited": {
      backgroundColor: "#8088c4",
    },
  },

  active: {
    gap: "8px",
    marginBottom: "15px",
    backgroundColor: "#d45d87",
    padding: "5px",
    borderRadius: "15px",
  },

  image: {
    marginLeft: "15px",
    height: "48px",
    width: "48px",
    borderRadius: "30px",
  },
});
