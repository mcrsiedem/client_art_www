import style from "./IntroligatorniaTech.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
// import logoExpand from "../../../../assets/expand.svg";
import { _typ_elementu } from "utils/initialvalue";
import { useState } from "react";
import iconCopy from "assets/copy.svg";
import iconTrash from "assets/trash2.svg";
import iconTable from "assets/settings.svg";
import iconUstawienia from "assets/settings.svg";
import OprawaElementyStage from "./IntroligatorniaElementyStageTech";
import axios from "axios";

import { IP } from "../../../utils/Host";
import { AppContext } from "context/AppContext";
import { reg_int, reg_txt } from "utils/initialvalue";
import { TechnologyContext } from "context/TechnologyContext";
import IntroligatorniaTable from "./IntroligatorniaTable";

export default function IntroligatorniaTech({
  handleChangeCardProdukty,
  handleChangeCardOprawa,
  handleChangeCardFragmenty,
  handleChangeCardFragmentyOprawaId,
}) {
  const [oprawa_row, setOprawa_row] = useState();
  const [showOprawaElementyStage, setShowOprawaElementyStage] = useState(false);
  const [expand, setExpand] = useState(true);

  function handleDrop(id) {
    // sprawdza czy upuszczamy właściwy obiekt
    if (sessionStorage.getItem("typ_drag") == "fragment") {
      let id_drag_element = sessionStorage.getItem("id_element_drag");
      let id_drop_oprawa = id;
      handleChangeCardFragmentyOprawaId(id_drag_element, id_drop_oprawa);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragStart(id) {
    //   e.preventDefault();
    sessionStorage.setItem("id_element_drag", id);
    sessionStorage.setItem("typ_drag", "fragment");
  }

  return (
    <div className={style.container}>

<div className={style.introligatornia}>
  
              <div className={style.introligatornia_menu_button}> 
              <p>Introligatornia</p>
                
              </div>
             
            <IntroligatorniaTable/>
            </div>


      

      {showOprawaElementyStage && (
        <OprawaElementyStage
          showOprawaElementyStage={showOprawaElementyStage}
          setShowOprawaElementyStage={setShowOprawaElementyStage}
          oprawa_row={oprawa_row}
          handleChangeCardOprawa={handleChangeCardOprawa}
        />
      )}
    </div>
  );
}




function DataSpedycji({ row, handleChangeCardOprawa }) {
  return (
    <td className={style.col}>
      <input
        className={style.data}
        type="date"
        defaultValue={row.data_spedycji}
        onChange={(event) => {
          handleChangeCardOprawa({ ...row, data_spedycji: event.target.value });
        }}
      ></input>
    </td>
  );
}
function DataCzystodrukow({ row, handleChangeCardOprawa }) {
  return (
    <td className={style.col}>
      <input
        className={style.data}
        type="date"
        defaultValue={row.data_czystodrukow}
        onChange={(event) => {
          handleChangeCardOprawa({
            ...row,
            data_czystodrukow: event.target.value,
          });
        }}
      ></input>
    </td>
  );
}

function RodzajOprawy({ row, handleChangeCardOprawa }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const produkty = contextModalInsert.produkty;
  const setProdukty = contextModalInsert.setProdukty;
  const contextApp = useContext(AppContext);

  return (
    <td className={style.select}>
      <select
        className={style.input_oprawa}
        defaultValue={row.oprawa}
        onChange={(event) => {
          handleChangeCardOprawa({ ...row, oprawa: event.target.value });

          if (row.indeks == 0) {
            setProdukty(
              produkty.map((p) => {
                if (p.id === row.produkt_id) {
                  return { ...p, oprawa: event.target.value };
                } else {
                  return p;
                }
              })
            );
          }
        }}
      >
        {contextApp.bindingType.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </td>
  );
}

function DodajOprawe({
  row,
  handleChangeCardOprawa,
  handleAddCard,
  oprawa,
  setOprawa,
}) {
  return (
    <td className={style.col_button}>
      <img
        className={style.expand}
        src={iconCopy}
        onClick={() => {
          handleAddRowOprawa(row, oprawa, setOprawa);
        }}
        alt="Procesy"
      />
    </td>
  );
}

function Usun({ row, handleChangeCardOprawa, handleRemoveItem }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const fragmenty = contextModalInsert.fragmenty;
  const setFragmenty = contextModalInsert.setFragmenty;

  const oprawa = contextModalInsert.oprawa;
  const setOprawa = contextModalInsert.setOprawa;

  return (
    <td className={style.col_button}>
      <div>
        <img
          className={style.expand}
          src={iconTrash}
          onClick={() => {
            handleRemoveItem(
              row.indeks,
              row.id,
              oprawa,
              setOprawa,
              fragmenty,
              setFragmenty
            );
          }}
          alt="Procesy"
        />
      </div>
    </td>
  );
}

function PodzielOprawe({
  row,
  handleChangeCardOprawa,
  handleAddCard,
  setShowOprawaElementyStage,
  oprawa_row,
  setOprawa_row,
}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const oprawa = contextModalInsert.oprawa;
  const setOprawa = contextModalInsert.setOprawa;
  return (
    <td className={style.col_button}>
      <img
        className={style.expand}
        src={iconTable}
        onClick={() => {
          setShowOprawaElementyStage(true);
          setOprawa_row(row);
        }}
        alt="Procesy"
      />
    </td>
  );
}
function PokazElementy({ setShowOprawaElementyStage }) {
  return (
    <td className={style.col_button}>
      <div>
        <img
          className={style.pokaz_elementy_oprawy}
          src={iconUstawienia}
          onClick={() => {
            setShowOprawaElementyStage(true);
          }}
          alt="Procesy"
        />
      </div>
    </td>
  );
}

const handleRemoveItem = (
  indeks,
  id,
  oprawa,
  setOprawa,
  fragmenty,
  setFragmenty
) => {
  // kasowanie oprawy?
  // id = id elementu
  if (oprawa.length !== 1) {
    setOprawa(oprawa.filter((x) => x.indeks !== indeks));
    setFragmenty(fragmenty.filter((x) => x.oprawa_id !== id));
  }

  setOprawa((prev) =>
    prev.map((t, a) => {
      if (t.indeks > indeks) {
        return {
          ...t,
          indeks: t.indeks--,
        };
      } else {
        return t;
      }
    })
  );
};

function handleAddRowOprawa(card, oprawa, setOprawa) {
  console.log("oprawa", oprawa);
  const newOprawa = JSON.parse(JSON.stringify(oprawa));

  // do bazy dodawany jest jeden pusty wpis, aby zgadzała się kolejność id
  axios
    .post(IP + "oprawa", {
      zamowienie_id: 0,
      produkt_id: 0,
      oprawa: 0,
      naklad: 0,
      uwagi: "oprawa temp",
      data_spedycji: "2024-01-30 00:00:00",
      data_czystodrukow: "2024-01-30 00:00:00",
      indeks: 0,
    })
    .then((res) => {
      newOprawa.push({
        id: Math.max(...newOprawa.map((f) => f.id)) + 1,

        zamowienie_id: card.zamowienie_id,
        produkt_id: card.produkt_id,
        oprawa: card.oprawa,
        bok_oprawy: card.bok_oprawy,

        naklad: 20,
        indeks: Math.max(...newOprawa.map((f) => f.indeks)) + 1,
        uwagi: card.uwagi,
        data_spedycji: card.data_spedycji,
        data_czystodrukow: card.data_czystodrukow,
        indeks: card.indeks + 1,
      });

      setOprawa(newOprawa);
    });
}

function Typ({ row }) {
  const techContext = useContext(TechnologyContext);
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;

  return (
    <td>
      <select
        className={style.input_oprawa}
        value={row.typ}
        disabled
        onClick={() => {
          setLegiFragmenty(!legiFragmenty);
        }}
      >
        {}
        {_typ_elementu.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </td>
  );
}

function WersjaOprawaFragment({ row, handleChangeCardFragmenty }) {
  return (
    <td>
      <input
        value={row.wersja}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleChangeCardFragmenty({
              ...row,
              wersja: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}

function NakladOprawaFregment({ row, handleChangeCardFragmenty }) {
  return (
    <td>
      <input
        value={row.naklad}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleChangeCardFragmenty({
              ...row,
              naklad: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}
function IloscStronFragment({ row, handleChangeCardFragmenty }) {
  return (
    <td>
      <input
        value={row.naklad}
        onChange={(e) =>
          handleChangeCardFragmenty({
            ...row,
            naklad: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

function WersjaOprawa({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input
        className={style.col_wersja}
        value={row.wersja}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleChangeCardOprawa({
              ...row,
              wersja: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}

function BokOprawy({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input
        value={row.bok_oprawy}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleChangeCardOprawa({
              ...row,
              bok_oprawy: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}

function UwagiOprawa({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input
        value={row.uwagi}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleChangeCardOprawa({
              ...row,
              uwagi: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}

function NakladOprawa({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input
        value={row.naklad}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleChangeCardOprawa({
              ...row,
              naklad: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}
