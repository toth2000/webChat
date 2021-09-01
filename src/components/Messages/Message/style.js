import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  sentcontainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "4px",
    marginBottom: "8px",
  },

  messageText: {
    wordBreak: "break-word",
  },

  receivedcontainer: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "4px",
    marginBottom: "8px",
  },

  sentTextContainer: {
    paddingLeft: "8px",
    paddingRight: "8px",
    justifyItems: "flexEnd",
    backgroundColor: "#c041c4",
    borderRadius: "8px",
  },
  receiveTextContainer: {
    paddingLeft: "8px",
    paddingRight: "8px",
    justifyItems: "flexEnd",
    backgroundColor: "#7a2cd4",
    borderRadius: "8px",
  },

  timeText: {
    color: "black",
  },

  seenIcon: {
    color: "blue",
  },
});
