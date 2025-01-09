import React, { useState, useRef,useContext } from "react";
import style from "./TableClient.module.css";
import DeleteClient from "./DeleteClient";
import EditClient from "./EditClient";
import iconDelete from "../../../assets/trash2.svg";
import iconEdit from "../../../assets/settings.svg";
import ChangeClient from "./ChangeClient";
import { AppContext } from "context/AppContext";

export default function Table({
  klienciWyszukiwarka,
  daneZamowienia,
  setDaneZamowienia,
  getClients,
  setShowAddClientPane,
}) {
  const [selectedRow, setSelectedRow] = useState("");
  const [isShowDeleteClientPane, setShowDeleteClientPane] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const rowID = useRef();

  return (
    <div className={style.main}>
      <table className={style.table2}>
        <thead>
          <tr>
            <th className={style.id}>#</th>
            <th className={style.firma}>Firma</th>
            <th className={style.adres}>Adres</th>
            <th className={style.kod}>Kod</th>
            <th className={style.nIP}>NIP</th>
            <th className={style.opiekun}>Opiekun</th>
            <th className={style.th_ustawienia}></th>
            <th className={style.th_ustawienia}></th>
          </tr>
        </thead>
        <tbody className={style.center}>
          {klienciWyszukiwarka.map((row, index) => {
            return (
              <tr
                key={row.id}
                onDoubleClick={
                  () => openEdit(row, rowID, setShowEdit)
                  // ()=>chooseClient(daneZamowienia,setDaneZamowienia,row.id)
                }
              >
                <ID row={row} index={index + 1} />
                <Firma row={row} />
                <Adres row={row} />
                <Kod row={row} />
                <NIP row={row} />
                <Opiekun row={row} />
                <UseIcon
                  row={row}
                  rowID={rowID}
                  daneZamowienia={daneZamowienia}
                  setDaneZamowienia={setDaneZamowienia}
                  setShowChange={setShowChange}

                />
                <DeleteIcon
                  daneZamowienia={daneZamowienia}
                  row={row}
                  rowID={rowID}
                  setShowDeleteClientPane={setShowDeleteClientPane}
                />
              </tr>
            );
          })}
        </tbody>
      </table>

      {isShowDeleteClientPane && (
        <DeleteClient
          setShowDeleteClientPane={setShowDeleteClientPane}
          getClients={() => getClients()}
          rowID={rowID}
        />
      )}

      {showEdit && (
        <EditClient
        setShowEdit={setShowEdit}
          getClients={() => getClients()}
          rowID={rowID}
        />
      )}

{showChange&& (
        <ChangeClient
        setDaneZamowienia={setDaneZamowienia}
        daneZamowienia={daneZamowienia}
          setShowChange={setShowChange}
          rowID={rowID}
        />
      )}
    </div>
  );
}
const openEdit = (row, rowID, setShowEdit) => {
  // otwiera edycję po dwukrotnym kliknięciu
  rowID.current = {
    id: row.id,
    firma: row.firma,
    adres: row.adres,
    kod: row.kod,
    nIP: row.nIP,
    opiekun_id: row.opiekun_id,
    utworzyl_user_id: row.utworzyl_user_id,
  };
  setShowEdit(true);
};

const chooseClient = (daneZamowienia, setDaneZamowienia, id) => {
  setDaneZamowienia({ ...daneZamowienia, klient_id: id });
};
function DeleteIcon({ row, rowID, setShowDeleteClientPane, daneZamowienia }) {
    const contextApp = useContext(AppContext);
  const data = contextApp.zamowienia
  const setData = contextApp.setZamowienia
  const even = (element) => element?.klient_id == row.id;

  // if (legiFragmenty.some(even)) {
  //   return (
  //     <div className={style.center}>
  //       <p style={{ color: "red" }}>UWAGA: bezdomna lega!</p>
  //     </div>
  //   );
  // }

  return (
    <td>
      <img
        className={style.icon}
        src={iconDelete}
        onClick={() => {
          // nie mozna skasowac firmy, ktora jest aktualnie ustawiona jak klient

          if(!data.some(even)){

    if (row.id != daneZamowienia.klient_id) {
            rowID.current = { id: row.id, firma: row.firma };
            setShowDeleteClientPane(true);
          }

          }
      
        }}
        alt="Procesy"
      />
    </td>
  );
}

function UseIcon({ row, rowID,setDaneZamowienia, daneZamowienia,setShowChange }) {
  return (
    <td>
      <img
        className={style.icon}
        src={iconEdit}
        onClick={() => {
          // setDaneZamowienia({ ...daneZamowienia, klient_id: row.id });
          rowID.current = { id: row.id, firma: row.firma };
          setShowChange(true)
        }}
        alt="Procesy"
      />
    </td>
  );
}

function Firma({ row }) {
  return <td>{row.firma}</td>;
}
function Adres({ row }) {
  return <td>{row.adres}</td>;
}

function ID({ row, index }) {
  return <td>{index}</td>;
}

function Kod({ row }) {
  return <td>{row.kod}</td>;
}

function NIP({ row }) {
  return <td>{row.nIP}</td>;
}

function Opiekun({ row }) {
  return <td>{row.opiekun_nazwa}</td>;
}
