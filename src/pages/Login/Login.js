import React from "react";
import { useState, createContext, useContext, useEffect, useRef } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IP } from "../../utils/Host";
import DecodeToken from "./DecodeToken";
import iconLogo from "../../assets/logo_biale.svg";
import { SocketContext } from "../../context/SocketContext";
 import background from "assets/logowanie_1.jpg"
export default function Login( ) {

  const [user,setUser] = useState(null);
  const [socket,setSocket] = useState(null);
  const [input, setInput] = useState({    login: "",    haslo: "",  });
  const context = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {

    return ()=>{
    }
   }, [user]);

   useEffect(() => {
    if(socket === null) return;
    socket.on("receive_message", (data) => {
      //tu przychodzi odpowiedź i jest zapisana w contexcie
      context.setSocketReceive(data.message);
      
    });
  }, [socket]);


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(IP + "users/" + input.login + "/" + input.haslo).then((res) => {
      if (res.data.length > 0) {
        sessionStorage.setItem("id", DecodeToken(res.data).id); // tymczasowo zapisje id usera
        sessionStorage.setItem("token", res.data); // token w sesionStorage aby kazda karta przegladarki wymagala zalogowania
        setUser({id: DecodeToken(res.data).id, user:DecodeToken(res.data).imie })
        navigate("/Panel");
      } else {
        console.log("Błąd");
      }
    });
  };

  return (
    <div className={style.container}>
      <div className={style.center}>
        <Center
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

function Center({ input, setInput, handleSubmit }) {
  return (
    <div className={style.loginPaine}>
      <form onSubmit={handleSubmit} className={style.form}>
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

        <button type="submit" className={style.myButton}>
          Zaloguj
        </button>
      </form>
    </div>
  );
}
