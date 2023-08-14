import React from "react";
import style from './Header.module.css';
import Searchbar from '../Print/Searchbar';
import ReactLogo from './grid.svg';
import ReactLogo_ilosc from './ilosc.svg';
import ReactLogo_ustawienia from './settings.svg';
import ReactLogo_full from './full.svg';
import ReactLogo_history from './history.svg';
import { useNavigate } from 'react-router-dom';
// import CloseButton from 'react-bootstrap/CloseButton';

import Hisotry from "../History/History";

function Header(){
    const navigate = useNavigate();
    const show = localStorage.getItem("header");
    const fullScrean = () => {

        document.querySelector("#root").requestFullscreen()
          .then(function () {
          })
          .catch(function (error) {
            console.log(error.message);
          });
    
          }

          const resize = () => {
          
            // window.open("", "", "width=200, height=100");
            window.resizeTo(500,500);
        
              }


    return (

        
        
                      <header id='header' className={style.body}>

 <div className={style.leftHeaderContener}>
            
                <img className={style.icon} src={ReactLogo_ustawienia}  onClick={()=>{resize()}} alt="React Logo" />
                <img className={style.icon} src={ReactLogo} alt="React Logo" />
                <img className={style.icon} src={ReactLogo} alt="React Logo" />
                <img className={style.icon} src={ReactLogo} alt="React Logo" />
                <img className={style.icon} src={ReactLogo_ilosc} onClick={()=>{ navigate('/ArtApp');}} alt="React Logo" />
                <img className={style.icon} src={ReactLogo_history} onClick={()=>{ navigate('/History');}} alt="React Logo" />

            </div >
            <div className={style.leftHeaderContener}>

            </div>
            <div className={style.rightHeaderContener}>
               <img className={style.icon} src={ReactLogo_full} onClick={()=>{fullScrean()}} alt="React Logo" /> 
                
                {/* <CloseButton variant="white"/> */}
                
            </div>

           
            
             
               
        </header>
            )}


    


export default Header;