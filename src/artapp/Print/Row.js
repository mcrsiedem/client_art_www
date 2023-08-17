import React from "react";
import style from "../Print/Row.module.css";
import { useState,useEffect } from "react";

function Row(props) {
   const [statusCombo, setStatusCombo] = useState();


  const status = props.status;
  const czas = props.czasDruku;

  useEffect(()=>{
    setStatusCombo(status);
   },[])

   useEffect(()=>{
    // console.log(statusCombo)
    // alert(statusCombo);
   },[statusCombo])

  function ChceckStatus(status) {
    if (
      (status === "Wydrukowane") ^
      (status === "Sfalcowane") ^
      (status === "Falcowanie")
    )
      return style.wydrukowane;
    if ((status === "RIP") ^ (status === "Zaświecone"))
      return style.ripzaswiecone;
    if (status === "Akcept") return style.akcept;
    if (status === "Nowe") return style.nowe;
    if (status === "Pliki") return style.pliki;
    return style.body;
  }

  function TimeFormatter(czas) {
    // zamienia czas podnay w minutach na hh:mm

    let minuty = czas % 60;
    let godziny = Math.round(czas / 60);

    if (godziny < 10) godziny = "0" + godziny;
    if (minuty < 10) minuty = "0" + minuty;

    return godziny + ":" + minuty;
  }

  function YearFormatter(czas) {
    // zamienia czas podnay w minutach na hh:mm

    return "20" + czas.substring(2);
  }



  return (
    <div id={props.id} className={ChceckStatus(status) + " " + style.body}>
      <div className={style.druk}>
        <div className={style.bold}>{props.poczatekDruku}</div>
        <div className={style.koniecdruku}>
          {" "}
          {props.koniecDruku} {TimeFormatter(czas)}{" "}
        </div>
      </div>

      <div className={style.nrzlecenia}>
        <div className={style.bold}>{props.nrZlecenia} </div>
        <div>{props.rokZlecenia} </div>
      </div>

      <div className={style.klient}>
        <div>
          <div className={style.bold}>{props.title} </div>
          <div>{props.body}</div>
        </div>
      </div>

      <div className={style.klient}>
        <div>
          <div> {props.format} </div>
        </div>
      </div>
      <div className={style.klient}>
        <div>
          <div> {props.spedycja} </div>
        </div>
      </div>
      <div className={style.blachy}>
        <input
          defaultValue={props.blachy}
        //   onChange={(event) => setBlachy(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
         
              sessionStorage.setItem('ilosc_blach', event.target.value)
          //    console.log("ilosc: "+event.target.value)
              props.handleEditBlachy();
               document.activeElement.blur();

            }
          }}
        />
      </div>

      <div className={style.combo}>
        <select value ={statusCombo} onChange={(e)=> {
          setStatusCombo(e.target.value);
          sessionStorage.setItem('nowy_status', e.target.value)
          }}>
 
          <option value ="Nowe"> Nowe </option>
          <option value ="Pliki"> Pliki </option>
          <option value ="Akcept"> Akcept </option>
          <option value ="RIP"> RIP </option>
          <option value ="Zaświecone"> Zaświecone </option>
          <option value ="Wydrukowane"> Wydrukowane </option>

        </select>

      </div>

      <div className={style.checbox}>
        <input
          className={style.checboxinput}
          type="checkbox"
          id=""
          name=""
          value=""
        />
      </div>
    </div>
  );
}

export default Row;
