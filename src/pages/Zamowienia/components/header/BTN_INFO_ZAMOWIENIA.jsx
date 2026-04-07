import { useCallback, useContext, useMemo } from "react";
import style from "./BTN_INFO_ZAMOWIENIA.module.css";
import { AppContext } from "context/AppContext";
import iconCopy from "assets/info.svg";
import { _etapy_produkcji } from "utils/initialvalue";
import axios from "axios";
import { IP } from "utils/Host";

export default function BTN_INFO_ZAMOWIENIA() {
  const {setShowZamowieniaInfo,setZamowieniaInfo,zamowienia,setIsLoading} = useContext(AppContext);
  

  const zamowieniaFiltred = useMemo(() => {
    return zamowienia
      .filter(x => x.select === true && x.technologia_id != null)
      .map(x => ({ id: x.id }));
  }, [zamowienia]);
  
const getZamowieniaInfo = useCallback(() => {
    const token = sessionStorage.getItem("token");
    
    axios.put(`${IP}zamowieniaInfo/${token}`, zamowieniaFiltred)
      .then((res) => {
        setZamowieniaInfo(res.data);
        setShowZamowieniaInfo(true);
        setIsLoading(false)
      })
      .catch(err => console.error("Błąd pobierania info:", err));
  }, [zamowieniaFiltred, setZamowieniaInfo, setShowZamowieniaInfo]);
  
  return (
    <img
      title="Info"
      className={style.icon}
      src={iconCopy}
      onClick={() => {
        if(zamowieniaFiltred.length >0){
          setIsLoading(true)
          getZamowieniaInfo()
        }
              
      }}
      alt="React Logo"
    />
  );
}

