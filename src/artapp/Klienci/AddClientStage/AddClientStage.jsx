import React, { useEffect, useState } from "react";
import axios from "axios";
import { ip } from "../../../Host";
import style from "./AddClientStage.module.css";
export default function AddClientStage({ isShowAddClientStage,showAddClientStage}) {
//   useEffect(() => {}, []);
const [klienci, setKlienci] = useState([]);

useEffect(() => {
    // getClients();


}, []);


async function getClients() {
    const res = await axios.get(ip + "lista-klientow");
    setKlienci([...res.data]);

}

  return (
    <div className={style.insertContainer}>
      <div className={style.addClient}>

    <Header />

      {/* <Tytul
        daneZamowienia={daneZamowienia}
        setDaneZamowienia={setDaneZamowienia}
        setSaveAs={setSaveAs}
      /> */}

      <div className={style.center}></div>

            <div className={style.row}>

                    <button
                    className={style.btn}
                    onClick={() => {
                        showAddClientStage(false)

                    }}
                    >
                    Zamknij
                    </button>
                    
                    {/* <button
                    className={style.btn}
                    onClick={() => {
                        // setSaveAs(true)
                        // postZamowienieObj();
                        // setShowSaveAs(!showSaveAs)
                    }}
                    >
                    Zapisz
                    </button> */}


            </div>
      </div>
      
    </div>
  );
}

// function Tytul({ daneZamowienia, setDaneZamowienia }) {
//   return (
//     <div className={style.col}>
//       <label className={style.label}> </label>
//       <input
//         className={style.tytul}
//         type="text"
//         defaultValue={daneZamowienia.tytul}
//         onChange={(event) => {
//           setDaneZamowienia({ ...daneZamowienia, tytul: event.target.value });
//         }}
//       ></input>
//     </div>
//   );
// }

function Header() {
  return (
    <div className={style.header}>
      <p className={style.title}>Dodaj klienta... </p>
    </div>
  );
}
