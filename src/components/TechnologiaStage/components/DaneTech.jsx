import style from "./DaneTech.module.css";
import { useContext} from "react";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status_dokumentu,_stan_dokumentu,_etapy_produkcji,_vat,_waluta,_rodzaj,_fsc,_stan_technologi,_status_technologi } from "utils/initialvalue";
// import addIcon2 from "../../../assets/addIcon2.svg";
import { PreOrderContext } from "context/PreOrderContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import DecodeToken from "pages/Login/DecodeToken";
import { goInputValidation } from "actions/goInputValidation";
import { TechnologyContext } from "context/TechnologyContext";


export default function DaneTech({
  showAddClientStage
}) {

  return (
    <>
      <div id="Dane" className={style.dane}>
        <Row style={style.row1}>
            <Firma />
            <Klient />
            <DataPrzyjecia />
            <DataMeterialow />
            <DataSpedycji />
        </Row>

        <Row style={style.row2}>
            <Nr /> 
            <Rok />
            <Tytul />
            <Uwagi />
             <Stan />
            <Status />
            {/* <Opiekun /> */}
            <Etap />
        </Row>
      </div>
    </>
  );
}

function Row({children,style}) {
  
    return (
      <div className={style}>
        {children}
      </div>
    );
  }

function Firma() {

const contextApp = useContext(AppContext);
const contextTech = useContext(TechnologyContext);
const daneTech = contextTech.daneTech
const setDaneTech = contextTech.setDaneTech


  return (
    <div className={style.col}>
      <label className={style.label}> Firma </label>
      <select
        className={style.select}
        value={daneTech?.firma_id}

        onChange={(event) => {
          setDaneTech({...daneTech, firma_id: event.target.value,update: true});
          // setSaveButtonDisabled(false)
        }}
      >
        {contextApp._firma.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}

function Klient() {
  const contextTech = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const daneTech = contextTech.daneTech;

  return (
    <div className={style.col}>
      <label className={style.label}> Klient </label>
      <select className={style.klient} defaultValue={daneTech?.klient_id}>
        {contextApp.clients
          .filter((x) => x.id == daneTech?.klient_id)
          .map((option) => (
            <option key={option.id} value={option.id}>
              {option.firma}
            </option>
          ))}
      </select>
    </div>
  );
}


function DataMeterialow() {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia = contextModalInsert.setDaneZamowienia;
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;

  const contextTech = useContext(TechnologyContext);  
  const daneTech = contextTech.daneTech
  const setDaneTech = contextTech.setDaneTech
  return (
    <div className={style.col}>
      <label className={style.label}> Data materiałów </label>
      <input
        className={style.select}
        type="date"
        value={daneTech.data_materialow}
        onChange={(event) => {
          setDaneTech({
            ...daneTech,
            data_materialow: event.target.value,update: true,
          });
          setSaveButtonDisabled(false);
        }}
      ></input>
    </div>
  );
}

function DataPrzyjecia(){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const contextTech = useContext(TechnologyContext);  
  const daneTech = contextTech.daneTech
  const setDaneTech = contextTech.setDaneTech

  return(
      <div className={style.col}>
      <label className={style.label}> Data przyjęcia </label>
      <input className={style.select} type="date"
         value={daneTech.data_przyjecia}
         disabled
         onChange={(event) => {
          setDaneTech({...daneTech, data_przyjecia: event.target.value,update: true});
          setSaveButtonDisabled(false)
           if( event.target.value ==="" )   console.log("Nie ma")
         }}></input>
    </div>
  );
}

function DataSpedycji(){

  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const contextTech = useContext(TechnologyContext);  
  const daneTech = contextTech.daneTech
  const dane = contextTech.dane
  const setDaneTech = contextTech.setDaneTech
    return(
        <div className={style.col}>
        <label className={style.label}> Data spedycji </label>
        <input className={daneTech.data_spedycji == dane.data_spedycji ?style.select :style.selectError} title={dane.data_spedycji} type="date"
        
        value={daneTech.data_spedycji} 
        onChange={(event) => {
          setDaneTech({...daneTech, data_spedycji: event.target.value,update: true});
          setSaveButtonDisabled(false)
        }}></input>
      </div>
    );
}

function Opiekun() {
  const contextApp = useContext(AppContext);
  const contextModalInsert = useContext(ModalInsertContext);

  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const contextTech = useContext(TechnologyContext);
const daneTech = contextTech.daneTech
const setDaneTech = contextTech.setDaneTechch
  return (
    <div className={style.col}>
      <label className={style.label}> Opiekun </label>
      <select
      disabled
        className={style.select}
        value={daneTech.opiekun_id}
        onChange={(event) => {
          setDaneTech({...daneTech, opiekun_id: event.target.value,update: true});
          setSaveButtonDisabled(false)
        }}
      >
        {contextApp.users.filter(x => x.Dzial == 2).map((option) => (
          <option key={option.id} value={option.id}>
          {option.Imie} {option.Nazwisko} 
          </option>
        ))}
      </select>
    </div>
  );
}

function Status() {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const contextTech = useContext(TechnologyContext);  
  const daneTech = contextTech.daneTech
  const setDaneTech = contextTech.setDaneTech
  return (
    <div className={style.col}>
      <label className={style.label}> Status </label>
      <select
        className={style.select}
        value={daneTech.status}
        onChange={(event) => {
          setDaneTech({...daneTech, status: parseInt(event.target.value),update: true});
          setSaveButtonDisabled(false)
        }}
      >
        {_status_technologi.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}




function Stan( ) {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const contextTech = useContext(TechnologyContext);  
  const daneTech = contextTech.daneTech
  const setDaneTech = contextTech.setDaneTech
  return (
    <div className={style.col}>
      <label className={style.label}> Stan </label>
      <select
        className={style.select}
        value={daneTech.stan}
        onChange={(event) => {
          setDaneTech({...daneTech, stan: parseInt(event.target.value),update: true});
          setSaveButtonDisabled(false)
        }}
      >
        {_stan_technologi.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}

function Etap( ) {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const contextTech = useContext(TechnologyContext);  
  const daneTech = contextTech.daneTech
  const setDaneTech = contextTech.setDaneTech
  return (
    <div className={style.col}>
      <label className={style.label}> Stan </label>
      <select
        className={style.select}
        value={daneTech.etap}
        onChange={(event) => {
          setDaneTech({...daneTech, etap: parseInt(event.target.value) ,update: true});
          setSaveButtonDisabled(false)
        }}
      >
        {_etapy_produkcji.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}

function Tytul( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;


const contextTech = useContext(TechnologyContext);
const contextApp = useContext(AppContext);
const daneTech = contextTech.daneTech;
const setDaneTech = contextTech.setDaneTech;
const setSaveButtonDisabled = contextTech.setSaveButtonDisabled;

  return(
      <div className={style.col}>
      <label className={style.label}> Tytul </label>
      <input className={style.input} type="text"
      value={daneTech.tytul}
      onChange={(event) => {
        

         const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ.]+$/;
        if ( event.target.value === '' || re.test(event.target.value)) {
          setDaneTech({...daneTech, tytul: event.target.value,update: true});
         setSaveButtonDisabled(false)
     }

      }}></input>
    </div>
  );
}




function Uwagi( ){
  const contextModalInsert = useContext(ModalInsertContext);

const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const contextTech = useContext(TechnologyContext);  
  const daneTech = contextTech.daneTech
  const setDaneTech = contextTech.setDaneTech
  return(
      <div className={style.col}>
      <label className={style.label}> Uwagi </label>
      <input className={style.input} type="text"
      value={daneTech.uwagi}
      onChange={(event) => {

   
         const re = /^[a-zA-Z0-9_+\sZąćęłńóśźżĄĘŁŃÓŚŹŻ.\+\-\(\),]+$/;
        if ( event.target.value === '' || re.test(event.target.value)) {
      
          setDaneTech({...daneTech, uwagi: event.target.value,update: true});
          setSaveButtonDisabled(false)
     }

      }}></input>
    </div>
  );
}

function Nr( ){
  // const contextModalInsert = useContext(ModalInsertContext);
  // const daneZamowienia = contextModalInsert.daneZamowienia;
// const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
// const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;


const contextTech = useContext(TechnologyContext);
// const contextApp = useContext(AppContext);
const daneTech = contextTech.daneTech;
const setDaneTech = contextTech.setDaneTech;

  return(
      <div className={style.col}>
      <label className={style.label}> Nr zlecenia </label>
      <input className={style.input} type="text"
      value={daneTech.nr}
      onChange={(event) => {

        const re = /^[0-9]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
          setDaneTech({...daneTech, nr: event.target.value,update: true});
          // setSaveButtonDisabled(false)
        }
        
      
      }}></input>
    </div>
  );
}


function Rok( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const contextTech = useContext(TechnologyContext);  
  const daneTech = contextTech.daneTech
  const dane = contextTech.dane
  const setDaneTech = contextTech.setDaneTech
  return(
      <div className={style.col}>
      <label className={style.label}> Rok </label>
      <input className={daneTech.rok == dane.rok ?style.input :style.inputError} title={dane.rok} type="text"
            value={daneTech.rok}

            
            onChange={(event) => {

              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setDaneTech({...daneTech, rok: event.target.value,update: true});
              setSaveButtonDisabled(false)
              }
            }}></input>
    </div>
  );
}