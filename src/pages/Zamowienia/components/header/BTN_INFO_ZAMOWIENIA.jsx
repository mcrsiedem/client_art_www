import { useContext } from "react";
import style from "./BTN_INFO_ZAMOWIENIA.module.css";
import { AppContext } from "context/AppContext";
import iconCopy from "assets/info.svg";
import { _etapy_produkcji } from "utils/initialvalue";
import { getZamowieniaInfo } from "actions/getZamowieniaInfo";

export default function BTN_INFO_ZAMOWIENIA() {
  const contextApp = useContext(AppContext);
  const showZamowieniaInfo = contextApp.showZamowieniaInfo;
  const setShowZamowieniaInfo = contextApp.setShowZamowieniaInfo;
  const setZamowieniaInfo = contextApp.setZamowieniaInfo;

  
  const zamowienia = contextApp.zamowienia.filter(x=>x.select==true && x.technologia_id != null).map(x => {return {id: x.id}}  );
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
  return (
    <img
      title="Info"
      className={style.icon}
      src={iconCopy}
      onClick={() => {
        // setShowZamowieniaInfo(true);
              getZamowieniaInfo(zamowienia,setShowZamowieniaInfo,setZamowieniaInfo)

            // zmienEtapWydrukowane(zamowienia.filter(x=> x.technologia_id != null && x.etap != 16).map(x => {return {technologia_id: x.technologia_id, status: x.status}}  ))

      }}
      alt="React Logo"
    />
  );
}
