import { useEffect,createContext,useState, useCallback, useRef } from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcess } from "actions/getProcess";

import axios from "axios";
import { IP } from "utils/Host";
import { initialProdukty,initialElementy,initialFragmenty, initialOprawa, initalPakowanie } from "initial/initialvalue";
export const ModalInsertContext = createContext();
export const ModalInsertContextProvider = ({children})=>{
    const [lockDragDrop, setLockDragDrop] = useState(null);
    const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(false);
    const [showElementyProcesyInsert, setShowElementyProcesyInsert] =     useState(false);
    const [zamowienieID,setZamowienieID] = useState(null)
    const [selectedElementROW,setSelectedElementROW] = useState(null)
    const [procesy,setProcesy] = useState(null)


    const [produkty, setProdukty] = useState(initialProdukty);
    const [elementy, setElementy] = useState(initialElementy);
    const [fragmenty, setFragmenty] = useState(initialFragmenty);
    const [oprawa, setOprawa] = useState(initialOprawa);
    const [pakowanie, setPakowanie] = useState(initalPakowanie);

    
     const updateZamowienieID = useCallback((data) => {
       setZamowienieID(data);
     }, []);
    
    
    useEffect(()=>{
        

    },[])
    
    return (
      <ModalInsertContext.Provider
        value={{
          produkty, setProdukty,
          elementy, setElementy,
          fragmenty, setFragmenty,
          oprawa, setOprawa,
          pakowanie, setPakowanie,

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