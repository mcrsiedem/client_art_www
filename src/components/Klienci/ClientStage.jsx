import React, {useRef,useEffect, useState ,useContext} from "react";
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
import DecodeToken from "pages/Login/DecodeToken";

export default function ClientStage({parent}) {

  const contextModalInsert = useContext(ModalInsertContext);
  const isShowAddClientStage = contextModalInsert.isShowAddClientStage;
  const showAddClientStage = contextModalInsert.showAddClientStage;
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia = contextModalInsert.setDaneZamowienia;
  const contextApp = useContext(AppContext);
  const setClients = contextApp.setClients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
  const ref2 = useRef(null);
  useEffect(() => {
 getClients(setClients,setClientsWyszukiwarka )
//  dragElement(document.getElementById("mydiv"));
  }, []);


  const [isShowAddClientPane, setShowAddClientPane] = useState(false);

  if(isShowAddClientStage){
      return (
    <div id="mydiv" className={style.grayScaleBackground}>
      {/* <div draggable={ ()=>dragElement(document.getElementById("mydiv"))} id="mydivheader" className={style.window}> */}
      <div  className={style.window}>
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


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
if(elmnt!=null){
    if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

}

  


  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function Dodaj({ setShowAddClientPane }) {
  return (
    <img
      className={style.dodaj_klienta}
      src={addIcon2}
      onClick={() => {
        if(DecodeToken(sessionStorage.getItem("token")).klienci_zapis==1){
          setShowAddClientPane(true);
        }

        

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
