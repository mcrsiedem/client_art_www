import React, { useState, useRef,useContext } from "react";
import style from "./TablePaper.module.css";

import iconDelete from "assets/trash2.svg";
import iconEdit from "assets/settings.svg";
import iconCopy from "assets/copy.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import ChangePaper from "./ChangePaper";
import { getMaxID } from "actions/getMaxID";


export default function TablePaper({selectRow,setSelectRow,
  paperSelectView,
  setBtnZapisz,
  daneZamowienia,
  setDaneZamowienia,
  scrollTable,
  setSelectTable

}) {
  const [selectedPaperRow, setSelectedPaperRow] = useState();
  const [isShowDeleteClientPane, setShowDeleteClientPane] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const rowID = useRef();

  const inputElement = useRef();


      const appcontext = useContext(AppContext);
      const modalcontext = useContext(ModalInsertContext);
      const listaPapierow = appcontext.listaPapierow;
      const setListaPapierow = appcontext.setListaPapierow;
      const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
      const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
      const showPaperStage = modalcontext.showPaperStage;
      const setShowPaperStage = modalcontext.setShowPaperStage;
      const selectedElementROW = modalcontext.selectedElementROW;


      // const scrollTable = () => {
      //   inputElement.current.scrollTo({ top: 10000, behavior: "smooth" })
      // };

      const color = (row) => {
        if (row.select) {
          return style.tr_select;
        }
        if (row.delete) {
          return style.tr_delete;
        }
        if (row.insert) {
          return style.tr_insert;
        }
        if (row.update) {
          return style.tr_update;
        }
 

        return style.tr;
      };

if(paperSelectView[0].view == true){
  return (
    <div ref={inputElement} className={style.main}>
      <table  className={style.table2}>
        <thead>
          <tr>
            <th className={style.id}>#</th>
            <th className={style.grupa}>Grupa</th>
            <th className={style.nazwa}>Nazwa</th>
            <th className={style.gramatura}>g/m2</th>
            <th className={style.wykonczenie}></th>
            <th className={style.opiekun}>Bulk</th>
            <th className={style.info}>Opis</th>
            <th className={style.th_ustawienia}>Zmień</th>
         
            {/* <th className={style.th_ustawienia}></th> */}
          </tr>
        </thead>
        <tbody   className={style.center}>
          {listaPapierowWyszukiwarka?.map((row, index) => {
            return (
              // <tr className={row.insert ? style.tr_insert : style.tr}
              <tr className={color(row)}
                key={row.id}
                onClick={()=>{
                  setSelectTable(inputElement)
                  setSelectRow(row)
                  setListaPapierowWyszukiwarka(
                    prev=>prev.map((t, a) => {
                      return {
                        ...t,
                        select: false
                      };
                
                    
                  }).map((t, a) => {
                    if (t.id == row.id) {
                      return {
                        ...t,
                        select: true
                      };
                    } else {
                      return t;
                    }
                  })

                );
                }}
                onDoubleClick={
                  () => openEdit(row, rowID, setShowEdit)
                }
              >
                <ID row={row} index={index + 1} />
                <Grupa row={row} />
                <Nazwa row={row} />
                <Gramatura row={row} />
                <Wykonczenie row={row} />
                <Bulk row={row} />
                <Info row={row} setBtnZapisz={setBtnZapisz}/>
                <UseIcon
                  row={row}
                  rowID={rowID}
                  daneZamowienia={daneZamowienia}
                  setDaneZamowienia={setDaneZamowienia}
                  setShowChange={setShowChange}
                  setSelectedPaperRow={setSelectedPaperRow}

                />


              </tr>
            );
          })}
        </tbody>
      </table>

        <ChangePaper showChange={showChange} setShowChange={setShowChange} selectedPaperRow={selectedPaperRow} />
      
    </div>
  );
}

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
  return <td>

    
    {row.grupa}</td>;
}
function Nazwa({ row }) {

  const appcontext = useContext(AppContext);

  const listaPapierowNazwy = appcontext.listaPapierowNazwy;

  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return <td>
            <select
          className={ style.select_papier }
          value={row.nazwa_id}
          onChange={(e) => {
            setListaPapierowWyszukiwarka(
              listaPapierowWyszukiwarka.map((t, a) => {
              // console.log("oprawa id" +prev)
              if (t.id == row.id) {
                return {
                  ...t,
                  nazwa_id: e.target.value,
                  update: true
        
                };
              } else {
                return t;
              }
            })
          );

          setBtnZapiszPapierDisabled(false)
          }}
        >
          {   <option value = "0"  >
             wybierz papier
            </option>}
       
          {listaPapierowNazwy.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
        </select>
    </td>;
}

function Gramatura({ row, index }) {
  return <td>{row.gramatura}</td>;
}

function ID({ row,index}) {
  return <td>{index}</td>;
}

function Wykonczenie({ row }) {
  return <td>{row.wykonczenie}</td>;
}
function Bulk({ row }) {
  return <td>{row.bulk}</td>;
}
function Info2({ row }) {
  return <td>{row.info}</td>;
}
function Opiekun({ row }) {
  return <td>{row.opiekun_nazwa}</td>;
}


function Info({ row,setBtnZapisz}) {
    const appcontext = useContext(AppContext);
    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
    const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
      const modalcontext = useContext(ModalInsertContext);
      // const isBtnZapiszPapierAvtive = modalcontext.isBtnZapiszPapierAvtive;
      const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return (
    <td className={style.labelinput}>

      <input
        className={style.input_info}
        type="text"
        value={row.info}
        onChange={(event) => {
          const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ"-.]+$/;
          if (event.target.value === "" || re.test(event.target.value)) {
            // setListaPapierowWyszukiwarka({ ...daneKlienta, firma: event.target.value });
           
            setListaPapierowWyszukiwarka(
              listaPapierowWyszukiwarka.map((t, a) => {
              // console.log("oprawa id" +prev)
              if (t.id == row.id) {
                return {
                  ...t,
                  info: event.target.value,
                  update: true
        
                };
              } else {
                return t;
              }
            })
          );
          setBtnZapiszPapierDisabled(false)

          }
        }}
      >

      </input>
    </td>
  );
}