import React, { useState,useContext } from "react";
import style from "./AddClient.module.css";
import { addClient } from "../actions/addClient";

import iconX from "../../../assets/x.svg"
import DecodeToken from "../../../pages/Login/DecodeToken";
import { useCookies } from "react-cookie";
import { AppContext } from "../../../context/AppContext";

export default function AddClientPane({
  setShowAddClientPane,
  isShowAddClientPane
  
}) {

  const initialKlient ={
    firma: "",
    firma_nazwa: "",
    adres: "",
    kod: "",
    nip: "",
    opiekun_id: DecodeToken(sessionStorage.getItem("token")).id, // tutaj trzeba przekazać zalogowane usera
    utworzyl_user_id: DecodeToken(sessionStorage.getItem("token")).id, // tutaj trzeba przekazać zalogowane usera
  
}
  const [cookies, setCookie] = useCookies();
  const [daneKlienta, setDaneKlienta] = useState(initialKlient);
if(isShowAddClientPane){
    return (
    <div className={style.grayScaleBackground}>
    <div onDoubleClick={()=>{
        console.clear()
  
        console.log("daneKlienta : ",daneKlienta)
     

    }} className={style.window}>
      <Header setShowAddClientPane={setShowAddClientPane}></Header>

      <div className={style.center}>
      <Firma daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />
      <Firma_nazwa_skrocona daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />
      <Adres daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />
      <NIP daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />
      </div>

        <div className={style.footer}>
      <Zapisz daneKlienta={daneKlienta} setShowAddClientPane={setShowAddClientPane} setDaneKlienta={setDaneKlienta} initialKlient={initialKlient} />
      </div>
      
    </div>
    </div>
  );
}

}


function Zapisz({daneKlienta,setShowAddClientPane,setDaneKlienta,initialKlient}) {
 // const [cookies, setCookie] = useCookies();
    const contextApp = useContext(AppContext);
    const setClients = contextApp.setClients;
    const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
    return (
      <button
        className={style.btn}
        onClick={() => {
           addClient({daneKlienta,setClients,setClientsWyszukiwarka,setShowAddClientPane,setDaneKlienta,initialKlient})
        
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
        value={daneKlienta?.firma}
        onChange={(event) => {
          // const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ"”„.,-]+$/;
          // if (event.target.value === "" || re.test(event.target.value)) {
          if (event.target.value !== "" ) {
            setDaneKlienta({ ...daneKlienta, firma: event.target.value });
          }
        }}
      >

      </input>
    </div>
  );
}
function Firma_nazwa_skrocona({ daneKlienta, setDaneKlienta }) {
  return (
    <div className={style.labelinput}>
      <label className={style.label}> Nazwa skrócona </label>
      <input
        className={style.firma}
        title="Nazwa skrócona klienta"
        type="text"
        value={daneKlienta?.firma_nazwa}
        onChange={(event) => {
          // const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ"”„.,-]+$/;
          // if (event.target.value === "" || re.test(event.target.value)) {
          if (event.target.value !== "" ) {
            setDaneKlienta({ ...daneKlienta, firma_nazwa: event.target.value });
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
          value={daneKlienta?.adres}
          onChange={(event) => {
            //  const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ"-.]+$/;

            // if (event.target.value === "" || re.test(event.target.value)) {
            if (event.target.value !== "" ) {
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
      <div className={style.labelinput_nip}>

        <div className={style.labelinput}>
                        <label className={style.label}> Kod </label>
                <input
                className={style.firma}
                type="text"
                value={daneKlienta?.kod}
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
            value={daneKlienta?.nip}
            onChange={(event) => {
                const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ-]+$/;
                if (event.target.value === "" || re.test(event.target.value)) {
                setDaneKlienta({ ...daneKlienta, nip: event.target.value });
                }
            }}
            >
    
            </input>


        </div>

        <div className={style.labelinput}>
      <label className={style.label}> Opiekun </label>
      <select
        className={style.firma}
        value={daneKlienta?.opiekun_id}
        onChange={(event) => {
            setDaneKlienta({...daneKlienta, opiekun_id: event.target.value});
     
        }}
      >
        {context.users

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