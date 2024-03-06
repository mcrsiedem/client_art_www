import React, { useEffect, useState } from "react";
import axios from "axios";
import { ip } from "../../Host";
import style from "./ClientStage.module.css";
import TableClient from "./components/TableClient"
export default function ClientStage({
  isShowAddClientStage,
  showAddClientStage,
  daneZamowienia,
  setDaneZamowienia,
  klienci, setKlienci
}) {
  //   useEffect(() => {}, []);


  // async function getClients() {
  //   const res = await axios.get(ip + "lista-klientow");
  //   setKlienci([...res.data]);
  // }

  useEffect(() => {
    //  getClients();
  }, []);


  return (
    <div className={style.grayScaleBackground}>
      <div className={style.window}>

        <Header />

        <Stage>
          <TableClient klienci={klienci}   daneZamowienia={daneZamowienia}  setDaneZamowienia={setDaneZamowienia}/>
          <Zamknij showAddClientStage={showAddClientStage} />
        </Stage>


      </div>
    </div>
  );
}

function Header() {
  return (
    <div className={style.header}>
      <p className={style.title}>Lista klientów </p>
    </div>
  );
}

function Stage({ children }) {
  return (
  <div className={style.stage}>
    {children}
  </div>
  )
  
}

function Zamknij({ showAddClientStage }) {
  return (
    <button
      className={style.btn}
      onClick={() => {
        showAddClientStage(false);
      }}
    >
      Zamknij
    </button>
  );
}
