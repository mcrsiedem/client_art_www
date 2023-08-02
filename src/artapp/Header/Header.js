import React from "react";
import style from './Header.module.css';
import Searchbar from '../Searchbar';
import ReactLogo from './grid.svg';
import ReactLogo_ilosc from './ilosc.svg';
import ReactLogo_ustawienia from './settings.svg';
import ReactLogo_full from './full.svg';
import ReactLogo_history from './history.svg';
import { useNavigate } from 'react-router-dom';

function Header(){
    const navigate = useNavigate();
    const fullScrean = () => {

        document.querySelector("#grid-container").requestFullscreen()
          .then(function () {
          })
          .catch(function (error) {
            console.log(error.message);
          });
    
          }

    return (
        <header id='header' className={style.body}>
            <div className={style.leftHeaderContener}>
            <img className={style.icon} src={ReactLogo_full} onClick={()=>{fullScrean()}} alt="React Logo" />
                <img className={style.icon} src={ReactLogo_ustawienia} alt="React Logo" />
                <img className={style.icon} src={ReactLogo} alt="React Logo" />
                <img className={style.icon} src={ReactLogo} alt="React Logo" />
                <img className={style.icon} src={ReactLogo} alt="React Logo" />
                <img className={style.icon} src={ReactLogo_ilosc} alt="React Logo" />
                <img className={style.icon} src={ReactLogo_history} onClick={()=>{fullScrean()}} alt="React Logo" />

            </div >
            <div className={style.leftHeaderContener}>

            </div>
            <div className={style.rightHeaderContener}>
                <Searchbar />
                
            </div>
            
             
               
        </header>
    );
}

export default Header;