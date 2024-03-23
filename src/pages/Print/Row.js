import React from "react";
import style from "../Print/Row.module.css";
import { useState, useEffect, forwardRef, useImperativeHandle,useContext } from "react";
import {AppContext} from "../../context/AppContext";

import axios from "axios";
import { IP } from "../../utils/Host2";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Row = forwardRef((props, ref) => {
  const [selected, setSelected] = useState(props.isSelected);
  const [statusCombo, setStatusCombo] = useState();

  const czas = props.czasDruku;
  const token = useContext(AppContext);

  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    setStatusCombo(props.status);

 

  }, []);

  useEffect(() => {

    setSelected(props.isSelected)
  
  }, [props.isSelected]);

  // useImperativeHandle(ref, () => ({
  //   confirm() {
  //     console.log("status temp: ");
 
      
  //   },


  // }));

  function selectRowMulti(){
    setSelected(!selected);
    if (!selected) {
      token.setRowSelected([...token.rowSelected, props.id]);
    } else {
      var indeks = token.rowSelected.indexOf(props.id)
      token.rowSelected.splice(indeks, 1)
    
    }
    
props.zaznacz(props.id)

    
  }
  function doItWhenReady(){
    props.odznacz(); 
    
  }

  function process(callback) {
    token.setRowSelected(props.id)
    setSelected(true);
    if (typeof callback !== 'function') {
         callback = false;   
    }
    
    if (callback) {
         callback();  
        
    }  
   
}
    // zwykle odznaczanie
  function selectRowSingle(){
    props.odznacz();
    token.setRowSelected([])
  }

  // odznaczanie przygotowane do zaznaczania grupowego z shiftem
  // function selectRowSingle(){
  //   process(doItWhenReady);
  // }


  function ChceckStatus(statusCombo) {
    if (
      (statusCombo === "Wydrukowane") ^
      (statusCombo === "Sfalcowane") ^
      (statusCombo === "Falcowanie")
    )
      return style.wydrukowane;
    if ((statusCombo === "RIP") ^ (statusCombo === "Zaświecone"))
      return style.rIPzaswiecone;
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

  const statusList ={
    'Nowe': '1',
    'Pliki': '2',
    'Akcept': '3',
    'RIP': '4',
    'Zaświecone': '5',
    'Drukowanie': '6',
    'Wydrukowane': '7',
    'Falcowanie': '8',
    'Sfalcowane': '9',
    'Uszlachetnione': '10',
    'Oprawione': '11',
    'Oddane': '12',
    'Anulowane': '13',
    'Wstrzymane': '14',
    'Nieaktywne': '15',
  }
  

  async function handleEditStatus(status) {


    const res = await axios.put(IP + "updateStatusWWW/", {
      id: props.id,
      value: statusList[status],
      idzlecenia: props.id_zlecenia,
      user_id: sessionStorage.getItem("id"),
      token: sessionStorage.getItem("token")
    });

    if (res.status === 201) {

      setStatusCombo(status);


    } else {
      if (res.data.Error === "Wrong token") {
        navigate("/Login");
      }
      console.log("Błąd");
    }
  };






  return (
   
    <div         id={props.id}
          className={selected ? 
                                ChceckStatus(statusCombo) + " " + style.body + " " + style.selected 
                                :
                                ChceckStatus(statusCombo) + " " + style.body
                    }
            onClick={(event) => {
                                  if (event.ctrlKey) {
                                    selectRowMulti();
                                  } else {
                                    selectRowSingle();
                                  }
                                }
                    }
      >

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
            handleEditStatus(e.target.value);        
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

      {/* <div className={style.checbox}>
        <input
          className={style.checboxinput}
          checked={selected}
          type="checkbox"
          id=""
          name=""
          value=""
          onChange={() => {
            selectRowMulti();
          }
          }
        />
      </div> */}
    </div>
  );
});

export default Row;
