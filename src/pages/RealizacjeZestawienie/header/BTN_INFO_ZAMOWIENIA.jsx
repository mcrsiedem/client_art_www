import { useContext } from "react";
import style from "./BTN_INFO_ZAMOWIENIA.module.css";
import { AppContext } from "context/AppContext";
import iconCopy from "assets/info.svg";
import { _etapy_produkcji } from "utils/initialvalue";
import { getZamowieniaInfo } from "actions/getZamowieniaInfo";
import { sendMail } from "actions/sendMail";

export default function BTN_INFO_ZAMOWIENIA() {
  const contextApp = useContext(AppContext);
  const setShowZamowieniaInfo = contextApp.setShowZamowieniaInfo;
  const setZamowieniaInfo = contextApp.setZamowieniaInfo;
  
  const zamowienia = contextApp.zamowienia.filter(x=>x.select==true && x.technologia_id != null).map(x => {return {id: x.id}}  );
  return (
    <img
      title="Info"
      className={style.icon}
      src={iconCopy}
      onClick={() => {
              getZamowieniaInfo(zamowienia,setShowZamowieniaInfo,setZamowieniaInfo)
              // sendMail(zamowienia,setShowZamowieniaInfo,setZamowieniaInfo)

      }}
      alt="React Logo"
    />
  );
}
