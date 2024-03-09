import React, { useState,useContext } from "react";
import style from "./AddClient.module.css";
import TokenContext from "../../Context/tokenContext";
import axios from "axios";
// import DecodeToken from "../Login/DecodeToken";
import { ip } from "../../../Host"

import { _opiekun } from "../../Zamowienia/ModalInsert/api";
import iconX from "../../../svg/x.svg"
import { updateClient } from "../actions/updateClient";
export default function EditClient({
  setShowEdit,
  getClients,
  test,
  rowID
  
}) {
  const [daneKlienta, setDaneKlienta] = useState({
   
    id: rowID.current.id,
    firma: rowID.current.firma,
    adres: rowID.current.adres,
    kod: rowID.current.kod,
    nip: rowID.current.nip,
    opiekun_id: rowID.current.opiekun_id,
    utworzyl_user_id: rowID.current.utworzyl_user_id,
  
  });

  return (
    <div className={style.window}>
      <Header setShowEdit={setShowEdit}></Header>
      <Firma daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />
      <Adres daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />

      <NIP daneKlienta={daneKlienta} setDaneKlienta={setDaneKlienta} />
      <Zapisz rowID={rowID} daneKlienta={daneKlienta} getClients={()=>getClients()} test={()=>test()} setShowEdit={setShowEdit} />
    </div>
  );
}
// const  editKlient  = async (daneKlienta,context,getClients,test,setShowEdit) =>{
  
// await axios.put(ip + "klienci", {
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

function Zapisz({daneKlienta,getClients,test,setShowEdit}) {
  const context = useContext(TokenContext);
    return (
      <button
        className={style.btn}
        onClick={() => {
          updateClient(daneKlienta,getClients,setShowEdit)
          // console.log("opiekun_id:"+ daneKlienta.opiekun_id)
          // console.log("utworzyl_user_id:"+ daneKlienta.utworzyl_user_id)
          // editKlient(daneKlienta,context,getClients,test,setShowEdit)
  

          //  context.getUsersList()
          //  getUserList2(context)
        //   showAddClientStage(false);
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

function Adres({ daneKlienta, setDaneKlienta }) {
    return (
      <div className={style.labelinput}>
        <label className={style.label}> Adres </label>
        <input
          className={style.firma}
          type="text"
          value={daneKlienta.adres}
          onChange={(event) => {
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ".-]+$/;
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
    const context = useContext(TokenContext);
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
                const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
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