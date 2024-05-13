import { useEffect,createContext,useState, useCallback, useRef } from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcess } from "actions/getProcesList";
import { initialDane, initialProcesy } from "utils/initialvalue";

import axios from "axios";
import { IP } from "utils/Host";
import { initialProdukty,initialElementy,initialFragmenty, initialOprawa, initalPakowanie } from "utils/initialvalue";
export const ModalInsertContext = createContext();
export const ModalInsertContextProvider = ({children})=>{
    const [lockDragDrop, setLockDragDrop] = useState(null);
    const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(false);
    const [showElementyProcesyInsert, setShowElementyProcesyInsert] =     useState(false);
    const [zamowienieID,setZamowienieID] = useState(null)
    const [selectedElementROW,setSelectedElementROW] = useState(null)



    const [daneZamowienia, setDaneZamowienia] = useState(initialDane);  
    const [produkty, setProdukty] = useState(initialProdukty);
    const [elementy, setElementy] = useState(initialElementy);
    const [fragmenty, setFragmenty] = useState(initialFragmenty);
    const [oprawa, setOprawa] = useState(initialOprawa);
    const [pakowanie, setPakowanie] = useState(initalPakowanie);
    const [procesyElementow, setProcesyElementow] = useState(initialProcesy);
   // tymczasowe procesy aby mozna było zamknąć bez zapisywania
   const [procesyElementowTemporary, setProcesyElementowTemporary] = useState(initialProcesy);


    const [kosztyDodatkoweZamowienia, setKosztyDodatkoweZamowienia] = useState([]); // koszty dodatkowe zmówienia - zestawienie - jeśli są 
    const [kosztyDodatkowe, setKosztyDodatkowe] = useState([]); // wszystkie koszty dodatkowe  pobierane wg id kosztów zamówienia
    const [kosztyDodatkoweTemporary, setKosztyDodatkoweTemporary] = useState([]); // koszty dodatkowe  w trakcie edycji
    const [showKosztyDodatkoweEdit, setShowKosztyDodatkoweEdit] =     useState(false);
    const [selectedKosztyDodatkoweZamowienia,setSelectedKosztyDodatkoweZamowienia] = useState(null)

 

    
     const updateZamowienieID = useCallback((data) => {
       setZamowienieID(data);
     }, []);
    
    
     
     // aktualizacja row w stanie produkty, elementy, fragmenty, oprawa, pakowanie
      const handleUpdateRowProdukty = (row) => {
      setProdukty(
        produkty.map((t) => {
          if (t.id === row.id) {
            return row;
          } else {
            return t;
          }
        })
      )
    };

    const handleUpdateRowElementy = (row) => {
      setElementy(
        elementy.map((t) => {
          if (t.id === row.id) {
            return row;
          } else {
            return t;
          }
        })
      )
    };

    const handleUpdateRowFragmenty = (row) => {
      setFragmenty(
        fragmenty.map((t) => {
          if (t.id === row.id) {
            return row;
          } else {
            return t;
          }
        })
      )
    };

    const handleUpdateRowPakowanie = (row) => {
      setPakowanie(
        pakowanie.map((t) => {
          if (t.id === row.id) {
            return row;
          } else {
            return t;
          }
        })
      )
    };

    const handleUpdateRowProcesyElementow = (row) => {
      setProcesyElementowTemporary(
        procesyElementowTemporary.map((t) => {
          if (t.id == row.id) {
            return row;
          } else {
            return t;
          }
        })
      )
    };

    const handleUpdateKosztyDodatkoweTemporary = (row) => {
      setKosztyDodatkoweTemporary(
        kosztyDodatkoweTemporary.map((t) => {
          if (t.id == row.id) {
            return row;
          } else {
            return t;
          }
        })
      )
    };

    useEffect(()=>{
// gdy zmieniają sie koszty dodatkowe sumowany jest tutaj wynik
      let suma = 0;
      kosztyDodatkoweTemporary.forEach(element => {
         suma= suma + parseFloat(element.suma)
      });
        console.log("Wynik: "+suma)

        setKosztyDodatkoweZamowienia(prev=> prev.map(x=>{
          return {
            ...x,suma: suma
        
          }
        }))

    },[kosztyDodatkoweTemporary])
    
    return (
      <ModalInsertContext.Provider
        value={{
          daneZamowienia, setDaneZamowienia,
          produkty, setProdukty,
          elementy, setElementy,
          fragmenty, setFragmenty,
          oprawa, setOprawa,
          pakowanie, setPakowanie,
          procesyElementow, setProcesyElementow,
          procesyElementowTemporary, setProcesyElementowTemporary,
          kosztyDodatkoweZamowienia, setKosztyDodatkoweZamowienia,
          kosztyDodatkowe, setKosztyDodatkowe,

          lockDragDrop, setLockDragDrop,
     
          selectedElementROW,
          setSelectedElementROW,
          zamowienieID,
          setZamowienieID, // id otwartego zamowienia
          showElementyProcesyInsert,
          setShowElementyProcesyInsert,

          updateZamowienieID,
          isSaveButtonDisabled, setSaveButtonDisabled,

          handleUpdateRowProdukty,
          handleUpdateRowElementy,
          handleUpdateRowFragmenty,
          handleUpdateRowPakowanie,
          handleUpdateRowProcesyElementow,
          handleUpdateKosztyDodatkoweTemporary,
          kosztyDodatkoweTemporary, setKosztyDodatkoweTemporary,
          showKosztyDodatkoweEdit, setShowKosztyDodatkoweEdit,
          selectedKosztyDodatkoweZamowienia,setSelectedKosztyDodatkoweZamowienia,
          

        }}
      >
        {children}
      </ModalInsertContext.Provider>
    );
}