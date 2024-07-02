import * as React from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

const Notif = () => {
  const notification = useSelector((state) => state.notifications);

  const handleClose = () => {
    // You can dispatch an action to clear the notification here if needed
  };

  if (notification === null) {
    return null;
  } else if (notification.type === "success") {
    return (
      <Snackbar
        open={true} // Set open to true to display the Snackbar
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="flex items-center">
          <CheckCircleOutlineIcon />
          <span className="ml-2">{notification.message}</span>
        </div>
      </Snackbar>
    );
  } else {
    return (
      <Snackbar
        open={true} // Set open to true to display the Snackbar
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="flex items-center">
          <CancelIcon />
          <span className="ml-2">{notification.message}</span>
        </div>
      </Snackbar>
    );
  }
};

export default Notif;
