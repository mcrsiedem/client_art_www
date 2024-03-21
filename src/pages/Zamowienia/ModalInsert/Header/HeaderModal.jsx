import iconTable from "../../../../assets/table.svg";
import iconTableGreen from "../../../../assets/table_green.svg";
import iconLock from "assets/lock2.svg";
import iconUnLock from "assets/unLock.svg";
import React, { useState, useContext } from "react";
import style from "./HeaderModal.module.css";
import axios from "axios";
import { IP } from "../../../../utils/Host";
import { SocketContext } from "../../../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
import { useAuth } from "hooks/useAuth";
import { ModalInsertContext } from "context/ModalInsertContext";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};

function Header({
  setOpenModalInsert,
  // postZamowienie,
  postZamowienieObj,

  setInfo,
  sprawdzPoprawnoscZamowienia,
  check_data_wejscia,

  openModalStany,
  setOpenModalStany,
  setShowSaveAs,
  saveAs,
  setSaveAs,
  // isSaveButtonDisabled, setSaveButtonDisabled,
  stanOtwarciaZamowienia,
  row,
  readAlert,
  setReadAlert,
  readOnly,
  setReadOnly,
}) {
  const [auth, lookToken] = useAuth(false);
  const contextModalInsert = useContext(ModalInsertContext);

  const elementy = contextModalInsert.elementy;

  return (
    <>
      <div className={style.container}>
        <div className={style.title}>
          Zamówienie...{" "}
          {readOnly && (
            <div>
              otwarte {stanOtwarciaZamowienia.data} przez{" "}
              {stanOtwarciaZamowienia.user}
            </div>
          )}
        </div>
        <div className={style.buttons}>
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

          {readOnly ? (
            <> </>
          ) : (
            <>
              <Zapisz
                setShowSaveAs={setShowSaveAs}
                postZamowienieObj={postZamowienieObj}
                setSaveAs={setSaveAs}
              />

              <ZapiszJako
                postZamowienieObj={postZamowienieObj}
                setShowSaveAs={setShowSaveAs}
                setSaveAs={setSaveAs}
              />
            </>
          )}

          <button
            onClick={() => openInNewTab("/Zamowienia")}
            className={style.btn}
          >
            Nowe...
          </button>

          <ButtonSprawdz />
          <ButtonSprawdz2 />

          <button
            onClick={async () => {
              setOpenModalInsert(false);

              if (!readOnly) {
                const res = await axios.put(IP + "setOrderClosed", {
                  id: row.id,
                });
              }
            }}
            className={style.btn}
          >
            Zamknij
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;

function ZapiszJako({
  isSaveButtonDisabled,
  postZamowienieObj,
  setShowSaveAs,
  setSaveAs,
}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
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

function Zapisz({ postZamowienieObj, setShowSaveAs, setSaveAs }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const isSaveButtonDisabled = contextModalInsert.isSaveButtonDisabled;

  return (
    <button
      onClick={async () => {
        setSaveAs(false);
        postZamowienieObj();
        setSaveButtonDisabled(true);

        // setOrderClosed
      }}
      className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
      disabled={isSaveButtonDisabled}
    >
      Zapisz
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
