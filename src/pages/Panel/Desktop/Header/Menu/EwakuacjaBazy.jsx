import React from "react";
import axios from "axios";
import { IP } from "utils/Host";
import DecodeToken from "pages/Login/DecodeToken";
export default function EwakuacjaBazy ({setIsOpen}){

  if(DecodeToken(sessionStorage.getItem("token")).id == 1){
 return(
             
                <li
                  onClick={async () => {
                    const res = await axios.get(
                      IP + "backup/" + sessionStorage.getItem("token")
                    );
                    setIsOpen(false);
                  }}
                >
                  Ewakuacja bazy
                </li>
              ) 
  }

  
}