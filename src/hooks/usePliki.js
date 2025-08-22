
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
import { useNavigate } from "react-router-dom";
export   function usePliki() {


      const appcontext = useContext(AppContext);
      const modalcontext = useContext(ModalInsertContext);
      const techContext = useContext(TechnologyContext);

      const zamowienia = appcontext.zamowienia;
      const setZamowienia = appcontext.setZamowienia;
      const selectedProcesor = techContext.selectedProcesor;
      const setWykonaniaAll = techContext.setWykonaniaAll;
      const setGrupWykonanAll = techContext.setGrupWykonanAll;
      const grupyWykonanAll = techContext.grupyWykonanAll;
      const grupyWykonanAllWyszukiwarka = techContext.grupyWykonanAllWyszukiwarka;
      const setGrupWykonanAllWyszukiwarka = techContext.setGrupWykonanAllWyszukiwarka;
  const dniWstecz = techContext.dniWstecz;
    const navigate = useNavigate();
  


      const etapPlikowZamowienia = async (etap,plikiRow,stary_etap) =>{
        const zamowienie_id = plikiRow.zamowienie_id
        const element_id= plikiRow.element_id
        const global_id_pliki_row= plikiRow.global_id


        const min = await axios.put(IP + "updatePlikiEtapZamowienia/" + sessionStorage.getItem("token"), {zamowienie_id,element_id, etap,global_id_pliki_row,stary_etap});
        const res_new_pliki = await axios.get(   IP + "zamowieniapliki/" + sessionStorage.getItem("token"));

        appcontext.setZamowieniaPliki([...res_new_pliki.data]);
        setZamowienia(zamowienia.map((t) => {
          if (t.id == zamowienie_id ) {
            return {...t,
              etap: min.data
            }
          } else {
            return t;
          }
        }))
        // appcontext.setZamowieniaWyszukiwarka(appcontext.zamowienia.map((t) => {
        appcontext.setZamowieniaWyszukiwarka(appcontext.zamowieniaWyszukiwarka.map((t) => {
          if (t.id == zamowienie_id ) {
            return {...t,
              etap: min.data
            }
          } else {
            return t;
          }
        }))
      }

//----------------------------------------------------------------

      const etapPlikowGrupyWykonan = async (etap,grupaWykonan,stary_etap) =>{

        const zamowienie_id = grupaWykonan.zamowienie_id
        const element_id= grupaWykonan.element_id
        const global_id_grupa_row= grupaWykonan.global_id

        const res1 = await axios.put(IP + "updatePlikiEtapGrupyWykonan/" + sessionStorage.getItem("token"), {zamowienie_id,element_id,global_id_grupa_row,etap,stary_etap});

       
          // jeßli update OK status == 200 aktualizacja stanu bez odßwieæania całości
                        if(res1.data =='OK'){
                  setGrupWykonanAll(
                    grupyWykonanAll.map((t) => {
                      if (t.global_id == grupaWykonan.global_id) {
                        return { ...t, zamowienia_pliki_etap: etap };
                      } else {
                        return t;
                      }
                    })
                  );
                }else navigate("/Login");
        // await axios.get(IP + "technologie_grupy_an_wykonania_for_procesor_dni_wstecz/"+selectedProcesor+"/"+dniWstecz).then((res)=>{
        //   setWykonaniaAll(res.data[0])
        //   setGrupWykonanAll(res.data[1])
        //   return res
        // }).then((res) =>{
          
        //   setGrupWykonanAll(prev=>{return prev})
        // });
        
      }

//----------------------------------------------------------------

    return [etapPlikowZamowienia,etapPlikowGrupyWykonan];
  }