import React, {useContext, useState, } from "react";
import style from "./ZakonczArkuszBtn.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import ZakonczArkusz from "../addZakonczArkusz/ZakonczArkusz";

//import Usun from "./Usun";

export default function ZakonczArkuszBtn({ wykonanie,grup }) {
  const techContext = useContext(TechnologyContext);
  const setWykonania = techContext.setWykonania;
  const wykonania = techContext.wykonania;
  const realizacje = techContext.realizacje;
  const [show, setShow] = useState(false);
  const [value, setValue] = useState();
  return (
    <>
    <button
              className={style.btn_zamknij}
              onClick={() => {
          setValue([])
                setShow(true)


              }}
            >
              Zakończ 
            </button>
                <ZakonczArkusz show={show} setShow={setShow} wykonanie={wykonanie} value={value} setValue={setValue} grup={grup}/>
            
            </>
  );
}


