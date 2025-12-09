import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
// import ModalInsert from "./ModalInsert/ModalInsert";
import style from "./ZamowieniaFaktury.module.css";
import Header from "./components/header/Header";
import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";
import { AppContext } from "context/AppContext";
import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";
import { useApiPapier } from "hooks/useApiPapier";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu } from "utils/initialvalue";
import TableMini from "./components/table/TableMini";
import TableZamowienia from "./components/table/TableZamowienia";
import { useZamowienia } from "hooks/useZamowienia";
import ZamowieniaInfo from "components/ZamowieniaInfo/ZamowieniaInfo";
import { ModalInsertContext } from "context/ModalInsertContext";
import ModalInsert from "pages/Zamowienia/ModalInsert/ModalInsert";
import Loading from "components/Loading/Loading";
function ZamowieniaFaktury({ user, setUser }) {

  const contextApp = useContext(AppContext);
  const contextModal = useContext(ModalInsertContext);
  const [row, setRow] = useState({ id: 1, prime_id: 1 });
  const open = useRef(false);
  const navigate = useNavigate();
  const selectedZamowienie = contextModal.selectedZamowienie;
  const setClients = contextApp.setClients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
  const setNadkomplety = contextApp.setNadkomplety;
  const openModalInsert = contextModal.openModalInsert;
  const setOpenModalInsert = contextModal.setOpenModalInsert;
  const [callForPaper] = useApiPapier();
const {refreshZamowieniaFaktury} = useZamowienia()

  function dodaj_clikHandler() {
    setOpenModalInsert(true);
    open.current = false;
  }

  const open2 = () => {
    setOpenModalInsert(true);
    open.current = true;
  };

  


  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
          refreshZamowieniaFaktury();
          callForPaper();
          getClients(setClients, setClientsWyszukiwarka);
          getNadkomplety(setNadkomplety);
        } else {
          navigate("/Login");
        }
      });
  }



  useEffect(() => {
    
    checkToken();
  }, []);


  const onClose = useCallback(
    async (ev) => {
      ev.preventDefault();
      await axios
        .put(IP + "setOrderClosed", {
          id: selectedZamowienie.id,
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
        {/* <TableMini  open2={open2} setRow={setRow}  header={false}/> */}
      </div>
          {openModalInsert && (
            <ModalInsert lokalizacja={"faktury"}
            />
          )}
    
          <Loading/>
    </div>
  );
}
export default ZamowieniaFaktury;


