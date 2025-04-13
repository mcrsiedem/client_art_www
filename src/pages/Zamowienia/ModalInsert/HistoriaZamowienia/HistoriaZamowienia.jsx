import style from "./HistoriaZamowienia.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";

import { _typ_elementu } from "utils/initialvalue";
import { useState } from "react";
import iconCopy from "../../../../assets/copy.svg";
import iconTrash from "../../../../assets/trash2.svg";
import iconTable from "../../../../assets/settings.svg";



import { AppContext } from "context/AppContext";
import { reg_int, reg_txt } from "utils/initialvalue";
import { ifNoTextSetNull } from "actions/ifNoTextSetNull";
import { useStatus } from "hooks/useStatus";

export default function HistoriaZamowienia() {
  const [oprawa_row, setOprawa_row] = useState();
  const [showOprawaElementyStage, setShowOprawaElementyStage] = useState(false);
  const [expand, setExpand] = useState(true);


  return (
    <div className={style.container}>
      <div className={style.historia}>
        <HISTORIA_HEADER/>
        <HISTORIA_TABLE/>
      </div>
    </div>
  );
}


const HISTORIA_HEADER = () => {
  return(
    <p title={" Historia zmian"} className={style.header_title}>Historia zmian</p>
  )
}
function HISTORIA_TABLE() {
  const contextModalInsert = useContext(ModalInsertContext);
  const historiaZamowienia = contextModalInsert.historiaZamowienia;

  return (
    <div className={style.main}>
      <table className={style.table_historia}>
        <thead className={style.glowka}>
          <tr>
            <th className={style.col4}>Data</th>
            <th className={style.col4}>Kategoria</th>
            <th className={style.col4}>Zdarzenie</th>
            <th className={style.col4}>Użytkownik</th>
          </tr>
        </thead>
        <tbody className={style.table_historia_body}>
          {historiaZamowienia.sort((a, b) => b.id - a.id)
          //  .filter((x) => x.delete != true)
          .map((row) => {
            return (
              <>
                <tr
                className={style.row_zamowienia}
                  key={row.id}
                  
                >
     
                  <td>{row.data}</td>
                  <td>{row.kategoria}</td>
                  <td>{row.event}</td>
                  <td>{row.user}</td>

                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}



function DataSpedycji({ row,index_oprawy }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  const setDaneZamowienia = contextModalInsert.setDaneZamowienia;
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const [setStatus] = useStatus()

  return (
    <td className={style.col}>
      <input
        className={style.input}
        type="date"
        value={row.data_spedycji}
        onChange={(event) => {
          handleUpdateRowOprawa({ ...row, data_spedycji: event.target.value, update:true });
          if(index_oprawy==0){

            setDaneZamowienia({...daneZamowienia, data_spedycji: event.target.value, update: true});
          }

                     // 
                     setStatus(3)
        }}
      ></input>
    </td>
  );
}
function DataCzystodrukow({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  const [setStatus] = useStatus()
  return (
    <td className={style.col}>
      <input
        className={style.input}
        type="date"
        value={row.data_czystodrukow}
        onChange={(event) => {
          handleUpdateRowOprawa({
            ...row,
            data_czystodrukow: event.target.value,
            update:true
          });

                     // 
                     setStatus(3)
        }}
      ></input>
    </td>
  );
}

function RodzajOprawy({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const produkty = contextModalInsert.produkty;
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  const setProdukty = contextModalInsert.setProdukty;
  const contextApp = useContext(AppContext);
const [setStatus] = useStatus()

  return (
    <td>
      <select
        className={style.select}
        value={row.oprawa}
        onChange={(event) => {
          handleUpdateRowOprawa({ ...row, oprawa: event.target.value,update:true });

          if (row.indeks == 0) {
            setProdukty(
              produkty.map((p) => {
                if (p.id === row.produkt_id) {
                  return { ...p, oprawa: event.target.value,update:true };
                } else {
                  return p;
                }
              })
            );
          }

           // 
           setStatus(3)


        }}
      >
                {   <option value = "0"  >
             brak oprawy
            </option>}
        {contextApp.procesList?.filter(x=>x.nazwa_id==6).map((option) => (
          <option key={option.id} value={option.id}>
            {option.typ} {option.rodzaj} 
       
          </option>
        ))}
      </select>
    </td>
  );
}

function DodajOprawe({ row, oprawa, setOprawa }) {
  const [setStatus] = useStatus()
  return (
    <td className={style.col_button}>
      <img
        className={style.expand}
        src={iconCopy}
        onClick={() => {
          handleAddRowOprawa(row, oprawa, setOprawa);
                     // 
                     setStatus(3)
        }}
        alt="Procesy"
      />
    </td>
  );
}

function Usun({ row, handleRemoveItem }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const fragmenty = contextModalInsert.fragmenty;
  const setFragmenty = contextModalInsert.setFragmenty;

  const oprawa = contextModalInsert.oprawa;
  const setOprawa = contextModalInsert.setOprawa;
const [setStatus] = useStatus()
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

                       // 
                       setStatus(3)
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
  if (oprawa.filter((x) => x.delete != true).length !== 1) {

      setOprawa((prev) =>
    prev.map((t, a) => {
      if (t.id == id) {
        return {
          ...t,
          delete: true
        };
      } else {
        return t;
      }
    })
  );


  setFragmenty((prev) =>
    prev.map((t, a) => {
      if (t.oprawa_id == id) {
        return {
          ...t,
          oprawa_id: 1,
          update: true
        };
      } else {
        return t;
      }
    })
  );

  }

};

function handleAddRowOprawa(card, oprawa, setOprawa) {
  const newOprawa = JSON.parse(JSON.stringify(oprawa));

  newOprawa.push({
    id: Math.max(...newOprawa.map((f) => f.id)) + 1,
    zamowienie_id: card.zamowienie_id,
    produkt_id: card.produkt_id,
    oprawa: card.oprawa,
    bok_oprawy: card.bok_oprawy,
    wersja: card.wersja,
    naklad: 1,
    indeks: Math.max(...newOprawa.map((f) => f.indeks)) + 1,
    uwagi: card.uwagi,
    data_spedycji: card.data_spedycji,
    data_czystodrukow: card.data_czystodrukow,
    indeks: card.indeks + 1,
    insert: true
  });

  setOprawa(newOprawa);
}

function Typ({ row }) {
  return (
    <td>
      <select className={style.select} value={row.typ} disabled>
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

function WersjaOprawaFragment({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowFragmenty = contextModalInsert.handleUpdateRowFragmenty;
  const [setStatus] = useStatus()
  return (
    <td>
      <input
        className={style.input}
        value={row.wersja}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowFragmenty({
              ...row,
              wersja: e.target.value,
              update:true
            });
                       // 
                       setStatus(3)
          }
        }}
      ></input>
    </td>
  );
}

function NakladOprawaFregment({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowFragmenty = contextModalInsert.handleUpdateRowFragmenty;
  const [setStatus] = useStatus()
  return (
    <td>
      <input
        className={style.input}
        value={row.naklad}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowFragmenty({
              ...row,
              naklad: e.target.value,
              update:true
            });
                       // 
                       setStatus(3)
          }
        }}
      ></input>
    </td>
  );
}


function WersjaOprawa({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
const [setStatus] = useStatus()
  return (
    <td>
      <input
        className={style.input}
        value={row.wersja}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowOprawa({
              ...row,
              wersja: e.target.value,
              update:true
            });

                       // 
                       setStatus(3)
          }
        }}
      ></input>
    </td>
  );
}

function BokOprawy({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  const [setStatus] = useStatus()
  return (
    <td>
      <input
        className={style.input}
        value={row.bok_oprawy}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowOprawa({
              ...row,
              bok_oprawy: e.target.value,
              update:true
            });

                       // 
                       setStatus(3)
          }
        }}
      ></input>
    </td>
  );
}

function UwagiOprawa({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  const [setStatus] = useStatus()
  return (
    <td>
      <input
        className={style.input}
        value={row.uwagi}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowOprawa({
              ...row,
              uwagi: e.target.value,
              update:true
            });

                       // 
                       setStatus(3)
          }
        }}
      ></input>
    </td>
  );
}

function NakladOprawa({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  const [setStatus] = useStatus()
  return (
    <td>
      <input
        className={style.input}
        value={row.naklad}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowOprawa({
              ...row,
              naklad:  ifNoTextSetNull(e.target.value) ,
              update:true
            });

                       // 
                       setStatus(3)
          }
        }}
      ></input>
    </td>
  );
}
