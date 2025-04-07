import iconTable from "../../../../assets/table.svg";
import iconTableGreen from "../../../../assets/table_green.svg";
import iconLock from "assets/lock2.svg";
import iconUnLock from "assets/unLock.svg";
import iconX from "assets/x.svg";
import React, { useState, useContext } from "react";
import style from "./HeaderModal.module.css";
import axios from "axios";
import { IP } from "../../../../utils/Host";
import { SocketContext } from "../../../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
import { useAuth } from "hooks/useAuth";
import { ModalInsertContext } from "context/ModalInsertContext";
import { initialDane,initialProdukty,initialElementy,initialFragmenty,initialOprawa,initialProcesy } from "utils/initialvalue";
import { zapiszZamowienie } from "actions/zapiszZamowienie";
import { useZamowienieUpdate } from "hooks/useZamowienieUpdate";
import { useZamowienia } from "hooks/useZamowienia";
import { useStanyZamowienia } from "hooks/useStanyZamowienia";
// import { useState } from "react";
const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};



export default function Header({
  setOpenModalInsert,
  setShowSaveAs,
  setSaveAs,
  stanOtwarciaZamowienia,
  row,
  readOnly,
}) {
  const[pokazStanyZamowienia] = useStanyZamowienia()
  return (
    <>
      <div
        onDoubleClick={() => {
          pokazStanyZamowienia()
        }}
        className={style.container}
      >
        <div className={style.title}>
          <LockDradDrop />
          Produkt
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
              {/* <HISTORIA_ZAMOWIENIA_BTN  /> */}
              <Sprawdz />
              <ZapiszJako setShowSaveAs={setShowSaveAs} setSaveAs={setSaveAs} />
              <Zapisz setShowSaveAs={setShowSaveAs} setSaveAs={setSaveAs} />
            </>
          )}
        </div>

        <div className={style.buttons}>
          <Zamknij
            row={row}
            setOpenModalInsert={setOpenModalInsert}
            readOnly={readOnly}
          />
        </div>
      </div>
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

const ShowStany = ({setOpenModalStany,openModalStany,setInfo}) =>{
  const contextModalInsert = useContext(ModalInsertContext);
  const elementy = contextModalInsert.elementy;
  return(
    <img
    onClick={() => {
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
  )
}
function Zapisz({ setShowSaveAs, setSaveAs }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const isSaveButtonDisabled = contextModalInsert.isSaveButtonDisabled;
  const produkty= contextModalInsert.produkty;
  // const daneZamowienia= contextModalInsert.daneZamowienia;
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
  const elementy= contextModalInsert.elementy;
  const fragmenty= contextModalInsert.fragmenty;
  const oprawa= contextModalInsert.oprawa;
  const setProdukty= contextModalInsert.setProdukty;
  const setElementy= contextModalInsert.setElementy;
  const setFragmenty= contextModalInsert.setFragmenty;
  const setOprawa= contextModalInsert.setOprawa;
  const setProcesyElementow= contextModalInsert.setProcesyElementow;
  const procesyElementow= contextModalInsert.procesyElementow;
  const technologieID= contextModalInsert.technologieID;
  const historiaZamowienia= contextModalInsert.historiaZamowienia?.filter(x=>x.insert == true );
  const setHistoriaZamowienia= contextModalInsert.setHistoriaZamowienia;



  const contextApp = useContext(AppContext);
  const setZamowienia = contextApp.setZamowienia
  const setZamowieniaWyszukiwarka = contextApp.setZamowieniaWyszukiwarka
 const [saveZamowienieUpdate] = useZamowienieUpdate();
  return (
    <button

      onClick={async () => {

        if(produkty[0].naklad != 0 && daneZamowienia.id == 1){
                 setSaveAs(false);
     
        zapiszZamowienie({
          daneZamowienia,
          setDaneZamowienia,
          produkty,
          elementy,
          fragmenty,
          oprawa,
          setProdukty,
          setElementy,
          setFragmenty,
          setOprawa,
          setProcesyElementow,
          procesyElementow,
          setZamowienia,
          setZamowieniaWyszukiwarka,
          setSaveButtonDisabled,
        });
        
        }

                  if (produkty[0].naklad != 0 && daneZamowienia.id != 1) {
                    saveZamowienieUpdate();
                  }







        // setOrderClosed
      }}
      className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
      disabled={isSaveButtonDisabled}
    >
      Zapisz
    </button>
  );
}
function Sprawdz({ setShowSaveAs, setSaveAs }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const contextApp = useContext(AppContext);

  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const produkty = contextModalInsert.produkty;
  // const setZamowienia = contextApp.setZamowienia

  return (
    <button
      onClick={async () => {
        if (produkty[0].naklad) {
          // alert("Data przyjecia: brak")
          if (
            (contextModalInsert.daneZamowienia.data_spedycji == null) ^
            (contextModalInsert.daneZamowienia.data_spedycji == "")
          ) {
            alert("Brak daty");
          } else {
            setSaveButtonDisabled(false);
          }
        }
      }}
      className={style.btn}
      // disabled={isSaveButtonDisabled}
    >
      Sprawdź
    </button>
  );
}


function ZapiszJako({

  setShowSaveAs,
  setSaveAs,
}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const isSaveButtonDisabled = contextModalInsert.isSaveButtonDisabled;
  const produkty= contextModalInsert.produkty;

  const contextApp = useContext(AppContext);
  const setZamowienia = contextApp.setZamowienia
  return (
    <button
      disabled={isSaveButtonDisabled}
      onClick={async () => {

        if(produkty[0].naklad){
        setShowSaveAs(true);
        setSaveAs(true);
        }
        
      }}
      className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
    >
      Zapisz jako...
    </button>
  );
}



function Zamknij({setOpenModalInsert,readOnly,row}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const [refreshZamowienia] = useZamowienia()
  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={async() => {
      setOpenModalInsert(false);

      if (!readOnly) {
        await axios.put(IP + "setOrderClosed", {
          id: row.id,
        });
        // const [refreshZamowienia] = useZamowienia()
        refreshZamowienia();

      }
      contextModalInsert.setDaneZamowienia(initialDane)
      contextModalInsert.setProdukty(initialProdukty)
      contextModalInsert.setElementy(initialElementy)
      contextModalInsert.setFragmenty(initialFragmenty)
      contextModalInsert.setOprawa(initialOprawa)
      contextModalInsert.setProcesyElementow(initialProcesy)
    }
      }
      alt="Procesy"
    />

  
  );
}

