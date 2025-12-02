import React, { useState, useContext } from "react";
import { _etap_plikow, _status_wydania_papieru, _typ_elementu } from "utils/initialvalue";
import style from "./ProcesViewRow.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";
import { useAccess } from "hooks/useAccess";
import { formatujDatePoPolsku } from "actions/formatujDatePoPolsku";
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


export default function ProcesViewRow({ grup,i }) {
    const techContext = useContext(TechnologyContext);
    const appcontext = useContext(AppContext);
    const typ_elementu = appcontext.typ_elementu;
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
    

  return (
<>
                <tr
                  title={"Grupa global_id: " +grup.global_id + "Grupa id: " +grup.id +" Prędkość : "+grup.predkosc+" ark/h "+" Przeloty: "+ grup.przeloty +" ark."+" technologia_id" + grup.technologia_id +" Status" + grup.status +" Oprawa główna: "+appcontext.procesList?.filter(x => x.id == grup.oprawa_produktu)[0]?.typ }
                  draggable={wolno()}
                  key={grup.global_id}
          //-------------------------------------------
        onMouseDown={(event) => {
          if (event.shiftKey) {
            let indeks_start = sessionStorage.getItem("indeks_start")
            let indeks_stop = i
                setGrupWykonanAll( grupyWykonanAll
                              .filter(
                (x) => x.procesor_id == selectedProcesor 
              )          

      .map(x => {return { ...x, select: false}})
      .map((t,indeks) => {
        if (indeks >= indeks_start && indeks<= indeks_stop ) {
          return { ...t, select: true};
        } else {
          return t;
        }
      })  );
          }else{
      setGrupWykonanAll(
      grupyWykonanAll
      .map(x => {return { ...x, select: false}})
      .map((t) => {
        if (t.global_id == grup.global_id) {
          return { ...t, select: true};
        } else {
          return t;
        }
      })
    );
         }

                              if (event.ctrlKey) {
                            setGrupWykonanAll(
      grupyWykonanAll
      .map((t) => {
        if (t.global_id == grup.global_id) {
          return { ...t, select: !t.select};
        } else {
          return t;
        }
      })
    );
         }

          sessionStorage.setItem("indeks_start",i)
          sessionStorage.setItem("row_global_id",grup.global_id)
          sessionStorage.setItem("selectedProcesor",selectedProcesor)

          }}

          //-------------------------------------------
                  onDrop={()=> {if(wolno()){handleDrop(grup.global_id,grup.procesor_id)}}}
                  onDragOver={    handleDragOver                          }
                  onContextMenu={(event) => onContextMenuHanlder(event,grup)}
                  onDragStart={() => {                    if(wolno()){                      handleDragStart(grup.global_id,grup.typ_grupy)                    } }}
                  className={selectColor(grup.zamowienia_pliki_etap,grup.status,grup.korekta_zamowienia_alert,grup,style,selectedProces) }
                  onDoubleClick={() => {if(grup.typ_grupy != 1 ){fechparametryTechnologii(grup.zamowienie_id,grup.technologia_id)}}}
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
                  {grup.typ_grupy != 1 && selectedProces==1?  <Etap grup={grup}/> : <></>}
                  {grup.typ_grupy != 1 && selectedProces==1?  <></> :  <Status grup={grup}/>}
                  <td></td>
                 
                </tr>
                  <ProcesRowDetails grup={grup}  mini={false}/>
                  <AddDostepnoscPapieruInfo show={show} setShow={setShow} value={value} setValue={setValue} grup={grup}/>
</>
  );



}









