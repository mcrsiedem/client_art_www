
import { useContext } from "react";
import style from "./AddRealizacjaOprawa.module.css";
import { addRealizajcaOprawy } from "./addRealizajcaOprawy";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { useSocket } from "context/SocketContext";
export default function Zapisz({setShow,grup,value}) {

    const techContext = useContext(TechnologyContext);
    const appContext = useContext(AppContext);

      const setWykonaniaOprawy = techContext.setWykonaniaOprawy;
      const wykonaniaOprawy = techContext.wykonaniaOprawy;
      const grupyOprawaAll = techContext.grupyOprawaAll;
      const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
      const setIsLoading = appContext.setIsLoading;

     const {         socket } = useSocket()
    
    return (
      <button
        className={style.btn}
        onClick={() => {
          if(value==""){
            alert("Dodaj ilość")
          }else{
                  addRealizajcaOprawy(setShow,grup,value,wykonaniaOprawy,setWykonaniaOprawy,grupyOprawaAll,setGrupyOprawaAll,setIsLoading,socket)
          setShow(false)
          }
    
          
          }}
      >
        Zapisz
      </button>
    );
  }