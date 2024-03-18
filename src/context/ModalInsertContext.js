import { useEffect,createContext,useState, useCallback, useRef } from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcess } from "actions/getProcess";

import axios from "axios";
import { IP } from "utils/Host";
export const ModalInsertContext = createContext(
    //  {getClients: ()=>{}}
);
export const ModalInsertContextProvider = ({children})=>{
    const[showElementyProcesyInsert, setShowElementyProcesyInsert] =     useState(false);
    const[zamowienieID,setZamowienieID] = useState(null)
    const[selectedElementID,setSelectedElementID] = useState(null)
    const[procesy,setProcesy] = useState(null)

    const [preOrder, setPreOrder] = useState({
        typ: 1,
        oprawa: 1,
        naklad: "1000",
        strony_okl: "4",
        strony_srd: "80",
        format_x: "210",
        format_y: "297",
        bok_oprawy: "297"
    
      });

     const updateZamowienieID = useCallback((data)=>{
        
        setZamowienieID(data)
       },[])
    
    
    useEffect(()=>{
        

    },[])
    
    return  <ModalInsertContext.Provider 
                value={{
                    preOrder, setPreOrder,
                    selectedElementID,setSelectedElementID,
                    zamowienieID,setZamowienieID,  // id otwartego zamowienia
                    showElementyProcesyInsert,setShowElementyProcesyInsert,
    
                     
                   updateZamowienieID
                }}
            >
                {children}
            </ModalInsertContext.Provider>
}