import React, { useState, useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./ChangePaper.module.css";


import iconX from "assets/x.svg";
export default function ChangePaper({showChange,setShowChange,selectedPaperRow}) {
      const modalcontext = useContext(ModalInsertContext);
      const selectedElementROW = modalcontext.selectedElementROW;

if(showChange){
    return (
    <div className={style.window}>
      <Header setShowChange={setShowChange}></Header>
      <p className={style.alert_label}>Wstawić nazwę elementu: {selectedPaperRow.nazwa} :{selectedPaperRow.id}</p>
      <Zmien setShowChange={setShowChange} selectedPaperRow={selectedPaperRow}/>

    </div>
  );
}

}

function Zmien({ setShowChange,selectedPaperRow}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const elementy = contextModalInsert.elementy;
  const setElementy = contextModalInsert.setElementy;
  const selectedElementROW = contextModalInsert.selectedElementROW;




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
                papier_id: selectedPaperRow.id
      
              };
            } else {
              return t;
            }
          })
        );


          
          setShowChange(false)
          setSaveButtonDisabled(false)
        
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
