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
function selectColor (status){

  
            if (status==4 ) return style.stage_dark
            if (status==2) return style.stage
            if (status==3) return style.stage_yellow
              return style.stage
            

  }

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
              key={wykonanie.global_id}
              title={"global_id: "+wykonanie.global_id+" id: "+wykonanie.id+" zamowienie_id: "+wykonanie.zamowienie_id+" technologia_id: "+wykonanie.technologia_id+" proces_id: "+wykonanie.proces_id+" procesor_id: "+wykonanie.procesor_id}
              className={style.containerWykonanie}
              // onDoubleClick={()=>{console.log(wykonanie) }}
              onContextMenu={(event) => onContextMenuHanlder(event,wykonanie,wykonania,setWykonania,fechparametryTechnologiiDetails)}
              
              >
                {/* <div className={style.stage}> */}
                <div className={selectColor(wykonanie.status)}>
                   <div className={style.info2}>
                <p  className={style.title_mini}>ark. </p> <p className={style.title_bold} >{wykonanie.nr_arkusza}</p>
                </div>
                  {/* <NrArkusza wykonanie={wykonanie}/> */}
                <p>- </p> <p className={style.title_bold}> {wykonanie.nazwa_wykonania}</p>
                <p> Przeloty: {wykonanie.przeloty}</p>
                {/* <p> Do wykonania zostało:  {wykonanie.do_wykonania }</p> */}
                <div className={style.info}>
                  {/* <p> Zostało:  {wykonanie.do_wykonania >0 || wykonanie.do_wykonania=="" ? wykonanie.do_wykonania: wykonanie.przeloty   }</p> */}
                  <p> Zostało:  {wykonanie.do_wykonania}</p>
                </div>
                
                  {/* <Zostalo wykonanie={wykonanie}/> */}
<div className={style.info}>
                <p>  {getNameStatus( wykonanie.status,_status_wykonania)}</p>
                </div>
                </div>
              <WykonanieDetails wykonanie={wykonanie} grup={grup}/>

              </div>
            </>
          );
        })}
    </>
  );
}

const NrArkusza = ({wykonanie}) => {

  return(
    <input
    value={wykonanie.nr_arkusza}
    >
    
    </input>
  )
}

const Zostalo = ({wykonanie}) => {

  return(
    <input
    value= {wykonanie.do_wykonania >0 || wykonanie.do_wykonania=="" ? wykonanie.do_wykonania: wykonanie.przeloty   }
    >
    
    </input>
  )
}