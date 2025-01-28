import iconTable from "assets/table.svg";

import iconLock from "assets/lock2.svg";
import iconUnLock from "assets/unLock.svg";
import iconX from "assets/x.svg";
import React, { useState, useContext } from "react";
import style from "./HeaderModal.module.css";
import axios from "axios";
import { IP } from "utils/Host";
import { SocketContext } from "context/SocketContext";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { useAuth } from "hooks/useAuth";
import { ModalInsertContext } from "context/ModalInsertContext";
import { initialDane,initialProdukty,initialElementy,initialFragmenty,initialOprawa,initialProcesy } from "utils/initialvalue";



export default function Header({
  setOpenModalInsert,
  postZamowienieObj,
  setShowSaveAs,
  setSaveAs,
  stanOtwarciaZamowienia,
  row,
  readOnly,
  setReadOnly
}) {
  const contextModalInsert = useContext(ModalInsertContext);

  const elementy = contextModalInsert.elementy;
  return (
    <>
      <div className={style.container}>
     
        <div className={style.title}>
            <LockDradDrop/>
        
            Zamówienie...{" "}
              {readOnly && (
                <div>
                  otwarte {stanOtwarciaZamowienia.data} przez{" "}
                  {stanOtwarciaZamowienia.user}
                </div>
              )}
              
        </div>


        <div className={style.center}>

        </div>

        <div className={style.buttons}>
              
              {/* <ShowStany setOpenModalStany={setOpenModalStany} openModalStany={openModalStany} setInfo={setInfo} /> */}

          {readOnly ? (
                <> </>
              ) :
              (
                <>
                <PokazStany/>
                  <Zapisz
                    setShowSaveAs={setShowSaveAs}
                    postZamowienieObj={postZamowienieObj}
                    setSaveAs={setSaveAs}
                  />

                  {/* <ZapiszJako
                    postZamowienieObj={postZamowienieObj}
                    setShowSaveAs={setShowSaveAs}
                    setSaveAs={setSaveAs}
                  /> */}
                </>
              )
          }

          <Zamknij row={row} setOpenModalInsert={setOpenModalInsert} readOnly={readOnly} setReadOnly={setReadOnly}/>
        </div>
      </div>
    </>
  );
}



const LockDradDrop = () =>{
  const contextModalInsert = useContext(ModalInsertContext);
  return(
    <img
    onClick={() => {
      // wyłącza drag drop w tabelkach
      contextModalInsert.setLockDragDrop(
        !contextModalInsert.lockDragDrop
      );
    }}
    className={style.icon}
    src={contextModalInsert.lockDragDrop ? iconUnLock : iconLock}
  />
  )
}

const ShowStany = ({setOpenModalStany,openModalStany,setInfo}) =>{
  const contextModalInsert = useContext(ModalInsertContext);
  const elementy = contextModalInsert.elementy;
  return(
    <img
    onClick={() => {
      setOpenModalStany(!openModalStany);

      setInfo(
        Math.max(
          ...elementy.map((obj) => {
            return obj.id;
          })
        )
      );
    }}
    className={style.icon}
    src={iconTable}
    alt="table"
  />
  )
}
function Zapisz({ postZamowienieObj, setShowSaveAs, setSaveAs }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const isSaveButtonDisabled = contextModalInsert.isSaveButtonDisabled;
  const produkty= contextModalInsert.produkty;



  return (
    <button

      onClick={async () => {

        if(produkty[0].naklad != 0){
                 setSaveAs(false);
        postZamowienieObj();
        setSaveButtonDisabled(true);
        }
 

        // setOrderClosed
      }}
      className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
      disabled={isSaveButtonDisabled}
    >
      Zapisz
    </button>
  );
}

function ZapiszJako({

  postZamowienieObj,
  setShowSaveAs,
  setSaveAs,
}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const isSaveButtonDisabled = contextModalInsert.isSaveButtonDisabled;
  return (
    <button
      disabled={isSaveButtonDisabled}
      onClick={async () => {
        setShowSaveAs(true);
        setSaveAs(true);
        
      }}
      className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
    >
      Zapisz jako...
    </button>
  );
}



function Zamknij({readOnly,setReadOnly}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const selectedZamowienie = contextModalInsert.selectedZamowienie;
  const navigate = useNavigate();

  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={async() => {
        
      if (!readOnly) {
        const res = await axios.put(IP + "setOrderClosed", {
          id: selectedZamowienie.id,
        }).then(res=>{
          // setReadOnly(true)
          navigate("/Zamowienia");
        });

        
      } else{
              contextModalInsert.setDaneZamowienia(initialDane)
      contextModalInsert.setProdukty(initialProdukty)
      contextModalInsert.setElementy(initialElementy)
      contextModalInsert.setFragmenty(initialFragmenty)
      contextModalInsert.setOprawa(initialOprawa)
      contextModalInsert.setProcesyElementow(initialProcesy)
      navigate("/Zamowienia");
      }

    }
      }
      alt="Procesy"
    />

  );
}
function PokazStany({  }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const produkty = contextModalInsert.produkty;
  const elementy = contextModalInsert.elementy;
  const fragmenty = contextModalInsert.fragmenty;
  const oprawa = contextModalInsert.oprawa;
  const pakowanie = contextModalInsert.pakowanie;
  const procesyElementow = contextModalInsert.procesyElementow;
  const kosztyDodatkoweZamowienia = contextModalInsert.kosztyDodatkoweZamowienia;

  const appcontext = useContext(AppContext);
  const listaPapierowNazwy = appcontext.listaPapierowNazwy;
  const listaPapierow = appcontext.listaPapierow;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;

  return (
    <button
      onClick={async () => {
        console.clear()
        console.log("Zamówienie: ")
        console.log("Dane : ",daneZamowienia)
        console.log("Produkt : ",produkty)
        console.log("Elementy : ",elementy)
        console.log("Fragmenty : ",fragmenty)
        console.log("Oprawa : ",oprawa)
        console.log("Procesy elementów: ",procesyElementow)
        console.log("Pakowanie: ",pakowanie)
        console.log("Koszty dodatkowe: ",kosztyDodatkoweZamowienia)
        console.log("Papiery_nazwy: ",listaPapierowNazwy)
        console.log("listaPapierowWyszukiwarka: ",listaPapierowWyszukiwarka)

      }}
      className={ style.btn}
    >
      Pokaż stany...
    </button>
  );
}



function ButtonSprawdz({
  isSaveButtonDisabled,
  postZamowienieObj,
  setShowSaveAs,
  setSaveAs,
}) {
  const appcontext = useContext(AppContext);
  const socketcontext = useContext(SocketContext);

  const navigate = useNavigate();
  const sendMessage = () => {
    appcontext.updateClients();
    console.log("socketcontext id:" + socketcontext.socket.id);

    socketcontext.socket.emit("send_mesage", { message: "OK" });
  };

  return (
    <button onClick={() => sendMessage()} className={style.btn}>
      Sprawdź {socketcontext.socketReceiveMessage}
    </button>
  );
}

function ButtonSprawdz2({
  isSaveButtonDisabled,
  postZamowienieObj,
  setShowSaveAs,
  setSaveAs,
}) {
  const appcontext = useContext(AppContext);
  const socketcontext = useContext(SocketContext);

  const sendMessage = () => {
    socketcontext.socket.emit("send_mesage", { message: "" });
    console.log(appcontext.clients);
  };

  return (
    <button onClick={() => sendMessage()} className={style.btn}>
      Sprawdź {socketcontext.socketReceiveMessage}
    </button>
  );
}
