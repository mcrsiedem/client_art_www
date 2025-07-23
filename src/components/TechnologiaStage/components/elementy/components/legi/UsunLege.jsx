
import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import icon from "assets/trash2.svg";
import style from "./UsunLege.module.css";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";

export default function UsunLege({ lega }) {

  // row to  lega
  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;
  const oprawaTech = techContext.oprawaTech;



  return (
    <td className={style.col_dodaj2}>
      <div>
        <img
          className={style.expand}
          src={icon}
          onClick={() => {
            handleDeleteLega(lega, legi,setLegi,legiFragmenty,setLegiFragmenty);
          }}
          alt="Procesy"
          title="Usuń lege"
        />
      </div>
    </td>
  );
}
//-

  const handleDeleteLega = (lega, legi,setLegi,legiFragmenty,setLegiFragmenty) => {

          // sprawdzić max indeks fragmentów kopiowanej legi
          let max_indeks_fragmentu =  Math.max(...legiFragmenty.filter(x=> x.lega_id == lega.id).map((f) => f.indeks))
          let fragment = legiFragmenty.filter(x=> x.lega_id == lega.id)


          // sprawdzamy ile usuwana lega ma fragmentow
          let ilosc_fragmentow =  legiFragmenty.filter(x=> x.lega_id == lega.id).length
          let indeks_pierwszego_fragmentu =  legiFragmenty.filter(x=> x.lega_id == lega.id)[0].indeks



          let newLegi = legi.slice();
          let new_legiFragmenty = legiFragmenty.slice();




              newLegi =        newLegi.map((l, i) => {
              if (l.indeks > lega.indeks) {
                return { ...l, indeks: l.indeks-1, update: true };
              } else {
                return l;
              }
            })


      setLegi(newLegi.filter(x=> x.id != lega.id))

              
   new_legiFragmenty= new_legiFragmenty.filter(x=> x.indeks != indeks_pierwszego_fragmentu)

                          new_legiFragmenty =        new_legiFragmenty.map((l, i) => {
              if (l.indeks > indeks_pierwszego_fragmentu) {
                return { ...l, indeks: l.indeks-ilosc_fragmentow, update: true };
              } else {
                return l;
              }
            })




setLegiFragmenty(new_legiFragmenty)

  };
