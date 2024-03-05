import style from "./Dane.module.css";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status,_stan,_vat,_waluta,_rodzaj } from "../api";
import { isNumberWalidation } from "../../../Actions/Walidacja";
// import iconTable from "../../../../svg/settings.svg";
import iconTable from "../../../../svg/add.png";

export default function Dane({
  selected_firma,setSelected_firma,
  klient,setKlient,
  setSaveButtonDisabled,
  daneZamowienia,setDaneZamowienia,
  showAddClientStage
}) {
  return (
    <>
      <div id="Dane" className={style.dane}>
        <div className={style.row1}>
          <Firma
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
          <div className={style.klientContainer}>
            <Klient
              daneZamowienia={daneZamowienia}
              setDaneZamowienia={setDaneZamowienia}
              setSaveButtonDisabled={setSaveButtonDisabled}
              showAddClientStage={showAddClientStage}
            />
          </div>


 
          <DataPrzyjecia
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
          <DataMeterialow
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
          <DataSpedycji
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
        </div>
        <div className={style.row2}>
          <Nr
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
          <Rok
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
          <Tytul
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
   

          <Cena
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />

          <Waluta
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />

          <Vat
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
          <TerminPlatnosci
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
                 <Przedplata
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />

          <Rodzaj
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
        </div>
        <div className={style.row3}>
          <Opiekun
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />

          <Uwagi
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
     <Stan
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />
          <Status
            daneZamowienia={daneZamowienia}
            setDaneZamowienia={setDaneZamowienia}
            setSaveButtonDisabled={setSaveButtonDisabled}
          />

     
        </div>
      </div>
    </>
  );
}



function Firma({ daneZamowienia,setDaneZamowienia,setSaveButtonDisabled }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Firma </label>
      <select
        className={style.firma}
        value={daneZamowienia.firma_id}

        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, firma_id: event.target.value});
          setSaveButtonDisabled(false)
        }}
      >
        {_firma.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}

function Klient({ daneZamowienia,setDaneZamowienia,setSaveButtonDisabled,showAddClientStage }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Klient </label>
      <select
        className={style.klient}
        value={daneZamowienia.klient_id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, klient_id: event.target.value});
          setSaveButtonDisabled(false);
        }}
      >
        {_klient.map((option) => (
          <option key={option.id} value={option.id}>
            {option.firma}
          </option>
        ))}
      </select>
      <img
         className={style.dodaj_klienta}
          src={iconTable}
          onClick={() => {
            showAddClientStage(true)
            // setShowOprawaElementyStage(true);
            // setOprawa_row(row);
          }}
          alt="Procesy"
        />
    </div>
  );
}


function DataMeterialow({daneZamowienia,setDaneZamowienia,setSaveButtonDisabled}){
    return(
        <div className={style.col}>
        <label className={style.label}> Data materiałów </label>
        <input className={style.data} type="date"
             value={daneZamowienia.data_materialow}
             onChange={(event) => {
              setDaneZamowienia({...daneZamowienia, data_materialow: event.target.value});
              setSaveButtonDisabled(false)
             }}></input>
      </div>
    );
}

function DataPrzyjecia({daneZamowienia,setDaneZamowienia,setSaveButtonDisabled}){
  return(
      <div className={style.col}>
      <label className={style.label}> Data przyjęcia </label>
      <input className={style.data} type="date"
         value={daneZamowienia.data_przyjecia}
         onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, data_przyjecia: event.target.value});
          setSaveButtonDisabled(false)
           if( event.target.value ==="" )   console.log("Nie ma")
         }}></input>
    </div>
  );
}

function DataSpedycji({daneZamowienia,setDaneZamowienia,setSaveButtonDisabled}){
    return(
        <div className={style.col}>
        <label className={style.label}> Data spedycji </label>
        <input className={style.data} type="date"
        value={daneZamowienia.data_spedycji}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, data_spedycji: event.target.value});
          setSaveButtonDisabled(false)
        }}></input>
      </div>
    );
}

