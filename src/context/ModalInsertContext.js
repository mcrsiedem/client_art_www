import { useEffect,createContext,useState, useCallback, useRef } from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcess } from "actions/getProcess";

import axios from "axios";
import { IP } from "utils/Host";
export const ModalInsertContext = createContext();
export const ModalInsertContextProvider = ({children})=>{
    const [lockDragDrop, setLockDragDrop] = useState(null);
    const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(false);
    const [showElementyProcesyInsert, setShowElementyProcesyInsert] =     useState(false);
    const [zamowienieID,setZamowienieID] = useState(null)
    const [selectedElementROW,setSelectedElementROW] = useState(null)
    const [procesy,setProcesy] = useState(null)


    const [produkty, setProdukty] = useState([
      {
        id: 1,
        zamowienie_id: 1,
        typ: 1,
        nazwa: "",
        wersja: "",
        ilosc_stron: "",
        format_x: "",
        format_y: "",
        oprawa: "",
        naklad: "",
        indeks: 0,
        uwagi: "",
      },
    ]);

    
     const updateZamowienieID = useCallback((data) => {
       setZamowienieID(data);
     }, []);
    
    
    useEffect(()=>{
        

    },[])
    
    return (
      <ModalInsertContext.Provider
        value={{
        lockDragDrop, setLockDragDrop,
     
          selectedElementROW,
          setSelectedElementROW,
          zamowienieID,
          setZamowienieID, // id otwartego zamowienia
          showElementyProcesyInsert,
          setShowElementyProcesyInsert,

          updateZamowienieID,
          isSaveButtonDisabled, setSaveButtonDisabled
        }}
      >
        {children}
      </ModalInsertContext.Provider>
    );
}