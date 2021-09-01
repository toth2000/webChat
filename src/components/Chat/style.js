import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },

  scroll: {
    height: 500,
    width: "100%",
    marginTop: "8px",
    marginBottom: "8px",
  },

  inputGrid: {
    gap: "8px",
  },

  input:{width: "65%"},

  chatGrid: {
    backgroundColor: "#ade0d4",
    width: "auto",
  },
}));
