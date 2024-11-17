import { useEffect,createContext,useState, useCallback } from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcesList } from 'actions/getProcesList';
import { getBindingType } from "actions/getBindingType";
import { getProductType } from "actions/getProductType";
import { getProcesListName } from "actions/getProcesListName";
import { getProcesory } from "actions/getProcesory";

export const AppContext = createContext();
export const AppContextProvider = ({children})=>{

    const [users, setUsers] = useState(null);
    const [clients, setClients] = useState(null);
    const [procesList, setProcesList] = useState(null); // lista wszystkich dostępnych procesów
    const [procesListName, setProcesListName] = useState(null); // lista nazw procesów
    const [bindingType, setBindingTyp] = useState(null); 
    const [productType, setProductType] = useState(null); 
    const [zamowienia, setZamowienia] = useState([]); 
    const [listaPapierow, setListaPapierow] = useState();
    const [listaPapierowNazwy, setListaPapierowNazwy] = useState();
    const [listaPapierowSelect, setListaPapierowSelect] = useState([]);
    const [procesory, setProcesory] = useState();

//d
    const [rowSelected, setRowSelected] = useState(null); 

    const updateProcesList = useCallback(()=>{
        getProcesList(setProcesList) 
       },[])

    const updateClients = useCallback(()=>{
     getClients(setClients)
    },[])

    const updateUsers = useCallback(()=>{
        getUsers(setUsers)
       },[])

       const showMeProcessName = (id) =>{

        return procesListName.filter(pln => pln.id == id)[0].nazwa
       }

    
    useEffect(()=>{
        getUsers(setUsers) 
        getClients(setClients) 
        getProcesList(setProcesList) // lista wszystkich dostępnych procesów
        getBindingType(setBindingTyp)
        getProductType(setProductType)
        getProcesListName(setProcesListName)
        getProcesory(setProcesory)

    },[])
    
    return  <AppContext.Provider 
                value={{
                  zamowienia, setZamowienia,
                    users,updateUsers,          // wszystcy uzytkownicy
                    clients,updateClients,      // wszyscy klienci
                    procesList, updateProcesList,     // lista wszystkich dostępnych proce
                    procesListName,
                    productType,
                    bindingType, setBindingTyp, // lista dostępnych opraw
                    rowSelected, setRowSelected, // druk
                    _firma,typ_elementu,_status_koszty_dodatkowe,
                    showMeProcessName,
      
                    listaPapierow, setListaPapierow,
                    listaPapierowNazwy, setListaPapierowNazwy,
                    listaPapierowSelect, setListaPapierowSelect,

                    procesory,mnozniki, _status_wykonania,_stan_wykonania

            
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

  const typ_elementu = [
    {
      id: 1,
      nazwa: "Okładka"
  
    },{
      id: 2,
      nazwa: "Środek",
    },
    ,{
      id: 3,
      nazwa: "Wklejka",
    },
    ,{
      id: 4,
      nazwa: "Insert",
    }  ,{
      id: 5,
      nazwa: "Ulotka",
    }
  ]
  
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