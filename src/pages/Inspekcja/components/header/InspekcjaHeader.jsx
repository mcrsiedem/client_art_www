import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./InspekcjaHeader.module.css";
import iconClose2 from "assets/x2.svg";
import iconCopy from "assets/copy.svg";

import iconWC from "assets/wc.svg";
import { useNavigate } from "react-router-dom";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { reg_int } from "utils/initialvalue";

export default function InspekcjaHeader() {
  const navigate = useNavigate();
  const effectRan = useRef(false);

    const appContext = useContext(AppContext)
    const techContext = useContext(TechnologyContext);
    const oddaniaGrupy =appContext.oddaniaGrupy;
    const setOddaniaGrupy =appContext.setOddaniaGrupy;

  useEffect(() => {
    if (effectRan.current === true) {
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  //---------------------------------------------------------

  return (
    <div onDoubleClick={()=>{ console.log(oddaniaGrupy)}} className={style.container}>
      <header id="header" className={style.body}>
        <div className={style.leftHeaderContener}>
          <p className={style.title2}>INSPEKCJA ZAMÓWIENIA </p>
          {/* <RefreshOddania/> */}
           {/* <DataWyswietlania/> */}
        </div>

        <div className={style.centerHeaderContener}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                {/* <p className={style.title2}>ID: </p> */}
                <ID />
                          </div>
       
        </div>
        <div className={style.rightHeaderContener}>
          {/* <FILTROWANIE_ODDANYCH/> */}
     {/* <Szukaj/> */}

     {/* <KOPIUJ_ZAZNACZONE_BTN/> */}
          <img
            className={style.icon}
            src={iconClose2}
            onClick={() => {
              navigate("/Zamowienia");
            }}
            alt="React Logo"
          />
        </div>
      </header>
    </div>
  );
}





function ID( ){

  const appContext = useContext(AppContext)
 const [valueIN,setValueIN] = useState(appContext.idZamowieniaDiag)
  return(
      <div className={style.col}>
      <label className={style.label}> ID ZAMÓWIENIA: </label>
      <input className={style.input} type="text"
      // disabled
      // title="Nakład dodaj w parametrach"
      value={valueIN}

      onBlur={(e) => {
                    if (e.target.value === "" || reg_int.test(e.target.value)) {
                      appContext.setIdZamowieniaDiag(valueIN)
            }
      }}
      
            onChange={(e) => {
                    if (e.target.value === "" || reg_int.test(e.target.value)) {
                      setValueIN(e.target.value)
            }
      }}
      
      
      ></input>
    </div>
  );
}