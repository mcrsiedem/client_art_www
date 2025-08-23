import { useState, useEffect, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { _typ_elementu } from "utils/initialvalue";
import DecodeToken from "pages/Login/DecodeToken";
export function useAccess() {
  const techContext = useContext(TechnologyContext);
  const selectedProces = techContext.selectedProces;

  //----------------------------------------------------------------

  const wolno = () => {

    //nazwa_id ==1  drduk
    if (DecodeToken(sessionStorage.getItem("token")).manage_druk == 1 && selectedProces == 1) {
      return true;
    }

    //nazwa_id ==3  falc
    if (DecodeToken(sessionStorage.getItem("token")).manage_falc == 1 && selectedProces == 3) {
      return true;
    }


   //nazwa_id ==3  falc
    if (DecodeToken(sessionStorage.getItem("token")).manage_inne == 1 && selectedProces == 2) {
      return true;
    }

        if (DecodeToken(sessionStorage.getItem("token")).manage_oprawa == 1 && selectedProces == 6) {
      return true;
    }

    return false
  };


    const wolno_procesor = (process) => {
   

    //nazwa_id ==1  drduk
    if (DecodeToken(sessionStorage.getItem("token")).manage_druk == 1 && process == 1) {
      return true;
    }

    //nazwa_id ==3  falc
    if (DecodeToken(sessionStorage.getItem("token")).manage_falc == 1 && process == 3) {
      return true;
    }





    return false
  };

  //----------------------------------------------------------------

  return [wolno,wolno_procesor];
}
