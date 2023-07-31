import React from "react";
import style from './Header.module.css';
import Searchbar from '../Searchbar';
import ReactLogo from './grid.svg';
import ReactLogo_ilosc from './ilosc.svg';
import ReactLogo_ustawienia from './settings.svg';

function Header(){
    return (
        <header id='header' className={style.body}>
            <div className={style.leftHeaderContener}>
                <img className={style.icon} src={ReactLogo_ustawienia} alt="React Logo" />
                <img className={style.icon} src={ReactLogo} alt="React Logo" />
                <img className={style.icon} src={ReactLogo} alt="React Logo" />
                <img className={style.icon} src={ReactLogo} alt="React Logo" />
                <img className={style.icon} src={ReactLogo_ilosc} alt="React Logo" />
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