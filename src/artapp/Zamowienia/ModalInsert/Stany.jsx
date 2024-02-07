import React, { useEffect, useState } from "react";
import axios from "axios";
import { ip } from "../../../Host";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import ModalInsert from "./ModalInsert";
import style from "../ModalInsert/Stany.module.css";

export default function Stany({
  handleChangeCardFragmenty,
  openModalStany,
  setOpenModalStany,
  user,
  daneZamowienia,
  produkty,
  elementy,
  fragmenty,
  oprawa,
  pakowanie,

}) {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  async function fechZamowienia() {}

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
      <div className={style.container}>
        <StanProdukty produkty={produkty} />
        <StanElementy elementy={elementy} />
        <StanFragmenty
          fragmenty={fragmenty}
          handleChangeCardFragmenty={handleChangeCardFragmenty}
        />
        <StanOprawa oprawa={oprawa} />
    
      </div>
    </div>
  );
}
function StanProdukty({ produkty }) {
  return (
    <div className={style.tableContainer}>
      <div className={style.title}>Produkty</div>
      <table>
        <thead>
          <tr>
            <th className={style.col_id}>Zamowienie id</th>
            <th className={style.col_id}>Produkt id</th>
            <th className={style.col_id}>Element id</th>
            <th className={style.col_id}>Fragment id</th>{" "}
            <th className={style.col_id}>Nakład</th>
            <th>Typ</th>
            <th>Wersja</th>
          </tr>
        </thead>

        <tbody>
          {produkty.map((row) => {
            return (
              <tr key={row.id} onDoubleClick={(node, event) => {}}>
                <td>{row.zamowienie_id} </td>
                <td>{row.id} </td>
                <td>{row.element_id}</td>
                <td>{row.fragmenty_id} </td>
                <td>{row.naklad}</td>
                <td>{row.typ}</td>
                <td>{row.nazwa}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StanElementy({ elementy }) {
  return (
    <div className={style.tableContainer}>
      <div className={style.title}>Elementy</div>
      <table>
        <thead>
          <tr>
            <th className={style.col_id}>Zamowienie id</th>
            <th className={style.col_id}>Produkt id</th>
            <th className={style.col_id}>Element id</th>
            <th className={style.col_id}>Fragment id</th>{" "}
            <th className={style.col_id}>Nakład</th>
            <th>Typ</th>
            <th>Wersja</th>
          </tr>
        </thead>

        <tbody>
          {elementy.map((row) => {
            return (
              <tr
                // className={row.id === 6 ? style.bgdanger : ""}
                key={row.id}
                onDoubleClick={(node, event) => {
                  // setOpenModal(true);
                  // setRow({ id: row.id, user: row.user });
                }}
              >
                <td>{row.zamowienie_id} </td>
                <td>{row.produkt_id} </td>
                <td>{row.id}</td>
                <td>{row.fragmenty_id} </td>
                <td>{row.naklad}</td>
                <td>{row.typ}</td>
                <td>{row.wersja}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
function StanFragmenty({ fragmenty, handleChangeCardFragmenty }) {
  return (
    <div className={style.tableContainer}>
      <div className={style.title}>Fragmenty</div>
      <table>
        <thead>
          <tr>
            <th className={style.col_id}>Zamowienie id</th>
            <th className={style.col_id}>Produkt id</th>
            <th className={style.col_id}>Element id</th>
            <th className={style.col_id}>Fragment id</th>{" "}
            <th className={style.col_id}>Nakład</th>
            <th>Typ</th>
            <th>Oprawa id</th>
            <th>Oprawa id prev</th>

            <th>Wersja</th>
            <th>index</th>
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
                <td>{row.zamowienie_id} </td>
                <td>{row.produkt_id} </td>
                <td>{row.element_id}</td>
                {/* <td>{row.id} </td> */}
                <td>
                  <FragmentyID
                    row={row}
                    handleChangeCardFragmenty={handleChangeCardFragmenty}
                  />
                </td>
                <td>{row.naklad}</td>
                <td>{row.typ}</td>
                <td>{row.oprawa_id}</td>
                <td>{row.oprawa_id_prev}</td>

                <td>{row.wersja}</td>
                <td>{row.index}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StanOprawa({ oprawa }) {
  return (
    <div className={style.tableContainer}>
      <div className={style.title}>Oprawa</div>
      <table>
        <thead>
          <tr>
            <th className={style.col_id}>Zamówienie id</th>
            <th className={style.col_id}>Produkt id</th>
            <th className={style.col_id}>Oprawa id</th>
            <th className={style.col_id}>Rodzaj oprawy</th>
            <th className={style.col_id}>Bok oprawy</th>{" "}
            <th className={style.col_id}>Nakład</th>
            <th>Wersja</th>
            <th>Data spedycji</th>
            <th>Data spedycji</th>
          </tr>
        </thead>

        <tbody>
          {oprawa.map((row) => {
            return (
              <tr
                // className={row.id === 6 ? style.bgdanger : ""}
                key={row.id}
                onDoubleClick={(node, event) => {
                  // setOpenModal(true);
                  // setRow({ id: row.id, user: row.user });
                }}
              >
                <td>{row.zamowienie_id} </td>
                <td>{row.produkt_id} </td>
                <td>{row.id} </td>
                <td>{row.oprawa}</td>
                <td>{row.bok_oprawy} </td>
                <td>{row.naklad}</td>
                <td>{row.wersja}</td>
                <td>{row.data_spedycji}</td>
                <td>{row.index}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
function StanFragi({ fragi }) {
  return (
    <div className={style.tableContainer}>
      <div className={style.title}>Fragi</div>
      <table>
        <thead>
          <tr>
            <th className={style.col_id}>oprawa_id_prev</th>
            <th className={style.col_id}>oprawa_id_new</th>
            <th className={style.col_id}>fragment_id</th>

          </tr>
        </thead>

        <tbody>
          {fragi.map((row) => {
            return (
              <tr
                // className={row.id === 6 ? style.bgdanger : ""}
                key={row.fragment_id}
                onDoubleClick={(node, event) => {
                  // setOpenModal(true);
                  // setRow({ id: row.id, user: row.user });
                }}
              >
                <td>{row.oprawa_id_prev} </td>
                <td>{row.oprawa_id_new} </td>
                <td>{row.fragment_id} </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FragmentyID({ row, handleChangeCardFragmenty }) {
  return (
    <td>
      <input
        defaultValue={row.id}
        onChange={(e) =>
          handleChangeCardFragmenty({
            ...row,
            id: e.target.value,
          })
        }
      ></input>
    </td>
  );
}
