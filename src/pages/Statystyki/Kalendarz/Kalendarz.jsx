import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./Kalendarz.module.css";
import { AppContext } from "context/AppContext";
import Dzien from "./Dzien";
import { ModalInsertContext } from "context/ModalInsertContext";
import ModalInsert from "pages/Zamowienia/ModalInsert/ModalInsert";
import { useApiPapier } from "hooks/useApiPapier";
export default function Kalendarz() {

  const appContext = useContext(AppContext);
  const kalendarz = appContext.kalendarz;
    const contextModal = useContext(ModalInsertContext);
  const openModalInsert = contextModal.openModalInsert;
  const [callForPaper] = useApiPapier();

    useEffect(() => {
      
              callForPaper();

    }, []);
  //    const [refreshKalendarz] = useStatystyki()
  return (
    <div className={style.container2}>
      {kalendarz.map((grup, i) => {
        return <Dzien key={"ab" + i} grup={grup} />;
      })}

              {openModalInsert && (
            <ModalInsert
            />
          )}
    </div>
  );
}
