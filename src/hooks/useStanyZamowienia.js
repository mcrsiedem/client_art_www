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

  const appcontext = useContext(AppContext);
  const listaPapierowNazwy = appcontext.listaPapierowNazwy;

  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const technologieID = contextModalInsert.technologieID;
  const pokazStanyZamowienia = () => {
console.clear();
console.log("Zamówienie: ");
console.log("Dane : ", daneZamowienia);
console.log("Produkt : ", produkty);
console.log("Elementy : ", elementy);
console.log("Fragmenty : ", fragmenty);
console.log("Oprawa : ", oprawa);
console.log("Procesy elementów: ", procesyElementow);
console.log("Pakowanie: ", pakowanie);
console.log("Koszty dodatkowe: ", kosztyDodatkoweZamowienia);
console.log("Papiery_nazwy: ", listaPapierowNazwy);
console.log("Historia zamówienia: ", historiaZamowienia);
console.log("Technologie do zamówienia: ", technologieID);
console.log("listaPapierowWyszukiwarka: ", listaPapierowWyszukiwarka);
console.log("listaPapierowNazwy: ", listaPapierowNazwy);
}

  return [pokazStanyZamowienia];
}
