import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./DiagnostykaHeader.module.css";
import iconClose2 from "assets/x2.svg";
import iconCopy from "assets/copy.svg";

import iconWC from "assets/wc.svg";
import { useNavigate } from "react-router-dom";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";

function DiagnostykaHeader() {
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
          <p className={style.title2}>INSPEKCJA ZMAÓWIENIA </p>
          {/* <RefreshOddania/> */}
           {/* <DataWyswietlania/> */}
        </div>

        <div className={style.centerHeaderContener}>
        </div>
        <div className={style.rightHeaderContener}>
          {/* <FILTROWANIE_ODDANYCH/> */}
     {/* <Szukaj/> */}

     {/* <KOPIUJ_ZAZNACZONE_BTN/> */}
          <img
            className={style.icon}
            src={iconClose2}
            onClick={() => {
              navigate("/Panel");
            }}
            alt="React Logo"
          />
        </div>
      </header>
    </div>
  );
}

export default DiagnostykaHeader;


