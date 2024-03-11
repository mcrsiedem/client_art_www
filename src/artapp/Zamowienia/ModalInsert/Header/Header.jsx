import iconTable from "../../../../svg/table.svg";
import iconTableGreen from "../../../../svg/table_green.svg";
import React, { useState } from "react";
import style from "./Header.module.css";
import axios from "axios";
import { ip } from "../../../../Host";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};

function Header({
  setOpenModalInsert,
  // postZamowienie,
  postZamowienieObj,
  idki,
  id,
  isTable,
  setIsTable,
  info,
  setInfo,
  sprawdzPoprawnoscZamowienia,
  check_data_wejscia,
  elementy,
  openModalStany,
  setOpenModalStany,
  setShowSaveAs,
  saveAs, setSaveAs,
  isSaveButtonDisabled, setSaveButtonDisabled,
  isLockDragDrop,lockDragDrop,stanOtwarciaZamowienia,
  row, 
  readAlert,   setReadAlert ,   readOnly,  setReadOnly
  
}) {

  
  return (
    <>
      <div className={style.container}>
        <div className={style.title}>Zamówienie... {readOnly && (
          <div>
             otwarte {stanOtwarciaZamowienia.data}  przez {stanOtwarciaZamowienia.user} 
            
          </div>
        )}</div>
        <div className={style.buttons}>

        <img
            onClick={() => {
       // wyłącza drag drop w tabelkach
              lockDragDrop(!isLockDragDrop);
            }}
            className={style.icon}
            src={iconTable}
          />

          <img
            onClick={() => {
              // setIsTable(!isTable);
              setOpenModalStany(!openModalStany);

              setInfo(
                Math.max(
                  ...elementy.map((obj) => {
                    return obj.id;
                  })
                )
              );
            }}
            className={style.icon}
            src={iconTable}
            alt="table"
          />


            {readOnly ? 
            <> </> :
              <> 
              <button
              
                onClick={async () => {
                
                  setSaveAs(false)
                  postZamowienieObj();
                  setSaveButtonDisabled(true)
                
                  // setOrderClosed


                }}
                className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
                disabled={isSaveButtonDisabled}

              >
                Zapisz
              </button>
       

           <ZapiszJako isSaveButtonDisabled={isSaveButtonDisabled} postZamowienieObj={postZamowienieObj} setShowSaveAs={setShowSaveAs} setSaveAs={setSaveAs}/>
              </>
             }
              

          <button
            onClick={() => openInNewTab("/Zamowienia")}
            className={style.btn}
          >
            Nowe...
          </button>

          <button
            // onClick={() => postZamowienieObj()}
            className={style.btn}
          >
            Sprawdź
          </button>
          <button
            onClick={async() => {
             
            setOpenModalInsert(false)
            console.log("readOnly: "+ readOnly)
                   if (!readOnly){
                        const res = await axios.put(ip + "setOrderClosed",{
                      id: row.id,
                    });
                   }
                
            }}
            className={style.btn}
          >
            Zamknij
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;

function ZapiszJako({isSaveButtonDisabled,postZamowienieObj,setShowSaveAs,setSaveAs}){

  return(
    <button
    disabled={isSaveButtonDisabled}
    onClick={async () => {
setShowSaveAs(true)
setSaveAs(true)
       
    }}
    className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
  >
    Zapisz jako...
  </button>
  )
}