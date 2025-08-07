import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./ElementRow.module.css";
import iconCopy from "assets/copy.svg";


import { _typ_elementu, reg_txt } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { getNameOfElement } from "actions/getNameOfElement";
import { useStatus } from "hooks/useStatus";
import { useHistoria } from "hooks/useHistoria";
import { ModalInsertContext } from "context/ModalInsertContext";


export default  function ELEMENT_DODAJ({ row }) {
  const [setStatus] = useStatus()
  const [add] = useHistoria()

      const contextModalInsert = useContext(ModalInsertContext);
      const elementy = contextModalInsert.elementy;
      const setElementy = contextModalInsert.setElementy;
      const fragmenty = contextModalInsert.fragmenty;
      const setFragmenty = contextModalInsert.setFragmenty;
      const daneZamowienia = contextModalInsert.daneZamowienia;
      const procesyElementow = contextModalInsert.procesyElementow;
      const setProcesyElementow = contextModalInsert.setProcesyElementow;

  return (
    <div >
      <img
        className={style.expand}
        src={iconCopy}
        onClick={() => {
          // handleAddCard(row);
          addElement(row,elementy,setElementy,fragmenty,setFragmenty);

          add(         {
            kategoria: "Element",
            event: getNameOfElement(row.id,elementy,_typ_elementu)+ " "+row.nazwa+" - dodano ",
            zamowienie_id: daneZamowienia.id
          })
                     // 
                     setStatus(3)
        }}
        alt="Procesy"
      />
    </div>
  );
}






 function addElement(card,elementy,setElementy,fragmenty,setFragmenty) {
        const newElementy = elementy.slice();

        newElementy.push({
          id: Math.max(...newElementy.map((f) => f.id)) + 1,
          zamowienie_id: card.zamowienie_id,
          produkt_id: card.produkt_id,
          naklad: card.naklad,
          indeks: Math.max(...newElementy.filter((x) => x.delete != true).map((f) => f.indeks)) + 1,
          typ: card.typ,
          nazwa: card.nazwa,
          kolory: card.kolory,
          ilosc_stron: card.ilosc_stron,
          format_x: card.format_x,
          format_y: card.format_y,
          papier_id: card.papier_id,
          papier_postac_id: card.papier_postac_id,
          stan: card.stan,
          status: card.status,
          etap: card.etap,
          info: card.info,
          tytul: card.tytul,
          papier_id: card.papier_id,
          gramatura_id: card.gramatura_id,
          papier_info: card.papier_info,
          uwagi: card.uwagi,
          insert:true
        });

        newElementy.sort((a, b) => a.indeks - b.indeks);
        setElementy(newElementy);

        const newFragmenty = fragmenty.slice();

        newFragmenty.map((x) => {
          if (x.indeks > card.indeks) {
            return {
              ...x,
            };
          } else {
            return x;
          }
        });

        newFragmenty
          .filter((f) => f.element_id == card.id)
          .forEach((x) => {
            newFragmenty.push({
              id: Math.max(...newFragmenty.map((f) => f.id)) + 1,
              zamowienie_id: card.zamowienie_id,
              produkt_id: card.produkt_id,
              ilosc_stron: card.ilosc_stron,
              naklad: card.naklad,
              wersja: x.wersja,
              info:x.info,
              typ: card.typ,
              oprawa_id: x.oprawa_id,
              element_id: Math.max(...elementy.map((f) => f.id)) + 1,
              indeks: Math.max(...newFragmenty.filter((x) => x.delete != true).map((f) => f.indeks)) + 1,
              insert: true
            });
          });

        newFragmenty.sort((a, b) => a.indeks - b.indeks);
        setFragmenty(newFragmenty);


      }
