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
import { useZamowienia } from "hooks/useZamowienia";
import ZamowieniaInfo from "components/ZamowieniaInfo/ZamowieniaInfo";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
function Zamowienia({ user, setUser }) {

  const contextApp = useContext(AppContext);
  const contextModal = useContext(ModalInsertContext);
  
  const [row, setRow] = useState({ id: 1, prime_id: 1 });
  // const [openModalInsert, setOpenModalInsert] = useState(false);
  const open = useRef(false);
  const navigate = useNavigate();
  const data = contextApp.zamowienia;
  const selectedZamowienie = contextModal.selectedZamowienie;
  const setData = contextApp.setZamowienia;
  const setClients = contextApp.setClients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
  const setNadkomplety = contextApp.setNadkomplety;
  const openModalInsert = contextModal.openModalInsert;
  const setOpenModalInsert = contextModal.setOpenModalInsert;
  const [callForPaper] = useApiPapier();
const [refreshZamowienia] = useZamowienia()

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
          refreshZamowienia();
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


    // aby nie dało się cofnąć
    // Dodaj pusty wpis do historii, aby przycisk "Wstecz" nie cofał poza tę stronę
    window.history.pushState(null, '', window.location.href);
    // window.history.pushState(null, '', window.location.pathname);
    // window.history.pushState(null, '', window.location.pathname);
    // window.history.pushState(null, '', window.location.pathname);




    const handlePopState = (event) => {
      
      alert(DecodeToken(sessionStorage.getItem("token")).imie+ ", bardzo nieładne zachowanie :D ")
      // window.history.pushState(null, '', window.location.pathname);
      
      // window.history.pushState(null, '', window.location.pathname);
    window.history.pushState(null, '', window.location.href);

    // window.history.pushState(null, '', window.location.href);

      // navigate(window.location.pathname, { replace: true });

      // navigate("/Zamowienia");
    };

    window.addEventListener('popstate', handlePopState);

    // Czyszczenie efektu: usuń listenera po odmontowaniu komponentu
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };




  }, []);


  // const onClose = useCallback(
  //   async (ev) => {
  //     ev.preventDefault();
  //     await axios
  //       .put(IP + "setOrderClosed", {
  //         id: selectedZamowienie.id,
  //       })
  //       .then(() => {
  //         return (ev.returnValue = "Are you sure you want to close?");
  //       });
  //   },
  //   [row]
  // );

  // useEffect(() => {
  //   if (openModalInsert) {
  //     window.addEventListener("beforeunload", onClose);
  //   } else {
  //     window.removeEventListener("beforeunload", onClose);
  //   }
  // }, [openModalInsert, setOpenModalInsert]);

  return (
    <div className={style.container}>
      <Header dodaj_clikHandler={dodaj_clikHandler} />
      <div className={style.multiTableContainer}>
        <TableZamowienia  open2={open2} setRow={setRow}  header={false}/>
        <TableMini  open2={open2} setRow={setRow}  header={false}/>
      </div>
          {openModalInsert && (
            <ModalInsert
            />
          )}
      <TechnologiaStage/>
      <ZamowieniaInfo/>
    
      
    </div>
  );
}
export default Zamowienia;


