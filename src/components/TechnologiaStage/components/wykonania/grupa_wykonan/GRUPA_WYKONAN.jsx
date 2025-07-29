import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./GRUPA_WYKONAN.module.css";
import RowWykonanie from "../wykonanie/RowWykonanie";
import { useGrupyWykonan } from "hooks/useGrupyWykonan";
import { useAccess } from "hooks/useAccess";
import NakladGrupy from "./components/NakladGrupy";
import NarzadGrupy from "./components/NarzadGrupy";
import ProcesorGrupy from "./components/ProcesorGrupy";
import CzasGrupy from "./components/CzasGrupy";
import PredkoscGrupy from "./components/PredkoscGrupy";
import PrzelotyGrupy from "./components/PrzelotyGrupy";
import DodajGrupeWykonan from "./components/DodajGrupeWykonan";
import AktualizujGrupe from "./components/AktualizujGrupe";
import SkasujGrupeWykonan from "./components/SkasujGrupeWykonan";
import StatusGrupy from "./components/StatusGrupy";

export default  function GRUPA_WYKONAN ({ rowProces }) {
  const techContext = useContext(TechnologyContext);
  const grupaWykonanInit = techContext.grupaWykonanInit;
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const [show, setShow] = useState(true);
  const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie

  return (
    <>
      {show && grupaWykonan
          .filter((f) => f.proces_id == rowProces.id)
          .map((rowGrupa, i) => (
            <div>
              <div 
              title={"grupa_globa_id :"+rowGrupa.global_id +" Poczatek wykonania: "+rowGrupa.poczatek}
              className={style.grupa_container}>

                 <ProcesorGrupy rowGrupa={rowGrupa} rowProces={rowProces}/>
                 <NakladGrupy rowGrupa={rowGrupa} />
                 <CzasGrupy rowGrupa={rowGrupa} />
                 <PredkoscGrupy rowGrupa={rowGrupa} />
                 <NarzadGrupy rowGrupa={rowGrupa} />
                 <PrzelotyGrupy rowGrupa={rowGrupa} />
                 <StatusGrupy rowGrupa={rowGrupa} updateWykonaniaWszystkie={updateWykonaniaWszystkie} rowProces={rowProces}/>
                 <DodajGrupeWykonan rowGrupa={rowGrupa} rowProces={rowProces}/>
                 <SkasujGrupeWykonan rowGrupa={rowGrupa}/>
                 <AktualizujGrupe rowGrupa={rowGrupa}/>
              </div>
              {show &&
                wykonania
                  .filter((f) => f.grupa_id == rowGrupa.id)
                  .map((rowWykonanie, i) => (
                    <div className={style.wykonania_container}>
                      <RowWykonanie rowWykonanie={rowWykonanie} updateWykonaniaWszystkie={updateWykonaniaWszystkie} rowProces={rowProces}/>
                    </div>
                  ))}
            </div>
          ))
          }
    </>
  );
};






















