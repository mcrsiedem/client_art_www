import React, {useContext, } from "react";
import style from "./ZamknijBtn.module.css";
import { TechnologyContext } from "context/TechnologyContext";

export default function ZamknijBtn({ grup }) {
  const techContext = useContext(TechnologyContext);
  const setGrupWykonanAll = techContext.setGrupWykonanAll;
  const grupyWykonanAll = techContext.grupyWykonanAll;
  return (
    <button
              className={style.btn_zamknij}
              onClick={() => {
                setGrupWykonanAll(
                  grupyWykonanAll.map((t) => {
                    if (t.global_id == grup.global_id) {
                      return { ...t, show: false };
                    } else {
                      return t;
                    }
                  })
                );
              }}
            >
              Zamknij
            </button>
  );
}


