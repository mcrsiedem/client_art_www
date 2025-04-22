
import { useState,useContext } from "react";
import style from "./IntroligatorniaElementyStageTech.module.css";
import axios from "axios";
import { IP } from "utils/Host";
import { ModalInsertContext } from "context/ModalInsertContext";
export default function IntroligatorniaElementyStageTech({
  setShowOprawaElementyStage,
  oprawa_row,
  handleChangeCardOprawa,
}) {
  const contextModalInsert = useContext(ModalInsertContext);

  const fragmenty = contextModalInsert.fragmenty;
  const setFragmenty = contextModalInsert.setFragmenty;
  const elementy = contextModalInsert.elementy;
  const oprawa = contextModalInsert.oprawa;
  const setOprawa = contextModalInsert.setOprawa;
  function wydzielOprawe() {
    console.log("oprawa"+ oprawa)
    const newOprawa = JSON.parse(JSON.stringify(oprawa))

    // do bazy dodawany jest jeden pusty wpis, aby zgadzała się kolejność id
    axios.post(IP + "oprawa", {
      zamowienie_id: 0,
      produkt_id: 0,
      oprawa: 0,
      naklad:0,
      uwagi: "oprawa temp",
      data_spedycji: "2024-01-30 00:00:00",
      data_czystodrukow: "2024-01-30 00:00:00",
      indeks: 0,
}).then((res) => {

    newOprawa.push({
       id: Math.max(...newOprawa.map((f) => f.id)) + 1,
    
      zamowienie_id: oprawa_row.zamowienie_id,
      produkt_id: oprawa_row.produkt_id,
      oprawa: oprawa_row.oprawa,
      bok_oprawy: oprawa_row.bok_oprawy,

      naklad: wydziel,
      indeks: Math.max(...newOprawa.map((f) => f.indeks)) + 1,
      uwagi: oprawa_row.uwagi,
      data_spedycji: oprawa_row.data_spedycji,
      data_czystodrukow: oprawa_row.data_czystodrukow,
      indeks: oprawa_row.indeks + 1,
    
    });

      newOprawa.sort((a, b) => a.indeks - b.indeks);
          setOprawa(newOprawa
            .map((t) => {
              if (t.id == oprawa_row.id) {
                return {
                  ...t,
                  naklad: parseInt(oprawa_row.naklad) - parseInt(wydziel),
                };
              } else {
                return t;
              }
            })
          );

})



    





    //--------------------------------------------------
    let id_nowej_oprawy = Math.max(...oprawa.map((f) => f.id)) + 1;
    const newFragmenty = JSON.parse(JSON.stringify(fragmenty))

    newFragmenty
    .filter((frag) => frag.oprawa_id === oprawa_row.id)
    .map((t,i)=>{

      newFragmenty
      .push({
        id: Math.max(...newFragmenty.map((f) => f.id)) + 1,
        zamowienie_id: t.zamowienie_id,
        produkt_id: t.produkt_id,
        ilosc_stron: t.ilosc_stron,

        element_id: t.element_id,
        wersja:t.wersja,
        oprawa_id: id_nowej_oprawy,
        naklad: wydziel,
        typ: t.typ,
        indeks: parseInt(t.indeks) +2,
      })

    })


    setFragmenty(newFragmenty.map((t) => {
        if (t.oprawa_id == oprawa_row.id) {
          return {
            ...t,
            naklad: parseInt(oprawa_row.naklad) - parseInt(wydziel)
          };
        } else {
          return t;
        }
      })
    );


  }

  const [wydziel, setWdziel] = useState(500);

  return (
    <div className={style.insertContainer}>
      <div className={style.header}>
        {" "}
        <p className={style.title}>Podziel oprawę </p>
      </div>
      <Wydziel wydziel={wydziel} setWdziel={setWdziel} />

      <div className={style.center}></div>

      <div className={style.row}>
        <button
          className={style.btn}
          onClick={() => {
            setShowOprawaElementyStage(false);
          }}
        >
          Anuluj
        </button>

        <button
          className={style.btn}
          onClick={() => {
            wydzielOprawe();
            setShowOprawaElementyStage(false);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
function Wydziel({ wydziel, setWdziel }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Wydziel z nakładu:</label>
      <input
        placeholder="0 szt."
        defaultValue={wydziel}
        className={style.data}
        type="text"
        //  value="0"
        onChange={(event) => {
          setWdziel(event.target.value);
        }}
      ></input>
    </div>
  );
}
