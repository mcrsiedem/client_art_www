
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
export   function useStatystyki() {


      const appcontext = useContext(AppContext);
      const modalcontext = useContext(ModalInsertContext);
      const techContext = useContext(TechnologyContext);

      const kalendarz =appcontext.kalendarz;
      const setKalendarz = appcontext.setKalendarz;
      let dni,data_spedycji_min,data_spedycji_max, zamowienia; 


      const refreshKalendarz = async () =>{


        const dane_kalendarz = await axios.get(   IP + "zamowieniaKalendarz/" + sessionStorage.getItem("token"));
        dni = dane_kalendarz.data[1][0].ilosc_dni
        data_spedycji_min = dane_kalendarz.data[1][0].data_spedycji_min
        data_spedycji_max = dane_kalendarz.data[1][0].data_spedycji_max
        zamowienia = dane_kalendarz.data[0]
        // console.log(dni)
        // console.log(data_spedycji_min)
        // console.log(data_spedycji_max)
      // console.log(zamowienia)
        
        // console.log(kalendarz.data[1][0].data_spedycji_max)
        for(let x=0; x<dni; x++){
          kalendarz.push({
            id : x 
          })
        }

setKalendarz(kalendarz)
      }

//----------------------------------------------------------------



//----------------------------------------------------------------

    return [refreshKalendarz];
  }


                      // {kalendarz.data[1][0].data_spedycji_max
                      //   .filter((x) => x.procesor_id == selectedProcesor && x.typ_grupy<3)
                      //   .map((grup, i) => {
          
                      //     // return (<OprawaProcesViewRow grup={grup} unlockTable={unlockTable} setUnlockTable={setUnlockTable}/>)
          
                      //     if (grup.typ_grupy == 2) {
                      //     return (<OprawaProcesViewRow grup={grup} unlockTable={unlockTable} setUnlockTable={setUnlockTable}/>)
                      //     }
                      //     else{
                      //     return (<OprawaProcesViewRowPrzerwa grup={grup} unlockTable={unlockTable} setUnlockTable={setUnlockTable}/>)
          
          
                      //     }
          
          
                      //   })}