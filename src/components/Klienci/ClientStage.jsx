import React, { useEffect, useState } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import style from "./ClientStage.module.css";
import iconX from "../../assets/x.svg";
import iconDelete from "../../assets/trash.svg";
import TableClient from "./components/TableClient";
import iconTable from "../../assets/add.png";
import addIcon2 from "../../assets/addIcon2.svg";

import AddClient from "./components/AddClient";

export default function ClientStage({
  isShowAddClientStage,
  showAddClientStage,
  daneZamowienia,
  setDaneZamowienia,
  klienci,
  setKlienci,
  klienciWyszukiwarka,
  setKlienciWyszukiwarka,
}) {

  async function getClients() {
    const res = await axios.get(IP + "lista-klientow");
    setKlienci([...res.data]);
    setKlienciWyszukiwarka([...res.data]);
  }

  useEffect(() => {
    getClients();
  }, []);

  const [isShowAddClientPane, setShowAddClientPane] = useState(false);
  if(isShowAddClientStage){
      return (
    <div className={style.grayScaleBackground}>
      <div className={style.window}>
        <Header showAddClientStage={showAddClientStage} />
        <Finder klienci={klienci} setKlienci={setKlienci}>
          <Dodaj
            isShowAddClientPane={isShowAddClientPane}
            setShowAddClientPane={setShowAddClientPane}
          />
          <Szukaj
            klienci={klienci}
            setKlienci={setKlienci}
            setKlienciWyszukiwarka={setKlienciWyszukiwarka}
          />
        </Finder>
        <TableClient
          klienciWyszukiwarka={klienciWyszukiwarka}
          daneZamowienia={daneZamowienia}
          setDaneZamowienia={setDaneZamowienia}
          getClients={()=>getClients()}
          setShowAddClientPane={setShowAddClientPane}
        />

        {isShowAddClientPane && (
          <AddClient
            isShowAddClientPane={isShowAddClientPane}
            setShowAddClientPane={setShowAddClientPane}
            getClients= {()=>getClients()}
          />
        )}


      </div>
    </div>
  );
  }
  

}

function Dodaj({ setShowAddClientPane }) {
  return (
    <img
      className={style.dodaj_klienta}
      src={addIcon2}
      onClick={() => {
        setShowAddClientPane(true);
        //  showAddClientStage(true)
        // setShowOprawaElementyStage(true);
        // setOprawa_row(row);
      }}
      alt="Procesy"
    />
  );
}

function Zamknij({ showAddClientStage }) {
  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        showAddClientStage(false);
      }}
      alt="Procesy"
    />
  );
}






function Header({ showAddClientStage }) {
  return (
    <div className={style.header}>
      <p className={style.title}>Lista klientów </p>
      <Zamknij showAddClientStage={showAddClientStage} />
    </div>
  );
}

function Szukaj({
  klienci,
  setKlienci,
  klienciWyszukiwarka,
  setKlienciWyszukiwarka,
}) {
  const klienciEdit = JSON.parse(JSON.stringify(klienci));
  return (
    <input
      className={style.szukaj}
      type="text"
  
      placeholder="Szukaj..."
      onChange={(event) => {
        const m = [...klienci];

        // let toFilter =  JSON.parse(JSON.stringify(klienciEdit))
        setKlienciWyszukiwarka(
          m.filter((k) =>
            k.firma.toLowerCase().includes(event.target.value.toLowerCase())
          )
        );
      }}
    ></input>
  );
}

function Finder({ children, klienci, setKlienci }) {
  return <div className={style.finder}>{children}</div>;
}
function Footer({ children }) {
  return <div className={style.footer}>{children}</div>;
}

function Stage({ children, klienci, setKlienci }) {
  return <div className={style.stage}>{children}</div>;
}
