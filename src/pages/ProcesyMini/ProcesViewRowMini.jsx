import React, { useState, useEffect, useRef, useContext } from "react";


import icon from "assets/copy.svg";



import { _etap_plikow, _typ_elementu, reg_int } from "utils/initialvalue";
// import NrArkusza from "./NrArkusza";
// import { reg_int } from "utils/initialvalue";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./ProcesViewRowMini.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeader from "./ProcesyHeaderMini";
import { _status } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { dragDropProcesGrupa } from "actions/dragDropProcesGrupa";
import { dragDropProcesGrupaToProcesor } from "actions/dragDropProcesGrupaToProcesor";
import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";
import { updateWykonaniaOrazGrupaFromProcesView } from "actions/updateWykonaniaOrazGrupaFromProcesView";
import { updateAddPrzerwa } from "actions/updateAddPrzerwa";
import { date_time } from "actions/date_time";
import { updateZmienCzasTrwaniaGrupy } from "actions/updateZmienCzasTrwaniaGrupy";
import { usePliki } from "hooks/usePliki";
import { useHistoria } from "hooks/useHistoria";
import { getNameOfEtapPliki } from "actions/getNameOfEtapPliki";
import DecodeToken from "pages/Login/DecodeToken";
import { useGrupyWykonan } from "hooks/useGrupyWykonan";



export default function ProcesViewRowMini({ grup,unlockTable, setUnlockTable }) {
    const navigate = useNavigate();
    const techContext = useContext(TechnologyContext);
    const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
    const wykonaniaAll = techContext.wykonaniaAll;
    const appcontext = useContext(AppContext);
    const typ_elementu = appcontext.typ_elementu;
  const selectedProces = techContext.selectedProces;
      const fechparametryTechnologii = techContext.fechparametryTechnologii;
        const [expand, setExpand] = useState(false);
          const selectColor = (etapPlikow,status) =>{
            if (status==4 ) return style.procesRow_tr_DRUK
    if (etapPlikow==1 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==2 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==3 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==4 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==5 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==6 && selectedProces==1) return style.procesRow_tr_RIP
    if (etapPlikow==7 && selectedProces==1) return style.procesRow_tr_RIP
       if (etapPlikow==8 && selectedProces==1 && status ==4) return style.procesRow_tr_DRUK
    if (etapPlikow==8 && selectedProces==1) return style.procesRow_tr_RIP
 

     return style.procesRow_tr
  }

  return (
<>
                <tr
                  title={"Grupa id: " +grup.global_id + " Prędkość : "+grup.predkosc+" ark/h "+" Przeloty: "+ grup.przeloty +" ark." }
                  draggable={unlockTable}
                   key={grup.global_id}
                  onDrop={()=>handleDrop(grup.global_id,grup.procesor_id)}
                 onDragOver={handleDragOver}
                  
                  onDragStart={() => {
                
                      handleDragStart(grup.global_id,grup.typ_grupy)
            
                    
                  }}
                 className={selectColor(grup.zamowienia_pliki_etap,grup.status) }
                  onDoubleClick={(node, event) => {
         
                      if(grup.typ_grupy != 1 ){
                        fechparametryTechnologii(grup.zamowienie_id,grup.technologia_id)
                      }
                    
                  }}
                >
                  <td className={style.td_tableProcesy_poczatek}>{grup.poczatek}</td>
                  <td className={style.td_tableProcesy_czas}>{zamienNaGodziny(  grup.czas) } </td>
                  {/* <KoniecGrupa grup={grup}/> */}
            
                  {/* <td style={{minWidth: "130px",width: "140px"}}>{grup.koniec} </td> */}
                  <td className={style.td_tableProcesy_typ}>{typ_elementu?.filter(x => x.id == grup.typ_elementu)[0]?.skrot}</td>
                  <td className={style.td_tableProcesy_nr_stary}>{grup.nr_stary} </td>
                  <td className={style.td_tableProcesy_nr}>{grup.nr} / {grup.rok.substring(2,4)}</td>
                  <td className={style.td_tableProcesy_klient}>{grup.klient}</td>
                  <TytulProcesGrup grup={grup}/>
                  {/* <td style={{minWidth: "130px"}}> {grup.uwagi}</td> */}
                  {/* <td className={style.td_tableProcesy_spedycja}>{grup.data_spedycji}</td> */}
                  {/* <td className={style.td_tableProcesy_przeloty}>{grup.przeloty} </td> */}
                  {/* <td style={{minWidth: "130px"}}>{grup.predkosc}</td> */}
                  {/* <td title={grup.powleczenie+" Bulk:"+grup.bulk} className={style.td_tableProcesy_papier}>{grup.typ_grupy !=1 ? (grup.arkusz_szerokosc+"x"+grup.arkusz_wysokosc+" "+grup.nazwa_papieru+ " "+grup.gramatura+" "+grup.wykonczenie):(" ")}</td> */}
                  {/* {grup.typ_grupy != 1 && selectedProces==1?  <Etap grup={grup}/> : <></>} */}
                  {/* {grup.typ_grupy != 1 ?  <Status grup={grup}/> :  <Status grup={grup}/>} */}
                   {/* <Status grup={grup}/> */}
                  <td></td>

                  
                 
                </tr>
                {expand ? (
              wykonaniaAll
                .filter((el) => el.grupa_id == grup.id && el.technologia_id == grup.technologia_id && grup.typ_grupy!=3)
                .map((row) => {
                  return (
                    <tr  key={row.global_id}>
                       {/* draggable={lockDragDrop}  onDragStart={()=>handleDragStart(row.id)} */}
      
                      <td></td>
                      <td>{row.czas}</td>
                      {/* <td> global id {row.global_id}</td> */}
                      {/* <td>element_id {row.element_id}</td> */}
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      {/* <td>grupa_id {row.grupa_id}</td> */}
                      <td></td>
                      <td></td>
                      <td></td>
                   
           
                      
                 
                    </tr>
                  );
                })
            ) : (
              <></>
            )}   



</>
  );


  //--------------- Funkcje
  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "grupa_proces") {
      let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
      let id_drop_grupa_proces = id;
      dragDropProcesGrupa(
        id_drag_grupa_proces,
        id_drop_grupa_proces,
        fechGrupyAndWykonaniaForProcesor
      );
    }

    if (sessionStorage.getItem("typ_drag") == "przerwa") {
      let czas = sessionStorage.getItem("czas_przerwy");
      updateAddPrzerwa(id, czas,fechGrupyAndWykonaniaForProcesor);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragStart(id, typ_grupy) {
    sessionStorage.setItem("id_grupa_proces_drag", id);
    sessionStorage.setItem("typ_drag", "grupa_proces");
    sessionStorage.setItem("typ_grupy", typ_grupy);
  }
//----------------- 


}

