import React from "react";
import style from '../artapp/Row.module.css';
import Searchbar from "./Searchbar";
function Row(){
    return (
        // <div className={style.body}>899 / 2023 03-06-2023 12:05 Nowa Era  70432</div>
        <div className={style.body}>
        <Searchbar/>
        </div>
);
}

export default Row;