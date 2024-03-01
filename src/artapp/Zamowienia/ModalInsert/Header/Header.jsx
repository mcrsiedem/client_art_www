import iconTable from "../../../../svg/table.svg";
import iconTableGreen from "../../../../svg/table_green.svg";
import React, { useState } from "react";
import style from "./Header.module.css";

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
  isSaveButtonDisabled, setSaveButtonDisabled
}) {

  
  return (
    <>
      <div className={style.container}>
        <div className={style.title}>Zamówienie...</div>
        <div className={style.buttons}>
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


   
              <button
              
                onClick={async () => {
                  setSaveAs(false)
                  postZamowienieObj();
                  setSaveButtonDisabled(true)
                }}
                className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
                disabled={isSaveButtonDisabled}

              >
                Zapisz
              </button>
       

          <ZapiszJako postZamowienieObj={postZamowienieObj} setShowSaveAs={setShowSaveAs} setSaveAs={setSaveAs}/>

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
            onClick={() => setOpenModalInsert(false)}
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

function ZapiszJako({postZamowienieObj,setShowSaveAs,setSaveAs}){

  return(
    <button
    onClick={async () => {
setShowSaveAs(true)
setSaveAs(true)
       
    }}
    className={style.btn}
  >
    Zapisz jako...
  </button>
  )
}