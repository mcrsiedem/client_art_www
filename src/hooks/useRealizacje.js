
import { IP } from "utils/Host";
import axios from "axios";
import { useState,useEffect, useContext  } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";

import { _typ_elementu } from "utils/initialvalue";

export   function useRealizacje() {


      const appcontext = useContext(AppContext);
      const modalcontext = useContext(ModalInsertContext);
      const techContext = useContext(TechnologyContext);

  
const [isLoading, setIsLoading] = useState(false);
const callPodgladRalizacji = async (od) =>{

        setLoading?.(true)
        let podglady=[]
        
        const res = await axios.get(IP + "podglad_realizacji_dzien/"+od+"/" + sessionStorage.getItem("token"));

        podglady.push(...res.data[0])
        podglady.push(...res.data[1])
        podglady.push(...res.data[2])
        setPodgladRealizacji(podglady);
      

        setLoading?.(false)
   
        

      }

//----------------------------------------------------------------

    return {callPodgladRalizacji};
  }