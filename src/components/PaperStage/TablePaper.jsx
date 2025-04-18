import React, { useState, useRef,useContext } from "react";
import style from "./TablePaper.module.css";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { _wykonczenie } from "utils/initialvalue";

export default function TablePaper({setSelectRow,
  paperSelectView,
  setBtnZapisz,
  setSelectTable

}) {

  const [showEdit, setShowEdit] = useState(false);
    

  const rowID = useRef();
  const inputElement = useRef();

      const appcontext = useContext(AppContext);
      const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
      const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;

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
            <th className={style.nazwa}>Nazwa</th>
            <th className={style.bulk}>g/m2</th>
            <th className={style.bulk}>Wykonczenie</th>
            <th className={style.bulk}>Bulk</th>
            <th className={style.grupa}>Powleczenie</th>
            <th className={style.grupa}>Grupa</th>
            <th className={style.grupa}>Rodzaj</th>
            <th className={style.info}>Opis</th>
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
                <Nazwa row={row} />
                <Gramatura row={row} />
                <Wykonczenie row={row} />
                <Bulk row={row} />
                <Powleczenie row={row} />
                <Grupa row={row} />
                <Rodzaj row={row} />
                <Info row={row} setBtnZapisz={setBtnZapisz}/>
              </tr>
            );
          })}
        </tbody>
      </table>
      
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
    nip: row.nip,
    opiekun_id: row.opiekun_id,
    utworzyl_user_id: row.utworzyl_user_id,
  };
  setShowEdit(true);
};



function Wykonczenie2({ row }) {
  const appcontext = useContext(AppContext);
  const listaPapierowGrupa = appcontext.listaPapierowGrupa;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return <td>
            <select
          className={ style.select_papier_wykonczenie }
          value={row.wykonczenie_id}
          onChange={(e) => {
            setListaPapierowWyszukiwarka(
              listaPapierowWyszukiwarka.map((t, a) => {
              if (t.id == row.id) {
                return {
                  ...t,
                  wykonczenie_id: e.target.value,
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
          {/* {   <option value = "0"  >
             wybierz papier
            </option>}
        */}
          {_wykonczenie.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
        </select>
    </td>;
}

function Grupa2({ row }) {
  const appcontext = useContext(AppContext);
  const listaPapierowGrupa = appcontext.listaPapierowGrupa;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return <td>
            <select
          
          className={ style.select_papier_grupa }
          value={row.grupa_id}
          onChange={(e) => {
            setListaPapierowWyszukiwarka(
              listaPapierowWyszukiwarka?.map((t, a) => {
              if (t.id == row.id) {
                return {
                  ...t,
                  grupa_id: e.target.value,
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
          {/* {   <option value = "0"  >
             wybierz papier
            </option>}
        */}
          {listaPapierowGrupa.map((option) => (
            <option key={option.id} value={option.id}>
            {option.grupa}
            </option>
          ))}
        </select>
    </td>;
}



function Grupa({ row,index}) {
  const appcontext = useContext(AppContext);
  const listaPapierowGrupa = appcontext.listaPapierowGrupa;
  return <td>{listaPapierowGrupa?.filter(x => x.id == row.grupa_id)[0].grupa}</td>;
}
function Rodzaj({ row,index}) {
  const appcontext = useContext(AppContext);
  const listaPapierowRodzaj = appcontext.listaPapierowRodzaj;
  return <td>{row.rodzaj}</td>;
}
function Powleczenie({ row,index}) {
  const appcontext = useContext(AppContext);
  const listaPapierowRodzaj = appcontext.listaPapierowRodzaj;
  return <td>{row.powleczenie}</td>;
}

function Wykonczenie({ row,index}) {
  const appcontext = useContext(AppContext);
  const wykonczenieEdit = appcontext.wykonczenieEdit;
  // return <td>{_wykonczenie.filter(x => x.id != row.wykonczenie_id).nazwa}</td>;
  // return <td>{row.wykonczenie_id}</td>;
  return <td>          {_wykonczenie.filter(x => x.id == row.wykonczenie_id).map((option) => (
    <option key={option.id} value={option.id}>
      {option.nazwa}
    </option>
  ))}</td>;
}

// function Nazwa2({ row }) {
//   const appcontext = useContext(AppContext);
//   const listaPapierowNazwy = appcontext.listaPapierowNazwy;
//   const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
//   const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
//   const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
//   return <td>
//             <select
//           className={ style.select_papier }
//           value={row.nazwa_id}
//           onChange={(e) => {
//             setListaPapierowWyszukiwarka(
//               listaPapierowWyszukiwarka.map((t, a) => {
//               if (t.id == row.id) {
//                 return {
//                   ...t,
//                   nazwa_id: e.target.value,
//                   update: true
        
//                 };
//               } else {
//                 return t;
//               }
//             })
//           );

//           setBtnZapiszPapierDisabled(false)
//           }}
//         >
//           {   <option value = "0"  >
//              wybierz papier
//             </option>}
       
//           {listaPapierowNazwy.map((option) => (
//             <option key={option.id} value={option.id}>
//               {option.nazwa}
//             </option>
//           ))}
//         </select>
//     </td>;
// }



function ID({ row,index}) {
  return <td>{index}</td>;
}

function Nazwa({ row,index}) {
  const appcontext = useContext(AppContext);
  const listaPapierowNazwy = appcontext.listaPapierowNazwy;
  return <td>{listaPapierowNazwy.filter(x => x.id == row.nazwa_id)[0].nazwa}</td>;
}

function Gramatura({ row,index}) {
  return <td>{row.gramatura}</td>;
}
function Bulk({ row,index}) {
  return <td>{row.bulk}</td>;
}
function Info({ row }) {
  return <td>{row.info}</td>;
}
// function Opiekun({ row }) {
//   return <td>{row.opiekun_nazwa}</td>;
// }






function Info2({ row}) {
    const appcontext = useContext(AppContext);
    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
    const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
      const modalcontext = useContext(ModalInsertContext);
      // const isBtnZapiszPapierAvtive = modalcontext.isBtnZapiszPapierAvtive;
      const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return (
    <td className={style.labelinput}>

      <input
        className={style.select_papier_info}
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