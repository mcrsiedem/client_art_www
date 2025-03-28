import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import iconSettings from "assets/iconUstawieniaDark.svg";
import ModalInsert from "./ModalInsert/ModalInsert";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../Zamowienia/Zamowienia.module.css";
import Header from "./components/Header";
import { TechnologyContext } from "context/TechnologyContext";
import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";
import { AppContext } from "context/AppContext";
import MenuZamowienia from "./components/MenuZamowienia";
import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";
import iconError from "assets/error.svg";


import { useApiPapier } from "hooks/useApiPapier";
function Zamowienia({ user, setUser }) {

  const contextApp = useContext(AppContext);
  const [row, setRow] = useState({id:1, prime_id:1});
  const [openModalInsert, setOpenModalInsert] = useState(false);
  const open = useRef(false);
  const navigate = useNavigate();
  
  const data = contextApp.zamowienia
  const setData = contextApp.setZamowienia

const setClients = contextApp.setClients;
const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
const setNadkomplety = contextApp.setNadkomplety;


    const [callForPaper] = useApiPapier();

  function dodaj_clikHandler() {
    // setDaneZamowienia({...daneZamowienia, opiekun_id:  DecodeToken(sessionStorage.getItem("token")).id})
   
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

    const res = await axios.get(IP + "zamowienia/" + sessionStorage.getItem("token"));
    let jobs= [...res.data]
    setData(jobs);

         callForPaper()
         getClients(setClients,setClientsWyszukiwarka )
         getNadkomplety(setNadkomplety)
        
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
    const res = await axios.get(IP + "zamowienia/" + sessionStorage.getItem("token"));
    // let jobs= [...res.data].filter(job => job.final == 1);
    let jobs= [...res.data]
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
      <TechnologiaStage/>
      <ZamowieniaTable zamowienia={data} open2={open2} setRow={setRow} />

          {openModalInsert && (
            <ModalInsert
              openModalInsert={openModalInsert}
              setOpenModalInsert={setOpenModalInsert}
              user={user}
              setUser={setUser}
              open={open}

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
  const [showMenu, setShowMenu] = useState(false);
  const contextModalInsert = useContext(ModalInsertContext);
 return     <div className={style.tableContainer}>
    <MenuZamowienia showMenu={showMenu} setShowMenu={setShowMenu} />
     <table>
  <thead className={style.th_head}>
    <tr >
      <th style={{textAlign: "center"}}>!</th>
      <th className={style.th_checkbox}> <MenuBtn showMenu={showMenu} setShowMenu={setShowMenu} /></th>

      
      
      <th className={style.col_nr}>Nr</th>
      <th className={style.col_rok}>Rok</th>
      <th className={style.th_karta}>Technologia</th>
      <th className={style.col_klient}>Klient</th>
      <th className={style.col_klient} >Praca</th>
      <th className={style.col_klient} >Uwagi</th>
      
      <th className={style.col_klient} >Nakład</th>
      <th className={style.col_klient}>Strony</th>

      <th className={style.col_klient}>Spedycja</th>
      {/* <th className={style.col_klient}>Final</th> */}
      <th className={style.col_klient}>Szerokość</th>
      <th className={style.col_klient}>Wysokość</th>
      <th className={style.col_klient}>Oprawa</th>
      <th className={style.col_firma}>Firma</th>
      <th className={style.col_utworzono}>Utworzono</th>
      

    </tr>
  </thead>
  <tbody>
    {zamowienia.map((row) => {
      return (
<TABLE_TR key= {row.id}row={row} open2={open2} setRow={setRow}/>
        
      );
    })}
  </tbody>
</table>
</div>
}
function TABLE_TR({ row, open2, setRow }) {
  const techContext = useContext(TechnologyContext);
    const contextModalInsert = useContext(ModalInsertContext);
  const technology = techContext.technology; // technologie
  const navigate = useNavigate();
  const setSelectedZamowienie = contextModalInsert.setSelectedZamowienie;
  const [showKartaTechnologiczna, setShowKartaTechnologiczna] = useState(false);
  return (
    <>
      <tr
       className={style.row_zamowienia}
        key={row.id}
        onClick={(node, event) => {
          setSelectedZamowienie(row)
        }}
        onDoubleClick={(node, event) => {
        //  open2();
          // setSelectedZamowienie(row)
          // navigate("/zamowienie");


          // const promiseA = new Promise((resolve, reject) => {
          //   setSelectedZamowienie(row)

          //   resolve(777);
          // });
          // promiseA.then(res =>  navigate("/zamowienie"))

          // setBtnZapiszPapierDisabled(false)

          open2(row.id);
         setRow({ id: row.id, prime_id: row.prime_id }); // tutaj pobrać z row zestaw_id ale napierw dodać takie pole w zamowieniach
        }}


      >
               <IconErrorTable
          row={row}

        />
        <SelectBox row={row} />
   
 
        <td>{row.nr} </td>
        <td>{row.rok} </td>
        <ShowTechnmologiaBtn
          row={row}
          setShowKartaTechnologiczna={setShowKartaTechnologiczna}
          showKartaTechnologiczna={showKartaTechnologiczna}
          
        />
               
        <td className={style.col_klient}>{row.klient}</td>
        <td>{row.tytul}</td>
        <td>{row.uwagi}</td>
       
        <td className={style.td_naklad}>{row.naklad}</td>
        <td>{row.ilosc_stron}</td>


        <td>{row.data_spedycji}</td>

        {/* <td>{row.final}</td> */}
        <td>{row.format_x}</td>
        <td>{row.format_y}</td>
        <td>{row.oprawa_nazwa}</td>
        <td>{row.firma}</td>
        <td>{row.utworzono}</td>
      </tr>

      {showKartaTechnologiczna && (
        <>
          <tr>
            {technology
              ?.filter((x) => x.zamowienie_id == row.id)
              .map((l, i) => {
                return (
                  <tr draggable className={style.row5} key={l.id}>
                    <td className={style.input3}> fragment </td>
                  </tr>
                );
              })}
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {" "}
              <CreateTechnmologiaBtn row={row} />
            </td>
          </tr>
        </>
      )}
    </>
  );
}

const IconErrorTable = ({row}) =>{
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  if(row.status >2){
    return(
      <td  style={{width: "30px"}}> 
    <img
       className={style.iconErrorTable}
        src={iconError}
        onClick={() => {
        }}
        alt="Procesy"
      />
      </td>
  )
  }else return <td></td>
}

 function ShowTechnmologiaBtn({ showKartaTechnologiczna,setShowKartaTechnologiczna }) {
  return (
    <td className={style.td_karta}>
      <div >
                      <img
         className={style.iconSettings}
          src={iconSettings}
          onClick={() => { setShowKartaTechnologiczna(!showKartaTechnologiczna)}}
          alt="Procesy"
        />
      </div>

    </td>
  );
}

function SelectBox({row}) {

  const appContext = useContext(AppContext)
  const zamowienia = appContext.zamowienia;
  const setZamowienia = appContext.setZamowienia;

  return (
    <td className={style.td_checkbox}>
      <div >
      <input type="checkbox"
      onChange={(event)=>{

        console.log(" select"+ row.id +" "+event.target.checked)
        setZamowienia(
          zamowienia.map((t) => {
            if (t.id == row.id) {
              return {...row, select: event.target.checked }
            } else {
              return t;
            }
          })
        )
      }}
     ></input>
      </div>

    </td>
  );
}














function CreateTechnmologiaBtn({ row }) {
  const techContext = useContext(TechnologyContext)
  const updateDane = techContext.updateDane;
  return (
    <td >
      <button className={style.btn_dodaj_karte} 
      onClick={()=> {
         techContext.setShowTechnologyStage(true)
        techContext.setRowZamowienia(row)
        techContext.fechparametry(row?.id)
        
        // techContext.setOpenTechnologia(true)

      }}
      >Dodaj kartę </button>

    </td>
  );
}



const MenuBtn = ({ showMenu, setShowMenu }) => {
  return (
    <img
              className={style.iconMenuBtn}
              src={iconSettings}
              onClick={() => {
                setShowMenu(!showMenu);
                // dodaj_clikHandler();
                // console.log("z contextu :"+ token.rowSelected)
                //  sessionStorage.setItem("us",{id:1,imie:"Maciek"})
              }}
              alt="x"
            />
  )
}


export default Zamowienia;


