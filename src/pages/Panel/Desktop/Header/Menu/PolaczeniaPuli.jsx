import React from "react";
import axios from "axios";
import { IP } from "utils/Host";
import DecodeToken from "pages/Login/DecodeToken";
export default function PolaczeniaPuli ({setIsOpen}){

  if(DecodeToken(sessionStorage.getItem("token")).id == 1){
 return(
             
                <li
                  onClick={async () => {
                    const res = await axios.get(
                      IP + "pool/" + sessionStorage.getItem("token")
                    );
                    console.log(`--- Status puli ---`);
                    console.log(res.data)
                    setIsOpen(false);
                  }}
                >
                  Połączenia w puli...
                </li>
              ) 
  }

  
}