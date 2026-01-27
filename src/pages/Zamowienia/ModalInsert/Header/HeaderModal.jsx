import iconLock from "assets/lock2.svg";
import iconUnLock from "assets/unLock.svg";
import React, { useState, useContext,useRef } from "react";
import style from "./HeaderModal.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useStanyZamowienia } from "hooks/useStanyZamowienia";
import DialogZapis from "components/Dialog/DialogZapis";
import SaveAs from "./components/SaveAs";
import ZapiszJakoBTN from "./components/ZapiszJakoBTN";
import ZapiszBTN from "./components/ZapiszBTN";
import ZamknijBTN from "./components/ZamknijBTN";
import SprawdzBTN from "./components/SprawdzBTN";
import Loading from "components/Loading/Loading";
import OddajBTN from "./components/OddajBTN";
// import { useState } from "react";
const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};



export default function Header({
  setOpenModalInsert,
  stanOtwarciaZamowienia,
  readOnly,
  lokalizacja
}) {
  const[pokazStanyZamowienia] = useStanyZamowienia()
  const dialogBox = useRef(null);
   const [showSaveAs, setShowSaveAs] = useState(false);
   const [saveAs, setSaveAs] = useState(false);
  return (
    <>
    
      <div
        onDoubleClick={() => {
          pokazStanyZamowienia()
        }}
        className={style.container}
      >
        <div className={style.title}>
          {/* <LockDradDrop /> */}
          Zamówienie      <OddajBTN />
          {readOnly && (
            <div>
              otwarte {stanOtwarciaZamowienia.data} przez{" "}
              {stanOtwarciaZamowienia.user}
            </div>
          )}
        </div>

        <div className={style.center}>
          {readOnly ? (
            <> </>
          ) : (
            <>
        
              <SprawdzBTN />
              <ZapiszJakoBTN setShowSaveAs={setShowSaveAs} setSaveAs={setSaveAs}  />
              <ZapiszBTN setShowSaveAs={setShowSaveAs} setSaveAs={setSaveAs} dialogBox={dialogBox} />
            </>
          )}
        </div>

        <div className={style.buttons}>
          <ZamknijBTN
            lokalizacja={lokalizacja}
            setOpenModalInsert={setOpenModalInsert}
            readOnly={readOnly}
          />
          <Loading/>
        </div>
      </div>
      <DialogZapis dialogBox={dialogBox}/>
       <SaveAs
                showSaveAs={showSaveAs}
                setSaveAs={setSaveAs}
                setShowSaveAs={setShowSaveAs}
                dialogBox={dialogBox}
  
              />

    </>
  );
}



const LockDradDrop = () =>{
  const contextModalInsert = useContext(ModalInsertContext);
  return(
    <img
    onClick={() => {
      // wyłącza drag drop w tabelkach
      contextModalInsert.setLockDragDrop(!contextModalInsert.lockDragDrop);
    }}
    className={style.icon}
    src={contextModalInsert.lockDragDrop ? iconUnLock : iconLock}
  />
  )
}







