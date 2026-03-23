import React, { useState } from "react";
import style from "./AddRealizacjaOprawa.module.css";
import iconX from "assets/x.svg";
import Zapisz from "./Zapisz";
import { reg_int } from "utils/initialvalue";

export default function AddRealizacjaOprawa({ setShow, show, grup, value, setValue }) {
  // Dodajemy lokalny stan dla checkboxa
  const [isBrak, setIsBrak] = useState(false);

  if (!show) return null;

  return (
    <div className={style.grayScaleBackground}>
      <div
        onDoubleClick={() => {
          console.clear();
          console.log("daneKlienta : ");
        }}
        className={style.window}
      >
        <Header setShow={setShow} />
        
        <div className={style.center}>
          <div className={style.columnContainer}>
                {/* Sekcja Nakładu */}
                
                {/* Sekcja Checkboxa "Dodaj jako brak" */}
                <Naklad grup={grup} value={value} setValue={setValue} />
                <div className={style.checkboxWrapper}>
                  <input
                    type="checkbox"
                    id="isBrakCheckbox"
                    className={style.checkboxInput}
                    checked={isBrak}
                    onChange={(e) => setIsBrak(e.target.checked)}
                  />
                  <label htmlFor="isBrakCheckbox" className={style.checkboxLabel}>
                    Dodaj jako brak
                  </label>
                </div>
          </div>
        </div>

        <div className={style.footer}>
          {/* Przekazujemy isBrak do komponentu Zapisz, aby mógł trafić do bazy/stanu */}
          <Zapisz 
            setShow={setShow} 
            grup={grup} 
            value={value} 
            isBrak={isBrak} 
          />
        </div>
      </div>
    </div>
  );
}

function Header({ setShow }) {
  return (
    <div className={style.header}>
      <p className={style.title}>Dodaj realizację</p>
      <Zamknij setShow={setShow} />
    </div>
  );
}

function Zamknij({ setShow }) {
  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => setShow(false)}
      alt="Zamknij"
    />
  );
}

function Naklad({ value, setValue }) {
  return (
    <div className={style.labelinput}>
      <label className={style.label}> Nakład </label>
      <input
        className={style.firma}
        type="text"
        value={value}
        onChange={(event) => {
          if (event.target.value === '' || reg_int.test(event.target.value)) {
            setValue(event.target.value);
          }
        }}
      />
    </div>
  );
}