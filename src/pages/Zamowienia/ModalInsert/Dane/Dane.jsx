import style from "./Dane.module.css";
import { useContext} from "react";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status_dokumentu,_stan_dokumentu,_vat,_waluta,_rodzaj,_fsc, _etapy_produkcji } from "utils/initialvalue";
import addIcon2 from "../../../../assets/addIcon2.svg";
import { PreOrderContext } from "context/PreOrderContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import DecodeToken from "pages/Login/DecodeToken";
import { goInputValidation } from "actions/goInputValidation";


export default function Dane({
  selected_firma,setSelected_firma,
  klienci,klient,setKlient,
  showAddClientStage
}) {






  
  return (
    <>
      <div id="Dane" className={style.dane}>
        <Row style={style.row1}>
            <Firma />
            <Klient klienci={klienci} showAddClientStage={showAddClientStage} />
            <DataPrzyjecia />
            <DataMeterialow />
            <DataSpedycji />
        </Row>

        <Row style={style.row2}>
            <Nr /> 
            <Rok />
            <Tytul />
            <Cena />
            <Waluta />
            <Vat />
            <TerminPlatnosci />
            <Przedplata />
            <Etap />
        </Row>

        <Row style={style.row3}>
            <Opiekun />
            <Uwagi />
            <FSC />
            <Stan />
            <Status />
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
const contextModalInsert = useContext(ModalInsertContext);
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Firma </label>
      <select
        className={style.select}
        value={daneZamowienia.firma_id}

        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, firma_id: event.target.value,update: true});
          setSaveButtonDisabled(false)
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

function Klient({showAddClientStage }) {

const contextModalInsert = useContext(ModalInsertContext);
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const contextApp = useContext(AppContext);



  return (
    <div className={style.col}>
      <label className={style.label}> Klient </label>
      <select
        className={style.klient}
        value={daneZamowienia.klient_id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, klient_id: event.target.value,update: true});
          setSaveButtonDisabled(false);
        }}
      >
        <option key={1} value={"0"}> 
           wybierz...
          </option>
        {contextApp.clients
        // .unshift({id:0,firma:""})
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.firma}
          </option>
        ))}
      </select>
      <img
         className={style.dodaj_klienta}
          src={addIcon2}
          onClick={() => {
            showAddClientStage(true)
          }}
          alt="Procesy"
        />
    </div>
  );
}


function DataMeterialow(){

  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
    return(
        <div className={style.col}>
        <label className={style.label}> Data materiałów </label>
        <input className={style.select} type="date"
             value={daneZamowienia.data_materialow}
             onChange={(event) => {
              setDaneZamowienia({...daneZamowienia, data_materialow: event.target.value, update: true});
              setSaveButtonDisabled(false)
             }}></input>
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
          setDaneZamowienia({...daneZamowienia, data_przyjecia: event.target.value, update: true});
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
          setDaneZamowienia({...daneZamowienia, data_spedycji: event.target.value, update: true});
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
        // value={DecodeToken(sessionStorage.getItem("token")).id}
        value={daneZamowienia.opiekun_id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, opiekun_id: event.target.value, update: true});
          setSaveButtonDisabled(false)
        }}
      >
        {contextApp.users?.filter(x => x.Dzial == 2).map((option) => (
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
      <label className={style.label}> Status zamówienia</label>
      <select
        className={style.select}
        value={daneZamowienia.status}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, status: event.target.value, update: true});
          setSaveButtonDisabled(false)
        }}
      >
        {_status_dokumentu.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}

function Etap() {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
// etap produkcji tj pliki akcept druk etc
  return (
    <div className={style.col}>
      <label className={style.label}> Etap produkcji </label>
      <select
        className={style.select}
        value={daneZamowienia.etap}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, etap: parseInt(event.target.value) , update: true});
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

function FSC( ) {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return (
    <div className={style.col}>
      <label className={style.label}> FSC </label>
      <select
        className={style.select}
        value={daneZamowienia.fsc}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, fsc: event.target.value, update: true});
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
      <label className={style.label}> Stan zamówienia </label>
      <select
        className={style.select}
        value={daneZamowienia.stan}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, stan: event.target.value, update: true});
          setSaveButtonDisabled(false)
        }}
      >
        {_stan_dokumentu.map((option) => (
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

  return(
      <div className={style.col}>
      <label className={style.label}> Tytul </label>
      <input className={style.input} type="text"
      value={daneZamowienia.tytul}
      onChange={(event) => {
        

         const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ./-]+$/;
        if ( event.target.value === '' || re.test(event.target.value)) {
        setDaneZamowienia({...daneZamowienia, tytul: event.target.value, update: true});
        setSaveButtonDisabled(false)
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
      <input className={style.input} type="text"
      value={daneZamowienia.przedplata}
      onChange={(event) => {
        if(goInputValidation(event,'price')){
          setDaneZamowienia({...daneZamowienia, przedplata: event.target.value, update: true});
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
      
          setDaneZamowienia({...daneZamowienia, uwagi: event.target.value, update: true});
          setSaveButtonDisabled(false)
     }

      }}></input>
    </div>
  );
}

function Nr( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Nr zlecenia </label>
      <input className={style.input} type="text"
      value={daneZamowienia.nr}
      onChange={(event) => {

        const re = /^[0-9]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
          setDaneZamowienia({...daneZamowienia, nr: event.target.value, update: true});
          setSaveButtonDisabled(false)
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
      <input className={style.input} type="text"
      value={daneZamowienia.cena}
      onChange={(event) => {


       const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

       if ( event.target.value === '' || re.test(event.target.value)) {
        setDaneZamowienia({...daneZamowienia, cena: event.target.value, update: true});
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
      <input className={style.input} type="text"
      value={daneZamowienia.termin_platnosci} 
      onChange={(event) => {


        const re2 = /^[0-9]+$/;
        const re = /^[a-zA-Z0-9_+\sZąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
       if ( event.target.value === '' || re2.test(event.target.value)) {
          setDaneZamowienia({...daneZamowienia, termin_platnosci: event.target.value, update: true});
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
        className={style.select}
        value={daneZamowienia.vat_id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, vat_id: event.target.value, update: true});
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
        className={style.select}
        value={daneZamowienia.waluta_id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, waluta_id: event.target.value, update: true});
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
              setDaneZamowienia({...daneZamowienia, rok: event.target.value, update: true});
              setSaveButtonDisabled(false)
              }
            }}></input>
    </div>
  );
}