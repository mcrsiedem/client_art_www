import { useContext } from "react";
import axios from "axios";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
import { useZamowienia } from "./useZamowienia";
import { TechnologyContext } from "context/TechnologyContext";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { getMaxID } from "actions/getMaxID";
export function useIntroligatornia() {
  const techContext = useContext(TechnologyContext);

  const elementyTech = techContext.elementyTech;
  const fragmentyTech = techContext.fragmentyTech;
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;
  const oprawaTech = techContext.oprawaTech;

  const rozdzielOprawe = () => {
    let newFragmentyLeg = [];
    for (let legaFregment of legiFragmenty) {

      for (let fragmentTech of fragmentyTech.filter(x=>x.element_id == legaFregment.element_id)) {
        newFragmentyLeg.push({
          ...legaFregment,
          oprawa_id: fragmentTech.oprawa_id,
          naklad: fragmentTech.naklad,
          indeks: getMaxIndeks(newFragmentyLeg),
          id: getMaxID(newFragmentyLeg),
          wersja: fragmentTech.wersja
        });
      }
    }
    setLegiFragmenty(newFragmentyLeg);
  };

  const ponumerujFregmentyLeg2 = () => {
    let newFragmentyLeg = [];

    for (let oprawa of oprawaTech) {

   let nr= 0;
   
      for (let fragmentTech of legiFragmenty.filter(x=>x.oprawa_id == oprawa.id)) {
     
        newFragmentyLeg.push({
          ...fragmentTech,
          nr_legi: nr,
          update: true
        });
        nr++;
      }
    }

    // for (let fragmentTech of fragmentyTech.filter(x=>x.oprawa_id == 1)) {

    //   let nr= 0;
    //     newFragmentyLeg.push({
    //       ...fragmentTech,
    //       nr_legi: nr,
    //       update: true
    //     });
    //     nr++;
    //   }

// console.log("ilosc fragmentow: "+ fragmentyTech.filter(x=>x.oprawa_id == 1).lenght)
// console.log("ilosc fragmentow: ")



    setLegiFragmenty(newFragmentyLeg);



  }


  return [rozdzielOprawe,ponumerujFregmentyLeg2];
}
