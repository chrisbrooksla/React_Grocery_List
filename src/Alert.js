import React, { useEffect } from "react";

// grab the properties (destructure) from our "alert" state value from App.js...
const Alert = ({ type, msg, removeAlert, list }) => {
  // set up a useEffect that removes the alert after 3 seconds using the removeAlert() function we defined in App.js...
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
    // [] means this happens when the component renders...
    // so once something changes in our list, we clear out the old timeout function and start a new 3 second countdown...
  }, [list]);
  // this will return an alert with the "alert" class AND either the "alert-danger" or "alert-success" class, along with the message...
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
