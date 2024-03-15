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
      <div style={{
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}>

<div style={{
          position: "absolute",
          left:"0",
          background: "#a5cc52",
          height: "50px",
          width: "25px",

        }}></div>

        <div style={{
          // position: "absolute",
          // right:"0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "250px",
        }}>+ {props.sztuki} szt. </div>

        {/* <div style={{
          position: "absolute",
          right:"0",
          background: "#a5cc52",
          height: "50px",
          width: "20px",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px"
        }}></div> */}
        
      </div>
    </div>
  );
});
export default Dialog;
