import React, { useEffect, useState,useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import axios from "axios";
import { IP } from "../../../utils/Host";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import style from "./Stany.module.css";

export default function Stany({
  handleChangeCardFragmenty,
  openModalStany,
  setOpenModalStany,
  user,
  daneZamowienia,

}) {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  async function fechZamowienia() {}

  async function checkToken() {
    axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
      if (res.data.Status === "Success") {
        fechZamowienia();
      } else {
        navigate("/Login");
      }
    });
  }

  useEffect(() => {
    // document.getElementById("header").style.display = "grid";
    checkToken();
  }, []);

  if(openModalStany){
      return (
    <div className={style.body}>
      <div className={style.container}>
        <StanDane daneZamowienia={daneZamowienia} />
        <StanProdukty/>
        <StanElementy />
        <StanFragmenty
          handleChangeCardFragmenty={handleChangeCardFragmenty}
        />
        <StanOprawa />
    
      </div>
    </div>
  );
  }

}
function StanProdukty() {
  const contextModalInsert = useContext(ModalInsertContext);
  const produkty = contextModalInsert.produkty;

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
function StanDane({ daneZamowienia }) {
  return (
    <div className={style.tableContainer}>
      <div className={style.title}>Zamówienie</div>
      <table>
        <thead>
          <tr>
            <th className={style.col_id}>Zamowienie id</th>
            <th className={style.col_id}>nr</th>
            <th className={style.col_id}>rok </th>
            <th className={style.col_id}>firma</th>{" "}
            <th className={style.col_id}>klient</th>
            <th>opiekun</th>
            <th>tytul</th>
            <th>Data materiałów</th>
            <th>Data przyjęcia</th>
            <th>Data spedycji</th>
          </tr>
        </thead>

        <tbody>

              <tr  onDoubleClick={(node, event) => {}}>
                <td>{daneZamowienia.id} </td>
                <td>{daneZamowienia.nr} </td>
                <td>{daneZamowienia.rok}</td>
                <td>{daneZamowienia.firma_id} </td>
                <td>{daneZamowienia.klient_id}</td>
                <td>{daneZamowienia.opiekun_id}</td>
                <td>{daneZamowienia.tytul}</td>
                <td>{daneZamowienia.data_materialow}</td>
                <td>{daneZamowienia.data_przyjecia}</td>
                <td>{daneZamowienia.data_spedycji}</td>
              </tr>
            
        
        
        </tbody>
      </table>
    </div>
  );
}

function StanElementy() {
  const contextModalInsert = useContext(ModalInsertContext);
  const elementy = contextModalInsert.elementy;

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
function StanFragmenty({ handleChangeCardFragmenty }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const fragmenty = contextModalInsert.fragmenty;

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
            <th>indeks</th>
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
                <td>{row.id_prev}</td>

                <td>{row.wersja}</td>
                <td>{row.indeks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StanOprawa() {
  const contextModalInsert = useContext(ModalInsertContext);
  const oprawa = contextModalInsert.oprawa;

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
            <th>Indeks</th>
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
                <td>{row.indeks}</td>
                <td>{row.indeks}</td>
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
