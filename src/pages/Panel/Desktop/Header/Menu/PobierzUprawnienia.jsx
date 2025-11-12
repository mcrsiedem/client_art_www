import { zabezpiecz } from "actions/zabezpiecz";
import React from "react";


export default function PobierzUprawnienia ({setIsOpen}){

  return(
              <li
                onClick={() => {
                  zabezpiecz();
                  setIsOpen(false);
                }}l
              >
                Pobierz uprawnienia
              </li>
  )
}