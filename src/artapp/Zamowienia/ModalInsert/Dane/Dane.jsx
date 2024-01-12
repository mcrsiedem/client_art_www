import style from "./Dane.module.css";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status,_stan } from "../api";

export default function Dane({
  selected_firma,setSelected_firma,
  klient,setKlient,

  daneZamowienia,setDaneZamowienia
}) {
  return (
    <>
      <div className={style.dane}>
        <div className={style.row1}>
          <Firma daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia}/>
          <div className={style.klientContainer}>
            <Klient daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia}/>
          </div>

          <DataPrzyjecia daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia}/>
          <DataMeterialow daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia}/>
          <DataSpedycji daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia}/>
        </div>
        <div className={style.row2}>
          <Nr daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia}/>
          <Rok daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia} />
          <Tytul daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia}
          />

          <Opiekun daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia}/>
        </div>
        <div className={style.row3}>
        <Status daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia}/>
          <Uwagi daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia}
          />

          <Stan daneZamowienia={daneZamowienia} setDaneZamowienia={setDaneZamowienia}/>
        </div>
      </div>
    </>
  );
}


function Firma({ daneZamowienia,setDaneZamowienia }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Firma </label>
      <select
        className={style.firma}
        value={daneZamowienia.firma}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, firma: event.target.value});
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

function Klient({ daneZamowienia,setDaneZamowienia }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Klient </label>
      <select
        className={style.klient}
        value={daneZamowienia.klient}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, klient: event.target.value});
        }}
      >
        {_klient.map((option) => (
          <option key={option.id} value={option.id}>
            {option.firma}
          </option>
        ))}
      </select>
    </div>
  );
}


function DataMeterialow({daneZamowienia,setDaneZamowienia}){
    return(
        <div className={style.col}>
        <label className={style.label}> Data materiałów </label>
        <input className={style.data} type="date"
             defaultValue={daneZamowienia.dataMaterialow}
             onChange={(event) => {
              setDaneZamowienia({...daneZamowienia, dataMaterialow: event.target.value});
             }}></input>
      </div>
    );
}

function DataPrzyjecia({daneZamowienia,setDaneZamowienia}){
  return(
      <div className={style.col}>
      <label className={style.label}> Data przyjęcia </label>
      <input className={style.data} type="date"
         defaultValue={daneZamowienia.dataPrzyjecia}
         onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, dataPrzyjecia: event.target.value});
           if( event.target.value ==="" )   console.log("Nie ma")
         }}></input>
    </div>
  );
}

function DataSpedycji({daneZamowienia,setDaneZamowienia}){
    return(
        <div className={style.col}>
        <label className={style.label}> Data spedycji </label>
        <input className={style.data} type="date"
        defaultValue={daneZamowienia.dataSpedycji}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, dataSpedycji: event.target.value});
        }}></input>
      </div>
    );
}

function Opiekun({ daneZamowienia,setDaneZamowienia }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Opiekun </label>
      <select
        className={style.firma}
        value={daneZamowienia.opiekun}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, opiekun: event.target.value});
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

function Status({ daneZamowienia,setDaneZamowienia }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Status </label>
      <select
        className={style.firma}
        value={daneZamowienia.status}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, status: event.target.value});
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

function Stan({ daneZamowienia,setDaneZamowienia }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Stan </label>
      <select
        className={style.firma}
        value={daneZamowienia.stan}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, stan: event.target.value});
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

function Tytul({daneZamowienia,setDaneZamowienia}){
  return(
      <div className={style.col}>
      <label className={style.label}> Tytul </label>
      <input className={style.data} type="text"
      value={daneZamowienia.tytul}
      onChange={(event) => {
        setDaneZamowienia({...daneZamowienia, tytul: event.target.value});
      }}></input>
    </div>
  );
}
function Uwagi({daneZamowienia,setDaneZamowienia}){
  return(
      <div className={style.col}>
      <label className={style.label}> Uwagi </label>
      <input className={style.data} type="text"
      value={daneZamowienia.uwagi}
      onChange={(event) => {
        setDaneZamowienia({...daneZamowienia, uwagi: event.target.value});
      }}></input>
    </div>
  );
}

function Nr({daneZamowienia,setDaneZamowienia}){
  return(
      <div className={style.col}>
      <label className={style.label}> Nr zlecenia </label>
      <input className={style.data} type="text"
      value={daneZamowienia.nr}
      onChange={(event) => {
        setDaneZamowienia({...daneZamowienia, nr: event.target.value});
      }}></input>
    </div>
  );
}

function Rok({daneZamowienia,setDaneZamowienia}){
  return(
      <div className={style.col}>
      <label className={style.label}> Rok </label>
      <input className={style.data} type="text"
            value={daneZamowienia.rok}
            onChange={(event) => {
              setDaneZamowienia({...daneZamowienia, rok: event.target.value});
            }}></input>
    </div>
  );
}