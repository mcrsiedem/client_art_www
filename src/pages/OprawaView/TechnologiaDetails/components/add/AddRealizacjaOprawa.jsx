import React, { useState,useContext } from "react";
import style from "./AddRealizacjaOprawa.module.css";


import iconX from "assets/x.svg"
import { AppContext } from "context/AppContext";


export default function AddRealizacjaOprawa({  setShow,  show, grup }) {
  const [value, setValue] = useState();

if(show){
    return (
    <div className={style.grayScaleBackground}>
    <div onDoubleClick={()=>{
        console.clear()
        console.log("daneKlienta : ")
    }} className={style.window}>
      <Header setShow={setShow}></Header>
      <div className={style.center}>
        <Naklad grup={grup} value={value}/>
      </div>
      <div className={style.footer}>
      <Zapisz setShow={setShow}/>
      </div>
    </div>
    </div>
  );
}
}





function Zapisz({setShow}) {
 // const [cookies, setCookie] = useCookies();
    const contextApp = useContext(AppContext);
    const setClients = contextApp.setClients;
    const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
    return (
      <button
        className={style.btn}
        onClick={() => {
          //  addClient({daneKlienta,setClients,setClientsWyszukiwarka,setShowAddClientPane,setDaneKlienta,initialKlient})
        }}
      >
        Zapisz
      </button>
    );
  }
  

function Header({setShow}) {
  return (
    <div className={style.header}>
      <p className={style.title}>Dodaj realizację </p>
      <Zamknij setShow={setShow}/>
    </div>
  );
}
function Zamknij({setShow}) {
  return (
    <img
    className={style.zamknij_icon}
     src={iconX}
     onClick={() => {
      setShow(false)

     }}
     alt="Procesy"
    />
  );
}

function Naklad({ grup,value}) {
  return (
    <div className={style.labelinput}>
      <label className={style.label}> Nakład </label>
      <input
        className={style.firma}
        type="text"
        value={value}
        onChange={(event) => {

        }}
      >

      </input>
    </div>
  );
}
