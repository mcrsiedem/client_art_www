import { useContext } from "react";
import style from "./Parametry.module.css";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status_dokumentu,_stan_dokumentu,_vat,_waluta,_rodzaj,_fsc, _etapy_produkcji, reg_txt } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";

export default function Parametery() {
 const contextModalInsert = useContext(ModalInsertContext);
const showTabs = contextModalInsert.showTabs
const setShowTabs = contextModalInsert.setShowTabs

    return (
    <>
      <div  className={style.parametry}>
        <PARAMETRY_BTN showTabs={showTabs} setShowTabs={setShowTabs}/>
        <KOSZTY_BTN showTabs={showTabs} setShowTabs={setShowTabs}/>
        <FAKTURY_BTN showTabs={showTabs} setShowTabs={setShowTabs}/>
        <HISTORIA_BTN showTabs={showTabs} setShowTabs={setShowTabs}/>


      </div>
    </>
  );


}


function PARAMETRY_BTN({showTabs,setShowTabs}) {
  
    return (
      <button className={showTabs.parametry ? style.parametry_btn_select:style.parametry_btn}
       onClick={()=>{ setShowTabs({parametry:true,koszty:false,historia:false,faktury:false})}}
       disabled = {showTabs.kreator}
      >
        Parametry
      </button>
    );
  }

  function KOSZTY_BTN({showTabs,setShowTabs}) {
  
    return (
            <button
             className={showTabs.koszty ? style.parametry_btn_select:style.parametry_btn}
             onClick={()=>{ setShowTabs({parametry:false,koszty:true,historia:false,faktury:false})}}
       disabled = {showTabs.kreator}

             >

        Koszty dodatkowe
      </button>
    );
  }

    function HISTORIA_BTN({showTabs,setShowTabs}) {
  
    return (
            <button className={showTabs.historia ? style.parametry_btn_select:style.parametry_btn}
             onClick={()=>{ setShowTabs({parametry:false,koszty:false,historia:true,faktury:false})}}
       disabled = {showTabs.kreator}

            >

        Historia zmian
      </button>
    );
  }

      function FAKTURY_BTN({showTabs,setShowTabs}) {
  
    return (
            <button className={showTabs.faktury ? style.parametry_btn_select:style.parametry_btn}
             onClick={()=>{ setShowTabs({parametry:false,koszty:false,historia:false,faktury:true})}}
       disabled = {showTabs.kreator}

            >

        Faktury
      </button>
    );
  }