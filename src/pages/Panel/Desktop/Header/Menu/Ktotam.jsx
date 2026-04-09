import { AppContext } from "context/AppContext";
import React, { useContext } from "react";


export default function Ktotam ({socket,hipopotemDialogBox,setIsOpen}){
   const appcontext = useContext(AppContext);
      
      const pokazUzytkownikowOnline = appcontext.pokazUzytkownikowOnline;
      const setPokazUzytkownikowOnline = appcontext.setPokazUzytkownikowOnline;
  return(
                  <li
                onClick={() => {
                  setPokazUzytkownikowOnline(!pokazUzytkownikowOnline)
                  if (socket) {
                    socket.emit("ktotam");
                  }

  // hipopotemDialogBox.current.show();
  // hipopotemDialogBox.current.showOK();
  // hipopotemDialogBox.current.hide();



                  setIsOpen(false);
                }}
              >
                Kto tam?
              </li>
  )
}