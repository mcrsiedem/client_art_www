import { useContext } from "react";
import style from "./Tabs.module.css";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status_dokumentu,_stan_dokumentu,_vat,_waluta,_rodzaj,_fsc, _etapy_produkcji, reg_txt } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import { useZestawienia } from "hooks/useZestawienia";

export default function Tabs({ dataDo,dataOd,setDataDo,setDataOd,kto,setKto}) {
 const appContext = useContext(AppContext);
const showTabsRealizacje = appContext.showTabsRealizacje
const setShowTabsRealizacje = appContext.setShowTabsRealizacje
const {refreshRealizacjeZestawienie} = useZestawienia()


    return (
    <>
      <div  className={style.parametry}>
        <PRACOWNICY_BTN showTabsRealizacje={showTabsRealizacje} setShowTabsRealizacje={setShowTabsRealizacje} refreshRealizacjeZestawienie={refreshRealizacjeZestawienie} dataDo={dataDo} dataOd={dataOd} kto={kto}/>
        <DZIALY_BTN showTabsRealizacje={showTabsRealizacje} setShowTabsRealizacje={setShowTabsRealizacje}/>
        <MASZYNY_BTN showTabsRealizacje={showTabsRealizacje} setShowTabsRealizacje={setShowTabsRealizacje}/>
        <ZAMOWIENIA_BTN showTabsRealizacje={showTabsRealizacje} setShowTabsRealizacje={setShowTabsRealizacje}/>
      </div>
    </>
  );


}


function PRACOWNICY_BTN({showTabsRealizacje,setShowTabsRealizacje,refreshRealizacjeZestawienie,dataOd,dataDo,kto}) {
  
    return (
      <button className={showTabsRealizacje.osoby ? style.parametry_btn_select:style.parametry_btn}
       onClick={()=>{
        // refreshRealizacjeZestawienie(dataOd,dataDo,kto);
         setShowTabsRealizacje({grupy:false,maszyny:false,osoby:true,prace:false})}
        
        }
      >
        Pracownicy
      </button>
    );
  }

  function DZIALY_BTN({showTabsRealizacje,setShowTabsRealizacje}) {
  
    return (
      <button className={showTabsRealizacje.grupy ? style.parametry_btn_select:style.parametry_btn}
       onClick={()=>{ setShowTabsRealizacje({grupy:true,maszyny:false,osoby:false,prace:false})}}
      >
        Działy
      </button>
    );
  }

  function MASZYNY_BTN({showTabsRealizacje,setShowTabsRealizacje}) {
  
    return (
      <button className={showTabsRealizacje.maszyny ? style.parametry_btn_select:style.parametry_btn}
       onClick={()=>{ setShowTabsRealizacje({grupy:false,maszyny:true,osoby:false,prace:false})}}
      >
        Maszyny
      </button>
    );
  }



  function ZAMOWIENIA_BTN({showTabsRealizacje,setShowTabsRealizacje}) {
  
    return (
      <button className={showTabsRealizacje.prace ? style.parametry_btn_select:style.parametry_btn}
       onClick={()=>{ setShowTabsRealizacje({grupy:false,maszyny:false,osoby:false,prace:true})}}
      >
        Zamówienia
      </button>
    );
  }
