import React from "react";
import {  useEffect,useState,useContext  } from "react";
import style from './ProcesoryMini.module.css';

import userOffline from 'assets/user_offline.svg'

import iconProcesy from 'assets/iconProcesy.svg'
import iconWagoniki from 'assets/iconKalendarz.svg'

import axios from "axios";
import { IP } from "utils/Host";
import DecodeToken from "pages/Login/DecodeToken";
import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "hooks/useOnlieStatus";
import { AppContext } from "context/AppContext";

import { TechnologyContext } from "context/TechnologyContext";

export default function ProcesoryMini({ user, setUser,logout }) {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const appcontext = useContext(AppContext);
  const techContext = useContext(TechnologyContext);
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const grupyWykonanAllNiezakonczone = techContext.grupyWykonanAllNiezakonczone;
  const setGrupWykonanAllNiezakonczone = techContext.setGrupWykonanAllNiezakonczone;

    const grupyWykonanAllNiezakonczoneOprawa = techContext.grupyWykonanAllNiezakonczoneOprawa;
  const setGrupWykonanAllNiezakonczoneOprawa = techContext.setGrupWykonanAllNiezakonczoneOprawa;
//   const setSelectedProcesor = appcontext.setSelectedProcesor
   const setSelectedProcesor = techContext.setSelectedProcesor;
  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
    axios
      .get(IP + "/technologie_grupyWykonan/" + sessionStorage.getItem("token"))
      .then((res) => {
setGrupWykonanAllNiezakonczone(res.data[0])
setGrupWykonanAllNiezakonczoneOprawa(res.data[1])
      });

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
                                                      
        {DecodeToken(sessionStorage.getItem("token")).mini_druk==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(1); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>XL</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 1 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_druk==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(2); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>SM_1</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 2 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_druk==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(3); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>SM_3</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 3 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_falc==1 && (grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 14 ).length !=0) ? <div className={style.kafle} onClick={() => {setSelectedProcesor(14); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_1</p><p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 14 && (x.status ==2 || x.status ==3) ).length}</p> </div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_falc==1 && grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 15 ).length !=0? <div className={style.kafle} onClick={() => {setSelectedProcesor(15); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_2</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 15 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_falc==1 && grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 16 ).length !=0? <div className={style.kafle} onClick={() => {setSelectedProcesor(16); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_3</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 16 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_falc==1 && grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 17 ).length !=0? <div className={style.kafle} onClick={() => {setSelectedProcesor(17); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_4</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 17 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_falc==1 && grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 18 ).length !=0? <div className={style.kafle} onClick={() => {setSelectedProcesor(18); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_5</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 18 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_falc==1 && grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 19 ).length !=0? <div className={style.kafle} onClick={() => {setSelectedProcesor(19); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_6</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 19 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_falc==1 && grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 20 ).length !=0? <div className={style.kafle} onClick={() => {setSelectedProcesor(20); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_7</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 20 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_falc==1 && grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 21 ).length !=0? <div className={style.kafle} onClick={() => {setSelectedProcesor(21); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_8</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 21 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_falc==1 && (grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 22 ).length) !=0? <div className={style.kafle} onClick={() => {setSelectedProcesor(22); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>STAHL_9</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 22 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_uv==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(4); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>SITO</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 4 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_uv==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(5); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>LAMINATOR</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 5 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_inne==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(29); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>KODY</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 29 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_inne==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(6); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>BOBST</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 6 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_inne==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(7); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>TYGIEL</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczone.filter(x=> x.procesor_id == 7 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_oprawa==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(8); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>KOLBUS</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczoneOprawa.filter(x=> x.procesor_id == 8 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).mini_oprawa==1? <div className={style.kafle} onClick={() => {setSelectedProcesor(10); navigate("/ProcesyMini") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p className={style.menu_txt}>ST450</p> <p className={style.menu_txt_zielony} > {grupyWykonanAllNiezakonczoneOprawa.filter(x=> x.procesor_id == 10 && (x.status ==2 || x.status ==3) ).length}</p></div>:<></>}                
        {DecodeToken(sessionStorage.getItem("token")).gant==1? <div className={style.kafle} onClick={() => { navigate("/kalendarz2") }} ><p className={style.znak }>  </p><img className={style.icon } src={iconWagoniki} alt="Kalendarz" /><p className={style.menu_txt}>Kalendarz</p> </div>:<></>}                
      
                                                        </div>

                                </div>
            
                </div>
            </>);
}