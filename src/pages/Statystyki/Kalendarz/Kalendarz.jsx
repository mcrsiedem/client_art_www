import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./Kalendarz.module.css"
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import iconClose2 from "assets/x2.svg";
import iconCopy from "assets/copy.svg";
import iconCalc from "assets/calc.svg";
import iconSheet from "assets/extract.svg";

import iconWC from "assets/wc.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { updateDeletePrzerwa } from "actions/updateDeletePrzerwa";  
import axios from "axios";
// import { IP } from "";
import { getZamowieniaInfoGrupy } from "actions/getZamowieniaInfoGrupy";
// import KALENDARZ_BTN from "./btn/KALENDARZ_BTN";
import Dzien from "./Dzien";
import { IP } from "utils/Host";
import { useStatystyki } from "hooks/useStatystyki";


export default function Kalendarz() {
  const [value, setValue] = useState("cos2");
  const navigate = useNavigate();

  const techContext = useContext(TechnologyContext);

  const appContext = useContext(AppContext)
  const kalendarz = appContext.kalendarz;
//    const [refreshKalendarz] = useStatystyki()



  return (
    <div className={style.container2}>


             {/* {
            [...Array(kalendarz).keys()].map(key => <Dzien key={key}/>)
             } */}

                        {kalendarz
                        //   .filter((x) => x.procesor_id == selectedProcesor && x.typ_grupy<3)
                          .map((grup, i) => {
            
                            return (<Dzien key={"ab"+i} grup={grup} />)
            
                            // if (grup.typ_grupy == 2) {
                            // return (<OprawaProcesViewRow grup={grup} unlockTable={unlockTable} setUnlockTable={setUnlockTable}/>)
                            // }
                            // else{
                            // return (<OprawaProcesViewRowPrzerwa grup={grup} unlockTable={unlockTable} setUnlockTable={setUnlockTable}/>)
            
            
                            // }
            
            
                          })}
    </div>
  );
}




