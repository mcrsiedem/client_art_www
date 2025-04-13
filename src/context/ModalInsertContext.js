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
    const [lockDragDrop, setLockDragDrop] = useState(false);
    const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(true);

  const [isShowAddClientStage, showAddClientStage] = useState(false);
    const [showElementyProcesyInsert, setShowElementyProcesyInsert] =     useState(false);
    const [selectedElementROW,setSelectedElementROW] = useState(null)
    const [selectedZamowienie,setSelectedZamowienie] = useState(1)



    const [historiaZamowienia, setHistoriaZamowienia] = useState([]);  
    const [daneZamowienia, setDaneZamowienia] = useState(initialDane);  
    const [produkty, setProdukty] = useState(initialProdukty);
    const [elementy, setElementy] = useState(initialElementy);
    const [fragmenty, setFragmenty] = useState(initialFragmenty);
    const [oprawa, setOprawa] = useState(initialOprawa);
    const [pakowanie, setPakowanie] = useState(initalPakowanie);
    const [procesyElementow, setProcesyElementow] = useState(initialProcesy);
    const [technologieID, setTechnologieID] = useState(null); // nr id technologi wygenerowanych zamówienia
   // tymczasowe procesy aby mozna było zamknąć bez zapisywania
   const [procesyElementowTemporary, setProcesyElementowTemporary] = useState(initialProcesy);


    const [kosztyDodatkoweZamowienia, setKosztyDodatkoweZamowienia] = useState([]); // koszty dodatkowe zmówienia - zestawienie - jeśli są 
    const [kosztyDodatkowe, setKosztyDodatkowe] = useState([]); // wszystkie koszty dodatkowe  pobierane wg id kosztów zamówienia
    const [kosztyDodatkoweTemporary, setKosztyDodatkoweTemporary] = useState([]); // koszty dodatkowe  w trakcie edycji
    const [showKosztyDodatkoweEdit, setShowKosztyDodatkoweEdit] =     useState(false);
    const [selectedKosztyDodatkoweZamowienia,setSelectedKosztyDodatkoweZamowienia] = useState(null)

    const [showPaperStage, setShowPaperStage] =useState(false);
    const [showInputNrZamowienie, setShowInputNrZamowienie] =useState(false);
    const [showMenuZamowienia, setShowMenuZamowienia] = useState(false);

    
    useEffect(() => {
     


      setSaveButtonDisabled(true)
    }, [daneZamowienia,produkty,elementy,fragmenty,oprawa,procesyElementow,procesyElementowTemporary]);

  
    
     const addHistoria = (row) => {
      const new_historia = historiaZamowienia.splice()
      new_historia.push(row)
      // const his = historiaZamowienia.push({id:1})
       setHistoriaZamowienia(new_historia)
      // console.log(row)
    };
     
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

    


    const handleUpdateRowOprawa = (row) => {
      setOprawa(
        oprawa.map((t) => {
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

    const handleDeleteKosztyDodatkoweTemporary = (row) => {
      setKosztyDodatkoweTemporary(
        kosztyDodatkoweTemporary.filter((t) => t.id != row.id)
      )
    };






    useEffect(() => {
      // gdy zmieniają sie koszty dodatkowe sumowany jest tutaj wynik
      let suma = 0.0;
      kosztyDodatkoweTemporary.forEach((element, i) => {
        suma = parseFloat(parseFloat(suma) + parseFloat(element.suma));
      });

      setKosztyDodatkoweZamowienia((prev) =>
        prev.map((x) => {
          return {
            ...x,
            suma: suma,
          };
        })
      );
    }, [kosztyDodatkoweTemporary]);

    
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
          technologieID, setTechnologieID,

          lockDragDrop, setLockDragDrop,
     
          selectedElementROW,
          setSelectedElementROW,
          showElementyProcesyInsert,
          setShowElementyProcesyInsert,
          isSaveButtonDisabled, setSaveButtonDisabled,
          handleUpdateRowProdukty,
          handleUpdateRowElementy,
          handleUpdateRowFragmenty,
          handleUpdateRowPakowanie,
          handleUpdateRowOprawa,
          handleUpdateRowProcesyElementow,
          handleUpdateKosztyDodatkoweTemporary,
          handleDeleteKosztyDodatkoweTemporary,
          kosztyDodatkoweTemporary, setKosztyDodatkoweTemporary,
          showKosztyDodatkoweEdit, setShowKosztyDodatkoweEdit,
          selectedKosztyDodatkoweZamowienia,setSelectedKosztyDodatkoweZamowienia,showPaperStage, setShowPaperStage,
          selectedZamowienie,setSelectedZamowienie,isShowAddClientStage, showAddClientStage,addHistoria,historiaZamowienia, setHistoriaZamowienia,
          showInputNrZamowienie, setShowInputNrZamowienie,
          showMenuZamowienia, setShowMenuZamowienia,



          

        }}
      >
        {children}
      </ModalInsertContext.Provider>
    );
}