import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./Kalendarz.module.css";
import { AppContext } from "context/AppContext";
import Dzien from "./Dzien";
export default function Kalendarz() {

  const appContext = useContext(AppContext);
  const kalendarz = appContext.kalendarz;
  //    const [refreshKalendarz] = useStatystyki()
  return (
    <div className={style.container2}>
      {kalendarz.map((grup, i) => {
        return <Dzien key={"ab" + i} grup={grup} />;
      })}
    </div>
  );
}
