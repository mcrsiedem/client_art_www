import React, { useState, useContext,useRef } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../HeaderModal.module.css";


export default function SprawdzBTN({ setShowSaveAs, setSaveAs }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const produkty = contextModalInsert.produkty;

  return (
    <button
      onClick={async () => {

        let OPRAWY_ZESZYTOWE = [54,55,56,57,58,59]
        if (parseInt(produkty[0].format_x) > 0 ) {
                  if (
                    (contextModalInsert.daneZamowienia.data_spedycji == null) ^
                    (contextModalInsert.daneZamowienia.data_spedycji == "")
                  ) {
                    alert("Brak daty");
                    setSaveButtonDisabled(true);
                    
                  } else{
    
                    setSaveButtonDisabled(false);
                  }


  
                  
                // if( OPRAWY_ZESZYTOWE.includes(parseInt( produkty[0].oprawa))) {

                //   for( let element of elementy){

                //     if(element.ilosc_stron%4 !=0 || element.ilosc_stron>192 ){
                //       alert("W oprawie zeszytowej ilość stron powinna być podzielna przez 4 ")
                //       setSaveButtonDisabled(true);
                //       }else{
                //         setSaveButtonDisabled(false);
                //       }
                      
                //       if(element.ilosc_stron>192 ){
                //         alert("W oprawie zeszytowej dozwolona ilość stron: 192 ")
                //         setSaveButtonDisabled(true);
                //         }else{
                //           setSaveButtonDisabled(false);
                //         }
                    
                //   }
                // }
        }

      }}
      className={style.btn}

    >
      Sprawdź
    </button>
  );
}