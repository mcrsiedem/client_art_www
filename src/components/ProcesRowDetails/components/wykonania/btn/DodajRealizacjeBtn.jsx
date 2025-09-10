import React, {useContext, } from "react";
import style from "./DodajRealizacjeBtn.module.css";
import { TechnologyContext } from "context/TechnologyContext";

export default function DodajRealizacjeBtn({ wykonanie }) {
  const techContext = useContext(TechnologyContext);
  const setWykonania = techContext.setWykonania;
  const wykonania = techContext.wykonania;
  return (
    <button
              className={style.btn_zamknij}
              onClick={() => {
                setWykonania(
                  wykonania.map((t) => {
                    if (t.global_id == wykonanie.global_id) {
                      return { ...t, show: false };
                    } else {
                      return t;
                    }
                  })
                );
              }}
            >
              Dodaj realizację
            </button>
  );
}


