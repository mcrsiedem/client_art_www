
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
import { useGrupyWykonan } from "./useGrupyWykonan";
import { updateWykonaniaOrazGrupaFromProcesView } from "actions/updateWykonaniaOrazGrupaFromProcesView";
export   function usePliki() {


      const appcontext = useContext(AppContext);
      const modalcontext = useContext(ModalInsertContext);
      const techContext = useContext(TechnologyContext);

      const setListaPapierowWyszukiwarka =appcontext.setListaPapierowWyszukiwarka;
      const zamowieniaPliki = appcontext.zamowieniaPliki;
      const setZamowieniaPliki = appcontext.setZamowieniaPliki;
      const grupaWykonan = techContext.grupaWykonan;
      const zamowienia = appcontext.zamowienia;
      const setZamowienia = appcontext.setZamowienia;
      const [refreshZamowienia, odblokujZamowienie, deleteZamowienie] =useZamowienia();
      const [sumujGrupe, statusGrupy] = useGrupyWykonan();
      const selectedProcesor = techContext.selectedProcesor;
      const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
      const setWykonaniaAll = techContext.setWykonaniaAll;
      const setGrupWykonanAll = techContext.setGrupWykonanAll;
  const dniWstecz = techContext.dniWstecz;


      const etapPlikowZamowienia = async (etap,plikiRow) =>{
        const zamowienie_id = plikiRow.zamowienie_id
        const element_id= plikiRow.element_id
        const global_id_pliki_row= plikiRow.global_id

        const res1 = await axios.put(IP + "updatePlikiEtapZamowienia/" + sessionStorage.getItem("token"), {zamowienie_id,element_id, etap,global_id_pliki_row});
        const res_new_pliki = await axios.get(   IP + "zamowieniapliki/" + sessionStorage.getItem("token"));
          
        let new_etap = Math.min(...res_new_pliki.data.filter(x=> x.zamowienie_id == zamowienie_id ).map((f) => f.etap)) 

    const res3 = await axios.put(IP + "updateZamowienieEtap/" + sessionStorage.getItem("token"), {
      zamowienie_id,
      etap: new_etap
        });


        // to potrzebne, aby po zmianie etapu plikow nie zamykalo sie okienko, ale to na liście zamowienien tylko

        appcontext.setZamowieniaPliki([...res_new_pliki.data]);
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

//----------------------------------------------------------------

      const etapPlikowGrupyWykonan = async (etap,grupaWykonan) =>{

        const zamowienie_id = grupaWykonan.zamowienie_id
        const element_id= grupaWykonan.element_id
        const global_id_grupa_row= grupaWykonan.global_id




        console.log("plikiRow: "+grupaWykonan.global_id)
        // zmiana etapu plików
        const res1 = await axios.put(IP + "updatePlikiEtapGrupyWykonan/" + sessionStorage.getItem("token"), {zamowienie_id,element_id,global_id_grupa_row,etap});
        //pobranie plikow po korecie etapu
        const res_new_pliki = await axios.get(   IP + "zamowieniapliki/" + sessionStorage.getItem("token"));
        //sprawdzenie najmniejszego etapu
        let new_etap = Math.min(...res_new_pliki.data.filter(x=> x.zamowienie_id == zamowienie_id ).map((f) => f.etap)) 
        // ustawienie etapu calego zamowienia na najmniejszy etap plikow
        const res3 = await axios.put(IP + "updateZamowienieEtap/" + sessionStorage.getItem("token"), {zamowienie_id,etap: new_etap});

        await axios.get(IP + "technologie_grupy_an_wykonania_for_procesor/"+selectedProcesor+"/"+dniWstecz).then((res)=>{
          setWykonaniaAll(res.data[0])
          setGrupWykonanAll(res.data[1])
          return res
        }).then((res) =>{
          
          setGrupWykonanAll(prev=>{return prev})
        });
        
      }

//----------------------------------------------------------------

    return [etapPlikowZamowienia,etapPlikowGrupyWykonan];
  }