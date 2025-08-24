import React, {useContext, } from "react";
import style from "./DodajRealizacjeBtn.module.css";
import { TechnologyContext } from "context/TechnologyContext";

export default function DodajRealizacjeBtn({ grup }) {
  const techContext = useContext(TechnologyContext);
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const grupyOprawaAll = techContext.grupyOprawaAll;
  return (
    <button
              className={style.btn_zamknij}
              onClick={() => {
                setGrupyOprawaAll(
                  grupyOprawaAll.map((t) => {
                    if (t.global_id == grup.global_id) {
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


