import { useEffect,createContext,useState, useCallback ,useRef} from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcesList } from 'actions/getProcesList';
import { getProductType } from "actions/getProductType";
import { getProcesListName } from "actions/getProcesListName";
import { getProcesory } from "actions/getProcesory";
import { getNadkomplety } from "actions/getNadkomplety";
import { _wykonczenie } from "utils/initialvalue";

export const AppContext = createContext();
export const AppContextProvider = ({children})=>{

    const [users, setUsers] = useState(null);
    const [clients, setClients] = useState(null);
    const [uzytkownicy, setUzytkownicy] = useState(null);
    const [uzytkownicyGrupy, setUzytkownicyGrupy] = useState(null);
    const [clientsWyszukiwarka, setClientsWyszukiwarka] = useState(null);
    const [procesList, setProcesList] = useState(null); // lista wszystkich dostępnych procesów
    const [procesListName, setProcesListName] = useState(null); // lista nazw procesów
    const [productType, setProductType] = useState(null); 
    const [zamowienia, setZamowienia] = useState([]); 
    const [listaPapierow, setListaPapierow] = useState();
    const [nadkomplety, setNadkomplety] = useState();

    const [lockDragDropPapier, setLockDragDropPapier] = useState(false);
    const [listaPapierowWyszukiwarka, setListaPapierowWyszukiwarka] = useState();
    const [listaPapierowNazwy, setListaPapierowNazwy] = useState();
    const [listaPapierowNazwyWyszukiwarka, setListaPapierowNazwyWyszukiwarka] = useState();
    const [listaPapierowGrupa,setListaPapierowGrupa] = useState();
    const [listaPapierowGrupaWyszukiwarka, setListaPapierowGrupaWyszukiwarka] = useState();
    const [listaPapierowPostac,setListaPapierowPostac] = useState();
    const [listaPapierowPostacWyszukiwarka, setListaPapierowPostacWyszukiwarka] = useState();
    const [listaPapierowRodzaj,setListaPapierowRodzaj] = useState();
    const [listaPapierowRodzajWyszukiwarka, setListaPapierowRodzajWyszukiwarka] = useState();
    const [listaPapierowWykonczenia,setListaPapierowWykonczenia] = useState();
    const [listaPapierowWykonczeniaWyszukiwarka, setListaPapierowWykonczeniaWyszukiwarka] = useState();

    const [listaPapierowPowleczenieWyszukiwarka,setListaPapierowPowleczenieWyszukiwarka] = useState();
    const [listaPapierowPowleczenie, setListaPapierowPowleczenie] = useState();

    const [wykonczenieEdit, setWykonczenieEdit] = useState(_wykonczenie);
    const [procesory, setProcesory] = useState();
    const [mobile, setMobile] = useState(false);
      const [isBtnZapiszPapierDisabled, setBtnZapiszPapierDisabled] = useState(true);

//d
    const [rowSelected, setRowSelected] = useState(null); 

    const updateProcesList = useCallback(()=>{
        getProcesList(setProcesList) 
       },[])

    const updateClients = useCallback(()=>{
     getClients(setClients,setClientsWyszukiwarka)
    },[])

    const updateUsers = useCallback(()=>{
        getUsers(setUsers)
       },[])

       const showMeProcessName = (id) =>{

        return procesListName?.filter(pln => pln.id == id)[0].nazwa
       }


  // const effectRan = useRef(false);
  // useEffect(() => {
  //   if (effectRan.current === true) {
      
  //       getUsers(setUsers) 
  //       getProcesList(setProcesList) // lista wszystkich dostępnych procesów
  //       getBindingType(setBindingTyp)
  //       getProductType(setProductType)
  //       getProcesListName(setProcesListName)
  //       getProcesory(setProcesory)
  //   }
  //   return () => {
  //     effectRan.current = true;
  //   };
  // }, []);

    useEffect(()=>{
      console.log("app context22")
        getUsers(setUsers) 
       
        getProcesList(setProcesList) 
        // getBindingType(setBindingTyp)
        getProductType(setProductType)
        getProcesListName(setProcesListName)
        getProcesory(setProcesory)
       

    },[])
    
    return  <AppContext.Provider 
                value={{
                  zamowienia, setZamowienia,
                    users,updateUsers,          // wszystcy uzytkownicy
                    clients,updateClients,  setClients,    // wszyscy klienci
                    clientsWyszukiwarka, setClientsWyszukiwarka,
                    procesList, updateProcesList,     // lista wszystkich dostępnych proce
                    procesListName,
                    productType,
                   
                    rowSelected, setRowSelected, // druk
                    _firma,typ_elementu,_status_koszty_dodatkowe,
                    showMeProcessName,
                    listaPapierow, setListaPapierow,
                    listaPapierowNazwy, setListaPapierowNazwy,
                    listaPapierowNazwyWyszukiwarka, setListaPapierowNazwyWyszukiwarka,
                    listaPapierowGrupa,setListaPapierowGrupa,
                    listaPapierowGrupaWyszukiwarka, setListaPapierowGrupaWyszukiwarka,
                    listaPapierowPostac,setListaPapierowPostac,listaPapierowPostacWyszukiwarka, setListaPapierowPostacWyszukiwarka,
                    listaPapierowRodzaj,setListaPapierowRodzaj,listaPapierowRodzajWyszukiwarka, setListaPapierowRodzajWyszukiwarka,
                    listaPapierowWykonczenia,setListaPapierowWykonczenia,listaPapierowWykonczeniaWyszukiwarka, setListaPapierowWykonczeniaWyszukiwarka,
                    listaPapierowPowleczenie, setListaPapierowPowleczenie,listaPapierowPowleczenieWyszukiwarka,setListaPapierowPowleczenieWyszukiwarka,
                    lockDragDropPapier, setLockDragDropPapier,
                    procesory,mnozniki, _status_wykonania,_stan_wykonania, setProcesory,
                    listaPapierowWyszukiwarka, setListaPapierowWyszukiwarka,
                    isBtnZapiszPapierDisabled, setBtnZapiszPapierDisabled,
                    mobile, setMobile,setNadkomplety,nadkomplety,wykonczenieEdit,
                    uzytkownicy, setUzytkownicy,
                    uzytkownicyGrupy, setUzytkownicyGrupy
                }}
            >
                {children}
            </AppContext.Provider>
}


