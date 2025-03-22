import React, { useState, useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./PaperNazwaRow.module.css";
import { AppContext } from "context/AppContext";
import logoExpand from "assets/expand.svg";
import add from "assets/add2.svg";

import PaperRow from "./PaperRow";
import DecodeToken from "pages/Login/DecodeToken";
import Logo_ustawienia2 from "assets/hand.svg";



export default function PaperNazwaRow({rowPapierNazwy,setPaperSelectView,paperSelectView,selectRow,index,setBtnZapisz,setSelectRow,inputElement,setSelectTable}) {
      const modalcontext = useContext(ModalInsertContext);
      const appcontext = useContext(AppContext);
      const selectedElementROW = modalcontext.selectedElementROW;
      const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
      const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
      const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
      const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
      const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;
      const listaPapierow = appcontext.listaPapierow;
      const lockDragDropPapier = appcontext.lockDragDropPapier;
      const handleClick = (rowPapierNazwy) => {
        setSelectRow(rowPapierNazwy);
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
              if (t.id == rowPapierNazwy.id) {
                return {
                  ...t,
                  select: true,
                };
              } else {
                return t;
              }
            })
        );
        setListaPapierowWyszukiwarka((prev) =>
          prev
            .map((t, a) => {
              return {
                ...t,
                select: false,
              };
            })
        );


        setListaPapierowGrupaWyszukiwarka((prev) =>
          prev
            .map((t, a) => {
              return {
                ...t,
                select: false,
              };
            })
      
        );
      }
      


      function handleDragStart(){
    
                 //  e.preventDefault()
        sessionStorage.setItem("id_element_drag", rowPapierNazwy.id);
        sessionStorage.setItem("typ_drag", 'paper_row');

 
    
      }

      return (
              <>
                <tr
                draggable={lockDragDropPapier}
                  onDragStart={handleDragStart}
                  className={color(rowPapierNazwy)}
                  key={rowPapierNazwy.id}
                  onClick={() => {
                    handleClick(rowPapierNazwy);
                  }}
                  // onDoubleClick={(ev) => {
                  //   handleDoubleClik(ev);
                  // }}
                >
                  <td><HandBTN paperSelectView={paperSelectView}/></td>
                  

                  <Rozwin row={rowPapierNazwy} />
                  <td></td>

                  {/* <ID row={rowPapierNazwy} index={index + 1} /> */}
                  <Nazwa row={rowPapierNazwy} setBtnZapisz={setBtnZapisz} />
                  <td></td>
                  <td></td>
                  <td></td>
                  <Powleczenie row={rowPapierNazwy} setBtnZapisz={setBtnZapisz} />
                  <td></td>
          
                </tr>

                {listaPapierowWyszukiwarka
                  ?.filter((x) => x.nazwa_id == rowPapierNazwy.id)
                  .map((row, index) => {
                    if (rowPapierNazwy.isExpand) {
                      return (
                        <PaperRow
                          row={row}
                          inputElement={inputElement}
                          setSelectTable={setSelectTable}
                          setSelectRow={setSelectRow}
                        />
                      );
                    }
                  })}
              </>
      );


}


const HandBTN = ({ paperSelectView }) => {
  const appcontext = useContext(AppContext);

  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setListaPapierow = appcontext.setListaPapierow;
  const setListaPapierowNazwy = appcontext.setListaPapierowNazwy;
  const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
  const setListaPapierowGrupa = appcontext.setListaPapierowGrupa;
  const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;

  const setListaPapierowPostac = appcontext.setListaPapierowPostac;
  const setListaPapierowPostacWyszukiwarka = appcontext.setListaPapierowPostacWyszukiwarka;
  const setListaPapierowRodzaj = appcontext.setListaPapierowRodzaj;
  const setListaPapierowRodzajWyszukiwarka = appcontext.setListaPapierowRodzajWyszukiwarka;
  const setListaPapierowWykonczenia = appcontext.setListaPapierowWykonczenia;
  const setListaPapierowWykonczeniaWyszukiwarka = appcontext.setListaPapierowWykonczeniaWyszukiwarka;
  const setListaPapierowPowleczenie = appcontext.setListaPapierowPowleczenie;
  const setListaPapierowPowleczenieWyszukiwarka = appcontext.setListaPapierowPowleczenieWyszukiwarka;
  const lockDragDropPapier = appcontext.lockDragDropPapier;

  if(lockDragDropPapier & paperSelectView[2].view == true){
          return (
    
    <div className={style.menu_produkty}>
      <img

        className={ style.iconMenuBtn}
        src={Logo_ustawienia2}
        title="Odśwież papiery"
        onClick={() => {

   
        }}
        alt="x"
      />
    </div>
  );
  } else return(    <div className={style.menu_produkty}>

  </div>)

  
};



