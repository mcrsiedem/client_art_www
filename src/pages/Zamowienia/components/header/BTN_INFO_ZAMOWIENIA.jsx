import { useContext } from "react";
import style from "./BTN_INFO_ZAMOWIENIA.module.css";
import { AppContext } from "context/AppContext";
import iconCopy from "assets/info.svg";
import { _etapy_produkcji } from "utils/initialvalue";



export default function BTN_INFO_ZAMOWIENIA() {
  const contextApp = useContext(AppContext);
  const setClients = contextApp.setClients;
  const clients = contextApp.clients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
  const zamowienia = contextApp.zamowienia;
  const zamowieniaWyszukiwarka = contextApp.zamowieniaWyszukiwarka;
  const setZamowienia = contextApp.setZamowienia;
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
  return (
<img
          title="Info"
          className={style.icon}
          src={iconCopy}
          onClick={() => {
  
let mes='';


            for( let grupa of zamowienia.filter(x=> x.select == true)){
              mes += grupa.nr+"\t"
              mes +=  grupa.stary_nr || " "+"\t"
              mes += grupa.klient+"\t"
              mes += grupa.tytul+"\t"
              mes += grupa.naklad+"\t"
              mes += grupa.ilosc_stron+"\t"
              mes += grupa.data_przyjecia+"\t"
              mes += grupa.data_spedycji+"\t"
              mes += grupa.format_x+"x"+grupa.format_y+"\t"
              mes += grupa.oprawa+"\t"
              mes += _etapy_produkcji.filter((s) => s.id == grupa.etap).map((x) => x.nazwa)+"\t"
              mes += grupa.opiekun+"\t"



              
              // mes += grupa.przeloty+ " ark. \t"
              mes += "\n"

            }

            setZamowienia(
              zamowienia.map((t) => {
                  return { ...t, select: false};
              })
            );

            navigator.clipboard.writeText(mes);





          }}
          alt="React Logo"
        /> 
  );
}