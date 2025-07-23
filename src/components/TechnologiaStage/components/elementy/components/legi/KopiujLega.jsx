
import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import icon from "assets/copy.svg";
import style from "./KopiujLega.module.css";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";

export default function KopiujLega({ row }) {

  // row to  lega
  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;
  const oprawaTech = techContext.oprawaTech;

  const handleAddLega = (row, arkusze, setArkusze) => {

    let new_arkusz_id = Math.max(...arkusze.map((f) => f.id)) + 1




//------------ legi
        const newLegi = legi.slice();
        const new_legiFragmenty = legiFragmenty.slice();
        legi
          .filter((l) => l.arkusz_id == row.id)
          .map((lega) => {
            newLegi.push({
              ...lega,
              id: getMaxID(newLegi),
              indeks: getMaxIndeks(newLegi),
              arkusz_id: new_arkusz_id,
              insert: true,
            });
            new_legiFragmenty.push({
              id: getMaxID(new_legiFragmenty),
              indeks: getMaxIndeks(new_legiFragmenty),
              lega_id: getMaxID(newLegi)-1,
              nr_legi: lega.nr_legi,
              naklad: lega.naklad,
              fragment_id: lega.id,
              rodzaj_legi: lega.rodzaj_legi,
              oprawa_id: oprawaTech[0]?.id,
              typ: lega.typ_elementu,
              wersja: "",
              element_id: lega.element_id,
              arkusz_id: lega.arkusz_id,
              insert: true
            });

          });

        let n = 0;
        setLegi(
          newLegi.map((lega, i) => {
            if (lega.element_id == row.element_id) {
              n++;
              return { ...lega, nr_legi: n, update: true };
            } else {
              return lega;
            }
          })
        );

         setLegiFragmenty(
           new_legiFragmenty
             .sort((a, c) => a.id - c.id)
             .sort((a, c) => a.oprawa_id - c.oprawa_id)
             .map((x, i) => {
               return { ...x, indeks: i };
             })
         );

  };

  return (
    <td className={style.col_dodaj2}>
      <div>
        <img
          className={style.expand}
          src={icon}
          onClick={() => {
            handleAddLega(row, arkusze, setArkusze);
          }}
          alt="Procesy"
          title="Kopiuj lege"
        />
      </div>
    </td>
  );
}
//-

