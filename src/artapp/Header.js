import React from "react";
import style from '../artapp/Header.module.css';
import Searchbar from '../artapp/Searchbar';

function Header(){
    return (
        <header className={style.body}>
                <Searchbar/>
             
        </header>
    );
}

export default Header;