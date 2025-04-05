import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import iconSettings from "assets/grid_dark.svg";
import iconFile from "assets/iconTechnologieDark.svg";

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
import iconLockRed2 from 'assets/iconLockRed.svg'
import iconLockRed from "assets/lock2.svg";
import iconAdd from "assets/add2.svg";





import { useApiPapier } from "hooks/useApiPapier";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu } from "utils/initialvalue";
import DecodeToken from "pages/Login/DecodeToken";
import { sprawdzDostepZamowienia } from "actions/sprawdzDostepZamowienia";
import TableMini from "./components/TableMini";
import TableZamowienia from "./components/TableZamowienia";
import TABLE_ROW_ZAMOWIENIA from "./components/TABLE_ROW_ZAMOWIENIA";
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
     setOpenModalInsert(true);
     open.current = false
  }

  const open2 = () =>{
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
    let jobs= [...res.data]
    setData(jobs);
  }
  useEffect(() => {
    checkToken();
  }, []);


  const onClose = useCallback(async(ev) => {  
    ev.preventDefault();
   await axios
     .put(IP + "setOrderClosed", {
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
      
      <div className={style.multiTableContainer}>
        <TableZamowienia  open2={open2} setRow={setRow}  header={false}/>
        <TableMini  open2={open2} setRow={setRow}  header={false}/>
      </div>


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

      
      <TechnologiaStage/>
    </div>
  );
}

function ZamowieniaTable({open2,setRow}){
  const [showMenu, setShowMenu] = useState(false);
  const contextModalInsert = useContext(ModalInsertContext);
  const contextApp = useContext(AppContext);
  const zamowienia = contextApp.zamowienia



 return (
   <div className={style.tableContainer}>
     <MenuZamowienia showMenu={showMenu} setShowMenu={setShowMenu} />
     <table>
       <thead className={style.th_head}>
  
         <tr className={style.table_tr}>
           <th style={{ textAlign: "center" }}>!</th>

           <th className={style.col_nr}>Nr</th>
           <th className={style.col_rok}>Rok</th>
           <th title="Technologia" className={style.th_karta}>
             {" "}
             <img
               className={style.iconSettings}
               src={iconFile}
               onClick={() => {}}
               alt="Procesy"
             />
           </th>
           <th className={style.col_klient}>Klient</th>
           <th className={style.col_klient2}>Praca</th>
           <th className={style.col_uwagi}>Uwagi</th>
           <th className={style.naklad}>Nakład</th>
           <th className={style.col_strony2}>Strony</th>
           <th className={style.col_spedycja}>Spedycja</th>
           <th className={style.col_szerokosc}>Netto</th>
           <th className={style.col_oprawa}>Oprawa</th>
           <th className={style.col_firma}>Firma</th>
           <th className={style.col_firma}>Stan</th>
           <th className={style.col_status}>Status</th>
           <th className={style.col_firma}>Etap</th>
           <th className={style.col_firma}>Opiekun</th>
           <th className={style.th_checkbox}>
             <MenuBtn showMenu={showMenu} setShowMenu={setShowMenu} />
           </th>
           <th style={{ textAlign: "center" }}></th>
         </tr>
       </thead>
       <tbody className={style.bodyContainer}>
         {zamowienia
           .filter((zamowienie) => sprawdzDostepZamowienia(zamowienie))
           .filter(zamowienie => zamowienie.stan ==3)
           .map((row) => {
             return (
               <TABLE_ROW_ZAMOWIENIA key={row.id} row={row} open2={open2} setRow={setRow} />
             );
           })}
       </tbody>
     </table>
   </div>
 );
}








const OprawaTableZamowienia= ({row}) =>{
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
    
    return(
      <>
     <td>{row.oprawa}  </td> 
      </>
    )
}

const NakladTableZamowienia= ({row}) =>{
    return(
     <td> {row.naklad} </td>
    )
}


const StanZamowieniaTable = ({row}) =>{
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
      return(  <td style={row.stan==2?{backgroundColor:"rgb(246, 212, 45)", paddingRight:"10px"}:{backgroundColor:""}}>{_stan_dokumentu.filter(s=>s.id == row.stan).map(x=> ( x.nazwa))}</td>
  )
}
const StatusZamowieniaTable = ({row}) =>{
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
    // return(  <td>{row.stan}</td>
      // return(  <td style={row.stan==2?{backgroundColor:"rgb(246, 212, 45)", paddingRight:"10px"}:{backgroundColor:""}}>{_status_dokumentu.filter(s=>s.id == row.status).map(x=> ( x.nazwa))}</td>
      return(  <td style={row.status>2?{backgroundColor:"rgb(246, 85, 45)", paddingRight:"10px", width:"fitContent"}:{backgroundColor:""}}>{_status_dokumentu.filter(s=>s.id == row.status).map(x=> ( x.nazwa))}</td>
  )
}

const EtapZamowieniaTable = ({row}) =>{
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
    // return(  <td>{row.stan}</td>
      return(  <td >{_etapy_produkcji.filter(s=>s.id == row.etap).map(x=> ( x.nazwa))}</td>
  )
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
const IconLockTable = ({row}) =>{
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  if(row.open_stan ==1){
    return(
      <td  style={{width: "30px"}}> 
    <img
       className={style.iconLockTable}
        src={iconLockRed}
        onClick={() => {
        }}
        alt="Procesy"
      />
      </td>
  )
  }return <td></td>
}

 function ShowTechnmologiaBtn({
   row,
   showKartaTechnologiczna,
   setShowKartaTechnologiczna,
 }) {
   const techContext = useContext(TechnologyContext);

   const fechparametryTechnologii = techContext.fechparametryTechnologii;
   if (row.technologia_id == null) {
    
       return (
         <td className={style.td_karta}>
           <div>
             <img
               className={style.iconSettings}
               src={iconAdd}
               onClick={() => {
                 techContext.setShowTechnologyStage(true);
                 techContext.setRowZamowienia(row);
                 techContext.fechparametry(row?.id);
               }}
               alt="Procesy"
             />
           </div>
         </td>
       );

   } else {
     return (
       <td className={style.td_karta}>
         <div>
           <img
             className={style.iconSettings}
            //  src={iconSettings}
             src={iconFile}
             onClick={() => {
               fechparametryTechnologii(row.id, row.technologia_id);
             }}
             alt="Procesy"
           />
         </div>
       </td>
     );
   }
 }

function SelectBox({row}) {

  const appContext = useContext(AppContext)
  const zamowienia = appContext.zamowienia;
  const setZamowienia = appContext.setZamowienia;

  return (
    <td className={style.td_checkbox3}>
      <div >
      <input type="checkbox"
      checked={row.select}
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
    <div style={{width:"100%",textAlign:"center"}}>
      <button className={style.btn_dodaj_karte} 
      onClick={()=> {
        techContext.setShowTechnologyStage(true)
        techContext.setRowZamowienia(row)
        techContext.fechparametry(row?.id)
        
        // techContext.setOpenTechnologia(true)

      }}
      >Dodaj kartę </button>

    </div>
  );
}



const MenuBtn = ({ showMenu, setShowMenu }) => {
  return (
    <img
              className={style.iconMenuBtn}
              src={iconSettings}
              onClick={() => {
                setShowMenu(!showMenu);
                
              }}
              alt="x"
            />
  )
}


export default Zamowienia;


