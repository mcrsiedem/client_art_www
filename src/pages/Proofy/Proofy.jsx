import React, { useEffect, useState,useRef,useContext } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
// import ModalInsert from "./ModalInsert/ModalInsert";
import style from "./Proofy.module.css";
import Header from "./components/header/Header";
import { useApiPapier } from "hooks/useApiPapier";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu } from "utils/initialvalue";
import { useZamowienia } from "hooks/useZamowienia";
import { ModalInsertContext } from "context/ModalInsertContext";
import Loading from "components/Loading/Loading";
import TableProof from "./components/table/TableProof";
import { AppContext } from "context/AppContext";
import { getClients } from "actions/getClients";
function Proofy() {

    const contextApp = useContext(AppContext);
  
  const contextModal = useContext(ModalInsertContext);
  const [row, setRow] = useState({ id: 1, prime_id: 1 });
  const open = useRef(false);
  const navigate = useNavigate();
  const setOpenModalInsert = contextModal.setOpenModalInsert;
const {refreshZamowieniaProofy} = useZamowienia()
  const setClients = contextApp.setClients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;

  const open2 = () => {
    setOpenModalInsert(true);
    open.current = true;
  };


  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
          refreshZamowieniaProofy();
          getClients(setClients, setClientsWyszukiwarka);

        } else {
          navigate("/Login");
        }
      });
  }



  useEffect(() => {
    checkToken();
  }, []);




  return (
    <div className={style.container}>
      <Header />
      <div className={style.multiTableContainer}>
        <TableProof  open2={open2} setRow={setRow}  />
      </div>
        <Loading/>
    </div>
  );
}
export default Proofy;


