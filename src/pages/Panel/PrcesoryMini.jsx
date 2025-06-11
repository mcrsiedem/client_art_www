import React from "react";
import {  useEffect,useState,useContext  } from "react";
import style from '../Panel/PanelMini.module.css';
import logoutIcon from 'assets/logout.png'
import userOnline from 'assets/user_offline.svg'
import userOffline from 'assets/user_offline.svg'
import iconZamowienia from 'assets/iconZamowienia.svg'
import iconTechnolgie from 'assets/iconTechnologie.svg'
import iconHistoria from 'assets/iconHistoria.svg'
import iconUstawienia from 'assets/iconUstawienia.svg'
import iconMagazyn from 'assets/iconMagazyn.svg'
import iconCTP from 'assets/iconCTP.svg'
import iconProcesy from 'assets/iconProcesy.svg'
import iconLock from 'assets/iconLock.svg'
import iconKalendarz from 'assets/iconKalendarz.svg'
import axios from "axios";
import { IP } from "../../utils/Host";
import DecodeToken from "pages/Login/DecodeToken";
import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "hooks/useOnlieStatus";
import { AppContext } from "context/AppContext";
import { getNadkomplety } from "actions/getNadkomplety";
import { getClients } from "actions/getClients";
import { TechnologyContext } from "context/TechnologyContext";

export default function ProcesoryMini({ user, setUser,logout }) {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const appcontext = useContext(AppContext);
  const techContext = useContext(TechnologyContext);
  const setNadkomplety = appcontext.setNadkomplety;
  const setClients = appcontext.setClients;
  const setClientsWyszukiwarka = appcontext.setClientsWyszukiwarka;
//   const setSelectedProcesor = appcontext.setSelectedProcesor
   const setSelectedProcesor = techContext.setSelectedProcesor;
  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
        } else {
          navigate("/Login");
        }
      });
  }

  useEffect(() => {
    checkToken();
  }, []);




        return(<>
                <div className={style.main}>
                        <div className={style.header}>
                
        
                                                        {isOnline ? (     <div className={style.user}> 
                                                                        {/* <img className={style.userIcon } src={userOnline} alt="Procesy" /> */}
                                                                        {/* <p className={style.menu_txt}>{DecodeToken(sessionStorage.getItem("token")).imie} {DecodeToken(sessionStorage.getItem("token")).nazwisko}</p> */}
                                                                </div>) : (     <div className={style.user}> 
                                                                        <img className={style.userIcon } src={userOffline} alt="Procesy" />
                                                                        <p>{DecodeToken(sessionStorage.getItem("token")).imie} {DecodeToken(sessionStorage.getItem("token")).nazwisko} </p>
                                                                        
                                                                </div>) }
                                                        
                                                { isOnline && (<button className={style.btnWyloguj_mini} onClick={()=>navigate("/Panel") }>X</button> )}
                        </div>
        
                                <div className={style.container} >
                                <div className={style.container_btn} >
                                        
                                                                        {/* <div className={style.kafle} onClick={() => { navigate("/Zamowienia") }}> <p className={style.znak }>  </p> <img className={style.icon } src={iconZamowienia} alt="Zamówienia" /> <p className={style.menu_txt}>ZAMÓWIENIA</p>   </div> */}
                                                                        {/* <div className={style.kafle}  onClick={() => { navigate("/Zamowienia") } }><p className={style.znak }>  </p><img className={style.icon } src={iconTechnolgie} alt="Technologie" /><p className={style.menu_txt}>TECHNOLOGIE</p></div> */}
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_druk==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(1); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>XL</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_druk==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(2); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>SM_1</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_druk==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(3); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>SM_3</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_falc==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(14); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_1</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_falc==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(15); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_2</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_falc==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(16); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_3</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_falc==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(17); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_4</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_falc==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(18); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_5</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_falc==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(19); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_6</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_falc==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(20); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_7</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_falc==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(21); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_8</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_falc==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(22); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_9</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_uv==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(4); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>SITO</p> </div>:<></>}                
                                                         {DecodeToken(sessionStorage.getItem("token")).mini_uv==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(5); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>FOLIA</p> </div>:<></>}                
                                                                        {/* <div className={style.kafle} ><p className={style.znak }>  </p><img className={style.icon } src={iconCTP} alt="CTP" /> <p className={style.menu_txt}>CTP</p></div> */}
                                                                        {/* <div className={style.kafle} ><p className={style.znak }>  </p><img className={style.icon } src={iconMagazyn} alt="Magazyn" /><p className={style.menu_txt}>MAGAZYN</p> </div> */}
                                                                        {/* <div className={style.kafle} onClick={() => { navigate("/OprawaView") }}><p className={style.znak }>  </p><img className={style.icon } src={iconMagazyn} alt="Oprawa" /><p className={style.menu_txt}>OPRAWA</p> </div> */}
                                                                        {/* <div className={style.kafle} ><p className={style.znak }>  </p><img className={style.icon } src={iconKalendarz} alt="Ustawienia" /><p className={style.menu_txt}>KALENDARZ</p><img className={style.iconLock } src={iconLock} alt="Zamówienia" /></div> */}
                                                                        {/* <div className={style.kafle} onClick={() => { navigate("/ustawienia") }}><p className={style.znak }>  </p><img className={style.icon } src={iconUstawienia} alt="Ustawienia" /><p className={style.menu_txt}>USTAWIENIA</p></div> */}
                                                                        {/* <div className={style.kafle} ><p className={style.znak }>  </p><img className={style.icon } src={iconHistoria} alt="Zamówienia" /><p className={style.menu_txt}>HISTORIA</p><img className={style.iconLock } src={iconLock} alt="Zamówienia" /></div> */}
                                                        </div>
                                </div>
            
                </div>
            </>);
}