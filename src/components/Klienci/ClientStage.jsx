import React, { useEffect, useState ,useContext} from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import style from "./ClientStage.module.css";
import iconX from "../../assets/x.svg";
import iconDelete from "../../assets/trash.svg";
import TableClient from "./components/TableClient";
import iconTable from "../../assets/add.png";
import addIcon2 from "../../assets/addIcon2.svg";

import AddClient from "./components/AddClient";
import { ModalInsertContext } from "context/ModalInsertContext";
import { getClients } from "actions/getClients";
import { AppContext } from "context/AppContext";

export default function ClientStage({parent}) {

  const contextModalInsert = useContext(ModalInsertContext);
  const isShowAddClientStage = contextModalInsert.isShowAddClientStage;
  const showAddClientStage = contextModalInsert.showAddClientStage;
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia = contextModalInsert.setDaneZamowienia;
  const contextApp = useContext(AppContext);
  const setClients = contextApp.setClients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;

  useEffect(() => {
 getClients(setClients,setClientsWyszukiwarka )
  }, []);


  const [isShowAddClientPane, setShowAddClientPane] = useState(false);

  if(isShowAddClientStage){
      return (
    <div className={style.grayScaleBackground}>
      <div className={style.window}>
        <Header showAddClientStage={showAddClientStage} />
        <Finder >
          <Dodaj
            isShowAddClientPane={isShowAddClientPane}
            setShowAddClientPane={setShowAddClientPane}
          />
          <Szukaj/>
        </Finder>
        <TableClient
          parent={parent}
          daneZamowienia={daneZamowienia}
          setDaneZamowienia={setDaneZamowienia}
          setShowAddClientPane={setShowAddClientPane}
        />


          <AddClient
            isShowAddClientPane={isShowAddClientPane}
            setShowAddClientPane={setShowAddClientPane}
          />
     


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

function Szukaj() {
  const contextApp = useContext(AppContext);
  const setClients = contextApp.setClients;
  const clients = contextApp.clients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
  const clientsWyszukiwarka = contextApp.clientsWyszukiwarka;
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
  return (
    <input
      className={style.szukaj}
      type="text"
  
      placeholder="Szukaj..."
      onChange={(event) => {
        const m = [...clients];

        // let toFilter =  JSON.parse(JSON.stringify(klienciEdit))
        setClientsWyszukiwarka(
          m.filter((k) =>
            k.firma.toLowerCase().includes(event.target.value.toLowerCase())
          )
        );
      }}
    ></input>
  );
}

function Finder({ children }) {
  return <div className={style.finder}>{children}</div>;
}
function Footer({ children }) {
  return <div className={style.footer}>{children}</div>;
}

function Stage({ children }) {
  return <div className={style.stage}>{children}</div>;
}
