import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
  },
  closeIcon: {
    position: "absolute",
    top: -11,
    right: -12,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderRadius: "100%",
    display: "flex",
  },
}));

export default function IframeModal(props) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={Boolean(props.open)}>
          <div
            style={{ width: "60vw", height: "80vh", position: "relative" }}
            className={classes.paper}
          >
            <iframe
              id="iframe"
              src={props.url}
              style={{ height: "100%", width: "100%" }}
              allowfullscreen
            ></iframe>
            <div className={classes.closeIcon}>
              <IconButton onClick={props.handleClose}>
                <Close />
              </IconButton>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
