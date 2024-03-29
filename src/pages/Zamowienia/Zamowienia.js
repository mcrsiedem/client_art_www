import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import iconSettings from "../../assets/settings.svg";
import ModalInsert from "./ModalInsert/ModalInsert";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../Zamowienia/Zamowienia.module.css";
import Header from "./components/Header";
function Zamowienia({ user, setUser }) {

  const [listaGramatur, setListaGramatur] = useState();
  const [listaPapierow, setListaPapierow] = useState();
  const [row, setRow] = useState({id:1});
  const [openModalInsert, setOpenModalInsert] = useState(false);

  const open = useRef(false);

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  function dodaj_clikHandler() {
     setOpenModalInsert(true);
     open.current = false
    // open2()
  }

  const open2 = () =>{
    //pokazuje OpenModal
    // zmiena open na true, co oznacza dla modala, ze open istniejace zamowienie a nie insert new
    setOpenModalInsert(true)
    open.current = true

  }
  async function fechZamowienia() {

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
    checkToken();
  }, []);


  const onClose = useCallback(async(ev) => {  

    ev.preventDefault();
    // console.log("onclose id: "+ contextModalInsert.zamowienieID  );
    // console.log("onclose id: "+ sessionStorage.getItem("idzam")  );
   await axios
     .put(IP + "setOrderClosed", {

        // id: sessionStorage.getItem("idzam"),
        id: row.id,
     

     })
     .then(() => {
       return (ev.returnValue = "Are you sure you want to close?");
     }

     );
     }, [row])


  useEffect(() => {
    if(openModalInsert) {
      window.addEventListener('beforeunload', onClose);
    } else {
      window.removeEventListener('beforeunload', onClose);
    }
  
  }, [openModalInsert,setOpenModalInsert]);

  return (
    <div className={style.container}>
      <Header dodaj_clikHandler={dodaj_clikHandler} />
      <ZamowieniaTable zamowienia={data} open2={open2} setRow={setRow} />

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
  const contextModalInsert = useContext(ModalInsertContext);
 return     <div className={style.tableContainer}>
     <table>
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
</div>
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


