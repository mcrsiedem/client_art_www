import React, { useState, useContext } from "react";
import style from "./AddRealizacjaProcesuBrak.module.css";
import iconX from "assets/x.svg";
import Zapisz from "./ZapiszBrak";
import { reg_int } from "utils/initialvalue";
import ZapiszBrak from "./ZapiszBrak";
export default function AddRealizacjaProcesuBrak({ setShow, show, wykonanie,grup }) {

  if (show) {
    return (
      <div className={style.grayScaleBackground}>
        <div
          onDoubleClick={() => {
            // console.clear();
            // console.log("daneKlienta : ");
          }}
          className={style.window}
        >
          <Header setShow={setShow}></Header>
          <div className={style.center}>
            {/* <p>Czy dodać brak?</p> */}
            {/* <Naklad  value={value} setValue={setValue} wykonanie={wykonanie}/> */}
          </div>
          <div className={style.footer}>
            <ZapiszBrak setShow={setShow} wykonanie={wykonanie} grup={grup}/>
          </div>
        </div>
      </div>
    );
  }
}

function Header({ setShow }) {
  return (
    <div className={style.header}>
      <p className={style.title}>Brak</p>
      <Zamknij setShow={setShow} />
    </div>
  );
}
function Zamknij({ setShow }) {
  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        setShow(false);
      }}
      alt="Procesy"
    />
  );
}

// function Naklad({ value,setValue,wykonanie }) {
//   return (
//     <div className={style.labelinput}>
//       <label className={style.label}> Przeloty : {wykonanie.przeloty} </label>
//       <input
//         className={style.firma}
//         type="text"
//         value={value}
//         onChange={(event) => {
//             // const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ./-]+$/;
// if ( event.target.value === '' || reg_int.test(event.target.value)) {

//   setValue(event.target.value)
// }
          
//           }}
//       ></input>
//     </div>
//   );
// }
