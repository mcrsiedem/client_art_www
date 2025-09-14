import { useContext } from "react";
import style from "./Wykonania.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { getNameStatus } from "actions/getNameStatus";
import { AppContext } from "context/AppContext";
import WykonanieDetails from "./WykonanieDetails";
import { onContextMenuHanlder } from "./onContextMenuHanlder";

export default function Wykonania({ grup, mini }) {
  const techContext = useContext(TechnologyContext);
    const contextApp = useContext(AppContext);
  
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const elementyTech = techContext.elementyTech;
  const _status_wykonania = contextApp._status_wykonania
    const fechparametryTechnologiiDetails =     techContext.fechparametryTechnologiiDetails;


  return (
    <>
      {/* <tr className={style.container}> */}
      {/* <td colSpan={mini? 4:17}>

      </td> */}

      {wykonania
        .filter((x) => x.grupa_id == grup.id)
        .map((wykonanie) => {
          return (
            <>
              <div 
              title={"global_id: "+wykonanie.global_id+" id: "+wykonanie.id+" zamowienie_id: "+wykonanie.zamowienie_id+" technologia_id: "+wykonanie.technologia_id+" proces_id: "+wykonanie.proces_id+" procesor_id: "+wykonanie.procesor_id}
              className={style.containerWykonanie}
              onContextMenu={(event) => onContextMenuHanlder(event,wykonanie,wykonania,setWykonania,fechparametryTechnologiiDetails)}
              
              >
                <div className={style.stage}>
                <p  className={style.title_mini}>ark. </p> <p className={style.title_bold} >{wykonanie.nr_arkusza}</p>
                <p>- </p> <p className={style.title_bold}> {wykonanie.nazwa_wykonania}</p>
                {/* <p> Nakład: {wykonanie.naklad}</p> */}
                <p> Przeloty: {wykonanie.przeloty}</p>
                <p> Status:  {getNameStatus( wykonanie.status,_status_wykonania)}</p>
                </div>
              <WykonanieDetails wykonanie={wykonanie} grup={grup}/>

              </div>
            </>
          );
        })}
    </>
  );
}

