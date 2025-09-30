import React, {useContext, } from "react";
import style from "./ZamknijBtn.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";

export default function ZamknijBtn({ grup }) {

    const appContext = useContext(AppContext)
    const oddaniaGrupy =appContext.oddaniaGrupy;
    const setOddaniaGrupy =appContext.setOddaniaGrupy
  return (
    <button
              className={style.btn_zamknij}
              onClick={() => {
                setOddaniaGrupy(
                  oddaniaGrupy.map((t) => {
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


