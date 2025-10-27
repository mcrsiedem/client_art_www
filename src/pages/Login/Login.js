import React from "react";
import { useState, useContext, useEffect } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IP } from "../../utils/Host";
import DecodeToken from "./DecodeToken";
import iconLogo from "../../assets/logo_biale.svg";
import {  useSocket } from "../../context/SocketContext";
 import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { getCurrentBuildHash } from "actions/getCurrentBuildHash";
import iconAdd from "assets/history.svg";
export default function Login( ) {

  const [user,setUser] = useState(null);
  const [logowanie,setLogowanie] = useState(true);
  const [input, setInput] = useState({    login: "",    haslo: "",  });
  const navigate = useNavigate();

  const contextApp = useContext(AppContext);
  const techContext = useContext(TechnologyContext);
  const { updateAuthStatus } =   useSocket();

  useEffect(() => {

    return ()=>{
    }
   }, [user]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLogowanie(false)


  //sql injections
 // ' or '1' = '1
 let hash = getCurrentBuildHash() ; 

    const res = await axios.get(IP + "users/" + input.login + "/" + input.haslo + "/" + hash)
    let token = res.data[0]
    let ver = res.data[1][0]

if (token.length > 0) {
  sessionStorage.setItem("id", DecodeToken(token).id); 
  sessionStorage.setItem("token", token); 
  setUser({id: DecodeToken(token).id, user:DecodeToken(token).imie })
  navigate("/Panel");

techContext.setSelectedProcesor(DecodeToken(token).procesor_domyslny)
 contextApp.setSelectedKlient(0);
 contextApp.setSelectedUser(0);

 if(hash.toString().trim() == ver.ver.toString().trim()){

console.log("hash === ver ")
 }else{
  contextApp.setRestart(true)
  console.log("hash !== ver ")
 }

updateAuthStatus(true,token)


} else {
  console.log("Błąd");
}


  };

  return (
    <div className={style.container}>
      <div className={style.center}>
        <Center
        logowanie={logowanie}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

function Center({ input, setInput, handleSubmit,logowanie }) {

      return (
    <div className={style.loginPaine}>
      <form onSubmit={handleSubmit} className={style.form}>
      
{logowanie ? (<> 
  <div>
          <img className={style.icon2} src={iconLogo} alt="logo" />
        </div>
        <div>
          <input
            type="text"
            name="login"
            placeholder="Login"
            onChange={(e) => setInput({ ...input, login: e.target.value })}
            className={style.loginInput}
          />
        </div>

        <div>
          <input
            type="password"
            name="haslo"
            placeholder="Hasło"
            onChange={(e) => setInput({ ...input, haslo: e.target.value })}
            className={style.loginInput}
          />
        </div>

    <button 
        title={"Wersja: "+getCurrentBuildHash() }
        onClick={()=>handleSubmit}type="submit" className={style.myButton}>
          Zaloguj
        </button> </> ) : (<div>           <img
            className={style.icon}
            src={iconAdd}
          /></div>)}    
      </form>
    </div>
  );
  



}
