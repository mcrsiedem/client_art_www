// import axios from "axios";
// import { IP } from "utils/Host";

import { useState,useEffect,useRef,useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";



export function useHistoria(row){
const modalcontext = useContext(ModalInsertContext);
const historiaZamowienia = modalcontext.historiaZamowienia;
const setHistoriaZamowienia = modalcontext.setHistoriaZamowienia;


function add(row) {

const new_historia = historiaZamowienia.slice();

new_historia.push({...row, user_id: DecodeToken(sessionStorage.getItem("token")).id,insert:true})

      setHistoriaZamowienia(new_historia)

      // console.log("add")
}




  return [add];
}
