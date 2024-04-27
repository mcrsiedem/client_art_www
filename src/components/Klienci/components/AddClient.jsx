import React, { useState,useContext } from "react";
import style from "./AddClient.module.css";
import { addClient } from "../actions/addClient";

import iconX from "../../../assets/x.svg"
import DecodeToken from "../../../pages/Login/DecodeToken";
import { useCookies } from "react-cookie";
import { AppContext } from "../../../context/AppContext";

export default function AddClientPane({
  setShowAddClientPane,
  getClients,
  test
  
}) {
  const [cookies, setCookie] = useCookies();
  const [daneKlienta, setDaneKlienta] = useState({
    firma: "",
    adres: "",
    kod: "",
    nIP: "",
    opiekun_id: DecodeToken(sessionStorage.getItem("token")).id, // tutaj trzeba przekazać zalogowane usera
    utworzyl_user_id: DecodeToken(sessionStorage.getItem("token")).id, // tutaj trzeba przekazać zalogowane usera
  
  });

  return (
    <div className={style.window}>
      <Header setShowAddClientPane={setShowAddClientPane}></Header>
      <Firma daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />
      <Adres daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />

      <NIP daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />
      <Zapisz daneKlienta={daneKlienta} getClients={()=>getClients()} test={()=>test()} setShowAddClientPane={setShowAddClientPane} />
    </div>
  );
}


function Zapisz({daneKlienta,getClients,test,setShowAddClientPane}) {
 // const [cookies, setCookie] = useCookies();

    return (
      <button
        className={style.btn}
        onClick={() => {
           addClient(daneKlienta,getClients,test,setShowAddClientPane)
       
        }}
      >
        Zapisz
      </button>
    );
  }
  

function Header({setShowAddClientPane}) {
  return (
    <div className={style.header}>
      <p className={style.title}>Dodaj klienta </p>
      <Zamknij setShowAddClientPane={setShowAddClientPane}/>
    </div>
  );
}
function Zamknij({setShowAddClientPane}) {
  return (
    <img
    className={style.zamknij_icon}
     src={iconX}
     onClick={() => {
      setShowAddClientPane(false)

     }}
     alt="Procesy"
    />
  );
}

function Firma({ daneKlienta, setDaneKlienta }) {
  return (
    <div className={style.labelinput}>
      <label className={style.label}> Firma </label>
      <input
        className={style.firma}
        type="text"
        value={daneKlienta.firma}
        onChange={(event) => {
          const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ".,-]+$/;
          if (event.target.value === "" || re.test(event.target.value)) {
            setDaneKlienta({ ...daneKlienta, firma: event.target.value });
          }
        }}
      >

      </input>
    </div>
  );
}

function Adres({ daneKlienta, setDaneKlienta }) {
    return (
      <div className={style.labelinput}>
        <label className={style.label}> Adres </label>
        <input
          className={style.firma}
          type="text"
          value={daneKlienta.adres}
          onChange={(event) => {
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ".,-]+$/;
            if (event.target.value === "" || re.test(event.target.value)) {
              setDaneKlienta({ ...daneKlienta, adres: event.target.value });
            }
          }}
        >
  
        </input>
      </div>
    );
  }



  function NIP({ daneKlienta, setDaneKlienta }) {
    const context = useContext(AppContext);
    return (
      <div className={style.labelinput_nIP}>

        <div className={style.labelinput}>
                        <label className={style.label}> Kod </label>
                <input
                className={style.firma}
                type="text"
                value={daneKlienta.kod}
                onChange={(event) => {
                    const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
                    if (event.target.value === "" || re.test(event.target.value)) {
                    setDaneKlienta({ ...daneKlienta, kod: event.target.value });
                    }
                }}
                >
        
                </input>
        </div>

        <div className={style.labelinput}>
            <label className={style.label}> NIP </label>
            <input
            className={style.firma}
            type="text"
            value={daneKlienta.nIP}
            onChange={(event) => {
                const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ-]+$/;
                if (event.target.value === "" || re.test(event.target.value)) {
                setDaneKlienta({ ...daneKlienta, nIP: event.target.value });
                }
            }}
            >
    
            </input>


        </div>

        <div className={style.labelinput}>
      <label className={style.label}> Opiekun </label>
      <select
        className={style.firma}
        value={daneKlienta.opiekun_id}
        onChange={(event) => {
            setDaneKlienta({...daneKlienta, opiekun_id: event.target.value});
     
        }}
      >
        {context.users
        .filter(x => x.Dzial == 2)
        .map((option) => (
          <option key={option.id} value={option.id}>
          {option.Imie} {option.Nazwisko} 
          </option>
        ))}
      </select>
    </div>


      </div>
    );
  }