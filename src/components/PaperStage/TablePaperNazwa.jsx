import React, { useState, useRef,useContext } from "react";
import style from "./TablePaperNazwa.module.css";
import style2 from "./TablePaperNazwa2.module.css";
import logoExpand from "assets/expand.svg";

import iconDelete from "assets/trash2.svg";
import iconEdit from "assets/settings.svg";
import iconCopy from "assets/copy.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import ChangePaper from "./ChangePaper";
import { getMaxID } from "actions/getMaxID";
import PaperRow from "./PaperRow";


export default function TablePaperNazwa({
  selectRow,setSelectRow,
  paperSelectView,
  setPaperSelectView,
  btnZapisz,
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
  const [show, setShow] = useState(false);
  const rowID = useRef();

  const inputElement = useRef();


      const appcontext = useContext(AppContext);
      const modalcontext = useContext(ModalInsertContext);

      const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
      const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
      const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
      const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
      const listaPapierow = appcontext.listaPapierow;
      

      // const scrollTable = () => {
      //   inputElement.current.scrollTo({ top: 10000, behavior: "smooth" })
      // };



      if(paperSelectView[1].view == true){
  return (
    <div ref={inputElement} className={style.main}>
      <table  className={style.table2}>
        <thead>
          <tr>
            <th className={style.id}></th>

            <th className={style.info}>#</th>
            <th className={style.info}>Nazwa papieru</th>
            {/* <th className={style.th_ustawienia}>Zmień</th> */}

          </tr>
        </thead>
        <tbody   className={style.center}>
          {listaPapierowNazwyWyszukiwarka?.map((row2, index) => {
            return (
              // <tr className={row.insert ? style.tr_insert : style.tr}
              <>
                <tr
                  className={color(row2)}
                  key={row2.id}
                  onClick={() => {
                    setSelectRow(row2);
                    setSelectTable(inputElement);
                    setListaPapierowNazwyWyszukiwarka((prev) =>
                      prev
                        .map((t, a) => {
                          return {
                            ...t,
                            select: false,
                          };
                        })
                        .map((t, a) => {
                          if (t.id == row2.id) {
                            return {
                              ...t,
                              select: true,
                            };
                          } else {
                            return t;
                          }
                        })
                    );
                  }}
                  onDoubleClick={(x) => {
                    if ((document.onkeydown = x.ctrlKey)) {
                      setPaperSelectView(
                        paperSelectView
                          .map((t) => {
                            return { ...t, view: false };
                          })
                          .map((t) => {
                            if (t.nazwa == "papier") {
                              return { ...t, view: true };
                            } else {
                              return t;
                            }
                          })
                      );

                      const m = [...listaPapierow];
                      setListaPapierowWyszukiwarka(
                        m.filter((k) => k.nazwa_id == selectRow.id)
                      );
                    }

                    setSelectRow(null);
                  }}
                >
                  <Rozwin row={row2} />
                  <ID row={row2} index={index + 1} />
                  <Nazwa row={row2} setBtnZapisz={setBtnZapisz} />
                  {/* <EXPAND row={row2}  /> */}
                </tr>

                {listaPapierowWyszukiwarka
                  ?.filter((x) => x.nazwa_id == row2.id)
                  .map((row, index) => {
                    if (row2.isExpand) {
                      return (
                        <PaperRow row={row} inputElement={inputElement} setSelectTable={setSelectTable} setSelectRow={setSelectRow}/>
                      )
                     

                    }
                  })}
              </>
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

const chooseClient = (daneZamowienia, setDaneZamowienia, id) => {
  setDaneZamowienia({ ...daneZamowienia, klient_id: id });
};
function DeleteIcon({ row }) {
  const appcontext = useContext(AppContext);
  const modalcontext = useContext(ModalInsertContext);

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

function Rozwin({ row }) {
  const appcontext = useContext(AppContext);
  const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
  const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;

  // if  (fragmenty?.filter((x) => x.element_id == row.id).length !== 0){
  return (
    <div>
      <img
        className={style.expand}
        src={logoExpand}
        onClick={() => {

          setListaPapierowNazwyWyszukiwarka(
            listaPapierowNazwyWyszukiwarka.map((t) => {
              if (t.id == row.id) {
                return {...t,
                  isExpand: !t.isExpand
                
                }
              } else {
                return t;
              }
            })
          );
 
          
        }}
        alt="Procesy"
      />
    </div>
  );
// }else return <p> </p>
}

function CopyIcon({ row,scrollTable,inputElement}) {

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

function Grupa({ row }) {
  return <td>

    
    {row.grupa}</td>;
}
function Nazwa2({ row }) {

  const appcontext = useContext(AppContext);

  const listaPapierowNazwy = appcontext.listaPapierowNazwy;

  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return <td>
            <select
          className={ style.select_papier }
          value={row.nazwa}
          onChange={(e) => {
            setListaPapierowWyszukiwarka(
              listaPapierowWyszukiwarka?.map((t, a) => {
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


function ID({ row,index}) {
  return <td>{index}</td>;
}



function Nazwa({ row,setBtnZapisz}) {
    const appcontext = useContext(AppContext);
    const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
    const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
      const modalcontext = useContext(ModalInsertContext);
      // const isBtnZapiszPapierAvtive = modalcontext.isBtnZapiszPapierAvtive;
      const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return (
    <td className={style.labelinput}>

      <input
        className={style.input_info}
        type="text"
        value={row.nazwa}
        onChange={(event) => {
          const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ"-.]+$/;
          if (event.target.value === "" || re.test(event.target.value)) {
            // setListaPapierowWyszukiwarka({ ...daneKlienta, firma: event.target.value });
           
            setListaPapierowNazwyWyszukiwarka(
              listaPapierowNazwyWyszukiwarka.map((t, a) => {
              // console.log("oprawa id" +prev)
              if (t.id == row.id) {
                return {
                  ...t,
                  nazwa: event.target.value,
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


//-------------------------------- tu


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

