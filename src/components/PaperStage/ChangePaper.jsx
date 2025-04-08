import React, { useState, useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./ChangePaper.module.css";


import iconX from "assets/x.svg";
export default function ChangePaper({parent,showChange,setShowChange,selectRow}) {
      const modalcontext = useContext(ModalInsertContext);                                                      
      const selectedElementROW = modalcontext.selectedElementROW;

if(showChange){
    return (
    <div className={style.grayScaleBackground}>

    <div className={style.window}>
      <Header setShowChange={setShowChange}></Header>
      <p className={style.alert_label}> {selectRow.nazwa} {selectRow.gramatura} g/m2 {selectRow.wykonczenie}</p>
      <Zmien parent={parent} setShowChange={setShowChange} selectRow={selectRow}/>

    </div>
    </div>
  );
}

}

function Zmien({ parent, setShowChange,selectRow}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const elementy = contextModalInsert.elementy;
  const setElementy = contextModalInsert.setElementy;
  const selectedElementROW = contextModalInsert.selectedElementROW;
  const setShowPaperStage = contextModalInsert.setShowPaperStage;


     const techContext = useContext(TechnologyContext)
     const selectedElementTechROW = techContext.selectedElementTechROW;
     const selectedElementTechArkusz = techContext.selectedElementTechArkusz;
     const elementyTech = techContext.elementyTech;
     const setElementyTech = techContext.setElementyTech;
     const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
  
  


  return (
    <button
      className={style.btn_zmien}
      onClick={() => {

        if(parent=="zamowienia"){
          if(selectRow.typ_row==1){
              setElementy(
            elementy.map((t, a) => {
            if (t.id == selectedElementROW.id) {
              return {
                ...t,
                papier_id: selectRow.id,
                update:true
      
              };
            } else {
              return t;
            }
          })
        );

          setSaveButtonDisabled(false)
          setShowPaperStage(false)
        
   }
        }
          



//-----------
if(parent=="technologia"){


  if(selectedElementTechROW != null){

                if(selectRow.typ_row==1){
                  setElementyTech(
                    elementyTech.map((t, a) => {
              if (t.id == selectedElementTechROW.id) {
                return {
                  ...t,
                  papier_id: selectRow.id,
                  update: true

                };
              } else {
                return t;
              }
            })
          );

            setSaveButtonDisabled(false)
            setShowPaperStage(false)

          }
  }


      if(selectedElementTechArkusz != null){

        if(selectRow.typ_row==1){

          handleUpdateRowArkusze({
            ...selectedElementTechArkusz,
            papier_id: selectRow.id,
            update: true
          })


    //       setElementyTech(
    //         elementyTech.map((t, a) => {
    //   if (t.id == selectedElementTechROW.id) {
    //     return {
    //       ...t,
    //       papier_id: selectRow.id

    //     };
    //   } else {
    //     return t;
    //   }
    // })
    // );

    setSaveButtonDisabled(false)
    setShowPaperStage(false)

    }
    }












}

//-----------






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
