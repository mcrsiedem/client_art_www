import React, { useEffect, useState } from "react";
import axios from "axios";
import { ip } from "../../../Host";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import ModalInsert from "./ModalInsert";
import style from "../ModalInsert/Stany.module.css";

export default function  Stany({ user, daneZamowienia,produkty,elementy,fragmenty,oprawa,pakowanie }) {

  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();


  async function fechZamowienia() {


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
              <th className={style.col_utworzono}>Typ</th>
            </tr>
          </thead>

          <tbody>
            {fragmenty.map((row) => {
              return (
                <tr
                  // className={row.id === 6 ? style.bgdanger : ""}
                  key={row.id}
                  onDoubleClick={(node, event) => {
                    // setOpenModal(true);
                    // setRow({ id: row.id, user: row.user });
                  }}
                >
                  <td>{row.id} </td>
                  <td>{row.zamowienie_id} </td>
                  <td>{row.produkt_id} </td>
                  <td>{row.element_id}</td>
                  <td>{row.naklad}</td>
                  <td>{row.wersja}</td>
                  <td>{row.typ}</td>
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

          }}
        >
          {" "}
          Dodaj{" "}
        </button>
      </footer>


    </div>
  );
}


