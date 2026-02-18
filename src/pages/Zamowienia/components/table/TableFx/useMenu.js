import { useState, useEffect, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { _typ_elementu } from "utils/initialvalue";
import DecodeToken from "pages/Login/DecodeToken";
import { AppContext } from "context/AppContext";
export function useMenu() {
  const techContext = useContext(TechnologyContext);
    const contextApp = useContext(AppContext);
   const setZamowienia = contextApp.setZamowienia
  const fechparametryTechnologiiDetails = techContext.fechparametryTechnologiiDetails; // technologie

  //----------------------------------------------------------------

  const onMenuHandle = (event,sortedItems,row) =>{
    event.preventDefault();
    setZamowienia(
      sortedItems
      .map(x => {return { ...x, select: false, show:false}})
      .map((t) => {
        if (t.id == row.id) {
          return { ...row, select: true,show:true};
        } else {
          return t;
        }
      })
    );

    if(row.technologia_id != null ){

      fechparametryTechnologiiDetails(row.id,row.technologia_id)
    }else{
      techContext.setProcesyElementowTech([])
    }

  }

  //----------------------------------------------------------------

  return {onMenuHandle};
}
