
import { IP } from "utils/Host";
import axios from "axios";
import { useState,useEffect, useContext  } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
import { useZamowienia } from "./useZamowienia";
export   function usePliki() {


      const appcontext = useContext(AppContext);
      const modalcontext = useContext(ModalInsertContext);
      const techContext = useContext(TechnologyContext);
  
      const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
      const zamowieniaPliki = appcontext.zamowieniaPliki;
      const setZamowieniaPliki = appcontext.setZamowieniaPliki;
      const grupaWykonan = techContext.grupaWykonan;
      const setGrupaWykonan = techContext.setGrupaWykonan;
      const [refreshZamowienia,odblokujZamowienie,deleteZamowienie] = useZamowienia()

       
      const etapPlikow = async (etap,zamowienie_id,element_id) =>{
        const res = await axios.put(IP + "updatePlikiEtap/" + sessionStorage.getItem("token"), {
          zamowienie_id,
          element_id,
          etap,
            });

let newPLiki = zamowieniaPliki.map((t) => {
  if (t.zamowienie_id == zamowienie_id && t.element_id == element_id) {
    return {...t,
      etap: etap
    }
  } else {
    return t;
  }
})

  if(sprawdzReszteEtapow(etap,zamowienie_id,element_id,newPLiki)){
    const res2 = await axios.put(IP + "updateZamowienieEtap/" + sessionStorage.getItem("token"), {
      zamowienie_id,
      etap,
        });
  }



            setZamowieniaPliki(newPLiki );

      }

      const sprawdzReszteEtapow = (etap,zamowienie_id,element_id,newPLiki ) => {
        let stan = true
        // sprawdza czy reszta plików jest na takim samym etapie i czy zmiaenic etap zamowienia
        newPLiki.filter(x=> x.zamowienie_id == zamowienie_id ).forEach(element => {
          if(element.etap != etap ) {
            // console.log(element.etap)
            stan = false
          }

          if( etap < element.etap ) {
            stan = true
          }
          
          if( etap == element.etap ) {
          
            stan = true
          }
        });

        return stan
      }

    return [etapPlikow];
  }