import React from "react";


export default function Ktotam ({socket,hipopotemDialogBox,setIsOpen}){

  return(
                  <li
                onClick={() => {
                  if (socket) {
                    socket.emit("ktotam");
                  }

  hipopotemDialogBox.current.show();
  hipopotemDialogBox.current.showOK();
  hipopotemDialogBox.current.hide();



                  setIsOpen(false);
                }}
              >
                Kto tam?
              </li>
  )
}