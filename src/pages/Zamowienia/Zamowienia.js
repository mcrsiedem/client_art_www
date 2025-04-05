import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import ModalInsert from "./ModalInsert/ModalInsert";
import style from "../Zamowienia/Zamowienia.module.css";
import Header from "./components/header/Header";
import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";
import { AppContext } from "context/AppContext";
import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";
import { useApiPapier } from "hooks/useApiPapier";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu } from "utils/initialvalue";
import TableMini from "./components/table/TableMini";
import TableZamowienia from "./components/table/TableZamowienia";
function Zamowienia({ user, setUser }) {

  const contextApp = useContext(AppContext);
  const [row, setRow] = useState({ id: 1, prime_id: 1 });
  const [openModalInsert, setOpenModalInsert] = useState(false);
  const open = useRef(false);
  const navigate = useNavigate();
  const data = contextApp.zamowienia;
  const setData = contextApp.setZamowienia;
  const setClients = contextApp.setClients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
  const setNadkomplety = contextApp.setNadkomplety;
  const [callForPaper] = useApiPapier();

  function dodaj_clikHandler() {
    setOpenModalInsert(true);
    open.current = false;
  }

  const open2 = () => {
    setOpenModalInsert(true);
    open.current = true;
  };
  async function fechZamowienia() {
    const res = await axios.get(
      IP + "zamowienia/" + sessionStorage.getItem("token")
    );
    let jobs = [...res.data];
    setData(jobs);
    callForPaper();
    getClients(setClients, setClientsWyszukiwarka);
    getNadkomplety(setNadkomplety);
  }

  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
          fechZamowienia();
        } else {
          navigate("/Login");
        }
      });
  }

  async function refreshZamowienia() {
    const res = await axios.get(
      IP + "zamowienia/" + sessionStorage.getItem("token")
    );
    let jobs = [...res.data];
    setData(jobs);
  }
  useEffect(() => {
    checkToken();
  }, []);


  const onClose = useCallback(
    async (ev) => {
      ev.preventDefault();
      await axios
        .put(IP + "setOrderClosed", {
          id: row.id,
        })
        .then(() => {
          return (ev.returnValue = "Are you sure you want to close?");
        });
    },
    [row]
  );

  useEffect(() => {
    if (openModalInsert) {
      window.addEventListener("beforeunload", onClose);
    } else {
      window.removeEventListener("beforeunload", onClose);
    }
  }, [openModalInsert, setOpenModalInsert]);

  return (
    <div className={style.container}>
      <Header dodaj_clikHandler={dodaj_clikHandler} />
      <div className={style.multiTableContainer}>
        <TableZamowienia  open2={open2} setRow={setRow}  header={false}/>
        <TableMini  open2={open2} setRow={setRow}  header={false}/>
      </div>
          {openModalInsert && (
            <ModalInsert
              openModalInsert={openModalInsert}
              setOpenModalInsert={setOpenModalInsert}
              user={user}
              setUser={setUser}
              open={open}
              row={row}
              data={data}
              setData={setData}
              refreshZamowienia={refreshZamowienia}
            />
          )}
      <TechnologiaStage/>
    </div>
  );
}
export default Zamowienia;


