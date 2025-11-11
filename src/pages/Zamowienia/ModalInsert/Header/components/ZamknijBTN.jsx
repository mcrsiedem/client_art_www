import React, { useState, useContext,useRef } from "react";
import axios from "axios";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../HeaderModal.module.css";

import iconX from "assets/x.svg";


import { initialDane,initialProdukty,initialElementy,initialFragmenty,initialOprawa,initialProcesy } from "utils/initialvalue";

import { useZamowienia } from "hooks/useZamowienia";
import { IP } from "utils/Host";
import { AppContext } from "context/AppContext";




export default function ZamknijBTN({setOpenModalInsert,readOnly}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const appContext = useContext(AppContext);
const {refreshZamowienia} = useZamowienia()
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
                                appContext.setIsLoading(true)
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
                                appContext.setIsLoading(false)
                              }
                            
                          } else {
                            
                          }
        }
        else{
                                     setOpenModalInsert(false);
                              if (!readOnly) {
                                 appContext.setIsLoading(true)
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
                                  appContext.setIsLoading(false)
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
