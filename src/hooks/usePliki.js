
import { IP } from "utils/Host";
import axios from "axios";
import { useState,useEffect, useContext  } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
import { useZamowienia } from "./useZamowienia";
import { _typ_elementu } from "utils/initialvalue";
import { getNameOfEtapPliki } from "actions/getNameOfEtapPliki";
import DecodeToken from "pages/Login/DecodeToken";
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
        let promises = [];
        const zamowienie_id = plikiRow.zamowienie_id
        const element_id= plikiRow.element_id

                  const promiseA = new Promise((resolve, reject) => {
          
        

                    resolve(777);
                  });

        const res1 = await axios.put(IP + "updatePlikiEtap/" + sessionStorage.getItem("token"), {zamowienie_id,element_id, etap,});
        const res_new_pliki = await axios.get(   IP + "zamowieniapliki/" + sessionStorage.getItem("token"));
          
        let new_etap = Math.min(...res_new_pliki.data.filter(x=> x.zamowienie_id == zamowienie_id ).map((f) => f.etap)) 

        const res_historia = await axios.put(IP + "updateHistoria/" + sessionStorage.getItem("token"), {
          kategoria: "Pliki",
          event: _typ_elementu.filter(x=> x.id == plikiRow.typ)[0]?.nazwa+ " "+plikiRow.nazwa+" - zmiana z "+getNameOfEtapPliki(plikiRow.etap)+ " na "+getNameOfEtapPliki(etap),
          zamowienie_id: plikiRow.zamowienie_id,
          user_id: DecodeToken(sessionStorage.getItem("token")).id

        });

    const res3 = await axios.put(IP + "updateZamowienieEtap/" + sessionStorage.getItem("token"), {
      zamowienie_id,
      etap: new_etap
        });

        // const res = await axios.get(
        //   IP + "zamowienia/"+appcontext.sortowanieZamowienia+"/" + sessionStorage.getItem("token")
        // );
        // appcontext.setZamowienia([...res.data]);
        // appcontext.setZamowieniaWyszukiwarka([...res.data]);

        appcontext.setZamowieniaPliki([...res_new_pliki.data]);
        // setZamowieniaPliki(zamowieniaPliki.map((t) => {
        //   if (t.global_id == plikiRow.global_id ) {
        //     return {...t,
        //       etap
        //     }
        //   } else {
        //     return t;
        //   }
        // }))


        setZamowienia(zamowienia.map((t) => {
          if (t.id == zamowienie_id ) {
            return {...t,
              etap: new_etap
            }
          } else {
            return t;
          }
        }))
        appcontext.setZamowieniaWyszukiwarka(appcontext.zamowienia.map((t) => {
          if (t.id == zamowienie_id ) {
            return {...t,
              etap: new_etap
            }
          } else {
            return t;
          }
        }))







      }

      // const newEtap = (zamowienie_id,zamowieniaPliki ) => {
      //   let new_etap;
      //   new_etap = Math.min(...zamowieniaPliki.filter(x=> x.zamowienie_id == zamowienie_id ).map((f) => f.etap)) 
      //   return new_etap
      // }

    return [etapPlikow];
  }