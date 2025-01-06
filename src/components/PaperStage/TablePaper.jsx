import React, { useState, useRef,useContext } from "react";
import style from "./TablePaper.module.css";

import iconDelete from "assets/trash2.svg";
import iconEdit from "assets/settings.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import ChangePaper from "./ChangePaper";


export default function TablePaper({
  klienciWyszukiwarka,
  daneZamowienia,
  setDaneZamowienia,
  getClients,
  setShowAddClientPane,
}) {
  const [selectedPaperRow, setSelectedPaperRow] = useState();
  const [isShowDeleteClientPane, setShowDeleteClientPane] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const rowID = useRef();


      const appcontext = useContext(AppContext);
      const modalcontext = useContext(ModalInsertContext);
      const listaPapierow = appcontext.listaPapierow;
      const setListaPapierow = appcontext.setListaPapierow;
      const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
      const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
      const showPaperStage = modalcontext.showPaperStage;
      const setShowPaperStage = modalcontext.setShowPaperStage;
      const selectedElementROW = modalcontext.selectedElementROW;

  return (
    <div className={style.main}>
      <table className={style.table2}>
        <thead>
          <tr>
            <th className={style.id}>#</th>
            <th className={style.firma}>Grupa</th>
            <th className={style.adres}>Nazwa</th>
            <th className={style.kod}>Gramatura</th>
            <th className={style.nIP}>Wykończenie</th>
            <th className={style.opiekun}>Volumen</th>
            <th className={style.th_ustawienia}>Ustaw</th>
            <th className={style.th_ustawienia}></th>
          </tr>
        </thead>
        <tbody className={style.center}>
          {listaPapierowWyszukiwarka?.map((row, index) => {
            return (
              <tr
                key={row.id}
                onDoubleClick={
                  () => openEdit(row, rowID, setShowEdit)
                  // ()=>chooseClient(daneZamowienia,setDaneZamowienia,row.id)
                }
              >
                <ID row={row} index={index + 1} />
                <Grupa row={row} />
                <Nazwa row={row} />
                <Gramatura row={row} />
                <Wykonczenie row={row} />
                <Bulk row={row} />
    

                {/* <Opiekun row={row} /> */}
                <UseIcon
                  row={row}
                  rowID={rowID}
                  daneZamowienia={daneZamowienia}
                  setDaneZamowienia={setDaneZamowienia}
                  setShowChange={setShowChange}
                  setSelectedPaperRow={setSelectedPaperRow}

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

      {/* {isShowDeleteClientPane && (
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
      )} */}


        <ChangePaper showChange={showChange} setShowChange={setShowChange} selectedPaperRow={selectedPaperRow} />
      
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
  return (
    <td>
      <img
        className={style.icon}
        src={iconDelete}
        onClick={() => {
          // nie mozna skasowac firmy, ktora jest aktualnie ustawiona jak klient
          if (row.id != daneZamowienia.klient_id) {
            rowID.current = { id: row.id, firma: row.firma };
            setShowDeleteClientPane(true);
          }
        }}
        alt="Procesy"
      />
    </td>
  );
}

function UseIcon({ row,setShowChange ,setSelectedPaperRow}) {
  return (
    <td>
      <img
        className={style.icon}
        src={iconEdit}
        onClick={() => {
          // setDaneZamowienia({ ...daneZamowienia, klient_id: row.id });
          // rowID.current = { id: row.id, firma: row.firma };
          setShowChange(true)
          setSelectedPaperRow(row)
        }}
        alt="Procesy"
      />
    </td>
  );
}

function Grupa({ row }) {
  return <td>{row.grupa}</td>;
}
function Nazwa({ row }) {
  return <td>{row.nazwa}</td>;
}

function Gramatura({ row, index }) {
  return <td>{row.gramatura}</td>;
}

function ID({ row }) {
  return <td>{row.id}</td>;
}

function Wykonczenie({ row }) {
  return <td>{row.wykonczenie}</td>;
}
function Bulk({ row }) {
  return <td>{row.bulk}</td>;
}

function Opiekun({ row }) {
  return <td>{row.opiekun_nazwa}</td>;
}
