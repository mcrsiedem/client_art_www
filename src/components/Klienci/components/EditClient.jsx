import React, { useState,useContext } from "react";
import style from "./AddClient.module.css";

import iconX from "../../../assets/x.svg"
import { updateClient } from "../actions/updateClient";
import { AppContext } from "../../../context/AppContext";
export default function EditClient({
  setShowEdit,
  rowID
  
}) {
  const [daneKlienta, setDaneKlienta] = useState({
   
    id: rowID.current.id,
    firma: rowID.current.firma,
    firma_nazwa: rowID.current.firma_nazwa,
    adres: rowID.current.adres,
    kod: rowID.current.kod,
    nip: rowID.current.nip,
    opiekun_id: rowID.current.opiekun_id,
    utworzyl_user_id: rowID.current.utworzyl_user_id,
  
  });

  return (
    <div className={style.grayScaleBackground}>
    <div className={style.window}>
      <Header setShowEdit={setShowEdit}></Header>

      <div className={style.center}>
      <Firma daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />
      <Firma_nazwa_skrocona daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />

      <Adres daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />

      <NIP daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />
    </div>
    <div className={style.footer}>
      <Zapisz rowID={rowID} daneKlienta={daneKlienta} setShowEdit={setShowEdit} />
      </div>

    </div>
    </div>
  );
}
// const  editKlient  = async (daneKlienta,context,getClients,test,setShowEdit) =>{
  
// await axios.put(IP + "klienci", {
//     firma: daneKlienta.firma,
//     adres: daneKlienta.adres,
//     kod: daneKlienta.kod,
//     nip: daneKlienta.nip,
//     opiekun_id: daneKlienta.opiekun_id,
//     utworzyl_user_id: daneKlienta.opiekun_id,

//   })
//   .then((res2) => {
//      getClients()
//      setShowEdit(false)
//   })
   

// }

// const getUserList2 = (context) => {
  
//   context.getUsersList()
// }

function Zapisz({daneKlienta,setShowEdit}) {
  const contextApp = useContext(AppContext);
  const setClients = contextApp.setClients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
    return (
      <button
        className={style.btn}
        onClick={() => {
          updateClient(daneKlienta,setClients,setClientsWyszukiwarka,setShowEdit)
        }}
      >
        Zapisz
      </button>
    );
  }
  

function Header({setShowEdit}) {
  return (
    <div className={style.header}>
      <p className={style.title}>Edytuj...</p>
      <Zamknij setShowEdit={setShowEdit}/>
    </div>
  );
}
function Zamknij({setShowEdit}) {
  return (
    <img
    className={style.zamknij_icon}
     src={iconX}
     onClick={() => {
      setShowEdit(false)

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
          const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ"-.]+$/;
          if (event.target.value === "" || re.test(event.target.value)) {
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
          const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ".,-]+$/;
          if (event.target.value === "" || re.test(event.target.value)) {
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
          value={daneKlienta.adres}
          onChange={(event) => {
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ./-]+$/;
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
      <div className={style.labelinput_nip}>

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
            value={daneKlienta.nip}
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
        value={daneKlienta.opiekun_id}
        onChange={(event) => {
            setDaneKlienta({...daneKlienta, opiekun_id: event.target.value});
     
        }}
      >
        {context.users.filter(x=> x.Dzial ==2).map((option) => (
          <option key={option.id} value={option.id}>
          {option.Imie} {option.Nazwisko} 
          </option>
        ))}
      </select>
    </div>


      </div>
    );
  }