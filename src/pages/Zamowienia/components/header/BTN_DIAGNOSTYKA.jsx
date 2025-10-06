import { useContext } from "react";
import style from "./BTN_INFO_ZAMOWIENIA.module.css";
import { AppContext } from "context/AppContext";
// import iconCopy from "assets/diagnostyka_zielona.svg";
import iconCopy from "assets/inspekcja.svg";
import { _etapy_produkcji } from "utils/initialvalue";
import { getZamowieniaInfo } from "actions/getZamowieniaInfo";
import { sendMail } from "actions/sendMail";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useNavigate } from "react-router-dom";

export default function BTN_DIAGNOSTYKA() {
  const contextApp = useContext(AppContext);
  const modalContext = useContext(ModalInsertContext);
  const setShowZamowieniaInfo = contextApp.setShowZamowieniaInfo;
  const setZamowieniaInfo = contextApp.setZamowieniaInfo;
    const navigate = useNavigate();
  
  // const zamowienia = contextApp.zamowienia.filter(x=>x.select==true && x.technologia_id != null).map(x => {return {id: x.id}}  );
  return (
    <img
      title="Info"
      className={style.icon}
      src={iconCopy}
      onClick={() => {
       contextApp.setIdZamowieniaDiag(modalContext.selectedZamowienie.id)
       navigate("/Diagnostyka");


      }}
      alt="React Logo"
    />
  );
}
