import React from "react";
import style from '../Logowanie/Logowanie.module.css';


function Logowanie(props){

  return(
    <div className={style.bodyprzerwa}>

      <div className={style.header}>
        <h1>Zaloguj</h1>
        <hr></hr>
      </div>

      <form className={style.form}>


        <div className={style.input}>
          <label for="login">Login:</label>
          <input id="login" type="text" aria-label="Login"/>
        </div>

        <div className={style.password}>
          <label for="password">Password:</label>
          <input id="password" type="password" aria-label="Password"/>
        </div>

        <div className={style.buttonContainer}>
        
        </div>
      </form>

    </div>
  );
  

}
export default Logowanie;