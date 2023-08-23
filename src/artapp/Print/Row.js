import React from "react";
import style from "../Print/Row.module.css";
import { useState, useEffect, forwardRef, useImperativeHandle,useContext } from "react";
import TokenContext from "../tokenContext";

const Row = forwardRef((props, ref) => {
  const [selected, setSelected] = useState(false);
  const [statusCombo, setStatusCombo] = useState();
  const [statusTemp, setStatusTemp] = useState();
  const czas = props.czasDruku;
  const token = useContext(TokenContext);

  useEffect(() => {
    setStatusCombo(props.status);
   // console.log("render")
  }, []);

  useEffect(() => {
   
    console.log(selected)
  }, [selected]);

  useImperativeHandle(ref, () => ({
    confirm() {
      setStatusCombo(statusTemp);
    },
  }));

  function ChceckStatus(statusCombo) {
    if (
      (statusCombo === "Wydrukowane") ^
      (statusCombo === "Sfalcowane") ^
      (statusCombo === "Falcowanie")
    )
      return style.wydrukowane;
    if ((statusCombo === "RIP") ^ (statusCombo === "Zaświecone"))
      return style.ripzaswiecone;
    if (statusCombo === "Akcept") return style.akcept;
    if (statusCombo === "Nowe") return style.nowe;
    if (statusCombo === "Pliki") return style.pliki;
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
    <div id={props.id} className={ChceckStatus(statusCombo) + " " + style.body}
      onClick={() => {
        token.setRowSelected([...token.rowSelected, props.id]);
        setSelected(prevState =>(!prevState));
      }
      }>

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
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              props.handleEditBlachy(event.target.value);
              document.activeElement.blur();
            }
          }}
        />
      </div>

      <div className={style.comboContener}>
        <select
          className={style.combo}
          value={statusCombo}
          onChange={(e) => {
            //  (setStatusComb ) =>{

            //   props.handleEditStatus(e.target.value);
            //   setStatusCombo(e.target.value)
            //   document.activeElement.blur();
            // }
            props.handleEditStatus(e.target.value);

            setStatusTemp(e.target.value);
            document.activeElement.blur();
          }}
        >
          <option value="Nowe"> Nowe </option>
          <option value="Pliki"> Pliki </option>
          <option value="Akcept"> Akcept </option>
          <option value="RIP"> RIP </option>
          <option value="Zaświecone"> Zaświecone </option>
          <option value="Wydrukowane"> Wydrukowane </option>
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
});

export default Row;
