import style from "./Dane.module.css";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun } from "../api";

export default function Dane({
  selected_firma,setSelected_firma,
  klient,setKlient,
  opiekun, setOpiekun,
  dataPrzyjecia, setDataPrzyjecia,
  dataMaterialow, setDataMaterialow,
  dataSpedycji, setDataSpedycji,
  rok,setRok,
  nr,setNr,
  tytul,setTytul
}) {
  return (
    <>
      <div className={style.dane}>
        <div className={style.row1}>
          <Firma
            selected_firma={selected_firma}
            setSelected_firma={setSelected_firma}
          />
          <div className={style.klientContainer}>
            <Klient klient={klient} setKlient={setKlient} />
          </div>

          <DataPrzyjecia
            dataPrzyjecia={dataPrzyjecia}
            setDataPrzyjecia={setDataPrzyjecia}
          />
          <DataMeterialow
            dataMaterialow={dataMaterialow}
            setDataMaterialow={setDataMaterialow}
          />
          <DataSpedycji
            dataSpedycji={dataSpedycji}
            setDataSpedycji={setDataSpedycji}
          />
        </div>
        <div className={style.row2}>
          <Nr nr={nr} setNr={setNr} />
          <Rok rok={rok} setRok={setRok} />
          <Tytul
            tytul={tytul}
            setTytul={setTytul}
          />

          <Opiekun
            opiekun={opiekun}
            setOpiekun={setOpiekun}
          />
        </div>
      </div>
    </>
  );
}


function Firma({ selected_firma, setSelected_firma }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Firma </label>
      <select
        className={style.firma}
        value={selected_firma}
        onChange={(event) => {
          setSelected_firma(event.target.value);
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

function Klient({ klient, setKlient }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Klient </label>
      <select
        className={style.klient}
        value={klient}
        onChange={(event) => {
          setKlient(event.target.value);
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


function DataMeterialow({dataMaterialow,setDataMaterialow}){
    return(
        <div className={style.col}>
        <label className={style.label}> Data materiałów </label>
        <input className={style.data} type="date"
             defaultValue={dataMaterialow}
             onChange={(event) => {
               setDataMaterialow(event.target.value);
             }}></input>
      </div>
    );
}

function DataPrzyjecia({dataPrzyjecia,setDataPrzyjecia}){
  return(
      <div className={style.col}>
      <label className={style.label}> Data przyjęcia </label>
      <input className={style.data} type="date"
         defaultValue={dataPrzyjecia}
         onChange={(event) => {
           setDataPrzyjecia(event.target.value);
           if( event.target.value ==="" )   console.log("Nie ma")
         }}></input>
    </div>
  );
}

function DataSpedycji({dataSpedycji,setDataSpedycji}){
    return(
        <div className={style.col}>
        <label className={style.label}> Data spedycji </label>
        <input className={style.data} type="date"
        defaultValue={dataSpedycji}
        onChange={(event) => {
          setDataSpedycji(event.target.value);
        }}></input>
      </div>
    );
}

function Opiekun({ opiekun, setOpiekun }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Opiekun </label>
      <select
        className={style.firma}
        value={opiekun}
        onChange={(event) => {
          setOpiekun(event.target.value);
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

function Tytul({tytul,setTytul}){
  return(
      <div className={style.col}>
      <label className={style.label}> Tytul </label>
      <input className={style.data} type="text"
      value={tytul}
      onChange={(event) => {
        setTytul(event.target.value);
      }}></input>
    </div>
  );
}

function Nr({nr,setNr}){
  return(
      <div className={style.col}>
      <label className={style.label}> Nr zlecenia </label>
      <input className={style.data} type="text"
      value={nr}
      onChange={(event) => {
        setNr(event.target.value);
      }}></input>
    </div>
  );
}

function Rok({rok,setRok}){
  return(
      <div className={style.col}>
      <label className={style.label}> Rok </label>
      <input className={style.data} type="text"
            value={rok}
            onChange={(event) => {
              setRok(event.target.value);
            }}></input>
    </div>
  );
}