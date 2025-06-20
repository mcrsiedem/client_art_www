import { useContext } from "react";
import style from "./BTN_INFO_ZAMOWIENIA.module.css";
import { AppContext } from "context/AppContext";
import iconCopy from "assets/info.svg";
import { _etapy_produkcji } from "utils/initialvalue";

export default function BTN_INFO_ZAMOWIENIA() {
  const contextApp = useContext(AppContext);
  const showZamowieniaInfo = contextApp.showZamowieniaInfo;
  const setShowZamowieniaInfo = contextApp.setShowZamowieniaInfo;
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
  return (
    <img
      title="Info"
      className={style.icon}
      src={iconCopy}
      onClick={() => {
        setShowZamowieniaInfo(true);
      }}
      alt="React Logo"
    />
  );
}
