import React, { useState, useEffect, useRef,useContext } from "react";
import style from "../Zamowienia.module.css";

import ReactLogo from "assets/grid.svg";
import ReactLogo_ilosc from "assets/ilosc.svg";
import ReactLogo_ustawienia from "assets/settings.svg";
import ReactLogo_full from "assets/full.svg";
import ReactLogo_history from "assets/history.svg";
import iconClose from "assets/x.svg";
import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import iconSettings from "assets/dots2.svg";
import iconFile from "assets/iconTechnologieDark.svg";
import iconError from "assets/error.svg";
import iconLockRed2 from 'assets/iconLockRed.svg'
import iconLockRed from "assets/lock2.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { sprawdzDostepZamowienia } from "actions/sprawdzDostepZamowienia";
import { ModalInsertContext } from "context/ModalInsertContext";
import MenuZamowienia from "./MenuZamowienia";
import { TechnologyContext } from "context/TechnologyContext";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu } from "utils/initialvalue";

  export default  function TABLE_ROW_ZAMOWIENIA({ row, open2, setRow }) {
    const techContext = useContext(TechnologyContext);
      const contextModalInsert = useContext(ModalInsertContext);
    const technology = techContext.technology; // technologie
    const navigate = useNavigate();
    const setSelectedZamowienie = contextModalInsert.setSelectedZamowienie;
    const [showKartaTechnologiczna, setShowKartaTechnologiczna] = useState(false);
    return (
      <>
        <tr
          title= {"Zamówienie id: " +row.id +" utworzono: "+ row.utworzono}
         className={style.row_zamowienia}
          key={row.id}
          onClick={(node, event) => {
          setSelectedZamowienie(row)
          }}
          onDoubleClick={(node, event) => {
          open2(row.id);
          setRow({ id: row.id, prime_id: row.prime_id }); // tutaj pobrać z row zestaw_id ale napierw dodać takie pole w zamowieniach
          }}
        >
                 <IconErrorTable
            row={row}
  
          />
         
     
   
          <td>{row.nr} </td>
          <td>{row.rok} </td>
          <ShowTechnmologiaBtn
            row={row}
            setShowKartaTechnologiczna={setShowKartaTechnologiczna}
            showKartaTechnologiczna={showKartaTechnologiczna}
            
          />
                
          <td className={style.col_klient}>{row.klient}</td>
          <td>{row.tytul}</td>
          <td className={style.col_uwagi}> {row.uwagi}</td>
          <NakladTableZamowienia  row={row}/>
          <td>{row.ilosc_stron}</td>
          <td>{row.data_spedycji}</td>
          <td>{row.format_x +"x"+ row.format_y}</td>
          {/* <td>{row.format_y}</td> */}
          <OprawaTableZamowienia  row={row}/>
          <td>{row.firma}</td>
          <StanZamowieniaTable  row={row}/>
          <StatusZamowieniaTable  row={row}/>
          <EtapZamowieniaTable  row={row}/>
          <td>{row.opiekun}</td>
  
  
          {/* <td>{row.utworzono}</td> */}
          <SelectBox row={row} />
          <IconLockTable  row={row}/>
  
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
                <CreateTechnmologiaBtn row={row} />
              </td>
            </tr>
          </>
        )}
      </>
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
  
  

  
  
  