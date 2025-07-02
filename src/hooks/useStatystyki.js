
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



      const refreshKalendarz = async () =>{


        const kalendarz = await axios.get(   IP + "zamowieniaKalendarz/" + sessionStorage.getItem("token"));
          
        // console.log(kalendarz.data[1][0].data_spedycji_max)

setKalendarz(kalendarz.data)
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