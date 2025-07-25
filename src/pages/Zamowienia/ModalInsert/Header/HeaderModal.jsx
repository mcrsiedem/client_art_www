import iconTable from "../../../../assets/table.svg";
import iconLock from "assets/lock2.svg";
import iconUnLock from "assets/unLock.svg";
import iconX from "assets/x.svg";
import React, { useState, useContext,useRef } from "react";
import style from "./HeaderModal.module.css";
import axios from "axios";
import { IP } from "../../../../utils/Host";
import { AppContext } from "../../../../context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { initialDane,initialProdukty,initialElementy,initialFragmenty,initialOprawa,initialProcesy } from "utils/initialvalue";
import { useZamowienieUpdate } from "hooks/useZamowienieUpdate";
import { useZamowienia } from "hooks/useZamowienia";
import { useStanyZamowienia } from "hooks/useStanyZamowienia";
import DialogZapis from "components/Dialog/DialogZapis";
import DecodeToken from "pages/Login/DecodeToken";
import SaveAs from "../SaveAs/SaveAs";
import { useZamowienieInsert } from "hooks/useZamowienieInsert";
// import { useState } from "react";
const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};



export default function Header({
  setOpenModalInsert,
  stanOtwarciaZamowienia,
  readOnly,
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
          <LockDradDrop />
          Zamówienie
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
              <SprawdzBTN />
              <ZapiszJakoBTN setShowSaveAs={setShowSaveAs} setSaveAs={setSaveAs}  />
              <ZapiszBTN setShowSaveAs={setShowSaveAs} setSaveAs={setSaveAs} dialogBox={dialogBox} />
              {/* <ZapiszDuzo setShowSaveAs={setShowSaveAs} setSaveAs={setSaveAs} /> */}
            </>
          )}
        </div>

        <div className={style.buttons}>
          <Zamknij
           
            setOpenModalInsert={setOpenModalInsert}
            readOnly={readOnly}
          />
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
function ZapiszBTN({ setSaveAs,dialogBox }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const isSaveButtonDisabled = contextModalInsert.isSaveButtonDisabled;
  const produkty = contextModalInsert.produkty;
  const daneZamowienia = contextModalInsert.daneZamowienia;

  const contextApp = useContext(AppContext);
  const [saveZamowienieUpdate] = useZamowienieUpdate();
  const [zapiszZamowienie] = useZamowienieInsert();
  return (
    <button
      onClick={async () => {
        if (produkty[0].naklad != 0 && daneZamowienia.id == 1) {
          setSaveAs(false);
            zapiszZamowienie({dialogBox});
        }

        if (produkty[0].naklad != 0 && daneZamowienia.id != 1) {
         
           saveZamowienieUpdate({dialogBox});
          //  dialogBox.current.show();
          
       
        }
      }}
      className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
      disabled={isSaveButtonDisabled}
    >
      Zapisz
    </button>
  );
}







function SprawdzBTN({ setShowSaveAs, setSaveAs }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const produkty = contextModalInsert.produkty;
  const elementy = contextModalInsert.elementy;
  const isSprawdzButtonDisabled = contextModalInsert.isSprawdzButtonDisabled;

  return (
    <button
      onClick={async () => {

        let OPRAWY_ZESZYTOWE = [54,55,56,57,58,59]
        if (produkty[0].naklad) {
                  if (
                    (contextModalInsert.daneZamowienia.data_spedycji == null) ^
                    (contextModalInsert.daneZamowienia.data_spedycji == "")
                  ) {
                    alert("Brak daty");
                    setSaveButtonDisabled(true);
                    
                  } else{
                    setSaveButtonDisabled(false);
                  }
                  
                if( OPRAWY_ZESZYTOWE.includes(parseInt( produkty[0].oprawa))) {

                  for( let element of elementy){

                    if(element.ilosc_stron%4 !=0 || element.ilosc_stron>192 ){
                      alert("W oprawie zeszytowej ilość stron powinna być podzielna przez 4 ")
                      setSaveButtonDisabled(true);
                      }else{
                        setSaveButtonDisabled(false);
                      }
                      
                      if(element.ilosc_stron>192 ){
                        alert("W oprawie zeszytowej dozwolona ilość stron: 192 ")
                        setSaveButtonDisabled(true);
                        }else{
                          setSaveButtonDisabled(false);
                        }
                    
                  }
                }
        }

      }}
      className={style.btn}

    >
      Sprawdź
    </button>
  );
}


function ZapiszJakoBTN({

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



function Zamknij({setOpenModalInsert,readOnly}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const [refreshZamowienia] = useZamowienia()
const daneZamowienia = contextModalInsert.daneZamowienia;
const produkty = contextModalInsert.produkty;
const elementy = contextModalInsert.elementy;
const fragmenty = contextModalInsert.fragmenty;
const oprawa = contextModalInsert.oprawa;
const pakowanie = contextModalInsert.pakowanie;
const procesyElementow = contextModalInsert.procesyElementow;
const selectedZamowienie = contextModalInsert.selectedZamowienie;
const ksiegowosc = contextModalInsert.ksiegowosc;






  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={async() => {

        // sprawdza czy było coś edytowane przed zamknięciem
        if(isEdit(daneZamowienia,produkty,elementy,fragmenty,oprawa,pakowanie,procesyElementow,ksiegowosc)){

          let text = "Wyjście bez zapisu...";
                          if (window.confirm(text) == true) {
                              setOpenModalInsert(false);
                              if (!readOnly) {
                                await axios.put(IP + "setOrderClosed", {
                                  id: selectedZamowienie.id,
                                });
                              contextModalInsert.setDaneZamowienia(initialDane)
                              contextModalInsert.setProdukty(initialProdukty)
                              contextModalInsert.setElementy(initialElementy)
                              contextModalInsert.setFragmenty(initialFragmenty)
                              contextModalInsert.setOprawa(initialOprawa)
                              contextModalInsert.setProcesyElementow(initialProcesy)
                                refreshZamowienia();
                              }
                            
                          } else {
                            
                          }
        }
        else{
                                     setOpenModalInsert(false);
                              if (!readOnly) {
                                await axios.put(IP + "setOrderClosed", {
                                  id: selectedZamowienie.id,
                                });
                              contextModalInsert.setDaneZamowienia(initialDane)
                              contextModalInsert.setProdukty(initialProdukty)
                              contextModalInsert.setElementy(initialElementy)
                              contextModalInsert.setFragmenty(initialFragmenty)
                              contextModalInsert.setOprawa(initialOprawa)
                              contextModalInsert.setProcesyElementow(initialProcesy)
                                refreshZamowienia();
                              }
        }
                          




      
    }
      }
      alt="Procesy"
    />

  
  );
}

const isEdit = (daneZamowienia,produkty,elementy,fragmenty,oprawa,pakowanie,procesyElementow,ksiegowosc) => {

 if (daneZamowienia.update == true) return true
 if (ksiegowosc.update == true) return true
 if (produkty[0].update == true) return true

 for(let element of elementy){
   if (element.update == true || element.insert == true || element.delete == true) return true
 }

  for(let fragment of fragmenty){
   if (fragment.update == true || fragment.insert == true || fragment.delete == true) return true
 }

   for(let opr of oprawa){
   if (opr.update == true || opr.insert == true || opr.delete == true) return true
 }

    for(let pak of pakowanie){
   if (pak.update == true  || pak.insert == true || pak.delete == true) return true
 }

    for(let proces of procesyElementow){
   if (proces.update == true  || proces.insert == true || proces.delete == true) return true
 }

 

}

