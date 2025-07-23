
import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import icon from "assets/copy.svg";
import style from "./KopiujLega.module.css";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";

export default function KopiujLega({ lega }) {

  // row to  lega
  const techContext = useContext(TechnologyContext);

  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;
  return (
    <td className={style.col_dodaj2}>
      <div>
        <img
          className={style.expand}
          src={icon}
          onClick={() => {
            handleAddLega(lega, legi,setLegi,legiFragmenty,setLegiFragmenty);
          }}
          alt="Procesy"
          title="Kopiuj lege"
        />
      </div>
    </td>
  );
}

  const handleAddLega = (lega, legi,setLegi,legiFragmenty,setLegiFragmenty) => {

          // sprawdzić max indeks fragmentów kopiowanej legi
          let max_indeks_fragmentu =  Math.max(...legiFragmenty.filter(x=> x.lega_id == lega.id).map((f) => f.indeks))
          let fragment = legiFragmenty.filter(x=> x.lega_id == lega.id)

          let newLegi = legi.slice();
          let new_legiFragmenty = legiFragmenty.slice();




              newLegi =        newLegi.map((l, i) => {
              if (l.indeks > lega.indeks) {
                return { ...l, indeks: l.indeks+1, update: true };
              } else {
                return l;
              }
            })
              newLegi.push({
                ...lega,
                id: getMaxID(newLegi),
                // indeks: getMaxIndeks(newLegi),
                indeks: parseInt(lega.indeks) +1,
                uwagi:"",
                insert: true,
              });




              
            // większe od max zwiększyć o 1

                          new_legiFragmenty =        new_legiFragmenty.map((l, i) => {
              if (l.indeks > max_indeks_fragmentu) {
                return { ...l, indeks: l.indeks+1, update: true };
              } else {
                return l;
              }
            })

              new_legiFragmenty.push({
                id: getMaxID(new_legiFragmenty),
                indeks: parseInt(max_indeks_fragmentu)+1,
                lega_id: getMaxID(newLegi)-1,
                nr_legi: lega.nr_legi,
                naklad: lega.naklad,
                fragment_id: lega.id,
                rodzaj_legi: lega.rodzaj_legi,
                oprawa_id: fragment[0].oprawa_id,
                typ: lega.typ_elementu,
                wersja: "",
                element_id: lega.element_id,
                arkusz_id: lega.arkusz_id,
                technologia_id: lega.technologia_id,
                insert: true
              });



setLegi(newLegi)
setLegiFragmenty(new_legiFragmenty)

  };
