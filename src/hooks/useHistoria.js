// import axios from "axios";
// import { IP } from "utils/Host";

import { useState,useEffect,useRef,useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";



export function useHistoria( initialValue){
const modalcontext = useContext(ModalInsertContext);
const historiaZamowienia = modalcontext.historiaZamowienia;
const setHistoriaZamowienia = modalcontext.setHistoriaZamowienia;

const [value, setValue] = useState(initialValue);

function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}
