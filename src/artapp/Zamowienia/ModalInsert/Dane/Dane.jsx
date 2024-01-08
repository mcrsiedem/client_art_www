import style from "./Dane.module.css";
import { _firma, _produkty, _klient, _zestawy, _elementy } from "../api";

export default function Dane({
  selected_firma,
  setSelected_firma,
  klient,
  setKlient,
  dataPrzyjecia,
  setDataPrzyjecia,
  dataMaterialow,
  setDataMaterialow,
  dataSpedycji,
  setDataSpedycji
}) {
  return (
    <>
      <div className={style.dane}>
            <div className={style.row1}>
                      <Firma selected_firma={selected_firma} setSelected_firma={setSelected_firma}/>
                  <div className={style.klientContainer}>
                    <Klient klient={klient} setKlient={setKlient}/>
          
                  </div>
                  
       
       
                  <DataPrzyjecia         dataPrzyjecia={dataPrzyjecia}
          setDataPrzyjecia={setDataPrzyjecia}
/>
                  <DataMeterialow  dataMaterialow={dataMaterialow}
          setDataMaterialow={setDataMaterialow}/>
                  <DataSpedycji  
          dataSpedycji={dataSpedycji}
          setDataSpedycji={setDataSpedycji}/>
            </div>
            <div className={style.row2}>
              <Nr/>
              <Rok/>
                      <Tytul selected_firma={selected_firma} setSelected_firma={setSelected_firma}/>
             
                  
       
                  <Opiekun selected_firma={selected_firma} setSelected_firma={setSelected_firma}/>

     
       
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

function Opiekun({ selected_firma, setSelected_firma }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Opiekun </label>
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

function Tytul(){
  return(
      <div className={style.col}>
      <label className={style.label}> Tytul </label>
      <input className={style.data} type="text"></input>
    </div>
  );
}

function Nr(){
  return(
      <div className={style.col}>
      <label className={style.label}> Nr </label>
      <input className={style.data} type="text"></input>
    </div>
  );
}

function Rok(){
  return(
      <div className={style.col}>
      <label className={style.label}> Rok </label>
      <input className={style.data} type="text"></input>
    </div>
  );
}