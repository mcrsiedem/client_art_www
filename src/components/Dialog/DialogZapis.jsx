import React, { useState, forwardRef, useImperativeHandle } from "react";
import style from "../Dialog/DialogZapis.module.css"

export default function DialogZapis({dialogBox})  {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const s = [style.dialog,style.dialog2]
  useImperativeHandle(dialogBox, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
  }));

  return (
    <div className={s.join(' ')} >
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
        }}> szt. </div>

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
};

