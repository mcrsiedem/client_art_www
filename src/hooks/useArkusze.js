import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { TechnologyContext } from "context/TechnologyContext";
import { createArk_modulo_0 } from "actions/createArkusze/createArk_modulo_0";
import { createArk_16_K_modulo_2 } from "actions/createArkusze/16K/createArk_16_K_modulo_2";
import { createArk_16_K_modulo_4 } from "actions/createArkusze/16K/createArk_16_K_modulo_4";
import { createArk_16_K_modulo_6 } from "actions/createArkusze/16K/createArk_16_K_modulo_6";
import { createArk_16_K_modulo_8 } from "actions/createArkusze/16K/createArk_16_K_modulo_8";
import { createArk_16_K_modulo_10 } from "actions/createArkusze/16K/createArk_16_K_modulo_10";
import { createArk_16_K_modulo_12 } from "actions/createArkusze/16K/createArk_16_K_modulo_12";
import { createArk_16_K_modulo_14 } from "actions/createArkusze/16K/createArk_16_K_modulo_14";
import { createArk_16_K_single_ark } from "actions/createArkusze/16K/createArk_16_K_single_ark";
import { createArk_12_K_modulo_2 } from "actions/createArkusze/12K/createArk_12_K_modulo_2";
import { createArk_12_K_modulo_4 } from "actions/createArkusze/12K/createArk_12_K_modulo_4";
import { createArk_12_K_modulo_6 } from "actions/createArkusze/12K/createArk_12_K_modulo_6";
import { createArk_12_K_modulo_8 } from "actions/createArkusze/12K/createArk_12_K_modulo_8";
import { createArk_12_K_modulo_10 } from "actions/createArkusze/12K/createArk_12_K_modulo_10";
import { createArk_12_K_single_ark } from "actions/createArkusze/12K/createArk_12_K_single_ark";
import { createArk_24_K_modulo_2 } from "actions/createArkusze/24K/createArk_24_K_modulo_2";
import { createArk_24_K_modulo_4 } from "actions/createArkusze/24K/createArk_24_K_modulo_4";
import { createArk_24_K_modulo_6 } from "actions/createArkusze/24K/createArk_24_K_modulo_6";
import { createArk_24_K_modulo_8 } from "actions/createArkusze/24K/createArk_24_K_modulo_8";
import { createArk_24_K_modulo_10 } from "actions/createArkusze/24K/createArk_24_K_modulo_10";
import { createArk_24_K_modulo_12 } from "actions/createArkusze/24K/createArk_24_K_modulo_12";
import { createArk_24_K_modulo_14 } from "actions/createArkusze/24K/createArk_24_K_modulo_14";
import { createArk_24_K_modulo_16 } from "actions/createArkusze/24K/createArk_24_K_modulo_16";
import { createArk_24_K_modulo_18 } from "actions/createArkusze/24K/createArk_24_K_modulo_18";
import { createArk_24_K_modulo_20 } from "actions/createArkusze/24K/createArk_24_K_modulo_20";
import { createArk_24_K_modulo_22 } from "actions/createArkusze/24K/createArk_24_K_modulo_22";
import { createArk_24_K_single_ark } from "actions/createArkusze/24K/createArk_24_K_single_ark";
import { createArk_32_K_modulo_2 } from "actions/createArkusze/32K/createArk_32_K_modulo_2";
import { createArk_32_K_modulo_4 } from "actions/createArkusze/32K/createArk_32_K_modulo_4";
import { createArk_32_K_modulo_6 } from "actions/createArkusze/32K/createArk_32_K_modulo_6";
import { createArk_32_K_modulo_8 } from "actions/createArkusze/32K/createArk_32_K_modulo_8";
import { createArk_32_K_modulo_10 } from "actions/createArkusze/32K/createArk_32_K_modulo_10";
import { createArk_32_K_modulo_12 } from "actions/createArkusze/32K/createArk_32_K_modulo_12";
import { createArk_32_K_modulo_14 } from "actions/createArkusze/32K/createArk_32_K_modulo_14";
import { createArk_32_K_modulo_16 } from "actions/createArkusze/32K/createArk_32_K_modulo_16";
import { createArk_32_K_modulo_18 } from "actions/createArkusze/32K/createArk_32_K_modulo_18";
import { createArk_32_K_modulo_20 } from "actions/createArkusze/32K/createArk_32_K_modulo_20";
import { createArk_32_K_modulo_22 } from "actions/createArkusze/32K/createArk_32_K_modulo_22";
import { createArk_32_K_modulo_24 } from "actions/createArkusze/32K/createArk_32_K_modulo_24";
import { createArk_32_K_modulo_26 } from "actions/createArkusze/32K/createArk_32_K_modulo_26";
import { createArk_32_K_modulo_28 } from "actions/createArkusze/32K/createArk_32_K_modulo_28";
import { createArk_32_K_modulo_30 } from "actions/createArkusze/32K/createArk_32_K_modulo_30";
import { createArk_32_K_single_ark } from "actions/createArkusze/32K/createArk_32_K_single_ark";
import { createArk_16_Z_modulo_4 } from "actions/createArkusze/16Z/createArk_16_Z_modulo_4";
import { createArk_16_Z_modulo_8 } from "actions/createArkusze/16Z/createArk_16_Z_modulo_8";
import { createArk_16_Z_modulo_12 } from "actions/createArkusze/16Z/createArk_16_Z_modulo_12";
import { createArk_12_Z_modulo_4 } from "actions/createArkusze/12Z/createArk_12_Z_modulo_4";
import { createArk_12_Z_modulo_8 } from "actions/createArkusze/12Z/createArk_12_Z_modulo_8";
import { createArk_12_Z_single_ark } from "actions/createArkusze/12Z/createArk_12_Z_single_ark";
import { createArk_24_Z_modulo_4 } from "actions/createArkusze/24Z/createArk_24_Z_modulo_4";
import { createArk_24_Z_modulo_8 } from "actions/createArkusze/24Z/createArk_24_Z_modulo_8";
import { createArk_24_Z_modulo_12 } from "actions/createArkusze/24Z/createArk_24_Z_modulo_12";
import { createArk_24_Z_modulo_16 } from "actions/createArkusze/24Z/createArk_24_Z_modulo_16";
import { createArk_24_Z_modulo_20 } from "actions/createArkusze/24Z/createArk_24_Z_modulo_20";
import { createArk_32_Z_modulo_4 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_4";
import { createArk_32_Z_modulo_8 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_8";
import { createArk_32_Z_modulo_12 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_12";
import { createArk_32_Z_modulo_16 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_16";
import { createArk_32_Z_modulo_20 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_20";
import { createArk_32_Z_modulo_24 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_24";
import { createArk_32_Z_modulo_28 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_28";
import { AppContext } from "context/AppContext";
import { useIntroligatornia } from "./useIntroligatornia";


export function useArkusze(status_id){
// const modalcontext = useContext(ModalInsertContext);
// const daneZamowienia = modalcontext.daneZamowienia;
// const setDaneZamowienia = modalcontext.setDaneZamowienia;

  const techContext = useContext(TechnologyContext);
  const elementyTech = techContext.elementyTech;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;

    const legiFragmenty = techContext.legiFragmenty;
    const setLegiFragmenty = techContext.setLegiFragmenty;

    const procesy = techContext.procesyElementow;
    const grupaWykonan = techContext.grupaWykonan;
    const setGrupaWykonan = techContext.setGrupaWykonan;
    const wykonania = techContext.wykonania;
    const setWykonania = techContext.setWykonania;
    const oprawaTech = techContext.oprawaTech;
    const setOprawaTech = techContext.setOprawaTech;
    const fragmentyTech = techContext.fragmentyTech;
    const setFragmentyTech = techContext.setFragmentyTech;
  
   const contextApp = useContext(AppContext);
   const nadkomplety = contextApp.nadkomplety;
 const [rozdzielOprawe,ponumerujFregmentyLeg] = useIntroligatornia()

function ponumerujArkusze() {

  for(let element of elementyTech){
 let m = 0;

  setArkusze( arkusze
      .map((ark,i) => {
      if(ark.element_id == element.id){
       m++;
        return {...ark, nr_arkusza: m, update: true}
      }else {return ark } 
     
      }
    )
    )
    let n = 0;
    setLegi( legi
      .map((ark,i) => {
      if(ark.element_id == element.id){
      n++;
        return {...ark, nr_legi: n, update: true}
      }else {return ark } 
     
      }
    )
    )
  }




}


  function createArkuszeFromElemenets(
  ) {


  const new_arkusze = [];
  const new_legi = [];
  const new_legiFragmenty = [];
  const new_grupy = [];
  const new_wykonania = [];

  const grupa ={
    id:1,
    element_id:1,
    proces_id:1,
    produkt_id:1, 
    technologia_id:1,
    zamowienie_id:1,
    maszyna_id:1,
    uwagi: ""

  }

  // console.log("Oprawa: " +oprawaTech[0].oprawa)

  // console.log("elementyTech", elementyTech);

  elementyTech.map((row) => {
    // console.log("row: ",row)
    
    const ilosc_leg_na_arkuszu = row.ilosc_leg;
    const rodzaj_legi = row.lega;
    let rodzaj_arkusza = 0;
    if(row.ilosc_stron == row.lega ){
    rodzaj_arkusza = rodzaj_legi * ilosc_leg_na_arkuszu / ilosc_leg_na_arkuszu; // wszystkie legi na rkuszu są takie same
    } else{
      rodzaj_arkusza = rodzaj_legi * ilosc_leg_na_arkuszu // rózne legi na arkuszu
    }

    // const rodzaj_arkusza = rodzaj_legi * ilosc_leg_na_arkuszu / ilosc_leg_na_arkuszu; // podzieliłem dodatkowo prze ilosc leg
    const ilosc_arkuszy = row.ilosc_stron / rodzaj_arkusza /ilosc_leg_na_arkuszu;
    // const ilosc_arkuszy = row.ilosc_stron / rodzaj_arkusza;
    const modulo = row.ilosc_stron % rodzaj_arkusza;

    const ark = {
      typ_elementu: row.typ,
      rodzaj_arkusza,
      naklad: row.naklad,
      nadkomplet: "",
      element_id: row.id,
      ilosc_stron: row.lega,
      uwagi: "",
      nr_arkusza: "",
      arkusz_szerokosc: row.arkusz_szerokosc,
      arkusz_wysokosc: row.arkusz_wysokosc,
      papier_id: row.papier_id,
      papier_postac_id: row.papier_postac_id,
      technologia_id: row.technologia_id,
      insert: true
    };

    const lega = {
      typ_elementu: row.typ,
      rodzaj_legi,
      element_id: row.id,
      ilosc_stron: row.lega,
      naklad: row.naklad,
      uwagi: "",
      nr_legi: "",
      technologia_id: row.technologia_id,
      insert: true
    };

let OPRAWY_KLEJONE = [50,51,52]
if( OPRAWY_KLEJONE.includes(parseInt( oprawaTech[0].oprawa))) {

  if(rodzaj_legi == 16) {
  if(row.ilosc_stron >14){ 
   if (modulo == 0) {
      createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    }

    if (modulo == 2) {
      createArk_16_K_modulo_2(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 4) {
      createArk_16_K_modulo_4(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 6) {
      createArk_16_K_modulo_6(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 8) {
      createArk_16_K_modulo_8(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 10) {
      createArk_16_K_modulo_10(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 12) {
      createArk_16_K_modulo_12(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 14) {
      createArk_16_K_modulo_14(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }


      
  //podwójna lega na arkuszu automatycznie tylko jeśli wychodzi równa ilosc pełenych leg
  // w przeciwnym wypadku trzeba arkusze i legi stworzyć ręcznie
  if( modulo == 0 && ilosc_leg_na_arkuszu == 2)
    {
      if (modulo == 0) {
        createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
      }
    }
  }
  

  else{
    
    createArk_16_K_single_ark(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  
  }
 
  
}
if(rodzaj_legi == 12) {
  if(row.ilosc_stron >10){ 
    if (modulo == 0) {
      createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)

    }
    if (modulo == 2) {
      createArk_12_K_modulo_2(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 4) {
      createArk_12_K_modulo_4(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 6) {
      createArk_12_K_modulo_6(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 8) {
      createArk_12_K_modulo_8(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 10) {
      createArk_12_K_modulo_10(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if( modulo == 0 && ilosc_leg_na_arkuszu == 2)
      {
        if (modulo == 0) {
          createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
        }
      }

  }
  else{
    
    createArk_12_K_single_ark(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  
  }

  

}

if(rodzaj_legi == 24) {
  if(row.ilosc_stron >22){ 
    if (modulo == 0) {
      createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    }
    if (modulo == 2) {
      createArk_24_K_modulo_2(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 4) {
      createArk_24_K_modulo_4(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 6) {
      createArk_24_K_modulo_6(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 8) {
      createArk_24_K_modulo_8(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 10) {
      createArk_24_K_modulo_10(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 12) {
      createArk_24_K_modulo_12(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 14) {
      createArk_24_K_modulo_14(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 16) {
      createArk_24_K_modulo_16(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 18) {
      createArk_24_K_modulo_18(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 20) {
      createArk_24_K_modulo_20(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
    if (modulo == 22) {
      createArk_24_K_modulo_22(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
  }
  else{
    
    createArk_24_K_single_ark(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  
  }
}


if(rodzaj_legi == 4) {
  if (modulo == 0) {
    createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
}


if(rodzaj_legi == 32) {

  if(row.ilosc_stron >30){ 
     if (modulo == 0) {
    createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }

  if (modulo == 2) {
    createArk_32_K_modulo_2(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
  if (modulo == 4) {
    createArk_32_K_modulo_4(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
  if (modulo == 6) {
    createArk_32_K_modulo_6(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
  if (modulo == 8) {
    createArk_32_K_modulo_8(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
  if (modulo == 10) {
    createArk_32_K_modulo_10(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }

  if (modulo == 12) {
    createArk_32_K_modulo_12(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }

  if (modulo == 14) {
    createArk_32_K_modulo_14(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
  if (modulo == 16) {
    createArk_32_K_modulo_16(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
  if (modulo == 18) {
    createArk_32_K_modulo_18(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
  if (modulo == 20) {
    createArk_32_K_modulo_20(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
  if (modulo == 22) {
    createArk_32_K_modulo_22(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
  if (modulo == 24) {
    createArk_32_K_modulo_24(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
  if (modulo == 26) {
    createArk_32_K_modulo_26(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }

  if (modulo == 28) {
    createArk_32_K_modulo_28(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }

  if (modulo == 30) {
    createArk_32_K_modulo_30(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  } 
  }else{
    createArk_32_K_single_ark(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  
  }


}
}
// --- koniec oprawy klejonej


//---zeszyt
let OPRAWY_ZESZYTOWE = [54,55,56,57,58,59]
if( OPRAWY_ZESZYTOWE.includes(parseInt( oprawaTech[0].oprawa))) {

  if(rodzaj_legi == 16) {

    if(row.ilosc_stron >10){ 

      if (modulo == 0) {
        createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    }


    if (modulo == 4) {
      createArk_16_Z_modulo_4(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
    if (modulo == 8) {
      createArk_16_Z_modulo_8(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
    
    if (modulo == 12) {
      createArk_16_Z_modulo_12(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
    }else{
      createArk_16_K_single_ark(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    
    }

  }

  if(rodzaj_legi == 12) {

    if(row.ilosc_stron >10){ 

      if (modulo == 0) {
        createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    }


    if (modulo == 4) {
      createArk_12_Z_modulo_4(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
    if (modulo == 8) {
      createArk_12_Z_modulo_8(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
    

    }else{
      createArk_12_Z_single_ark(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    
    }

  }

  //----------

  if(rodzaj_legi == 24) {

    if(row.ilosc_stron >22){ 

      if (modulo == 0) {
        createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    }

    if (modulo == 4) {
      createArk_24_Z_modulo_4(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }

    if (modulo == 8) {
      createArk_24_Z_modulo_8(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
    if (modulo == 12) {
      createArk_24_Z_modulo_12(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
    if (modulo == 16) {
      createArk_24_Z_modulo_16(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
    if (modulo == 20) {
      createArk_24_Z_modulo_20(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
    

    }else{
      createArk_24_K_single_ark(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    
    }

  }
  //--------
  if(rodzaj_legi == 32) {

    if(row.ilosc_stron >28){ 

      if (modulo == 0) {
        createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    }
    if (modulo == 4) {
      createArk_32_Z_modulo_4(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  } 
    if (modulo == 8) {
      createArk_32_Z_modulo_8(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  } 
    if (modulo == 12) {
      createArk_32_Z_modulo_12(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  } 
    if (modulo == 16) {
        createArk_32_Z_modulo_16(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    } 
    if (modulo == 20) {
        createArk_32_Z_modulo_20(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    } 

    if (modulo == 24) {
        createArk_32_Z_modulo_24(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    } 
    if (modulo == 28) {
      createArk_32_Z_modulo_28(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
  }
    }else{
      createArk_32_K_single_ark(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    
    }
  }



  if(rodzaj_legi == 4) {
    if (modulo == 0) {
      createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row)
    }
  }
}

// -- koniec zeszyt

//numerowanie akruszy
let m = 0;
let n = 0;    
    // setArkusze(new_arkusze);
    // setLegi(new_legi);

    setArkusze(new_arkusze.map((ark,i) => {
      if(ark.element_id == row.id){
       m++;
        return {...ark, nr_arkusza: m, update: true}
      }else {return ark } 
     
      }
    ));
    setLegi(new_legi.map((ark,i) => {
      if(ark.element_id == row.id){
      n++;
        return {...ark, nr_legi: n, update: true}
      }else {return ark } 
     
      }
    ));

  });

  new_legi
  .map((l, indeks) => {
    new_legiFragmenty.push({
      id: MaxID(new_legiFragmenty),
      indeks: MaxIndeks(new_legiFragmenty),
      // ...legaFragment,
      lega_id: l.id,
      nr_legi: l.nr_legi,
      naklad: l.naklad,
      fragment_id: l.id,
      rodzaj_legi: l.rodzaj_legi,
      // oprawa_id: l.oprawa_id,oprawaTech
      oprawa_id: oprawaTech[0]?.id,
      typ: l.typ_elementu,
      wersja: "",
      element_id: l.element_id,
      arkusz_id: l.arkusz_id,
      insert: true
    });
  });
  setLegiFragmenty(new_legiFragmenty.sort((a,c)=>a.id-c.id).sort((a,c)=>a.oprawa_id-c.oprawa_id).map((x,i)=>{return {...x, indeks: i}}));
  // setLegiFragmenty(new_legiFragmenty);



  // ponumerujFregmentyLeg()

  // ponumerujArkusze()

}



const MaxID = (value) => {
  let maxID = null;
  if (value.length == 0) return (maxID = 1);
  maxID = Math.max(...value.map((f) => f.id)) + 1;

  return maxID;
};

const MaxIndeks = (value) => {
  let maxIndeks = null;
  if (value.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...value.map((f) => f.indeks)) + 1;

  return maxIndeks;
};

const MaxIndeksOprawa = (value,oprawa_id) => {
  let maxIndeks = null;
  if (value.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...value
    .filter(x=> x.oprawa_id == oprawa_id)
    .map((f) => f.indeks)) + 1;

  return maxIndeks;
};


const SumaCzasow = (wykonania,grupa) => {
  // sumuje wszystkie czasy z dowolnej grupy
  let  suma = wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.czas).reduce((a, b) => a + b, 0)
  return suma;
};

const SumaPrzelotow = (wykonania,grupa) => {
  // sumuje wszystkie czasy z dowolnej grupy
  let  suma = wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.przeloty).reduce((a, b) => a + b, 0)
  return suma;
};


  return [createArkuszeFromElemenets,ponumerujArkusze];

}


// użycie

// const [add] = useHistoria()

// add(   {
//   kategoria: "Status zamówienia",
//   event: "Zmiana statusu zamówienia z "+ _status_dokumentu.filter(x=>x.id == daneZamowienia.status )[0].nazwa + " na "+ _status_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa,
// })

// add(                    {
//   kategoria: "Stan zamówienia",
//   event: "Zmiana stanu zamówienia z "+ _stan_dokumentu.filter(x=>x.id == daneZamowienia.stan )[0].nazwa + " na "+ _stan_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa}
// );

// add({kategoria: "Etap zamówienia",
//   event: "Zmiana etapu zamówienia z "+ _etapy_produkcji.filter(x=>x.id == daneZamowienia.etap )[0].nazwa + " na "+ _etapy_produkcji.filter(x=>x.id == event.target.value )[0].nazwa}
// );