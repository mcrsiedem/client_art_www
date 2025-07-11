import style from "./Parametry.module.css";
import { useContext} from "react";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status_dokumentu,_stan_dokumentu,_vat,_waluta,_rodzaj,_fsc, _etapy_produkcji, reg_txt } from "utils/initialvalue";
import addIcon2 from "../../../../assets/addIcon2.svg";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import { goInputValidation } from "actions/goInputValidation";
import { useHistoria } from "hooks/useHistoria";
import DecodeToken from "pages/Login/DecodeToken";

import axios from "axios";

import { IP } from "utils/Host";
import { today } from "actions/today";
export default function Parametery({showAddClientStage,setShowParametryZamowienia,setShowKosztyZamowienia}) {

  
  return (
    <>
      <div  className={style.parametry}>
        <PARAMETRY_BTN setShowParametryZamowienia={setShowParametryZamowienia} setShowKosztyZamowienia={setShowKosztyZamowienia}/>
        <KOSZTY_BTN setShowParametryZamowienia={setShowParametryZamowienia} setShowKosztyZamowienia={setShowKosztyZamowienia}/>


      </div>
    </>
  );
}

function Row({children,style}) {
  
    return (
      <div className={style}>
        {children}
      </div>
    );
  }

  
function PARAMETRY_BTN({setShowParametryZamowienia,setShowKosztyZamowienia}) {
  
    return (
      <button className={style.parametry_btn}>
        Parametry
      </button>
    );
  }

  function KOSZTY_BTN({setShowParametryZamowienia,setShowKosztyZamowienia}) {
  
    return (
      <button className={style.parametry_btn}>
        Koszty dodatkowe
      </button>
    );
  }