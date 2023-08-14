
import React from "react";
import style from './Searchbar.module.css'

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