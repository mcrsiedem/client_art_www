import React, { useState, useRef,useContext } from "react";
import style from "./TablePaperGrupa.module.css";

import iconDelete from "assets/trash2.svg";
import iconEdit from "assets/settings.svg";
import iconCopy from "assets/copy.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import ChangePaper from "./ChangePaper";
import { getMaxID } from "actions/getMaxID";


export default function TablePaperGrupa({
  selectRow,setSelectRow,
  paperSelectView,
  setBtnZapisz,
  daneZamowienia,
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
      const listaPapierowGrupaWyszukiwarka = appcontext.listaPapierowGrupaWyszukiwarka;
      const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;

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

      if(paperSelectView[2].view == true){
  return (
    <div ref={inputElement} className={style.main}>
      <table  className={style.table2}>
        <thead>
          <tr>
            <th className={style.id}>#</th>
            <th className={style.info}>Grupa papieru</th>

          </tr>
        </thead>
        <tbody   className={style.center}>
          {listaPapierowGrupaWyszukiwarka?.map((row, index) => {
            return (
              // <tr className={row.insert ? style.tr_insert : style.tr}
              <tr className={color(row)}
                key={row.id}
                onClick={()=>{
                  setSelectRow(row)
                  setSelectTable(inputElement)
                  setListaPapierowGrupaWyszukiwarka(
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
                  // ()=>chooseClient(daneZamowienia,setDaneZamowienia,row.id)
                }
              >
                <ID row={row} index={index + 1} />
                <Grupa row={row} setBtnZapisz={setBtnZapisz}/>
                {/* <CopyIcon row={row} scrollTable={scrollTable} inputElement={inputElement}/>
                <DeleteIcon
                  scrollTable={  scrollTable}
                  daneZamowienia={daneZamowienia}
                  row={row}
                  rowID={rowID}
                  setShowDeleteClientPane={setShowDeleteClientPane}
                /> */}
              </tr>
            );
          })}
        </tbody>
      </table>

        {/* <ChangePaper showChange={showChange} setShowChange={setShowChange} selectedPaperRow={selectedPaperRow} /> */}
      
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

function DeleteIcon({ row }) {
  const appcontext = useContext(AppContext);
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;

  return (
    <td>
      <img
        className={style.icon}
        src={iconDelete}
        onClick={() => {
          setListaPapierowWyszukiwarka(
            listaPapierowWyszukiwarka.map((t, a) => {
            // console.log("oprawa id" +prev)
            if (t.id == row.id) {
              return {
                ...t,
         
                delete: true
      
              };
            } else {
              return t;
            }
          })
        );
        setBtnZapiszPapierDisabled(false)
        }
        
      }

        onDoubleClick={() => {
          setListaPapierowWyszukiwarka(
            listaPapierowWyszukiwarka.map((t, a) => {
            // console.log("oprawa id" +prev)
            if (t.id == row.id) {
              return {
                ...t,
         
                delete: false
      
              };
            } else {
              return t;
            }
          })
        );
        setBtnZapiszPapierDisabled(false)
        }}
        alt="Procesy"
      />
    </td>
  );
}


function CopyIcon({ row,scrollTable,inputElement}) {

  const appcontext = useContext(AppContext);
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;

  return (
    <td>
      <img
        className={style.icon}
        src={iconCopy}
        onClick={() => {
          // setDaneZamowienia({ ...daneZamowienia, klient_id: row.id });
          // rowID.current = { id: row.id, firma: row.firma };
          // setShowChange(true)
          // setSelectedPaperRow(row)
          const promiseA = new Promise((resolve, reject) => {

                 const newlistaPapierowWyszukiwarka = listaPapierowWyszukiwarka.slice();
          newlistaPapierowWyszukiwarka.push({
            ...row,
            id: getMaxID(listaPapierowWyszukiwarka),
            insert: true

          })

          setListaPapierowWyszukiwarka(newlistaPapierowWyszukiwarka)
            resolve(777);
          });
     
          promiseA.then(res => scrollTable(inputElement))
          
          // const element = document.getElementById("table_paper");
          // element.scrollTop = element.scrollHeight;
          // element.scrollTo(0, element.scrollHeight);


        }}
        alt="Procesy"
      />
    </td>
  );
}




function ID({ row,index}) {
  return <td>{index}</td>;
}

function Grupa({ row,setBtnZapisz}) {
    const appcontext = useContext(AppContext);
    const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;
    const listaPapierowGrupaWyszukiwarka = appcontext.listaPapierowGrupaWyszukiwarka;
    const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
      const modalcontext = useContext(ModalInsertContext);
      // const isBtnZapiszPapierAvtive = modalcontext.isBtnZapiszPapierAvtive;
      const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return (
    <td className={style.labelinput}>

      <input
        className={style.input_info}
        type="text"
        value={row.grupa}
        onChange={(event) => {
          const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ"-.]+$/;
          if (event.target.value === "" || re.test(event.target.value)) {

            setListaPapierowGrupaWyszukiwarka(
              listaPapierowGrupaWyszukiwarka.map((t, a) => {
              if (t.id == row.id) {
                return {
                  ...t,
                  grupa: event.target.value,
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