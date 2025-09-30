import React, { useState, useContext } from "react";
import style from "./AddRealizacjaOprawa.module.css";
import iconX from "assets/x.svg";
import Zapisz from "./Zapisz";
import { reg_int } from "utils/initialvalue";
export default function AddRealizacjaOprawa({ setShow, show, grup,value, setValue }) {

  if (show) {
    return (
      <div className={style.grayScaleBackground}>
        <div
          onDoubleClick={() => {
            console.clear();
            console.log("daneKlienta : ");
          }}
          className={style.window}
        >
          <Header setShow={setShow}></Header>
          <div className={style.center}>
            <Naklad grup={grup} value={value} setValue={setValue}/>
          </div>
          <div className={style.footer}>
            <Zapisz setShow={setShow} grup={grup} value={value} />
          </div>
        </div>
      </div>
    );
  }
}

function Header({ setShow }) {
  return (
    <div className={style.header}>
      <p className={style.title}>Dodaj realizację </p>
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

function Naklad({ grup, value,setValue }) {
  return (
    <div className={style.labelinput}>
      <label className={style.label}> Nakład </label>
      <input
        className={style.firma}
        type="text"
        value={value}
        onChange={(event) => {
            // const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ./-]+$/;
if ( event.target.value === '' || reg_int.test(event.target.value)) {

  setValue(event.target.value)
}
          
          }}
      ></input>
    </div>
  );
}
