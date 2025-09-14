import React, {useContext, useState, } from "react";
import style from "./DodajRealizacjeBtn.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import AddRealizacjaProcesu from "../add/AddRealizacjaProcesu";

export default function DodajRealizacjeBtn({ wykonanie,grup }) {
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
                // console.log(realizacje)

                // setWykonania(
                //   wykonania.map((t) => {
                //     if (t.global_id == wykonanie.global_id) {
                //       return { ...t, show: false };
                //     } else {
                //       return t;
                //     }
                //   })
                // );

              }}
            >
              Dodaj realizację
            </button>
                <AddRealizacjaProcesu show={show} setShow={setShow} wykonanie={wykonanie} value={value} setValue={setValue} grup={grup}/>
            
            </>
  );
}


