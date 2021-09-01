import React, { useEffect } from "react";
import moment from "moment";
import { Icon } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";

import { useStyles } from "./style";
import { onValue, ref, update } from "@firebase/database";
import { database } from "../../../firebase";

const Message = ({ msg, currentUid }) => {
  const classes = useStyles();

  /**Updating status to seen */
  useEffect(() => {
    if (msg?.receiverUid !== currentUid || msg?.status === "seen") return;

    const updates = {};
    updates[`messages/${msg?.chatId}/${msg?.messageId}/status`] = "seen";
    update(ref(database), updates);
  }, [msg]);

  /**Updating Status to delivered */
  useEffect(() => {
    if (
      msg?.receiverUid === currentUid ||
      msg?.status === "seen" ||
      msg?.status === "delivereed"
    )
      return;

    const deliveredRef = ref(
      database,
      `delivered/${msg?.receiverUid}/${msg?.chatId}/${msg?.messageId}`
    );
    console.log("msg", msg);

    onValue(deliveredRef, (snapshot) => {
      if (snapshot.exists()) return;

      const updates = {};
      updates[`messages/${msg?.chatId}/${msg?.messageId}/status`] = "delivered";
      update(ref(database), updates);
    });
  }, []);

  return (
    <div
      className={
        msg?.senderUid === currentUid
          ? classes.sentcontainer
          : classes.receivedcontainer
      }
    >
      <div
        className={
          msg?.senderUid === currentUid
            ? classes.sentTextContainer
            : classes.receiveTextContainer
        }
      >
        <p className={classes.messageText}>{msg.text}</p>
        {msg?.senderUid === currentUid && (
          <Icon>
            {msg?.status === "seen" && (
              <DoneAllIcon className={classes.seenIcon} />
            )}

            {msg?.status === "delivered" && (
              <DoneAllIcon className={classes.deliveredIcon} />
            )}

            {msg?.status === "sent" && (
              <DoneIcon className={classes.sentIcon} />
            )}
          </Icon>
        )}
      </div>
      <p className={classes.timeText}>{moment(msg.time).fromNow()}</p>
    </div>
  );
};

export default Message;
