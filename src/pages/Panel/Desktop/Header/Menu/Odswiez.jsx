import React from "react";
import axios from "axios";
import { IP } from "utils/Host";
import DecodeToken from "pages/Login/DecodeToken";
export default function Odswiez ({setIsOpen}){


 return(
             
              <li
                onClick={() => {
                  window.location.reload(true);
                  setIsOpen(false);
                }}
              >
                Odśwież
              </li>
              ) 


  
}