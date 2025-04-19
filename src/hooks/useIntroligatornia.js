import { useContext } from "react";
import axios from "axios";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
import { useZamowienia } from "./useZamowienia";
import { TechnologyContext } from "context/TechnologyContext";
export function useIntroligatornia() {
  const techContext = useContext(TechnologyContext);

  const elementyTech = techContext.elementyTech;
  const fragmentyTech = techContext.fragmentyTech;
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;

  const rozdzielOprawe = () => {
    console.log("intro");

    let newFragmentyLeg = [];


    for (let legaFregment of legiFragmenty) {

      for (let fragmentTech of fragmentyTech.filter(x=>x.element_id == legaFregment.element_id)) {
        newFragmentyLeg.push({
          ...legaFregment,
          oprawa_id: fragmentTech.oprawa_id,
          naklad: fragmentTech.naklad,
        });
      }

    }


    setLegiFragmenty(newFragmentyLeg);
  };

  return [rozdzielOprawe];
}
