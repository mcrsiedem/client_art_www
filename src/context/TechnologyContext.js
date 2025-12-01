import axios from "axios";
import { IP } from "utils/Host";
import { getTechnology } from "actions/getTechnolgy";
import { useEffect,createContext,useState, useCallback, useContext } from "react";import { initialProcesy } from "utils/initialvalue";
import DecodeToken from "pages/Login/DecodeToken";
import { useWykonania } from "hooks/useWykonania";
import { today } from "actions/today";
import { todayMinusDni } from "actions/todayMinusDni";
import { AppContext } from "./AppContext";
;



export const TechnologyContext = createContext();
export const TechnologyContextProvider = ({children})=>{
    const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [technology, setTechnology] = useState(null); //lista technologii 
    const [showTechnologyStage, setShowTechnologyStage] = useState(false);

    const [rowZamowienia, setRowZamowienia] = useState(null);  // row - dodaj kartę
    const [rowTechnologia, setRowTechnologia] = useState(null);  // row - edytuj kartę

    // menu


    const [menuElementyTech,setMenuElementyTech] = useState(false)
    const [showProcesy,setShowProcesy] = useState(false)

    //dane z zamówienia
    const [dane, setDane] = useState([]);
    const [produkty, setProdukty] = useState([]);
    const [elementy, setElementy] = useState([]);
    const [fragmenty, setFragmenty] = useState([]);
    const [oprawa, setOprawa] = useState([]);
    const [procesyElementow, setProcesyElementow] = useState([]);
    const [procesyProduktow, setProcesyProduktow] = useState([]);
    const [historiaZamowienia, setHistoriaZamowienia] = useState([]);
    const [pakowanie, setPakowanie] = useState([]);
    const [multiSelect, setMultiSelect] = useState([]);

        //dane z technologii
        const [daneTech, setDaneTech] = useState([]);
        const [produktyTech, setProduktyTech] = useState([]);
        const [elementyTech, setElementyTech] = useState([]);
        const [fragmentyTech, setFragmentyTech] = useState([]);
        const [oprawaTech, setOprawaTech] = useState([]);
        const [grupaOprawaTech, setGrupaOprawaTech] = useState([]);
        const [procesyElementowTech, setProcesyElementowTech] = useState([]);
        const [procesyProduktowTech, setProcesyProduktowTech] = useState([]);
        const [procesyProduktowTechTemporary, setProcesyProduktowTechTemporary] = useState([]);
        const [procesyElementowTechTemporary, setProcesyElementowTechTemporary] = useState(initialProcesy); // aby mozna było zamknąc bez zapisywania
        const [showElementyTechProcesyInsert, setShowElementyTechProcesyInsert] =     useState(false);
        const [selectedElementTechROW,setSelectedElementTechROW] = useState(null)
        const [selectedElementTechArkusz,setSelectedElementTechArkusz] = useState(null)
        const [selectedGrupaTechROW,setSelectedGrupaTechROW] = useState({id:1})

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
        const [grupaWykonanInit, setGrupaWykonanInit] = useState([]); // wartość początkowa
        const [grupaWykonan, setGrupaWykonan] = useState([]);         // grupy po zmianie
        const [wykonania, setWykonania] = useState([]);
        const [wykonaniaOprawy,setWykonaniaOprawy] = useState([]);
        const [realizacje, setRealizacje] = useState([]);


        // wszsystkie grupy i wykonania
        const [grupyWykonanAll, setGrupWykonanAll] = useState([]);
        const [grupyOprawaAll, setGrupyOprawaAll] = useState([]);
        const [grupyOprawaAllWyszukiwarka, setGrupyOprawaAllWyszukiwarka] = useState([]);
        const [grupyWykonanAllNiezakonczone, setGrupWykonanAllNiezakonczone] = useState([]);
        const [grupyWykonanAllWyszukiwarka, setGrupWykonanAllWyszukiwarka] = useState([]);

        const [grupyWykonanAllNiezakonczoneOprawa, setGrupWykonanAllNiezakonczoneOprawa] = useState([]);
        const [grupyWykonanAllOprawaWyszukiwarka, setGrupWykonanAllOprawaWyszukiwarka] = useState([]);

        const [wykonaniaAll, setWykonaniaAll] = useState([]);

        // id otwieranej technologi
        const [openTechnologiaId,setOpenTechnologiaId] =useState();


  
        const [selectedProcesor, setSelectedProcesor] = useState(null);
        const [selectedProces, setSelectedProces] = useState(1);
        // const [dniWstecz, setDniWstecz] = useState(todayMinusDni(1));
        const [dniWstecz, setDniWstecz] = useState();
        const [gantStageGrupy, setGantStageGrupy] = useState();
        const [showKalendarz, setShowKalendarz] = useState(false);
        const [showNaswietlenia, setShowNaswietlenia] = useState(false);



      const [sortowanieOprawy,setSortowanieOprawy] = useState("data");

      const appContext = useContext(AppContext);
      const setIsLoading = appContext.setIsLoading;

      //  const[czasWykonania,statusWykonaniaTechnologia] = useWykonania();

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

      function handleUpdateLegiFragmentyTech(card) {
        setLegiFragmenty(
          legiFragmenty.map((t, a) => {
          // console.log("oprawa id" +prev)
          if (t.id == card.id) {
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


      setLegiFragmenty(
        legiFragmenty.map((t) => {
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

let new_wykonania =       wykonania.map((t) => {
  if (t.id === row.id) {
    return row;
  } else {
    return t;
  }
})

        const SumaCzasow = (grupa,new_wykonania) => {
          let  suma = new_wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.czas).reduce((a, b) => a + b, 0)
          return suma;
        };
        const SumaPrzelotow = (grupa,new_wykonania) => {
          let  suma = new_wykonania.filter(x=> x.grupa_id == grupa.id).map(x => parseInt(x.przeloty)).reduce((a, b) => a + b, 0)
          return suma;
        };
        //zmienić na edycję tylko jeden grupy
            setGrupaWykonan(
      grupaWykonan.map((t) => {
        if (t.id === row.grupa_id) {
          return {...t,czas:SumaCzasow(t,new_wykonania),update:true, przeloty: SumaPrzelotow(t,new_wykonania)};
        } else {
          return t;
        }
      })
    );
  // setGrupaWykonan(grupaWykonan.map( grupa=> ({...grupa,czas:SumaCzasow(grupa,new_wykonania), przeloty: SumaPrzelotow(grupa,new_wykonania)})))

        setWykonania(new_wykonania)


      };


      const updateGrupaAfterAddWykonanie = (row) => {

        // console.log("row",row)

let new_wykonania =  [...wykonania] 
 new_wykonania.push(row)

//  console.log("new_wykonania",new_wykonania)
        const SumaCzasow = (grupa,new_wykonania) => {
          let  suma = new_wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.czas).reduce((a, b) => a + b, 0)
          return suma;
        };
        const SumaPrzelotow = (grupa,new_wykonania) => {
          let  suma = new_wykonania.filter(x=> x.grupa_id == grupa.id).map(x => parseInt(x.przeloty)).reduce((a, b) => a + b, 0)
          return suma;
        };

            setGrupaWykonan(
      grupaWykonan.map((t) => {
        if (t.id === row.grupa_id) {
          return {...t,czas:SumaCzasow(t,new_wykonania),update:true,ilosc_narzadow: parseInt(t.ilosc_narzadow)+1, przeloty: SumaPrzelotow(t,new_wykonania)};
        } else {
          return t;
        }
      })
    );
  // setGrupaWykonan(grupaWykonan.map( grupa=> ({...grupa,czas:SumaCzasow(grupa,new_wykonania), przeloty: SumaPrzelotow(grupa,new_wykonania)})))




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
  setElementyTech(elementyTech.filter(e => e.id !== row.id).map((t) => {
    return {...t,
      showMenu: false}
  }))
}

    
      
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






    
  async function fechparametry(idZamowienia) {

    await axios
    .put(IP + "setOrderOpen", {
      id: idZamowienia,
      // zestaw_id: idZestawu,
      token: sessionStorage.getItem("token"),
      user: DecodeToken(sessionStorage.getItem("token")).id,
    })
    .then(async(res) => {
        if(res.data.stan == "error"){
          setShowTechnologyStage(false);
          // alert("W trakcie edycji....")
        // setSaveButtonDisabled(true)
        //  setReadOnly(true)   // zmien parametr
        //  setReadAlert(true) //pokaż okno alert read only
        }else{



     const res = await axios.get(IP + "parametry/"+idZamowienia+"/"+ sessionStorage.getItem("token"));


     setDane([])
     setProdukty([])
     setElementy([])
     setFragmenty([])
     setOprawa([])
     setProcesyElementow([])
     setProcesyProduktow([])
     setHistoriaZamowienia([])
     setPakowanie([])
     setDane(res.data[0][0])
     setProdukty(res.data[1])
     setElementy(res.data[2])
     setFragmenty(res.data[3])
     setOprawa(res.data[4])
     setProcesyElementow(res.data[5])
    setProcesyProduktow(res.data[13])
     setHistoriaZamowienia(res.data[7])
     setPakowanie(res.data[8].sort((a, b) => a.indeks - b.indeks))

    //  setDaneTech(res.data[0][0].map(x=> {return {...x, id:1}}))
    // console.log("dane",res.data[0][0]?.id)
    // console.log("id:   ",res.data[2])
    setDaneTech([]) 
    setProduktyTech([])
    setElementyTech([])
    setFragmentyTech([])
    setOprawaTech([])

    setProcesyElementowTech([])
    setProcesyProduktowTech([])
    setLegi([])
     setLegiFragmenty([])
     setArkusze([])
     setGrupaWykonan([])
     setWykonania([])
     setGrupaOprawaTech([])
    //  setDaneTech({...res.data[0][0],id:1,prime_id:1,zamowienie_id:idZamowienia,stan:res.data[0][0].etap}) 
     setDaneTech({...res.data[0][0],id:1,prime_id:1,zamowienie_id:idZamowienia,stan:res.data[0][0].etap == 1 ? 1:2}) // kopiując dane z zamówienia do technologi nadpisuje id:1 
     setProduktyTech(res.data[1])
     setElementyTech(res.data[2].map(element => { return {...element, arkusz_szerokosc: "", arkusz_wysokosc: ""}}))
     setFragmentyTech(res.data[3])
     setOprawaTech(res.data[4])
     setProcesyElementowTech(res.data[5])
         setProcesyProduktowTech(res.data[13])



        }
        // setStanOtwarciaZamowienia({
        //   stan: res.data.stan,
        //   user: res.data.user,
        //   data: res.data.data
        // 
        
    });

setShowTechnologyStage(true);
appContext.setIsLoading(false);



    //  setShowTechnologyStage(true)
}



// const getStanFromEtap = (etap) =>{

//   if(etap == 1) {return 1} else return 2

// }





async function fechparametryTechnologii(idZamowienia,idTechnologii) {

  const res_zam = await axios.get(IP + "parametry/"+idZamowienia+"/"+ sessionStorage.getItem("token"));
  setDane([])
  setProdukty([])
  setElementy([])
  setFragmenty([])
  setOprawa([])
  setProcesyElementow([])
  setHistoriaZamowienia([])
  setPakowanie([])
  setDane(res_zam.data[0][0])
     setProdukty(res_zam.data[1])
     setElementy(res_zam.data[2])
     setFragmenty(res_zam.data[3])
     setOprawa(res_zam.data[4])
     setProcesyElementow(res_zam.data[5])
     setHistoriaZamowienia(res_zam.data[7])
     setPakowanie(res_zam.data[8])

  const res = await axios.get(IP + "technologie_parametry/"+idTechnologii+"/"+ sessionStorage.getItem("token"));
  setDaneTech([]) 
  setProduktyTech([])
  setElementyTech([])
  setFragmentyTech([])
  setOprawaTech([])
  setProcesyElementowTech([])
  setLegi([])
   setLegiFragmenty([])
   setArkusze([])
   setGrupaWykonan([])
   setGrupaWykonanInit([])
   setWykonania([])

  setDaneTech(res.data[0][0]) 
  setProduktyTech(res.data[1])
  setElementyTech(res.data[2])
  setFragmentyTech(res.data[3])
  setOprawaTech(res.data[4])
  setProcesyElementowTech(res.data[5])
  setLegi(res.data[6])
  setLegiFragmenty(res.data[7])
  setArkusze(res.data[8])

  setGrupaWykonanInit(res.data[9])
  setGrupaWykonan(res.data[9])
  
  setWykonania(res.data[10])
  setGrupaOprawaTech(res.data[11])
   setShowTechnologyStage(true)
   appContext.setIsLoading(false);
}

async function fechparametryTechnologiiDetails(idZamowienia,idTechnologii) {

  // pobierz szczegóły pracay bez otwierania technologii
  // uzwane w widoku zamowienia po kliknięciu prawym

  const res_zam = await axios.get(IP + "parametry/"+idZamowienia+"/"+ sessionStorage.getItem("token"));
  setDane([])
  setProdukty([])
  setElementy([])
  setFragmenty([])
  setOprawa([])
  setProcesyElementow([])
  setHistoriaZamowienia([])
  setPakowanie([])
  setDane(res_zam.data[0][0])
     setProdukty(res_zam.data[1])
     setElementy(res_zam.data[2])
     setFragmenty(res_zam.data[3])
     setOprawa(res_zam.data[4])
     setProcesyElementow(res_zam.data[5])
     setHistoriaZamowienia(res_zam.data[7])
     setPakowanie(res_zam.data[8])


     setProcesyProduktow(res_zam.data[13])

  const res = await axios.get(IP + "technologie_parametry/"+idTechnologii+"/"+ sessionStorage.getItem("token"));
  setDaneTech([]) 
  setProduktyTech([])
  setElementyTech([])
  setFragmentyTech([])
  setOprawaTech([])
  setProcesyElementowTech([])
  setLegi([])
   setLegiFragmenty([])
   setArkusze([])
   setGrupaWykonan([])
   setWykonania([])
  setRealizacje([])
  setProcesyProduktowTech([])


  setDaneTech(res.data[0][0]) 
  setProduktyTech(res.data[1])
  setElementyTech(res.data[2])
  setFragmentyTech(res.data[3])
  setOprawaTech(res.data[4])
  setProcesyElementowTech(res.data[5])
  setLegi(res.data[6])
  setLegiFragmenty(res.data[7])
  setArkusze(res.data[8])
  setGrupaWykonan(res.data[9])
  setWykonania(res.data[10])
  setGrupaOprawaTech(res.data[11])
  setWykonaniaOprawy(res.data[12])
  setRealizacje(res.data[13])

setProcesyProduktowTech([])
    setIsLoading(false)
  //  setShowTechnologyStage(true)
}




async function fechGrupyAndWykonaniaForProcesor(procesor_id) {

  // #GRUPY_01
  // ProcesyView - używane w momencie zmiany procesora  

const cofnijDateOJedenDzien = (dane) => {

  if (!Array.isArray(dane) || dane.length === 0) {
    return "Błąd: Tablica jest pusta lub niepoprawna.";
  }

  const dataString = dane[0].poczatek;
  const dataObiekt = new Date(dataString);

  if (isNaN(dataObiekt.getTime())) {
    return "Błąd: Niepoprawny format daty w polu 'poczatek'.";
  }

  // tu miałem odjąć 1 dzień ale się rozmyśliłem dlatego jest 0
  dataObiekt.setDate(dataObiekt.getDate() - 0);
  const nowaData = dataObiekt.toISOString().substring(0, 10);
  return nowaData;
}
  // grupy i wykonania dla konktretnego procesora 

    await axios.get(IP + "technologie_grupy_an_wykonania_for_procesor/"+procesor_id).then((res)=>{

      setGrupWykonanAll(res.data[0])
      setGrupWykonanAllWyszukiwarka(res.data[0])
      setSelectedProcesor(procesor_id)
      // setDniWstecz(res.data[1][0].dni     )
      setDniWstecz(cofnijDateOJedenDzien(res.data[0])   )

      return res
    }).then((res) =>{
      setGrupWykonanAllWyszukiwarka(prev=>{return prev})
      appContext.setIsLoading(false);
    });

  }



  async function fechGrupyOprawaForProcesor(procesor_id) {



    await axios.get(IP + "technologie_grupy_oprawa_for_procesor/"+procesor_id).then((res)=>{
      // console.log(res.data)
      setGrupyOprawaAll(res.data[0])
      setGrupyOprawaAllWyszukiwarka(res.data[0])

      setSelectedProcesor(procesor_id)
      setDniWstecz(res.data[1][0].dni     )
      return res
    }).then((res) =>{
      
      // setGrupWykonanAll(prev=>{return prev})
      setGrupyOprawaAllWyszukiwarka(prev=>{return prev})
       appContext.setIsLoading(false);

    });
    


  }



  



async function fechGrupyAndWykonaniaForProcesor_dni_wstecz(procesor_id,dniWstecz2) {
// #GRUPY_02
// ProcesyView - używane w momencie zmiany daty wyświetlania od...

    await axios.get(IP + "technologie_grupy_an_wykonania_for_procesor_dni_wstecz/"+procesor_id+"/"+dniWstecz2).then((res)=>{
      // console.log(res.data)
      // setWykonaniaAll(res.data[0])
      setGrupWykonanAll(res.data[0])
      setGrupWykonanAllWyszukiwarka(res.data[0])
      setSelectedProcesor(procesor_id)
      return res
    }).then((res) =>{
      
      // setGrupWykonanAll(prev=>{return prev})
      setGrupWykonanAllWyszukiwarka(prev=>{return prev})
 appContext.setIsLoading(false);
    });


  }

  async function fechGrupyAndWykonaniaForProcesor_dni_wstecz_oprawa(procesor_id,dniWstecz2) {


  // grupy i wykonania dla konktretnego procesora 

    await axios.get(IP + "technologie_grupy_an_wykonania_for_procesor_dni_wstecz_oprawa/"+procesor_id+"/"+dniWstecz2).then((res)=>{



      setGrupyOprawaAll(res.data[1])
      setGrupyOprawaAllWyszukiwarka(res.data[1])

      setSelectedProcesor(procesor_id)
      return res
    }).then((res) =>{
      
      // setGrupWykonanAll(prev=>{return prev})
      setGrupyOprawaAllWyszukiwarka(prev=>{return prev})
 appContext.setIsLoading(false);
    });


  }



async function fechTechnology() {

  // wszystkie grupy 
  const res = await axios.get(IP + "technologie/" + sessionStorage.getItem("token"));

  
    setTechnology([...res.data]);

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
                    procesyElementow, setProcesyElementow,procesyProduktow, setProcesyProduktow,procesyProduktowTechTemporary, setProcesyProduktowTechTemporary,

                    daneTech, setDaneTech,
                    produktyTech, setProduktyTech,
                    elementyTech, setElementyTech,
                    fragmentyTech, setFragmentyTech,
                    oprawaTech, setOprawaTech,grupaOprawaTech, setGrupaOprawaTech,
                    procesyElementowTech, setProcesyElementowTech,procesyProduktowTech, setProcesyProduktowTech,
                    procesyElementowTechTemporary, setProcesyElementowTechTemporary,
                    menuElementyTech,setMenuElementyTech,
                    legi, setLegi,
                    legiFragmenty, setLegiFragmenty,
                    arkusze,setArkusze,
                    handleUpdateRowLegi,handleUpdateRowArkusze,handleUpdateLegiFragmentyTech,
                    showErrorLegi, setShowErrorLegi,errorLegiInfo, setErrorLegiInfo,
                    showErrorArkusze, setShowErrorArkusze,
                    errorArkuszeInfo, setErrorArkuszeInfo,
                    handleUpdateRowElementyTech,
                    dragLegaId,setDragLegaId,
                    dropArkuszId,setDropArkuszId,
                    grupaWykonan, setGrupaWykonan,grupyWykonanAllWyszukiwarka, setGrupWykonanAllWyszukiwarka,
                    wykonania, setWykonania,
                    handleChangeCardFragmenty_i_Elementy_Tech,
                    handleUpdateRowProcesyElementowTech,
                    showElementyTechProcesyInsert, setShowElementyTechProcesyInsert,
                    selectedElementTechROW,setSelectedElementTechROW,
                    selectedGrupaTechROW,setSelectedGrupaTechROW,
                    selectedElementTechArkusz,setSelectedElementTechArkusz,
                    updateRowProduktyTech,updateRowOprawaTech,deleteElementTech,addNewOprawa,deleteOprawa,
                    updateRowProcesyElementowTech,
                    updateGrupaWykonan,updateWykonanie,updateWykonaniaWszystkie,
                    isSaveButtonDisabled, setSaveButtonDisabled,
                    openTechnologiaId,setOpenTechnologiaId,
                    fechparametryTechnologii,
                    fechTechnology,
                    wykonaniaAll, setWykonaniaAll,grupyWykonanAll, setGrupWykonanAll,fechGrupyAndWykonaniaForProcesor,
                    selectedProcesor, setSelectedProcesor,selectedProces, setSelectedProces,fechparametry,
                    showProcesy,setShowProcesy,
                    fechparametryTechnologiiDetails,dniWstecz, setDniWstecz,grupyWykonanAllNiezakonczone, setGrupWykonanAllNiezakonczone,
                    grupyOprawaAll, setGrupyOprawaAll,grupyOprawaAllWyszukiwarka, setGrupyOprawaAllWyszukiwarka,fechGrupyOprawaForProcesor,fechGrupyAndWykonaniaForProcesor_dni_wstecz,fechGrupyAndWykonaniaForProcesor_dni_wstecz_oprawa,
                    grupyWykonanAllNiezakonczoneOprawa, setGrupWykonanAllNiezakonczoneOprawa,grupyWykonanAllOprawaWyszukiwarka, setGrupWykonanAllOprawaWyszukiwarka,
                    grupaWykonanInit, setGrupaWykonanInit,updateGrupaAfterAddWykonanie,
                    sortowanieOprawy,setSortowanieOprawy,wykonaniaOprawy,setWykonaniaOprawy,
                    realizacje, setRealizacje,
                    gantStageGrupy, setGantStageGrupy,multiSelect, setMultiSelect,
                    showKalendarz, setShowKalendarz,
                    showNaswietlenia, setShowNaswietlenia
                }}
            >
                {children}
            </TechnologyContext.Provider>




}

