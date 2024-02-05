import React from "react";
import {  useEffect } from "react";
import style from '../Panel/Panel.module.css';
import { useNavigate } from "react-router-dom";

function Panel({user,setUser}){
        const navigate = useNavigate();

    useEffect(() => {
        document.getElementById("header").style.display = "none";
      }, []);



    return(<>

    <div id="container" className={style.container} >

                        <div onClick={() => { navigate("/Zamowienia") }}className={style.kafle}>
                                <div className={style.magazyn}>
                                        
                                </div>
                             <div  >Zamówienia</div>   
                        </div>


                    
                       <div className={style.kafle}>
                                <div className={style.magazyn}>
                                        
                                </div>
                             <div  onClick={() => { navigate("/Zamowienia") }}>Zlecenie</div>   
                        </div>



                    
                        <div className={style.kafle}>
                                <div className={style.magazyn}>
                                        
                                </div>
                             <div  onClick={() => { navigate("/Zamowienia") }}>CTP</div>   
                        </div>
           

           
                        <div className={style.kafle}>
                                <div className={style.magazyn}>
                                        
                                </div>
                             <div  onClick={() => { navigate("/Print") }}>Druk</div>   
                        </div>


                       <div className={style.kafle}>
                                <div className={style.magazyn}>
                                        
                                </div>
                             <div  onClick={() => { navigate("/Zamowienia") }}>Falcowanie</div>   
                        </div>
                        <div className={style.kafle}>
                                <div className={style.magazyn}>
                                        
                                </div>
                             <div  onClick={() => { navigate("/Zamowienia") }}>Oprawa</div>   
                        </div>
                 
    

        
                        <div className={style.kafle}>
                                <div className={style.magazyn}>
                                        
                                </div>
                             <div  onClick={() => { navigate("/Zamowienia") }}>Uszlachetnianie</div>   
                        </div>
                        <div className={style.kafle}>
                                <div className={style.magazyn}>
                                        
                                </div>
                             <div  onClick={() => { navigate("/Zamowienia") }}>Magazyn</div>   
                        </div>
              
    
    </div>
    
    </>);
}

export default Panel;