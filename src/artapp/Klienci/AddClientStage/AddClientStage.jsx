import React, { useEffect, useState } from "react";
import axios from "axios";
import { ip } from "../../../Host";
import style from "./AddClientStage.module.css";
export default function AddClientStage({
  isShowAddClientStage,
  showAddClientStage,
}) {
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
    <div className={style.grayScaleBackground}>
      <div className={style.window}>
        <Header />

        <Stage>
          <Zamknij showAddClientStage={showAddClientStage} />
        </Stage>

        
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className={style.header}>
      <p className={style.title}>Dodaj klienta... </p>
    </div>
  );
}

function Stage({ children }) {
  return <div className={style.stage}>{children}</div>;
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
