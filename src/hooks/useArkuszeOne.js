import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { getMaxID } from "actions/getMaxID";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { getMaxIndeks } from "actions/getMaxIndeks";

export function useArkuszeOne(row){
const modalcontext = useContext(ModalInsertContext);
const contextApp = useContext(AppContext);
const techContext = useContext(TechnologyContext);

const historiaZamowienia = modalcontext.historiaZamowienia;
const setHistoriaZamowienia = modalcontext.setHistoriaZamowienia;
const daneZamowienia = modalcontext.daneZamowienia;


// const grupaOprawaTech = techContext.grupaOprawaTech;
// const setGrupaOprawaTech = techContext.setGrupaOprawaTech;
const oprawaTech = techContext.oprawaTech;
const procesList = contextApp.procesList;

  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;

const dodajArkusz = (rowElement) =>{

  let arkusz_id = getMaxID(arkusze);
let lega_id = getMaxID(legi);

  arkusze.push({
    id: arkusz_id,
    indeks: getMaxIndeks(arkusze),
    typ_elementu: rowElement.typ,
    rodzaj_arkusza: rowElement.lega,
    naklad: rowElement.naklad,
    element_id: rowElement.id,
    ilosc_stron: rowElement.ilosc_stron,
    ilosc_leg: 1,
    papier_id: rowElement.papier_id,
    nadkomplet: "",
    nr_arkusza: "",
    arkusz_szerokosc: "",
    arkusz_wysokosc: "",
    uwagi:"",
    technologia_id: rowElement.technologia_id,
    insert: true
    // ilosc_leg: rodzaj_arkusza/ 4
  });
  
  legi.push({
    id:  lega_id,
    indeks: getMaxIndeks(legi),
    typ_elementu: rowElement.typ,
    rodzaj_legi:rowElement.lega,
    element_id: rowElement.id,
    ilosc_stron: rowElement.ilosc_stron,
    naklad: rowElement.naklad,
    arkusz_id: arkusz_id,
    technologia_id: rowElement.technologia_id,
    nr_legi: "",
    uwagi:"",
    insert: true
  });
  
  legiFragmenty.push({
    id: getMaxID(legiFragmenty),
    indeks: getMaxIndeks(legiFragmenty),
    wersja:"",
    nr_legi: "",
    element_id: rowElement.id,
    lega_id: lega_id,
    naklad: rowElement.naklad,
    arkusz_id: arkusz_id,
    technologia_id: rowElement.technologia_id,
    oprawa_id: null,
    typ: rowElement.typ,
    insert: true
  
  });


      setArkusze(arkusze);
      setLegi(legi)
      setLegiFragmenty(legiFragmenty)
      setElementyTech(elementyTech.map((t) => {
  return {...t,
    showMenu: false}
}));

}




  return [dodajArkusz];
}


// użycie

// const [add] = useHistoria()
