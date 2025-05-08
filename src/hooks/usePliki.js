
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
      const zamowienia = appcontext.zamowienia;
      const setZamowienia = appcontext.setZamowienia;
      const [refreshZamowienia,odblokujZamowienie,deleteZamowienie] = useZamowienia()

       
      const etapPlikow = async (etap,plikiRow) =>{
        const zamowienie_id = plikiRow.zamowienie_id
        const element_id= plikiRow.element_id

   

        const res1 = await axios.put(IP + "updatePlikiEtap/" + sessionStorage.getItem("token"), {zamowienie_id,element_id, etap,});

            const res2 = await axios.get(   IP + "zamowieniapliki/" + sessionStorage.getItem("token"));
            appcontext.setZamowieniaPliki([...res2.data]);



    const res3 = await axios.put(IP + "updateZamowienieEtap/" + sessionStorage.getItem("token"), {
      zamowienie_id,
      etap: newEtap(zamowienie_id,res2.data ),
        });

        setZamowienia(zamowienia.map((t) => {
          if (t.id == zamowienie_id ) {
            return {...t,
              etap: newEtap(zamowienie_id,res2.data )
            }
          } else {
            return t;
          }
        }))



      }

      const newEtap = (zamowienie_id,zamowieniaPliki ) => {
        let new_etap;
        new_etap = Math.min(...zamowieniaPliki.filter(x=> x.zamowienie_id == zamowienie_id ).map((f) => f.etap)) 
        return new_etap
      }

    return [etapPlikow];
  }