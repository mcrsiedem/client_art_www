import React, { useEffect,useState } from "react";

import style from '../components/Produkt.module.css'

 function Produkt(){
    return(<>

    <div className={style.container}>
        
           <label className={style.label} > Produkt  
                <input defaultValue="d" type="text" className={style.produkt}  />
          </label>
            
 


            <label className={style.label} > .
                <input defaultValue="d" type="text" className={style.produkt}  />
            </label>
     
        
     



    </div>
    </>
    );

}

export default Produkt;