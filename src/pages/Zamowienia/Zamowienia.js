import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import iconSettings from "../../assets/settings.svg";

import ModalInsert from "./ModalInsert/ModalInsert";

import style from "../Zamowienia/Zamowienia.module.css";
import { useAuth } from "hooks/useAuth";
function Zamowienia({ user, setUser }) {
  const [auth,lookToken] = useAuth(false);
  const [listaGramatur, setListaGramatur] = useState();
  const [listaPapierow, setListaPapierow] = useState();
  const [row, setRow] = useState([]);
  const [openModalInsert, setOpenModalInsert] = useState(false);
  // const [open, setOpen] = useState(false);
  const open = useRef(false);
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  function dodaj_clikHandler() {
    setOpenModalInsert(true);
  }

  const open2 = () =>{
    //pokazuje OpenModal
    // zmiena open na true, co oznacza dla modala, ze open istniejace zamowienie a nie insert new
    setOpenModalInsert(true)
    // setOpen(true)
    open.current = true

  }
  async function fechZamowienia() {
    console.log("auth po stronie zamowien :",auth)
    const res = await axios.get(IP + "zamowienia");
    let jobs= [...res.data].filter(job => job.final == 1);
    setData(jobs);

    const res3 = await axios.get(IP + "lista-papierow");
    setListaPapierow([...res3.data]);
    const res4 = await axios.get(IP + "lista-gramatur");
    setListaGramatur([...res4.data]);
  }

  async function checkToken() {
    axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
      if (res.data.Status === "Success") {
        fechZamowienia();
      } else {
        navigate("/Login");
      }
    });
  }

  async function refreshZamowienia() {
    const res = await axios.get(IP + "zamowienia");
    let jobs= [...res.data].filter(job => job.final == 1);
    setData(jobs);
  }

  useEffect(() => {
    document.getElementById("header").style.display = "grid";
    checkToken();
  }, []);


  return (
    <div className={style.body}>
      <div className={style.tableContainer}>
      <ZamowieniaTable zamowienia={data} open2={open2} setRow={setRow}/>
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
                Dodaj
              </button>

                         <button
                className={style.myButton}
                onClick={() => {
                  refreshZamowienia();
                }}
              >
                Odśwież
              </button>
      </footer>


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
          open={open}
          // setOpen={setOpen}
          row={row}
          data={data}
          setData={setData}
          refreshZamowienia={refreshZamowienia}
        />
      )}



    </div>
  );
}

function ZamowieniaTable({zamowienia,open2,setRow}){
 return         <table>
  <thead>
    <tr>
      <th className={style.col_id}>#</th>
      <th className={style.col_nr}>Nr</th>
      <th className={style.col_rok}>Rok</th><th>Klient</th>
      <th >Praca</th>
      <th className={style.col_firma}>Firma</th>
      <th className={style.col_utworzono}>Utworzono</th>
      <th className={style.col_utworzono}>Final</th>
      <th className={style.col_utworzono}>Zlecenie</th>
    </tr>
  </thead>
  <tbody>
    {zamowienia.map((row) => {
      return (
        <tr
          key={row.id}
          onDoubleClick={(node, event) => {
            
            
            open2(row.id);
            setRow({ id: row.id});
          }}
          onClick={()=> {setRow(row.id)
          console.log(row.id)
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
          <CreateTechnmologiaBtn row={row}/>
        </tr>
      );
    })}
  </tbody>
</table>
}




 function CreateTechnmologiaBtn({ row, handleChangeCardElementy,handleRemoveItem }) {
  return (
    <td className={style.col_button}>
      <div >
                      <img
         className={style.iconSettings}
          src={iconSettings}
          onClick={() => {handleRemoveItem(row.indeks, row.id)}}
          alt="Procesy"
        />
      </div>

    </td>
  );
}


export default Zamowienia;