function Opiekun({ daneZamowienia,setDaneZamowienia,setSaveButtonDisabled }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Opiekun </label>
      <select
        className={style.firma}
        value={daneZamowienia.opiekun_id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, opiekun_id: event.target.value});
          setSaveButtonDisabled(false)
        }}
      >
        {_opiekun.map((option) => (
          <option key={option.id} value={option.id}>
          {option.imie} {option.nazwisko} 
          </option>
        ))}
      </select>
    </div>
  );
}

function Status({ daneZamowienia,setDaneZamowienia,setSaveButtonDisabled }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Status </label>
      <select
        className={style.firma}
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

function Rodzaj({ daneZamowienia,setDaneZamowienia,setSaveButtonDisabled }) {
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



function Stan({ daneZamowienia,setDaneZamowienia,setSaveButtonDisabled }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Stan </label>
      <select
        className={style.firma}
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

function Tytul({daneZamowienia,setDaneZamowienia,setSaveButtonDisabled}){
  return(
      <div className={style.col}>
      <label className={style.label}> Tytul </label>
      <input className={style.tytul} type="text"
      value={daneZamowienia.tytul}
      onChange={(event) => {
        
        const re2 = /^[0-9]+$/;
         const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
        if ( event.target.value === '' || re.test(event.target.value)) {
        setDaneZamowienia({...daneZamowienia, tytul: event.target.value});
        setSaveButtonDisabled(false)
     }

      }}></input>
    </div>
  );
}


function Przedplata({daneZamowienia,setDaneZamowienia,setSaveButtonDisabled}){
  return(
      <div className={style.col}>
      <label className={style.label}> Przedpłata </label>
      <input className={style.data} type="text"
      value={daneZamowienia.przedplata}
      onChange={(event) => {

        // const re = /^[0-9,]+$/;
        const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ%]+$/;
       if ( event.target.value === '' || re.test(event.target.value)) {
        setDaneZamowienia({...daneZamowienia, przedplata: event.target.value});
        setSaveButtonDisabled(false)
       }
      }}></input>
    </div>
  );
}



function Uwagi({daneZamowienia,setDaneZamowienia,setSaveButtonDisabled}){
  return(
      <div className={style.col}>
      <label className={style.label}> Uwagi </label>
      <input className={style.tytul} type="text"
      value={daneZamowienia.uwagi}
      onChange={(event) => {

        const re2 = /^[0-9]+$/;
         const re = /^[a-zA-Z0-9_+\sZąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
        if ( event.target.value === '' || re.test(event.target.value)) {
      
          setDaneZamowienia({...daneZamowienia, uwagi: event.target.value});
          setSaveButtonDisabled(false)
     }

      }}></input>
    </div>
  );
}

function Nr({daneZamowienia,setDaneZamowienia,setSaveButtonDisabled}){
  return(
      <div className={style.col}>
      <label className={style.label}> Nr zlecenia </label>
      <input className={style.data} type="text"
      value={daneZamowienia.nr}
      onChange={(event) => {

        const re = /^[0-9]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
          setDaneZamowienia({...daneZamowienia, nr: event.target.value});
          setSaveButtonDisabled(false)
        }
        
      
      }}></input>
    </div>
  );
}

function Cena({daneZamowienia,setDaneZamowienia,setSaveButtonDisabled}){
  return(
      <div className={style.col}>
      <label className={style.label}> Cena </label>
      <input className={style.data} type="text"
      value={daneZamowienia.cena}
      onChange={(event) => {

        const re = /^[0-9,]+$/;
        // const re = /^[a-zA-Z0-9_+\sZąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
       if ( event.target.value === '' || re.test(event.target.value)) {
        setDaneZamowienia({...daneZamowienia, cena: event.target.value});
        setSaveButtonDisabled(false)
       }
        
      }}></input>
    </div>
  );
}

function TerminPlatnosci({daneZamowienia,setDaneZamowienia,setSaveButtonDisabled}){
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

function Vat({ daneZamowienia,setDaneZamowienia,setSaveButtonDisabled }) {
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

function Waluta({ daneZamowienia,setDaneZamowienia,setSaveButtonDisabled }) {
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






function Rok({daneZamowienia,setDaneZamowienia,setSaveButtonDisabled}){
  return(
      <div className={style.col}>
      <label className={style.label}> Rok </label>
      <input className={style.data} type="text"
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