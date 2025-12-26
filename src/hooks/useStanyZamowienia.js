import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
export function useStanyZamowienia() {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const produkty = contextModalInsert.produkty;
  const elementy = contextModalInsert.elementy;
  const fragmenty = contextModalInsert.fragmenty;
  const oprawa = contextModalInsert.oprawa;
  const pakowanie = contextModalInsert.pakowanie;
  const procesyElementow = contextModalInsert.procesyElementow;
  const kosztyDodatkoweZamowienia = contextModalInsert.kosztyDodatkoweZamowienia;
  const historiaZamowienia = contextModalInsert.historiaZamowienia;
  const ksiegowosc = contextModalInsert.ksiegowosc;
  const faktury = contextModalInsert.faktury;

  const appcontext = useContext(AppContext);
  const listaPapierowNazwy = appcontext.listaPapierowNazwy;

  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const technologieID = contextModalInsert.technologieID;
// zamowieniaPliki
  

  const pokazStanyZamowienia = () => {
console.clear();
console.log("Zamówienie: ");
console.log("Dane : ", daneZamowienia);
console.log("Produkt : ", produkty);
// console.log("Elementy : ", elementy);
// console.log("Fragmenty : ", fragmenty);
// console.log("Oprawa : ", oprawa);
// console.log("Procesy elementów: ", procesyElementow);
// console.log("Faktury: ", faktury);
// console.log("Pliki: ", procesyElementow);
// console.log("Pakowanie: ", pakowanie);
// console.log("Papiery_nazwy: ", listaPapierowNazwy);
// console.log("Historia zamówienia: ", historiaZamowienia);
// console.log("Technologie do zamówienia: ", technologieID);
// console.log("listaPapierowWyszukiwarka: ", listaPapierowWyszukiwarka);
// console.log("listaPapierowNazwy: ", listaPapierowNazwy);
console.log("kosztyDodatkoweZamowienia: ", kosztyDodatkoweZamowienia);
console.table( daneZamowienia);


// console.log("ksiegowosc: ", ksiegowosc);
}

  return [pokazStanyZamowienia];
}
