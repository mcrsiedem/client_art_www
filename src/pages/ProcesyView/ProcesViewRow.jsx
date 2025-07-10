import React, { useState, useEffect, useRef, useContext } from "react";


import icon from "assets/copy.svg";
import iconCopy from "assets/info.svg";
import iconRolka from "assets/rolka.svg";
import iconArkusz from "assets/sheet2.svg";

import iconAdd from "assets/add4.svg";


import { _etap_plikow, _status_wydania_papieru, _typ_elementu, reg_int } from "utils/initialvalue";
// import NrArkusza from "./NrArkusza";
// import { reg_int } from "utils/initialvalue";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./ProcesViewRow.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeader from "./ProcesyHeader";
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
import { useAccess } from "hooks/useAccess";
import { getZamowieniaInfo } from "actions/getZamowieniaInfo";
import { getZamowieniaInfoGrupy } from "actions/getZamowieniaInfoGrupy";



export default function ProcesViewRow({ grup,unlockTable, setUnlockTable,i }) {
    const navigate = useNavigate();
    const techContext = useContext(TechnologyContext);
    const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
    const wykonaniaAll = techContext.wykonaniaAll;
    const appcontext = useContext(AppContext);
    const typ_elementu = appcontext.typ_elementu;
  const selectedProces = techContext.selectedProces;
   const grupyWykonanAll = techContext.grupyWykonanAll;
  const selectedProcesor = techContext.selectedProcesor;
        const setGrupWykonanAll = techContext.setGrupWykonanAll;

      const fechparametryTechnologii = techContext.fechparametryTechnologii;
        const [expand, setExpand] = useState(false);
        const [wolno] = useAccess(false);



  const druk_alert = (grup) => {
  // let data_spedycji_init = new Date(grup.data_spedycji+ " 06:00")

  let data_alert = new Date(grup.data_spedycji+ " 06:00")
    let poczatek = new Date(grup.poczatek)
    // let czas = parseInt(grup.czas) + (72*60) -360
    let czas = parseInt(grup.czas) + (72*60) 

   data_alert.setMinutes(data_alert.getMinutes() - czas)

      let  month = '' + (data_alert.getMonth() + 1),
        day = '' + data_alert.getDate(),
        year = data_alert.getFullYear();
        let  h =  data_alert.getHours();
       let m = data_alert.getMinutes();
               if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    if (h < 10) 
        h = '0' + h;
    if (m < 10) 
        m = '0' + m;

    if(poczatek> data_alert){
      return true
    }
          //  return [year, month, day].join('-').concat(" ").concat([h,m].join(':')); 
          //  return czas
  }


// const papier_postac_name = id =>{
//   if (id == 1 )  return "A"
//   if (id == 2 )  return (      <img
//     className={style.zamknij_icon}
//      src={iconRolka}
//     />)

// }


          const selectColor = (etapPlikow,status) =>{

            //druk
            if(grup.proces_nazwa_id ==1){
if (grup.select==true) return style.procesRow_select

                          if (status==4 ) return style.procesRow_tr_DRUK
            // if (status==2) return style.procesRow_tr_RIP
    if (etapPlikow==1 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==2 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==3 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==4 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==5 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==6 && selectedProces==1) return style.procesRow_tr_RIP
    if (etapPlikow==7 && selectedProces==1) return style.procesRow_tr_ZAS
       if (etapPlikow==8 && selectedProces==1 && status ==4) return style.procesRow_tr_DRUK
    if (etapPlikow==8 && selectedProces==1) return style.procesRow_tr_RIP
 
     return style.procesRow_tr
            }


            //wszystko poza drukiem
            if(grup.proces_nazwa_id !=1){
                          if (status==4 ) return style.procesRow_tr_DRUK
            if (status==2) return style.procesRow_tr_RIP
            if (status==3) return style.procesRow_tr_RIP
    if (etapPlikow==1 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==2 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==3 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==4 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==5 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==6 && selectedProces==1) return style.procesRow_tr_RIP
    if (etapPlikow==7 && selectedProces==1) return style.procesRow_tr_ZAS
       if (etapPlikow==8 && selectedProces==1 && status ==4) return style.procesRow_tr_DRUK
    if (etapPlikow==8 && selectedProces==1) return style.procesRow_tr_RIP
 
if (grup.select) return style.procesRow_select

     return style.procesRow_tr
            }




  }

  return (
<>
                <tr
                  title={"Grupa id: " +grup.global_id + " Prędkość : "+grup.predkosc+" ark/h "+" Przeloty: "+ grup.przeloty +" ark." }
                  draggable={wolno()}
                  key={grup.global_id}


          //-------------------------------------------

        onMouseDown={(event) => {


          if (event.shiftKey) {
            let indeks_start = sessionStorage.getItem("indeks_start")
            let indeks_stop = i
                setGrupWykonanAll( grupyWykonanAll
                              .filter(
                // (x) => x.procesor_id == selectedProcesor && x.typ_grupy < 3
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
      .map((t,indeks) => {
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
      // .map(x => {return { ...x, select: false}})
      .map((t,indeks) => {
        if (t.global_id == grup.global_id) {
          return { ...t, select: !t.select};
        } else {
          return t;
        }
      })
    );
         }


          sessionStorage.setItem("indeks_start",i)

          }}

          //-------------------------------------------



                  onDrop={()=> {
                      if(wolno()){
                        handleDrop(grup.global_id,grup.procesor_id)
                      }
                  }
                  }
                  onDragOver={    handleDragOver                          }
          
                  onDragStart={() => {

                    if(wolno()){
                      handleDragStart(grup.global_id,grup.typ_grupy)
                    }
                               
                  }}
                 className={selectColor(grup.zamowienia_pliki_etap,grup.status) }
                  onDoubleClick={(node, event) => {
         
                      if(grup.typ_grupy != 1 ){
                        fechparametryTechnologii(grup.zamowienie_id,grup.technologia_id)
                      }
                    
                  }}
                >
                  <td className={druk_alert(grup) ? style.td_tableProcesy_poczatek_alert: style.td_tableProcesy_poczatek}>{grup.poczatek}</td>
                  <td className={style.td_tableProcesy_czas}>{zamienNaGodziny(  grup.czas) } </td>
                  <KoniecGrupa grup={grup}/>
                  <td className={style.td_tableProcesy_nr_stary}>{selectedProces==3? grup.rodzaj_procesu:typ_elementu?.filter(x => x.id == grup.typ_elementu)[0]?.skrot} </td>
                  <td className={style.td_tableProcesy_nr_stary}>{grup.nr_stary} </td>
                  <td className={style.td_tableProcesy_nr}>{grup.nr} / {grup.rok.substring(2,4)}</td>
                  <td className={style.td_tableProcesy_klient}>{grup.klient}</td>
                  {/* <td className={style.td_tableProcesy_klient}>{druk_alert(grup)}</td> */}
                  <TytulProcesGrup grup={grup}/>
                  {/* <td style={{minWidth: "130px"}}> {grup.uwagi}</td> */}
                  <DyspersjaGrupa grup={grup}/>
                  <td className={style.td_tableProcesy_przeloty}>{grup.naklad} </td>
                  <td className={style.td_tableProcesy_spedycja}>{grup.data_spedycji}</td>
                   {/* <td className={style.td_tableProcesy_przeloty}>{grup.narzad} </td> */}
                  <td className={style.td_tableProcesy_przeloty}>{grup.przeloty} </td>
                  <Papier grup={grup}/>
                  {grup.typ_grupy != 1 && selectedProces==1?  <WydaniePapieruStatus grup={grup}/> : <></>}
                  {grup.typ_grupy != 1 && selectedProces==1?  <Etap grup={grup}/> : <></>}
                  {grup.typ_grupy != 1 ?  <Status grup={grup}/> :  <Status grup={grup}/>}
                  {/* <SelectBox grup={grup}/> */}
                  <td></td>
                 
                </tr>
                {expand ? (
                wykonaniaAll
                .filter((el) => el.grupa_id == grup.id && el.technologia_id == grup.technologia_id && grup.typ_grupy!=3)
                .map((row) => {
                  return (
                    <tr  key={row.global_id}>
                      <td></td>
                      <td>{row.czas}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })
            ) : (<></>)}   
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

const DyspersjaGrupa = ({ grup }) => {
const dyspersja = [2,3,5,6,12,13]
const uv = [15,17]


if(uv.includes(parseInt(grup.global_proces_id)))
{
   return (
    <td title="Klisza" className={style.td_tableProcesy_dyspersja}>K </td>)

   }

if(dyspersja.includes(parseInt(grup.global_proces_id)))
{
   return (
    <td title="Dyspersja" className={style.td_tableProcesy_nr_stary}>D </td>)

}else {
  return( <td className={style.td_tableProcesy_nr_stary}> </td>)
}
 
 
};




const Papier = ({ grup }) => {
const dyspersja = [2,3,5,6,12,13]
const uv = [15,17]

if(grup.papier_postac_id == 2 && grup.typ_grupy !=1 )

return(
                    <td title={grup.powleczenie+" Bulk:"+grup.bulk} className={style.td_tableProcesy_papier}><img
    className={style.icon_rolka}
     src={iconRolka}
     title="Rola"
    />  { grup.arkusz_szerokosc+"x"+grup.arkusz_wysokosc+" "+grup.nazwa_papieru+ " "+grup.gramatura+" "+grup.wykonczenie}</td>
)


if(grup.papier_postac_id == 1 && grup.typ_grupy !=1 )

return(
                    <td title={grup.powleczenie+" Bulk:"+grup.bulk} className={style.td_tableProcesy_papier}> <img
    className={style.icon_rolka}
     src={iconArkusz}
     title="Arkusz"
    />  { grup.arkusz_szerokosc+"x"+grup.arkusz_wysokosc+" "+grup.nazwa_papieru+ " "+grup.gramatura+" "+grup.wykonczenie}</td>
)
 
 
};



function SelectBox({ grup }) {
  const appContext = useContext(AppContext);
  const zamowienia = appContext.zamowienia;
  const setZamowienia = appContext.setZamowienia;
   const techContext = useContext(TechnologyContext);
    const grupyWykonanAll = techContext.grupyWykonanAll;
    const setGrupWykonanAll = techContext.setGrupWykonanAll;
    

  return (
    <td className={style.td_tableProcesy_ch_box}>
      <div>
        <input
        className={style.ch_box}
          type="checkbox"
          checked={grup.select}
          onChange={(event) => {
            console.log(" select" + grup.global_id + " " + event.target.checked);
            setGrupWykonanAll(
              grupyWykonanAll.map((t) => {
                if (t.global_id == grup.global_id) {
                  return { ...grup, select: event.target.checked };
                } else {
                  return t;
                }
              })
            );
          }}
        ></input>
      </div>
    </td>
  );
}

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
              //druk
              if(grup.proces_nazwa_id ==1){
    if (status==4) return style.select_DRUK
    if (etap==1) return style.select
    if (etap==2) return style.select
    if (etap==3) return style.select
    if (etap==4) return style.select_AKCEPT
    if (etap==5) return style.select_AKCEPT
    if (etap==6) return style.select_RIP
    if (etap==7) return style.select_ZAS
      if (etap==8) return style.select_DRUK
     return style.procesRow_tr
              }

              //wsystko poza drukierm
              if(grup.proces_nazwa_id !=1){
    if (status==4) return style.select_DRUK
    if (status==2) return style.select_RIP
    if (status==3) return style.select_RIP
    // if (etap==1) return style.select
    // if (etap==2) return style.select
    // if (etap==3) return style.select
    // if (etap==4) return style.select_AKCEPT
    // if (etap==5) return style.select_AKCEPT
    // if (etap==6) return style.select_RIP
    // if (etap==7) return style.select_ZAS
    //   if (etap==8) return style.select_DRUK
     return style.select
              }




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





function WydaniePapieruStatus({grup}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const zamowieniaPliki = contextApp.zamowieniaPliki
  const setZamowieniaPliki = contextApp.setZamowieniaPliki

  const fechGrupyAndWykonaniaForProcesor_dni_wstecz = techContext.fechGrupyAndWykonaniaForProcesor_dni_wstecz
  const grupyWykonanAll = techContext.grupyWykonanAll
  const setGrupWykonanAll = techContext.setGrupWykonanAll
  const selectedProcesor = techContext.selectedProcesor
  const dniWstecz = techContext.dniWstecz

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

  if(grup.wydanie_papieru_status ==null){
return (<td className={style.td_tableProcesy_papier_wydanie}>        <div>
        {DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1 ?  <img
            className={style.iconSettings}
            src={iconAdd}
            onClick={async() => {
             await axios.post(IP + "insertWydaniePapieru_status/" + sessionStorage.getItem("token"), {global_id_grupa:grup.global_id,status:2});
            fechGrupyAndWykonaniaForProcesor_dni_wstecz(selectedProcesor,dniWstecz)

            }}
            alt="Procesy"
          />:<></>}
         
        </div></td>)
  } else {
      return (
<td className={style.td_tableProcesy_pliki}>
      <select
        className={selectColor(grup.zamowienia_pliki_etap,grup.status) }
        value={grup?.wydanie_papieru_status || 1}
        onChange={async(event) => {
const res1 = await axios.put(IP + "updateWydaniePapieru_status/" + sessionStorage.getItem("token"), {global_id_grupa:grup.global_id,status:event.target.value});
            // etapPlikowGrupyWykonan(event.target.value,grup)
          // dodajDoZamowienia(         {
          //   kategoria: "Pliki",
          //   event: _typ_elementu.filter(x=> x.id == grup.element_id)[0]?.nazwa+ " "+grup.nazwa+" - zmiana z "+getNameOfEtapPliki(grup.zamowienia_pliki_etap)+ " na "+getNameOfEtapPliki(event.target.value),
          //   zamowienie_id: grup.zamowienie_id,
          //   user_id: DecodeToken(sessionStorage.getItem("token")).id

          // })

          fechGrupyAndWykonaniaForProcesor_dni_wstecz(selectedProcesor,dniWstecz)
        

        }}
      >
        {_status_wydania_papieru.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
      </td>

  );
  }
}

function WYDANIE_BTN({
  row,
  showKartaTechnologiczna,
  setShowKartaTechnologiczna,
}) {
  const techContext = useContext(TechnologyContext);

  const fechparametryTechnologii = techContext.fechparametryTechnologii;
 
    const setShowProcesy = techContext.setShowProcesy;


  if (row.wydanie_papieru_status == null ) {
    return (
      <td className={style.td_karta}>
        <div>
        {DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1 ?  <img
            className={style.iconSettings}
            src={iconAdd}
            onClick={() => {
        

            }}
            alt="Procesy"
          />:<></>}
         
        </div>
      </td>
    );
  } else {
    return (
      <td className={style.td_karta}>




      </td>
    );
  }
}


function Etap({grup}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const zamowieniaPliki = contextApp.zamowieniaPliki
  const setZamowieniaPliki = contextApp.setZamowieniaPliki

  const fechGrupyAndWykonaniaForProcesor_dni_wstecz = techContext.fechGrupyAndWykonaniaForProcesor_dni_wstecz
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const grupyWykonanAll = techContext.grupyWykonanAll
  const setGrupWykonanAll = techContext.setGrupWykonanAll
  const selectedProcesor = techContext.selectedProcesor
  const dniWstecz = techContext.dniWstecz

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
    if (etap==7) return style.select_ZAS
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
            etapPlikowGrupyWykonan(event.target.value,grup)
          dodajDoZamowienia(         {
            kategoria: "Pliki",
            event: _typ_elementu.filter(x=> x.id == grup.element_id)[0]?.nazwa+ " "+grup.nazwa+" - zmiana z "+getNameOfEtapPliki(grup.zamowienia_pliki_etap)+ " na "+getNameOfEtapPliki(event.target.value),
            zamowienie_id: grup.zamowienie_id,
            user_id: DecodeToken(sessionStorage.getItem("token")).id

          })

          fechGrupyAndWykonaniaForProcesor_dni_wstecz(selectedProcesor,dniWstecz)
          // fechGrupyAndWykonaniaForProcesor(selectedProcesor);
        

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

