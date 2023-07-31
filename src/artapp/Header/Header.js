import React from "react";
import style from './Header.module.css';
import Searchbar from '../Searchbar';
import ReactLogo from './grid.svg';

function Header(){
    return (
        <header id='header' className={style.body}>
            <img className={style.grid} src={ReactLogo} alt="React Logo" />
            <img className={style.grid} src={ReactLogo} alt="React Logo" />
            <img className={style.grid} src={ReactLogo} alt="React Logo" />
            <img className={style.grid} src={ReactLogo} alt="React Logo" />
            <img className={style.grid} src={ReactLogo} alt="React Logo" />
                {/* <Searchbar/>
                <p>1</p> */}
        </header>
    );
}

export default Header;