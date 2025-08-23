import { IP } from "utils/Host";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
import { useZamowienia } from "./useZamowienia";
import { _typ_elementu } from "utils/initialvalue";
import { getNameOfEtapPliki } from "actions/getNameOfEtapPliki";
import DecodeToken from "pages/Login/DecodeToken";
import { useGrupyWykonan } from "./useGrupyWykonan";
import { updateWykonaniaOrazGrupaFromProcesView } from "actions/updateWykonaniaOrazGrupaFromProcesView";
export function useAccess() {
  const appcontext = useContext(AppContext);
  const modalcontext = useContext(ModalInsertContext);
  const techContext = useContext(TechnologyContext);

  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const procesList = appcontext.procesList;
  const setZamowieniaPliki = appcontext.setZamowieniaPliki;
  const grupaWykonan = techContext.grupaWykonan;
  const zamowienia = appcontext.zamowienia;
  const setZamowienia = appcontext.setZamowienia;

  const [sumujGrupe, statusGrupy] = useGrupyWykonan();
  const selectedProcesor = techContext.selectedProcesor;
  const selectedProces = techContext.selectedProces;

  const setWykonaniaAll = techContext.setWykonaniaAll;
  const setGrupWykonanAll = techContext.setGrupWykonanAll;

  //----------------------------------------------------------------

  const wolno = () => {
   console.log("OKs")

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
