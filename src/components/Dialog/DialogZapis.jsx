import React, { useState, forwardRef, useImperativeHandle } from "react";
import style from "../Dialog/DialogZapis.module.css"

export default function DialogZapis({dialogBox})  {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const stylowanie = [style.dialog]
  useImperativeHandle(dialogBox, () => ({
    show() {
      setShowSnackbar(true);
    },
    hide(){
      setTimeout(() => {
        setShowSnackbar(false);
      }, 2000);
    }



  }));
if(showSnackbar){
    return (
    <div className={ stylowanie.join(' ') } >
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
}

};

