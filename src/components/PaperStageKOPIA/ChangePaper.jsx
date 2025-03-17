import React, { useState, useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./ChangePaper.module.css";


import iconX from "assets/x.svg";
export default function ChangePaper({showChange,setShowChange,selectRow}) {
      const modalcontext = useContext(ModalInsertContext);
      const selectedElementROW = modalcontext.selectedElementROW;

if(showChange){
    return (
    <div className={style.window}>
      <Header setShowChange={setShowChange}></Header>
      <p className={style.alert_label}> {selectRow.nazwa} {selectRow.gramatura} g/m2 {selectRow.wykonczenie}</p>
      <Zmien setShowChange={setShowChange} selectRow={selectRow}/>

    </div>
  );
}

}

function Zmien({ setShowChange,selectRow}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const elementy = contextModalInsert.elementy;
  const setElementy = contextModalInsert.setElementy;
  const selectedElementROW = contextModalInsert.selectedElementROW;
  const setShowPaperStage = contextModalInsert.setShowPaperStage;


  return (
    <button
      className={style.btn_delete}
      onClick={() => {
       
        // deleteClient(rowID, getClients,setShowDeleteClientPane)
     
          // setDaneZamowienia({ ...daneZamowienia, klient_id: rowID.current.id })


          setElementy(
            elementy.map((t, a) => {
            if (t.id == selectedElementROW.id) {
              return {
                ...t,
                papier_id: selectRow.id
      
              };
            } else {
              return t;
            }
          })
        );


          
          setShowChange(false)
          setSaveButtonDisabled(false)
          setShowPaperStage(false)
        
      }}
    >
      Zmień
    </button>
  );
}


function Header({ setShowChange }) {
  return (
    <div className={style.header}>
      <p className={style.title}>Ustaw papier na: </p>
      <Zamknij setShowChange={setShowChange}/>
    </div>
  );
}
function Zamknij({ setShowChange }) {
  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        setShowChange(false);
      }}
      alt="Procesy"
    />
  );
}
