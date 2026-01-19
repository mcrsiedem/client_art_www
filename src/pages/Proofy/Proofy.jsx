import React, { useEffect, useState,useRef,useContext } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
// import ModalInsert from "./ModalInsert/ModalInsert";
import style from "./Proofy.module.css";
import Header from "./components/header/Header";
import { useApiPapier } from "hooks/useApiPapier";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu } from "utils/initialvalue";
import TableZamowienia from "./components/table/TableProof";
import { useZamowienia } from "hooks/useZamowienia";
import { ModalInsertContext } from "context/ModalInsertContext";
import Loading from "components/Loading/Loading";
function Proofy() {

  const contextModal = useContext(ModalInsertContext);
  const [row, setRow] = useState({ id: 1, prime_id: 1 });
  const open = useRef(false);
  const navigate = useNavigate();
  const setOpenModalInsert = contextModal.setOpenModalInsert;
const {refreshZamowieniaProofy} = useZamowienia()


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
        <TableZamowienia  open2={open2} setRow={setRow}  />
      </div>
          <Loading/>
    </div>
  );
}
export default Proofy;


