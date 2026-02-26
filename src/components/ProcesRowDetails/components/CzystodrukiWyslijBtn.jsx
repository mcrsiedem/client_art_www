import React, {useContext, } from "react";
import style from "./ZamknijBtn.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { addRealizajcaProcesu } from "./wykonania/add/addRealizajcaProcesu";
import { AppContext } from "context/AppContext";

export default function CzystodrukiWyslijBtn({ grup ,expand, setExpand}) {
  const techContext = useContext(TechnologyContext);
      const appContext = useContext(AppContext);
  
  const setGrupWykonanAll = techContext.setGrupWykonanAll;
  const grupyWykonanAll = techContext.grupyWykonanAll;
      const setIsLoading = appContext.setIsLoading;
      const wykonania = techContext.wykonania;
      const setWykonania = techContext.setWykonania;
      const realizacje = techContext.realizacje;
      const setRealizacje = techContext.setRealizacje;

      let setShow = null;
      let value = 1;
      let socket = null;
  
 return (

    
    <button
              className={style.btn_zamknij}
              onClick={() => {
        //         setGrupWykonanAll(
        //           grupyWykonanAll.map((t) => {
        //             if (t.global_id == grup.global_id) {
        //               return { ...t, show: false };
        //             } else {
        //               return t;
        //             }
        //           })
        //         );
        //  setExpand(!expand)

                  let wykonanie = wykonania.find(x =>x.grupa_id == grup.id && x.technologia_id == grup.technologia_id)
                 addRealizajcaProcesu(setShow,wykonanie,value,wykonania,setWykonania,realizacje,setRealizacje,grupyWykonanAll,setGrupWykonanAll,grup,setIsLoading,socket)
                //  addRealizajcaProcesu(setShow,wykonanie,value,wykonania,setWykonania,realizacje,setRealizacje,grupyWykonanAll,setGrupWykonanAll,grup,setIsLoading,socket)



              }}
            >
              Czystodruki wysłane do akceptu 
            </button>
  );
}


