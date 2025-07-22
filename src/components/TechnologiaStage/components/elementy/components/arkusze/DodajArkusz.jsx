
import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import logoExtract from "assets/extract_green.svg";
import logoExpand from "assets/expand.svg";
import iconTrash from "assets/trash2.svg"
import icon from "assets/copy.svg";
import style from "./DodajArkusz.module.css";
import { reg_cena, reg_int, reg_txt } from "utils/initialvalue";
import addIcon2 from "assets/addIcon2.svg"
import { findNadkomplet } from "actions/findNadkomplet";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { useProcesy } from "hooks/useProcesy";

export default 
  function DodajArkusz({ row }) {
    const techContext = useContext(TechnologyContext);
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;
    const legi = techContext.legi;
    const setLegi = techContext.setLegi;
    const legiFragmenty = techContext.legiFragmenty;
    const setLegiFragmenty = techContext.setLegiFragmenty;
    const oprawaTech = techContext.oprawaTech;
      const [show, setShow] = useState(false);
  

    return (
      <td className={style.col_dodaj2}>
          <img
            className={style.expand}
            src={icon}
            onClick={() => {
              handleAddArkusz(row, arkusze, setArkusze,legi,legiFragmenty,oprawaTech,setLegi,setLegiFragmenty);
            }}
            alt="Procesy"
          />
      </td>
    );

    
  }



    function PODAJ({ show }) {
    const techContext = useContext(TechnologyContext);
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;
    const legi = techContext.legi;
    const setLegi = techContext.setLegi;
    const legiFragmenty = techContext.legiFragmenty;
    const setLegiFragmenty = techContext.setLegiFragmenty;
    const oprawaTech = techContext.oprawaTech;
  
        if(show){
          return (
              <div className={style.background}>
                  <div className={style.main}>
                    <button>OK</button>
                  </div>

              </div>
            );

        }
    
    
  }



      const handleAddArkusz = (row, arkusze, setArkusze,legi,legiFragmenty,oprawaTech,setLegi,setLegiFragmenty) => {

      let new_arkusz_id = Math.max(...arkusze.map((f) => f.id)) + 1
      //------------------- akrusz
    const newArkusze = arkusze.slice();
    newArkusze.push({
      ...row,
      global_id:0,
      id: new_arkusz_id,
      indeks: Math.max(...newArkusze.map((f) => f.indeks)) + 1,
      insert: true,
    });

    let m = 0;
    setArkusze(
      newArkusze.map((ark, i) => {
        if (ark.element_id == row.element_id && ark.delete != true) {
          m++;
          return { ...ark, nr_arkusza: m, update: true };
        } else {
          return ark;
        }
      })
    );
//--------



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
                technologia_id: lega.technologia_id,
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
  