const _firma = [
    {
      id: 1,
      nazwa: "ArtDruk",
      NIP: "123-111-22-33",
    },
    {
      id: 2,
      nazwa: "PrintStudio",
      NIP: "123-111-22-33",
    },
    {
      id: 3,
      nazwa: "ArtDruk Sp. z o.o.",
      NIP: "123-111-22-33",
    },
  ];

const typ_elementu=[
    {
      id: 1,
      nazwa: "Okładka",
    },
    {
      id: 2,
      nazwa: "Środek",
    },
    ,
    {
      id: 3,
      nazwa: "Wklejka",
    },
    ,
    {
      id: 4,
      nazwa: "Insert",
    },
    {
      id: 5,
      nazwa: "Ulotka",
    },
  ];
  
  const _status_koszty_dodatkowe = [

    {
      id: 1,
      nazwa: "W przygotowaniu",
    },
    {
      id: 2,
      nazwa: "Gotowe do faktury",
    },

  ];

  const _status_wykonania = [
    {
      id: 1,
      nazwa: "Niedostępne"
    },

    {
      id: 2,
      nazwa: "Oczekujące",
    },
    {
      id: 3,
      nazwa: "W trakcie",
    },
    {
      id: 4,
      nazwa: "Zakończone"
    },
    

  ];

  const _stan_wykonania = [

    {
      id: 1,
      nazwa: "Aktywne",
    },
    {
      id: 2,
      nazwa: "Wstrzymane",
    },
    {
      id: 3,
      nazwa: "Anulowane"
    },

  ];
  


 const  mnozniki = [   
   {value: 0.1,},
   {value: 0.2,},
   {value: 0.3,},
   {value: 0.4,},
   {value: 0.5,},
   {value: 0.6,},
   {value: 0.7,},
   {value: 0.8,},
   {value: 0.9,},
   {value: 1.0,},
   {value: 1.1,},
   {value: 1.2,},
   {value: 1.3,},
   {value: 1.4,},
   {value: 1.5,},
   {value: 1.6,},
   {value: 1.7,},
   {value: 1.8,},
   {value: 1.9,},
   {value: 2.0,},
  
  
  ]