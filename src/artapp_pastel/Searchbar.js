
import React from "react";
import style from '../artapp/Searchbar.module.css';

function Searchbar(){
    return(
        <div>
                    <input className={style.body}
                    type="tekst"
                    placeholder="Szukaj..."/>
                   
        </div>
    );

}
export default Searchbar;