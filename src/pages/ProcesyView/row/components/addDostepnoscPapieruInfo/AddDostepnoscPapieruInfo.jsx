import React, { useState, useContext } from "react";
import style from "./AddDostepnoscPapieruInfo.module.css";
import iconX from "assets/x.svg";
import Zapisz from "./Zapisz";
import { reg_int, reg_txt } from "utils/initialvalue";
export default function AddDostepnoscPapieruInfo({ setShow, show,value, setValue,grup }) {

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
            <Info  value={value} setValue={setValue} grup={grup}/>
          </div>
          <div className={style.footer}>
            <Zapisz setShow={setShow} wykonanie={grup} value={value}  grup={grup}/>
          </div>
        </div>
      </div>
    );
  }
}

function Header({ setShow }) {
  return (
    <div className={style.header}>
      <p className={style.title}>Dostępność papieru od :</p>
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

function Info({ value,setValue,grup }) {
  return (
    <div className={style.labelinput}>
      {/* <label className={style.label}> Papier dostępny od: </label> */}
      <input
        className={style.firma}
        type="text"
        defaultValue={grup.papier_info}
        onChange={(event) => {
            // const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ./-]+$/;

  setValue(event.target.value)

          
          }}
      ></input>
    </div>
  );
}
