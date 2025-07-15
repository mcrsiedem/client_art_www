
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
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
export   function useKosztyDodatkowe() {


      const appcontext = useContext(AppContext);
      const modalcontext = useContext(ModalInsertContext);
      const techContext = useContext(TechnologyContext);


      const zamowienia = appcontext.zamowienia;
      const setZamowienia = appcontext.setZamowienia;
      const [refreshZamowienia, odblokujZamowienie, deleteZamowienie] =useZamowienia();

      const selectedProcesor = techContext.selectedProcesor;
      const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
      const setWykonaniaAll = techContext.setWykonaniaAll;
      const setGrupWykonanAll = techContext.setGrupWykonanAll;
  const dniWstecz = techContext.dniWstecz;
  const kosztyDodatkoweZamowienia = modalcontext.kosztyDodatkoweZamowienia;
  const setKosztyDodatkoweZamowienia = modalcontext.setKosztyDodatkoweZamowienia;
  const daneZamowienia = modalcontext.daneZamowienia;


const dodajKoszty = () => {

  // setKosztyDodatkoweZamowienia([
  //   {
  //     id: 1,
  //     indeks:1,
  //     zamowienie_id: daneZamowienia.id,
  //     nazwa:"",
  //     ilosc: "1",
  //     cena: "0",
  //     suma: "0",
  //     info:"",
  //     status:1,
  //     stan:1,
  //     insert: true,
  //     dodal: DecodeToken(sessionStorage.getItem("token")).id,
  //   }
  // ])

// }
let koszty = [...kosztyDodatkoweZamowienia]
 koszty.push({
      id: getMaxID(koszty),
      indeks:getMaxIndeks(koszty),
      zamowienie_id: daneZamowienia.id,
      nazwa:"",
      ilosc: "1",
      cena: "0",
      suma: "0",
      info:"",
      status:1,
      stan:1,
      insert: true,
      dodal: DecodeToken(sessionStorage.getItem("token")).id,
    }
)
console.log(koszty)
setKosztyDodatkoweZamowienia(koszty)
}
//----------------------------------------------------------------

    return [dodajKoszty];
  }