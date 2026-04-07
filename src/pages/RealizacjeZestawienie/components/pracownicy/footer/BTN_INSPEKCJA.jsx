import { useContext } from "react";
import style from "./BTN_INFO_ZAMOWIENIA.module.css";
import { AppContext } from "context/AppContext";
import iconCopy from "assets/inspekcja_zielona.svg";
import { _etapy_produkcji } from "utils/initialvalue";
import { sendMail } from "actions/sendMail";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useNavigate } from "react-router-dom";

export default function BTN_INSPEKCJA() {
  const contextApp = useContext(AppContext);
  const modalContext = useContext(ModalInsertContext);
    const navigate = useNavigate();
  
  // const zamowienia = contextApp.zamowienia.filter(x=>x.select==true && x.technologia_id != null).map(x => {return {id: x.id}}  );
  return (
    <img
      title="Inspeckja zamówienia"
      className={style.icon}
      src={iconCopy}
      onClick={() => {
       contextApp.setIdZamowieniaDiag(modalContext.selectedZamowienie.id)
       navigate("/Inspekcja");


      }}
      alt="React Logo"
    />
  );
}
