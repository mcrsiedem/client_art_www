import axios from "axios";
import { IP } from "utils/Host";
import { getTechnology } from "actions/getTechnolgy";
import { useEffect,createContext,useState, useCallback } from "react";;



export const TechnologyContext = createContext();
export const TechnologyContextProvider = ({children})=>{

    const [technology, setTechnology] = useState(null); //lista technologii 
    const [showTechnologyStage, setShowTechnologyStage] = useState(false);

    const [rowZamowienia, setRowZamowienia] = useState(null);  // row - dodaj kartę
    const [rowTechnologia, setRowTechnologia] = useState(null);  // row - edytuj kartę

    // menu


    const [menuElementyTech,setMenuElementyTech] = useState(false)

    //dane z zamówienia
    const [dane, setDane] = useState([]);
    const [produkty, setProdukty] = useState([]);
    const [elementy, setElementy] = useState([]);
    const [fragmenty, setFragmenty] = useState([]);
    const [oprawa, setOprawa] = useState([]);
    const [procesyElementow, setProcesyElementow] = useState([]);

        //dane z technologii
        const [daneTech, setDaneTech] = useState([]);
        const [produktyTech, setProduktyTech] = useState([]);
        const [elementyTech, setElementyTech] = useState([]);
        const [fragmentyTech, setFragmentyTech] = useState([]);
        const [oprawaTech, setOprawaTech] = useState([]);
        const [procesyElementowTech, setProcesyElementowTech] = useState([]);
        const [procesyElementowTechTemporary, setProcesyElementowTechTemporary] = useState([]); // aby mozna było zamknąc bez zapisywania
        const [showElementyTechProcesyInsert, setShowElementyTechProcesyInsert] =     useState(false);
        const [selectedElementTechROW,setSelectedElementTechROW] = useState(null)

        const [legi, setLegi] = useState([]);
        const [legiFragmenty, setLegiFragmenty] = useState([]);

        const [showErrorLegi, setShowErrorLegi] = useState(false);
        const [errorLegiInfo, setErrorLegiInfo] = useState([]);
        // const [legi, setLegi] = useState([{indeks:1,typ:1},{indeks:2,typ:1},{indeks:3,typ:1}]);
        const [arkusze, setArkusze] = useState([]);
        const [showErrorArkusze, setShowErrorArkusze] = useState(false);
        const [errorArkuszeInfo, setErrorArkuszeInfo] = useState([]);
    
        // dane z najnowszej wersji zamówienia da prowównania z trzema powyższymi

        const [dragLegaId,setDragLegaId] = useState(null)
        const [dropArkuszId,setDropArkuszId] = useState(null)

        // grupa - zbiór wykonań jednego procesu
        // wykonanie - wykonanie jednego procesu na arkuszu albo ledze
        const [grupaWykonan, setGrupaWykonan] = useState([]);
        const [wykonania, setWykonania] = useState([]);



        const updateTechnology = useCallback(()=>{
            getTechnology(setTechnology)
       },[])

       const handleUpdateRowElementyTech = (row) => {
        setElementyTech(
          elementyTech.map((t) => {
            if (t.id === row.id) {
              return row;
            } else {
              return t;
            }
          })
        )
      };


       function handleUpdateRowLegi(card) {
         setLegi(
           legi.map((t) => {
             if (t.id === card.id) {
               return card;
             } else {
               return t;
             }
           })
         );
       }

       function handleUpdateRowArkusze(card) {
        setArkusze(
          arkusze.map((t) => {
            if (t.id === card.id) {
              return card;
            } else {
              return t;
            }
          })
        );
      }


      function handleChangeCardFragmenty_i_Elementy_Tech(card) {
        // zmienia typ fragmentów gdy typ elementu jest zmieniany
        setElementyTech(
          elementyTech.map((t) => {
            if (t.id === card.id) {
              return card;
            } else {
              return t;
            }
          })
        );
    
        setFragmentyTech(
          fragmentyTech.map((t, a) => {
          // console.log("oprawa id" +prev)
          if (t.element_id === card.id) {
            return {
              ...t,
              typ: card.typ
    
            };
          } else {
            return t;
          }
        })
      );
      }


      const handleUpdateRowProcesyElementowTech = (row) => {
        setProcesyElementowTechTemporary(
          procesyElementowTechTemporary.map((t) => {
            if (t.id == row.id) {
              return row;
            } else {
              return t;
            }
          })
        )
      };

    //    const updateDane = useCallback((data) => {
    //     console.log("data",data)
    //     setDane(data);
    //   }, []);

       useEffect(() => {

    

        fechparametry(rowZamowienia?.id,rowZamowienia?.zamowienie_prime_id)


          }, [rowZamowienia]);

          useEffect(() => {
    
              }, [rowTechnologia]);
        
       useEffect(() => {
        const ilosc_stron = parseInt(legi[0]?.ilosc_stron);
        const suma_leg = parseInt(legi.map((f) => parseInt(f.typ_legi)).reduce((a, b) => a + b, 0))

        if( ilosc_stron == suma_leg){
            console.log("Legi OK")
            setShowErrorLegi(false)
        }

        if(ilosc_stron > suma_leg){
            setShowErrorLegi(true)
            setErrorLegiInfo(["Dodaj", ilosc_stron-suma_leg])
            console.log("Dodaj", ilosc_stron-suma_leg)
        }
        if(ilosc_stron < suma_leg){
            setShowErrorLegi(true)
            setErrorLegiInfo(["Usun ", suma_leg-ilosc_stron])
            console.log("Usun ", suma_leg-ilosc_stron)
        }
          
              }, [legi]);


              useEffect(() => {
                const ilosc_stron = parseInt(arkusze[0]?.ilosc_stron);
                const suma_leg = parseInt(arkusze.map((f) => parseInt(f.rodzaj_arkusza)).reduce((a, b) => a + b, 0))
        
                if( ilosc_stron == suma_leg){
                    // console.log("Legi OK")
                    setShowErrorArkusze(false)
                }
        
                if(ilosc_stron > suma_leg){
                    setShowErrorArkusze(true)
                    setErrorArkuszeInfo(["Dodaj", ilosc_stron-suma_leg])
                    // console.log("Dodaj", ilosc_stron-suma_leg)
                }
                if(ilosc_stron < suma_leg){
                  setShowErrorArkusze(true)
                    setErrorArkuszeInfo(["Usun ", suma_leg-ilosc_stron])
                    // console.log("Usun ", suma_leg-ilosc_stron)
                }
                setShowErrorArkusze(false) // wył alert
                      }, [arkusze]);
    
    useEffect(()=>{


    },[])

    
  async function fechparametry(idZamowienia,zamowienie_prime_id) {

     const res = await axios.get(IP + "parametry/"+idZamowienia+"/"+zamowienie_prime_id);

     setDane(res.data[0][0])
     setProdukty(res.data[1])
     setElementy(res.data[2])
     setFragmenty(res.data[3])
     setOprawa(res.data[4])
     setProcesyElementow(res.data[6])

     setDaneTech(res.data[0][0])
     setProduktyTech(res.data[1])
     setElementyTech(res.data[2])
     setFragmentyTech(res.data[3])
     setOprawaTech(res.data[4])
     setProcesyElementowTech(res.data[6])

}
    
    return  <TechnologyContext.Provider 
                value={{
                    technology, setTechnology, updateTechnology,
                    showTechnologyStage, setShowTechnologyStage,
                    rowZamowienia, setRowZamowienia,
                    rowTechnologia, setRowTechnologia,
                    // openTechnologia, setOpenTechnologia,
                    // updateDane,
                    dane, setDane,
                    produkty, setProdukty,
                    elementy, setElementy,
                    fragmenty, setFragmenty,
                    oprawa, setOprawa,
                    procesyElementow, setProcesyElementow,
                    daneTech, setDaneTech,
                    produktyTech, setProduktyTech,
                    elementyTech, setElementyTech,
                    fragmentyTech, setFragmentyTech,
                    oprawaTech, setOprawaTech,
                    procesyElementowTech, setProcesyElementowTech,
                    procesyElementowTechTemporary, setProcesyElementowTechTemporary,
                    menuElementyTech,setMenuElementyTech,
                    legi, setLegi,
                    legiFragmenty, setLegiFragmenty,
                    arkusze,setArkusze,
                    handleUpdateRowLegi,handleUpdateRowArkusze,
                    showErrorLegi, setShowErrorLegi,errorLegiInfo, setErrorLegiInfo,
                    showErrorArkusze, setShowErrorArkusze,
                    errorArkuszeInfo, setErrorArkuszeInfo,
                    handleUpdateRowElementyTech,
                    dragLegaId,setDragLegaId,
                    dropArkuszId,setDropArkuszId,
                    grupaWykonan, setGrupaWykonan,
                    wykonania, setWykonania,
                    handleChangeCardFragmenty_i_Elementy_Tech,
                    handleUpdateRowProcesyElementowTech,
                    showElementyTechProcesyInsert, setShowElementyTechProcesyInsert,
                    selectedElementTechROW,setSelectedElementTechROW
       
                }}
            >
                {children}
            </TechnologyContext.Provider>




}

