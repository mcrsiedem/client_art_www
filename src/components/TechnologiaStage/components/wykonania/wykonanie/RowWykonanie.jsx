
import style from "./RowWykonanie.module.css";
import DodajWykonanie from "./components/DodajWykonanie";
import StatusWykonania from "./components/StatusWykonania";
import CzasWykonania from "./components/CzasWykonania";
import IndeksWykonania from "./components/IndeksWykonania";
import ArkuszWykonania from "./components/ArkuszWykonania";
import RodzajArkuszaWykonania from "./components/RodzajArkuszaWykonania";
import NakladWykonanie from "./components/NakladWykonania";
import PredkoscWykoniania from "./components/PredkoscWykonania";
import PrzelotyWykonania from "./components/PrzelotyWykonania";
import NarzadWykonania from "./components/NarzadWykonania";
import UsunWykonanie from "./components/UsunWykonanie";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";

export default function RowWykonanie  ({rowWykonanie,rowProces})  {

    const {wykonania} = useContext(TechnologyContext);


    const sprawdzCzyOstnieWykonanie = () => {

  if (wykonania.filter( x => x.grupa_id == rowWykonanie.grupa_id).length >1) return true
}

  return(<div
  
    // draggable={sprawdzCzyOstnieWykonanie()}
    draggable
    onDrag={() => handleDragWykonanieStart(rowWykonanie)}>
    <div onDoubleClick={()=>{console.log(rowWykonanie)}}  className={style.container}> 
      <IndeksWykonania rowWykonanie={rowWykonanie}/>
      <ArkuszWykonania rowWykonanie={rowWykonanie}/>
      <RodzajArkuszaWykonania rowWykonanie={rowWykonanie}/>
      <NakladWykonanie rowWykonanie={rowWykonanie}/>
      <CzasWykonania rowWykonanie={rowWykonanie}/>
      <PredkoscWykoniania rowWykonanie={rowWykonanie}/>
      <NarzadWykonania rowWykonanie={rowWykonanie}/>
      <PrzelotyWykonania rowWykonanie={rowWykonanie}/>
      <StatusWykonania rowWykonanie={rowWykonanie} rowProces={rowProces}/>
      <DodajWykonanie rowWykonanie={rowWykonanie}/>
      <UsunWykonanie rowWykonanie={rowWykonanie}/>
    </div>
  </div>)
  
  function handleDragWykonanieStart(rowWykonanie) {
    let id = null;
    if(rowWykonanie.technologia_id==null){
      id= rowWykonanie.id
    }
    if(rowWykonanie.technologia_id>1){
      id= rowWykonanie.global_id
    }
    sessionStorage.setItem("id_wykonanie_drag", id);
    sessionStorage.setItem("typ_drag", "wykonanie");
    sessionStorage.setItem("id_proces_wykonanie_drag", rowWykonanie.proces_id);
    sessionStorage.setItem("id_grupa_wykonanie_drag", rowWykonanie.grupa_id);
  }
}

