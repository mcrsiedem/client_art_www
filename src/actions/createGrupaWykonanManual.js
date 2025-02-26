import axios from "axios";

import { IP } from "../utils/Host";
import { getMaxID } from "./getMaxID";
import { getMaxIndeks } from "./getMaxIndeks";

export function createGrupaWykonanManual(rowProces,procesList,grupaWykonan,setGrupaWykonan,legi,arkusze,wykonania, setWykonania) {
  
  // funkcja dodaje grupe wykonan i wykonania do pojedynczego procesu
  // rowProces - proces przypisany do elementu z którego mają być wykonania i grupa
  // procesList - wszystkie dostępne procesy

  const proces = procesList.filter(p => p.id == rowProces.proces_id )
  
  console.log("proces :",proces)
  const new_grupy = [];

  grupaWykonan.push({
    id: getMaxID(grupaWykonan),
    indeks: getMaxIndeks(grupaWykonan),
    element_id: rowProces.element_id,
    nazwa: rowProces.nazwa,
    narzad: procesList.filter(p => p.id == rowProces.proces_id )[0].narzad,
    predkosc: procesList.filter(p => p.id == rowProces.proces_id )[0].predkosc,
    mnoznik:1,
    procesor_id: procesList.filter(p => p.id == rowProces.proces_id )[0].procesor_domyslny,
    proces_id: rowProces.id,
    stan:1,
    status:1,
    uwagi: ""
  });

   setGrupaWykonan(grupaWykonan);




  // const new_wykonania = [];

  // const grupa ={
  //   id:1,
  //   element_id:1,
  //   proces_id:1,
  //   produkt_id:1,
  //   technologia_id:1,
  //   zamowienie_id:1,
  //   maszyna_id:1

  // }



  // procesy.map((proc,i)=> {
  //   if(proc.nazwa_id==1){  // druk

  //     new_grupy.push({
  //       id: i + 1,
  //       indeks: i + 1,
  //       nazwa: proc.nazwa,
  //       narzad: proc.narzad,
  //       predkosc: proc.predkosc
  //     });

  //     arkusze
  //     .filter(a => a.element_id == proc.element_id)
  //     .map(a=>{
  //       new_wykonania.push({
  //         id: i + 1,
  //         indeks: i + 1,
  //         nazwa: proc.nazwa,
  //         element_id: a.element_id,
  //         arkusz_id: a.id,
  //         proces_id: proc.id,
  //         typ_elementu: a.typ_elementu,
  //         narzad: proc.narzad,
  //         predkosc: proc.predkosc
  //       });
  //     })

  //   }
  //   if(proc.nazwa_id==3){ // falcowanie
  //     new_grupy.push({
  //       id: i + 1,
  //       indeks: i + 1,
  //       nazwa: proc.nazwa,
  //       narzad: proc.narzad,
  //       predkosc: proc.predkosc
  //     });

  //     legi
  //     .filter(a => a.element_id == proc.element_id)
  //     .map(a=>{
  //       new_wykonania.push({
  //         id: i + 1,
  //         indeks: i + 1,
  //         nazwa: proc.nazwa,
  //         element_id: a.element_id,
  //         arkusz_id: a.id,
  //         proces_id: proc.id,
  //         typ_elementu: a.typ_elementu,
  //         narzad: proc.narzad,
  //         predkosc: proc.predkosc
  //       });
  //     })








  //   }
    
  // })


}




