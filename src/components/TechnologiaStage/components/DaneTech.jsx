import style from "./DaneTech.module.css";
import { useContext} from "react";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status,_stan,_vat,_waluta,_rodzaj,_fsc } from "utils/initialvalue";
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
            <Opiekun />
         
            {/* <Cena />
            <Waluta />
            <Vat />
            <TerminPlatnosci /> */}
            {/* <Przedplata /> */}
            {/* <Rodzaj /> */}
                     {/* <FSC /> */}
        </Row>

        {/* <Row style={style.row3}>
   
   
   
        </Row> */}
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
const contextTech = useContext(TechnologyContext);
const contextApp = useContext(AppContext);
const daneTech = contextTech.daneTech
const setDaneTech = contextTech.setDaneTech


  return (
    <div className={style.col}>
      <label className={style.label}> Firma </label>
      <select
        className={style.select}
        value={daneTech?.firma_id}

        onChange={(event) => {
          setDaneTech({...daneTech, firma_id: event.target.value});
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
  return (
    <div className={style.col}>
      <label className={style.label}> Data materiałów </label>
      <input
        className={style.select}
        type="date"
        value={daneZamowienia.data_materialow}
        onChange={(event) => {
          setDaneZamowienia({
            ...daneZamowienia,
            data_materialow: event.target.value,
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
  return(
      <div className={style.col}>
      <label className={style.label}> Data przyjęcia </label>
      <input className={style.select} type="date"
         value={daneZamowienia.data_przyjecia}
         onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, data_przyjecia: event.target.value});
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
    return(
        <div className={style.col}>
        <label className={style.label}> Data spedycji </label>
        <input className={style.select} type="date"
        value={daneZamowienia.data_spedycji}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, data_spedycji: event.target.value});
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
  return (
    <div className={style.col}>
      <label className={style.label}> Opiekun </label>
      <select
        className={style.select}
        value={DecodeToken(sessionStorage.getItem("token")).id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, opiekun_id: event.target.value});
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
  return (
    <div className={style.col}>
      <label className={style.label}> Status </label>
      <select
        className={style.select}
        value={daneZamowienia.status}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, status: event.target.value});
          setSaveButtonDisabled(false)
        }}
      >
        {_status.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}

function Rodzaj() {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return (
    <div className={style.col}>
      <label className={style.label}> Rodzaj </label>
      <select
        className={style.firma}
        value={daneZamowienia.rodzaj}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, rodzaj: event.target.value});
          setSaveButtonDisabled(false)
        }}
      >
        {_rodzaj.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}

function FSC( ) {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return (
    <div className={style.col}>
      <label className={style.label}> FSC </label>
      <select
        className={style.firma}
        value={daneZamowienia.fsc}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, fsc: event.target.value});
          setSaveButtonDisabled(false)
        }}
      >
        {_fsc.map((option) => (
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
  return (
    <div className={style.col}>
      <label className={style.label}> Stan </label>
      <select
        className={style.select}
        value={daneZamowienia.stan}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, stan: event.target.value});
          setSaveButtonDisabled(false)
        }}
      >
        {_stan.map((option) => (
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
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;

const contextTech = useContext(TechnologyContext);
const contextApp = useContext(AppContext);
const daneTech = contextTech.daneTech;
const setDaneTech = contextTech.setDaneTech;

  return(
      <div className={style.col}>
      <label className={style.label}> Tytul </label>
      <input className={style.input} type="text"
      value={daneTech.tytul}
      onChange={(event) => {
        

         const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ.]+$/;
        if ( event.target.value === '' || re.test(event.target.value)) {
          setDaneTech({...daneTech, tytul: event.target.value});
        // setSaveButtonDisabled(false)
     }

      }}></input>
    </div>
  );
}


function Przedplata( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Przedpłata </label>
      <input className={style.data} type="text"
      value={daneZamowienia.przedplata}
      onChange={(event) => {
        if(goInputValidation(event,'price')){
          setDaneZamowienia({...daneZamowienia, przedplata: event.target.value});
          setSaveButtonDisabled(false)
        }
      }}></input>
    </div>
  );
}



function Uwagi( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Uwagi </label>
      <input className={style.input} type="text"
      value={daneZamowienia.uwagi}
      onChange={(event) => {

   
         const re = /^[a-zA-Z0-9_+\sZąćęłńóśźżĄĘŁŃÓŚŹŻ.\+\-\(\),]+$/;
        if ( event.target.value === '' || re.test(event.target.value)) {
      
          setDaneZamowienia({...daneZamowienia, uwagi: event.target.value});
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
          setDaneTech({...daneTech, nr: event.target.value});
          // setSaveButtonDisabled(false)
        }
        
      
      }}></input>
    </div>
  );
}

function Cena( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Cena </label>
      <input className={style.data} type="text"
      value={daneZamowienia.cena}
      onChange={(event) => {


       const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

       if ( event.target.value === '' || re.test(event.target.value)) {
        setDaneZamowienia({...daneZamowienia, cena: event.target.value});
        setSaveButtonDisabled(false)
       }
        
      }}></input>
    </div>
  );
}

function TerminPlatnosci( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Płatność (dni) </label>
      <input className={style.data} type="text"
      value={daneZamowienia.termin_platnosci} 
      onChange={(event) => {


        const re2 = /^[0-9]+$/;
        const re = /^[a-zA-Z0-9_+\sZąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
       if ( event.target.value === '' || re2.test(event.target.value)) {
          setDaneZamowienia({...daneZamowienia, termin_platnosci: event.target.value});
          setSaveButtonDisabled(false)
 
       }

      }}
      ></input>
    </div>
  );
}

function Vat( ) {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return (
    <div className={style.col}>
      <label className={style.label}> VAT</label>
      <select
        className={style.firma}
        value={daneZamowienia.vat_id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, vat_id: event.target.value});
          setSaveButtonDisabled(false)
        }}
      >
        {_vat.map((option) => (
          <option key={option.id} value={option.id}>
          {option.stawka}%
          </option>
        ))}
      </select>
    </div>
  );
}

function Waluta( ) {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return (
    <div className={style.col}>
      <label className={style.label}> Waluta</label>
      <select
        className={style.firma}
        value={daneZamowienia.waluta_id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, waluta_id: event.target.value});
          setSaveButtonDisabled(false)
        }}
      >
        {_waluta.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}






function Rok( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Rok </label>
      <input className={style.input} type="text"
            value={daneZamowienia.rok}

            
            onChange={(event) => {

              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setDaneZamowienia({...daneZamowienia, rok: event.target.value});
              setSaveButtonDisabled(false)
              }
            }}></input>
    </div>
  );
}