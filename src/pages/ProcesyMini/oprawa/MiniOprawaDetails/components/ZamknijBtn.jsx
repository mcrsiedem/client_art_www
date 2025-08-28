import React, {useContext, } from "react";
import style from "./ZamknijBtn.module.css";
export default function ZamknijBtn({setExpand}) {
  return (
    <button
              className={style.btn_zamknij}
              onClick={() => {
                setExpand(false)
              }}
            >
              Zamknij
            </button>
  );
}


