import React, {useContext, useState, } from "react";
import style from "./DodajBrakBtn.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import AddRealizacjaProcesuBrak from "../addBrak/AddRealizacjaProcesuBrak";

export default function DodajBrakBtn({ wykonanie,grup }) {
  const techContext = useContext(TechnologyContext);
  const setWykonania = techContext.setWykonania;
  const wykonania = techContext.wykonania;
   const [show, setShow] = useState(false);
  return (
    <>
        <button
              className={style.btn_zamknij}
              onClick={() => {
      setShow(true)
              }}
            >
              Zgłoś brak
            </button>
                            <AddRealizacjaProcesuBrak show={show} setShow={setShow} wykonanie={wykonanie}  grup={grup}/>
            
    </>

            
  );
}


