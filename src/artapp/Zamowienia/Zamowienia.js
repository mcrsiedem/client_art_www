import React, { useEffect, useState } from "react";
import axios from "axios";
import { ip } from "../../Host";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Modal from "../Zamowienia/Modal/Modal";
import ModalInsert from "./ModalInsert/ModalInsert";

import style from "../Zamowienia/Zamowienia.module.css";

function Zamowienia({ user, setUser }) {
  const [listaGramatur, setListaGramatur] = useState();
  const [listaPapierow, setListaPapierow] = useState();
  const [row, setRow] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalInsert, setOpenModalInsert] = useState(false);

  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  function dodaj_clikHandler() {

    setOpenModalInsert(true);


  }

  async function fechZamowienia() {
    const res = await axios.get(ip + "zamowienia");
    let jobs= [...res.data].filter(job => job.final == 1);
  
    // const notes =[...res.data].filter(row=> row.status !== "Wydrukowane")
    //                           .filter(row=> row.status !== "Nowe")
    // setData(job);
    setData(jobs);



    const res3 = await axios.get(ip + "lista-papierow");
    setListaPapierow([...res3.data]);
    const res4 = await axios.get(ip + "lista-gramatur");
    setListaGramatur([...res4.data]);
  }

  async function checkToken() {
    axios.get(ip + "/islogged/" + cookies.token).then((res) => {
      if (res.data.Status === "Success") {
        fechZamowienia();
      } else {
        navigate("/Login");
      }
    });
  }

  useEffect(() => {
    document.getElementById("header").style.display = "grid";
    checkToken();
  }, []);

  function kolor(k) {
    if (k === "6") return style.alert;
  }
  return (
    <div className={style.body}>
      <div className={style.tableContainer}>
        <table>
          <thead>
            <tr>
              <th className={style.col_id}>#</th>{" "}
              <th className={style.col_nr}>Nr</th>
              <th className={style.col_rok}>Rok</th> <th>Klient</th>
              <th>Praca</th>
              <th className={style.col_firma}>Firma</th>
              <th className={style.col_utworzono}>Utworzono</th>
              <th className={style.col_utworzono}>Final</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => {
              return (
                <tr
                  // className={row.id === 6 ? style.bgdanger : ""}
                  key={row.id}
                  onDoubleClick={(node, event) => {
                    setOpenModal(true);
                    setRow({ id: row.id, user: row.user });
                  }}
                >
                  <td>{row.id} </td>
                  <td>{row.nr} </td>
                  <td>{row.rok} </td>
                  <td>{row.klient}</td>
                  <td>{row.tytul}</td>
                  <td>{row.firma}</td>
                  <td>{row.utworzono}</td>
                  <td>{row.final}</td>
        
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className={style.footer}>
        {/* <button className={style.myButton} onClick={()=>giveMeJobs('H1')}>H1</button> */}
        <button className={style.myButton}>OK</button>
        <button
          className={style.myButton}
          onClick={() => {
            dodaj_clikHandler();
          }}
        >
          {" "}
          Dodaj{" "}
        </button>
      </footer>

      {openModal && (
        <Modal openModal={openModal} setOpenModal={setOpenModal} row={row} />
      )}
      {openModalInsert && (
        <ModalInsert
          openModalInsert={openModalInsert}
          setOpenModalInsert={setOpenModalInsert}
          user={user}
          setUser={setUser}
          listaPapierow={listaPapierow}
          setListPapierow={setListaPapierow}
          listaGramatur={listaGramatur}
          setListaGramatur={setListaGramatur}
        />
      )}



    </div>
  );
}

export default Zamowienia;
