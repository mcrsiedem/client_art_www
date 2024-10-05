import axios from "axios";
import { IP } from "utils/Host";
import { getTechnology } from "actions/getTechnolgy";
import { useEffect,createContext,useState, useCallback } from "react";import { initialProcesy } from "utils/initialvalue";
;



export const TechnologyContext = createContext();
export const TechnologyContextProvider = ({children})=>{
     const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(false);
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
        const [procesyElementowTechTemporary, setProcesyElementowTechTemporary] = useState(initialProcesy); // aby mozna było zamknąc bez zapisywania
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

      const updateRowProduktyTech = (row) => {
        setProduktyTech(
          produktyTech.map((t) => {
            if (t.id === row.id) {
              return row;
            } else {
              return t;
            }
          })
        )
      };






      const updateGrupaWykonan = (row) => {
        setGrupaWykonan(
          grupaWykonan.map((t) => {
            if (t.id === row.id) {
              return row;
            } else {
              return t;
            }
          })
        )


      };


      function updateWykonaniaWszystkie(row) {
       
        // console.log("grupa:"+ row[0])
        // zmienia typ fragmentów gdy typ elementu jest zmieniany
        setGrupaWykonan(
          grupaWykonan.map((t) => {
            if (t.id === row.id) {
              return row;
            } else {
              return t;
            }
          })
        )
    
        setWykonania(
          wykonania
          .map((t) => {
            if (t.grupa_id == row.id) {
              return {
                ...t,
                status: row.status
      
              };
            } else {
              return t;
            }
          })
        )




      }



      const updateWykonanie = (row) => {
        setWykonania(
          wykonania.map((t) => {
            if (t.id === row.id) {
              return row;
            } else {
              return t;
            }
          })
        )
      };

      const updateRowOprawaTech = (row) => {
        setOprawaTech(
          oprawaTech.map((t) => {
            if (t.id === row.id) {
              return row;
            } else {
              return t;
            }
          })
        )
      };

      const updateRowProcesyElementowTech = (row) => {
        setProcesyElementow(
          procesyElementow.map((t) => {
            if (t.id === row.id) {
              return row;
            } else {
              return t;
            }
          })
        )
      };


      const deleteElementTech = (row) => {

        //kasowanie elementuTech razem ze wszystkim co jest z nim powiazane
        // jeden element musi zostać
if(elementyTech.length>1){
        setProcesyElementowTech(procesyElementowTech.filter(e => e.element_id !== row.id))
        setLegiFragmenty(legiFragmenty.filter(e => e.element_id !== row.id))
        setArkusze(arkusze.filter(e => e.element_id !== row.id))
        setLegi(legi.filter(e => e.element_id !== row.id))
        setWykonania(wykonania.filter(e => e.element_id !== row.id))
        setElementyTech(elementyTech.filter(e => e.id !== row.id))
}

    
      
      }


const setNumerArkusza = (row) => {

 let elementy=  elementyTech
  .map((f) => f.id)

console.log(elementy)

  // setArkusze(prev => prev.map(e ))
}

const setNumerArkusza2 = (row) => {
  // const arkuszeEdit = ar.slice();
  // console.log(  elementyTech

  elementyTech
  .map((f) => f.id)
  .forEach( (element,x) => {

console.log(element)
    setArkusze( prev=> prev
      .map((ark,i) => {

      if(ark.element_id == element){
  
        return {...ark, nr_arkusza: i}
        
      }else {return ark } 
     
      }
    )
    )
  })

}





      
      const addNewOprawa = (row) => {
        const newOprawaTech = oprawaTech.slice();
        newOprawaTech.push({
          id: Math.max(...newOprawaTech.map((f) => f.id)) + 1,
          zamowienie_id: row.zamowienie_id,
          produkt_id: row.produkt_id,
          oprawa: row.oprawa,
          bok_oprawy: row.bok_oprawy,
          naklad: row.naklad,
          indeks: Math.max(...newOprawaTech.map((f) => f.indeks)) + 1,
          uwagi: row.uwagi,
          data_spedycji: row.data_spedycji,
          data_czystodrukow: row.data_czystodrukow,
            indeks: row.indeks + 1,
        })
      setOprawaTech(newOprawaTech)
      }


      const deleteOprawa = (row) => {

      setOprawaTech((oprawaTech.filter(e => e.id !== row.id)))
      }


      const input1632toElemnt = (l) => {

        setElementyTech(
          elementyTech.map((t) => {

            if(l==16){
                          if (t.typ == 1) {
                return {...t,
                  lega: 4,ilosc_leg:1}
              }
              if (t.typ == 2) {
                return {...t,
                  lega: 16,ilosc_leg:1}
              } else {
                return t;
              }
            }
  
            if(l==32){
                          if (t.typ == 1) {
                return {...t,
                  lega: 4,ilosc_leg:1}
              }
              if (t.typ == 2) {
                return {...t,
                  lega: 32,ilosc_leg:1}
              } else {
                return t;
              }
            }


          })
        )

        }
  

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

    //  setDaneTech(res.data[0][0].map(x=> {return {...x, id:1}}))
    // console.log("dane",res.data[0][0])
    
     setDaneTech({...res.data[0][0],id:1,prime_id:1}) // kopiując dane z zamówienia do technologi nadpisuje id:1 
     setProduktyTech(res.data[1])
     setElementyTech(res.data[2])
     setFragmentyTech(res.data[3])
     setOprawaTech(res.data[4])
     setProcesyElementowTech(res.data[6])
    //  setShowTechnologyStage(true)
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
                    selectedElementTechROW,setSelectedElementTechROW,
                    updateRowProduktyTech,updateRowOprawaTech,deleteElementTech,addNewOprawa,deleteOprawa,input1632toElemnt,setNumerArkusza,
                    updateRowProcesyElementowTech,
                    updateGrupaWykonan,updateWykonanie,updateWykonaniaWszystkie,
                    isSaveButtonDisabled, setSaveButtonDisabled
                }}
            >
                {children}
            </TechnologyContext.Provider>




}

