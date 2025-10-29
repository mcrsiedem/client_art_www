import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { PreOrderContext } from "context/PreOrderContext";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";

export function useGenerujUlotku(status_id){
// const modalInsertContext = useContext(ModalInsertContext);
// const preOrderContext = useContext(PreOrderContext);
// const appContext = useContext(AppContext);
// const procesList = appContext.procesList;
// const produkty = modalInsertContext.produkty;
  const contextTech = useContext(TechnologyContext);
  const arkusze = contextTech.arkusze;
  const elementyTech = contextTech.elementyTech;
  const setElementyTech = contextTech.setElementyTech;

function generujUlotki() {

  setElementyTech(
    elementyTech.map((t) => {
    return { ...t, lega: t.ilosc_stron, ilosc_leg: 1};
        // if (t.typ == 1) {
        //   return { ...t, lega: 4, ilosc_leg: 4 };
        // }
        // if (t.typ == 2) {
        //   return { ...t, lega: 12, ilosc_leg: 1 };
        // } else {
        //   return t;
        // }
      

     


    })
  );

  }



  return {generujUlotki};



}

// const [add] = useHistoria()

