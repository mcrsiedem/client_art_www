import React, { useState, useContext } from "react";
import { _etap_plikow, _status_wydania_papieru, _typ_elementu } from "utils/initialvalue";
import style from "./ProcesViewRow.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";
import { useAccess } from "hooks/useAccess";
import { useContextMenuHandler } from "./useContextMenuHandler";
import ProcesRowDetails from "components/ProcesRowDetails/ProcesRowDetails";
import Papier from "./components/Papier";
import AddDostepnoscPapieruInfo from "./components/addDostepnoscPapieruInfo/AddDostepnoscPapieruInfo";
import Czas from "./components/Czas";
import TytulProcesGrup from "./components/TytulProcesGrup";
import DyspersjaGrupa from "./components/DyspersjaGrupa";
import Etap from "./components/Etap";
import WydaniePapieruStatus from "./components/WydaniePapieruStatus";
import Status from "./components/Status";
import { selectColor } from "./components/actions/selectColor";
import { useDragDrop } from "./components/actions/useDragDrop";
import Poczatek from "./components/Poczatek";
import Koniec from "./components/Koniec";
import Dzien from "./components/Dzien";
import Nr from "./components/Nr";
import Element from "./components/Element";
import Klient from "./components/Klient";
import Naklad from "./components/Naklad";
import Spedycja from "./components/Spedycja";
import Przeloty from "./components/Przeloty";
import Narzady from "./components/Narzady";
import NaswietleniaIlosc from "./components/NaswietleniaIlosc";
import { onMouseDownHandler } from "./components/actions/onMouseDownHandler";
import NaswietleniaPane from "./components/NaswietleniaPane/NaswietleniaPane";
import { ModalInsertContext } from "context/ModalInsertContext";


export default function ProcesViewRow({ grup,i }) {
    const techContext = useContext(TechnologyContext);
    const appcontext = useContext(AppContext);
    const selectedProces = techContext.selectedProces;
    const grupyWykonanAll = techContext.grupyWykonanAll;
    const selectedProcesor = techContext.selectedProcesor;
    const setGrupWykonanAll = techContext.setGrupWykonanAll;
    const fechparametryTechnologii = techContext.fechparametryTechnologii;
    const [show, setShow] = useState(false);
    const [value, setValue] = useState();
    const [wolno] = useAccess(false);
    const [onContextMenuHanlder] = useContextMenuHandler(false);
    const {handleDrop,handleDragOver,handleDragStart} = useDragDrop(false);
    const [showNaswietlenia, setShowNaswietlenia] = useState(false);


      const contextModalInsert = useContext(ModalInsertContext);
    
    const setSelectedZamowienie = contextModalInsert.setSelectedZamowienie;


  return (
<>
    <tr
      title={"Grupa global_id: " +grup.global_id + "Grupa id: " +grup.id +" Prędkość : "+grup.predkosc+" ark/h "+" Przeloty: "+ grup.przeloty +" ark."+" technologia_id" + grup.technologia_id +" Status" + grup.status +" Oprawa główna: "+appcontext.procesList?.filter(x => x.id == grup.oprawa_produktu)[0]?.typ }
      draggable={wolno()}
      key={grup.global_id}
      onMouseDown={(event) => { onMouseDownHandler(event,grupyWykonanAll,setGrupWykonanAll,selectedProcesor,grup,i)}}
      onDrop={()=> {if(wolno()){handleDrop(grup.global_id,grup.procesor_id)}}}
      onDragOver={handleDragOver}
      onContextMenu={(event) => onContextMenuHanlder(event,grup)}
      onDragStart={() => {if(wolno()){handleDragStart(grup.global_id,grup.typ_grupy)} }}
      className={selectColor(grup.zamowienia_pliki_etap,grup.status,grup.korekta_zamowienia_alert,grup,style,selectedProces) }
      onDoubleClick={() => {if(grup.typ_grupy != 1 ){fechparametryTechnologii(grup.zamowienie_id,grup.technologia_id)}}}
            onClick={(node, e) => {
          setSelectedZamowienie({ ...grup,id:grup.zamowienie_id, i }); // aby można było odtworzyć zamówienie w zleceniu 
        }}
    >
      <Dzien grup={grup} style={style}/>
      <Poczatek grup={grup}/>
      <Czas grup={grup}/>
      <Koniec grup={grup}/>
      <Nr grup={grup}/>
      <Element grup={grup} selectedProces={selectedProces} procesList={appcontext.procesList} typ_elementu={appcontext.typ_elementu}/>
      <Klient grup={grup}/>
      <TytulProcesGrup grup={grup}/>
      <DyspersjaGrupa grup={grup}/>
      <Naklad grup={grup}/>
      <Spedycja grup={grup}/>
      <Przeloty grup={grup}/>
      <Narzady grup={grup}/>
      <Papier setShow={setShow} grup={grup}/>
      {grup.typ_grupy != 1 && selectedProces==1?  <WydaniePapieruStatus grup={grup}/> : <></>}
      {grup.typ_grupy != 1 && selectedProces==1?  <NaswietleniaIlosc grup={grup}/> : <></>}
      {grup.typ_grupy != 1 && selectedProces==1?  <Etap grup={grup} setShowNaswietlenia={setShowNaswietlenia}/> : <></>}
      {grup.typ_grupy != 1 && selectedProces==1?  <></> :  <Status grup={grup}/>}
      <td></td>
      
    </tr>
    <ProcesRowDetails grup={grup}  mini={false}/>
    <AddDostepnoscPapieruInfo show={show} setShow={setShow} value={value} setValue={setValue} grup={grup}/>
    <NaswietleniaPane showNaswietlenia={showNaswietlenia} setShowNaswietlenia={setShowNaswietlenia} />

</>
  );

}









