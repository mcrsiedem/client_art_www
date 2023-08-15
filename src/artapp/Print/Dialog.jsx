import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./Dialog.css";

const Dialog = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
  }));

  return (
    <div className="dialog" id={showSnackbar ? "show" : "hide"}>
      <div
        style={{
          color: "white",
        }}
      >
        {" "}
        OK
      </div>
    </div>
  );
});
export default Dialog;
