// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import { useState } from "react";
import style from "./OprawaElementyStage.module.css";
// import { _papiery } from "../../api";
// import ElementTableHeader from "./ElementTableHeader";
// import { useState } from "react";
// import Logo_ustawienia from "../../../../svg/settings.svg";

// okienko do wydzielania części z oprawy

export default function OprawaElementyStage({
  setShowOprawaElementyStage,
  fragmenty,
  setFragmenty,
  oprawa,
  setOprawa,
  oprawa_row,
  handleChangeCardOprawa,
}) {
  function wydzielOprawe() {
    const newOprawa = oprawa.slice();

    newOprawa.push({
      id: Math.max(...newOprawa.map((f) => f.id)) + 1,
      zamowienie_id: oprawa_row.zamowienie_id,
      produkt_id: oprawa_row.produkt_id,
      oprawa: oprawa_row.oprawa,
      bok_oprawy: oprawa_row.bok_oprawy,

      naklad: wydziel,
      index: Math.max(...newOprawa.map((f) => f.index)) + 1,
      uwagi: oprawa_row.uwagi,
      data_spedycji: oprawa_row.data_spedycji,
    });

    newOprawa.sort((a, b) => a.index - b.index);

    setOprawa(
      newOprawa.map((t) => {
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


    //--------------------------------------------------
    let id_nowej_oprawy = Math.max(...oprawa.map((f) => f.id)) + 1;
    const newFragmenty = fragmenty.slice();

    newFragmenty
    .filter((frag) => frag.oprawa_id === oprawa_row.id)
    .map((t)=>{

      newFragmenty
      .push({
        id: Math.max(...newFragmenty.map((f) => f.id)) + 1,
        zamowienie_id: t.zamowienie_id,
        produkt_id: t.produkt_id,
        element_id: t.element_id,
        oprawa_id: id_nowej_oprawy,
        naklad: wydziel,
        typ: t.typ,
        index: parseInt(t.index) + 1,
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

  const [wydziel, setWdziel] = useState();

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