const TytulProcesGrup = ({ grup }) => {

  //nazwa_elementu
  return (
    <td>
    <input
      //firma_nazwa to skrocona nazwa klienta
      title={grup.Praca}
      className={style.tytulInput}
      value={grup.tytul +' '+grup.nazwa_elementu}
      readOnly

    />
    </td>
  );
};




const KoniecGrupa = ({ grup }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie;
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  return (
        <td className={style.td_tableProcesy_koniec}>

      <input
        disabled= {false}
        className={style.input2}
        type="datetime-local"
  //        min="2023-06-07T00:00"
  // max="2023-06-14T00:00"
       
        date-
        value={grup.koniec}
        onChange={(e) => {


          if (e.target.value != "" ) {
updateZmienCzasTrwaniaGrupy(grup.global_id,date_time( e.target.value),fechGrupyAndWykonaniaForProcesor)
            // console.log("data: "+ date_time( e.target.value))
          }
        }}
      ></input>
    </td>
  );
};


function Status({grup}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const selectedProcesor = techContext.selectedProcesor
 const [sumujGrupe,statusGrupyProcesView,statusGrupyTechnologia,statusGrupyProcesViewPrzerwa] = useGrupyWykonan()
            const selectColor = (etap,status) =>{
    if (status==4) return style.select_DRUK
    if (etap==1) return style.select
    if (etap==2) return style.select
    if (etap==3) return style.select
    if (etap==4) return style.select_AKCEPT
    if (etap==5) return style.select_AKCEPT
    if (etap==6) return style.select_RIP
    if (etap==7) return style.select_RIP
      if (etap==8) return style.select_DRUK
     return style.procesRow_tr
  }
  return (
<td className={style.td_tableProcesy_pliki}>

      <select
       className={selectColor(grup.zamowienia_pliki_etap,grup.status) }
        value={grup.status}
        onChange={(event) => {
          if(grup.typ_grupy!=1){
            statusGrupyProcesView({...grup, status: event.target.value})
          }
                if(grup.typ_grupy==1){
                  //przerwa
            statusGrupyProcesViewPrzerwa({...grup, status: event.target.value})
          }
          // updateWykonaniaOrazGrupaFromProcesView(grup.global_id,1,event.target.value,fechGrupyAndWykonaniaForProcesor,selectedProcesor)
        }}
      >
        {_status_wykonania.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
      </td>

  );
}

function Stan({grup}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);

  const _stan_wykonania = contextApp._stan_wykonania
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const selectedProcesor = techContext.selectedProcesor
  return (
<td style={{width: "100px"}}>
      <select
        className={style.select}
        value={grup.stan}
        onChange={(event) => {
          // setSelectedProcesor(event.target.value)
          updateWykonaniaOrazGrupaFromProcesView(grup.global_id,2,event.target.value,fechGrupyAndWykonaniaForProcesor,selectedProcesor)

        }}
      >
        {_stan_wykonania
        //  .filter(x => x.grupa == selectedProces )
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
</td>
  );
}




function Etap({grup}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const zamowieniaPliki = contextApp.zamowieniaPliki
  const setZamowieniaPliki = contextApp.setZamowieniaPliki

  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const grupyWykonanAll = techContext.grupyWykonanAll
  const setGrupWykonanAll = techContext.setGrupWykonanAll
  const selectedProcesor = techContext.selectedProcesor

  const [etapPlikow,etapPlikowGrupyWykonan] = usePliki()
      const [add,dodajDoZamowienia] = useHistoria()
            const selectColor = (etap,status) =>{
                 if (status==4) return style.select_DRUK
    if (etap==1) return style.select
    if (etap==2) return style.select
    if (etap==3) return style.select
    if (etap==4) return style.select_AKCEPT
    if (etap==5) return style.select_AKCEPT
    if (etap==6) return style.select_RIP
    if (etap==7) return style.select_RIP
    if (etap==8 && status==4) return style.select_DRUK
    if (etap==8 ) return style.select_RIP
     return style.procesRow_tr
  }

  return (
<td className={style.td_tableProcesy_pliki}>
      <select
        className={selectColor(grup.zamowienia_pliki_etap,grup.status) }
        value={grup.zamowienia_pliki_etap}
        onChange={(event) => {
          //etap pliku z zakresu brak do naświetlenia
          // if(event.target.value <8){
            etapPlikowGrupyWykonan(event.target.value,grup)

          dodajDoZamowienia(         {
            kategoria: "Pliki",
            event: _typ_elementu.filter(x=> x.id == grup.element_id)[0]?.nazwa+ " "+grup.nazwa+" - zmiana z "+getNameOfEtapPliki(grup.zamowienia_pliki_etap)+ " na "+getNameOfEtapPliki(event.target.value),
            zamowienie_id: grup.zamowienie_id,
            user_id: DecodeToken(sessionStorage.getItem("token")).id

          })

          // setGrupWykonanAll(grupyWykonanAll.map((t) => {
          //   if (t.global_id == grup.global_id  ) {
          //     return {...t,
          //       zamowienia_pliki_etap: event.target.value
          //     }
          //   } else {
          //     return t;
          //   }
          // }))
          fechGrupyAndWykonaniaForProcesor(selectedProcesor)

          // updateWykonaniaOrazGrupaFromProcesView(grup.global_id,1,event.target.value,fechGrupyAndWykonaniaForProcesor,selectedProcesor)
        
          // }

        }}
      >
        {_etap_plikow.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
      </td>

  );
}

function EtapKolor({grup}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const zamowieniaPliki = contextApp.zamowieniaPliki
  const setZamowieniaPliki = contextApp.setZamowieniaPliki

  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const selectedProcesor = techContext.selectedProcesor
  const grupyWykonanAll = techContext.grupyWykonanAll
  const setGrupWykonanAll = techContext.setGrupWykonanAll
  const [etapPlikow] = usePliki()
      const [add,dodajDoZamowienia] = useHistoria()
            const selectColor = (etap) =>{
    if (etap==1) return style.select
    if (etap==2) return style.select
    if (etap==3) return style.select
    if (etap==4) return style.select_AKCEPT
    if (etap==5) return style.select_AKCEPT
    if (etap==6) return style.select_RIP
    if (etap==7) return style.select_RIP
    if (etap==8) return style.select_DRUK
     return style.select
  }

  return (
<td style={{width: "160px"}}>
      <select
        className={selectColor(grup.zamowienia_pliki_etap) }
        // value={grup.zamowienia_pliki_etap}
        onChange={(event) => {
          //etap pliku z zakresu brak do naświetlenia
          // if(event.target.value <8){
          etapPlikow(event.target.value,grup)

          // dodajDoZamowienia(         {
          //   kategoria: "Pliki",
          //   event: _typ_elementu.filter(x=> x.id == grup.element_id)[0]?.nazwa+ " "+grup.nazwa+" - zmiana z "+getNameOfEtapPliki(grup.zamowienia_pliki_etap)+ " na "+getNameOfEtapPliki(event.target.value),
          //   zamowienie_id: grup.zamowienie_id,
          //   user_id: DecodeToken(sessionStorage.getItem("token")).id

          // })

          setGrupWykonanAll(grupyWykonanAll.map((t) => {
            if (t.global_id == grup.global_id  ) {
              return {...t,
                zamowienia_pliki_etap: event.target.value
              }
            } else {
              return t;
            }
          }))
          // fechGrupyAndWykonaniaForProcesor(selectedProcesor)
          // updateWykonaniaOrazGrupaFromProcesView(grup.global_id,1,event.target.value,fechGrupyAndWykonaniaForProcesor,selectedProcesor)
        
          // }

        }}
      >
        {_etap_plikow.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
      </td>

  );
}