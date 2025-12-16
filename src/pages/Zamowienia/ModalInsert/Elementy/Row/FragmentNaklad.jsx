import style from "./ElementRow.module.css";
import { useState, useContext } from "react";
import { _typ_elementu } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";
import { reg_int } from "utils/initialvalue";
import { ifNoTextSetNull } from "actions/ifNoTextSetNull";
import { useHistoria } from "hooks/useHistoria";
import { useStatus } from "hooks/useStatus";
import { getNameOfElement } from "actions/getNameOfElement";

// Funkcja pomocnicza do formatowania liczby z separatorem
// Używamy toLocaleString, który poprawnie obsługuje locale (np. 'pl-PL' użyje spacji dla tysięcy)


export default function FragmentNaklad({ row, handleUpdateRowFragmenty }) {
  const [setStatus] = useStatus()

  return (

      <input
        className={style.rowFragmenty_naklad}
        value={row.naklad}
        onChange={(e) => {

            handleUpdateRowFragmenty({
            ...row,
            naklad: ifNoTextSetNull(e.target.value) ,
            update: true
          })

           // 
           setStatus(3)
        }
          
        }
      ></input>

  );
}