function Rozwin({ row }) {
  const appcontext = useContext(AppContext);
  const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
  const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;

  // if  (fragmenty?.filter((x) => x.element_id == row.id).length !== 0){
  return (
    <td className={style.rozwin}>
      

      {listaPapierowWyszukiwarka?.filter((x) => x.nazwa_id == row.id).length != 0 ? 
      <img
        className={row.isExpand ?  style.expand_down :style.expand}
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
      
      :<></>
      }

      
    </td>
  );
// }else return <p> </p>
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
//           value={row.nazwa}
//           onChange={(e) => {
//             setListaPapierowWyszukiwarka(
//               listaPapierowWyszukiwarka?.map((t, a) => {
//               // console.log("oprawa id" +prev)
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


// function ID({ row,index}) {
//   return <td  className={style.id}>{index}</td>;
// }

function Powleczenie({ row }) {
  const appcontext = useContext(AppContext);
  const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
  const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
    const modalcontext = useContext(ModalInsertContext);
    // const isBtnZapiszPapierAvtive = modalcontext.isBtnZapiszPapierAvtive;
    const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
    const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;

    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;

const listaPapierowPowleczenie = appcontext.listaPapierowPowleczenie;
  return <td>
            <select
          className={ style.select_papier_powleczenie }
          value={row.powleczenie_id}
          onChange={(e) => {
            setListaPapierowNazwyWyszukiwarka(
              listaPapierowNazwyWyszukiwarka.map((t, a) => {
              if (t.id == row.id) {
                return {
                  ...t,
                  powleczenie_id: e.target.value,
                  update: true
        
                };
              } else {
                return t;
              }
            })
          );


          setListaPapierowWyszukiwarka(
            listaPapierowWyszukiwarka.map((t, a) => {
            if (t.nazwa_id == row.id) {
              return {
                ...t,
                powleczenie_id: e.target.value,
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
          {listaPapierowPowleczenie.map((option) => (
            <option key={option.id} value={option.id}>
              {option.powleczenie}
            </option>
          ))}
        </select>
    </td>;
}

function Nazwa({ row,setBtnZapisz}) {
    const appcontext = useContext(AppContext);
    const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
    const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
      const modalcontext = useContext(ModalInsertContext);
      // const isBtnZapiszPapierAvtive = modalcontext.isBtnZapiszPapierAvtive;
      const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
      const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;

      
  return (
    <td className={style.nazwa}>
      <div className={style.nazwa_papier_container}>
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
      {/* {row.id == null ?<button>Zapisz aby dodać papier</button> :<></>} */}
      {listaPapierowWyszukiwarka
                  ?.filter((x) => x.nazwa_id == row.id).length == 0 && row.id !=null ?<AddPapierBTN rowNazwaPapieru={row}/> :<></>}
      
      </div>
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



const AddPapierBTN = ({ rowNazwaPapieru, showMenu, setShowMenu }) => {
  const appcontext = useContext(AppContext);

  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
  const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;

      return (
    
    <div className={style.menu_produkty}>
      <img

        className={ style.iconMenuBtn}
        src={add}
        title="Dodaj papier"
        onClick={() => {

          const newlistaPapierowWyszukiwarka = listaPapierowWyszukiwarka.slice();

    
                    newlistaPapierowWyszukiwarka.push({
            

            id: null,
            nazwa_id: rowNazwaPapieru.id,
            nazwa: rowNazwaPapieru.nazwa,
            bulk:1,
            gramatura:"",
            powleczenie_id:1,
            info:"",
            wykonczenie_id:4,
            dodal: DecodeToken(sessionStorage.getItem("token")).id,
            zmienil: DecodeToken(sessionStorage.getItem("token")).id,
            grupa_id: rowNazwaPapieru.grupa_id,
            insert: true
          })
        
      

          setListaPapierowWyszukiwarka(newlistaPapierowWyszukiwarka)
         
          setListaPapierowNazwyWyszukiwarka(
            listaPapierowNazwyWyszukiwarka.map((t) => {
              if (t.id == rowNazwaPapieru.id) {
                return {...t,
                  isExpand: true,
                }
              } else {
                return t;
              }
            })
          );
          
        }

        
      
      
      }
        alt="x"
      />
    </div>
  );
  
};