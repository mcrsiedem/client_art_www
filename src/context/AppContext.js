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
    const [listaGramatur, setListaGramatur] = useState();
    const [listaGramaturSelect, setListaGramaturSelect] = useState([]);
    const [listaPapierow, setListaPapierow] = useState();
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
                    _firma,typ_elementu,_status_koszty_dodatkowe,_procesory,
                    showMeProcessName,
                    listaGramatur, setListaGramatur,
                    listaPapierow, setListaPapierow,
                    listaGramaturSelect, setListaGramaturSelect,
                    procesory

            
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

  const _procesory = [
    {
      id: 1,
      nazwa: "XL",
      start: "2024-10-03 00:00:00",
      typ_procesora: 1,
    },
    {
      id: 2,
      nazwa: "SM_1",
      start: "2024-10-03 00:00:00",
      typ_procesora: 1,
    },
    ,
    {
      id: 3,
      nazwa: "SM_2",
      start: "2024-10-03 00:00:00",
      typ_procesora: 1,
    },
    ,
    {
      id: 4,
      nazwa: "PUR",
      start: "2024-10-03 00:00:00",
      typ_procesora: 2,
    },
    {
      id: 5,
      nazwa: "FALC_1",
      start: "2024-10-03 00:00:00",
      typ_procesora: 2,
    },
    {
      id: 6,
      nazwa: "FALC_2",
      start: "2024-10-03 00:00:00",
      typ_procesora: 2,
    },
    {
      id: 7,
      nazwa: "FALC_3",
      start: "2024-10-03 00:00:00",
      typ_procesora: 2,
    },
    {
      id: 8,
      nazwa: "FALC_4",
      start: "2024-10-03 00:00:00",
      typ_procesora: 2,
    },
    {
      id: 9,
      nazwa: "FALC_5",
      start: "2024-10-03 00:00:00",
      typ_procesora: 2,
    },
    {
      id: 10,
      nazwa: "FALC_6",
      start: "2024-10-03 00:00:00",
      typ_procesora: 2,
    },
    {
      id: 11,
      nazwa: "FALC_7",
      start: "2024-10-03 00:00:00",
      typ_procesora: 2,
    },
    {
      id: 12,
      nazwa: "FALC_8",
      start: "2024-10-03 00:00:00",
      typ_procesora: 2,
    },
    {
      id: 13,
      nazwa: "FALC_9",
      start: "2024-10-03 00:00:00",
      typ_procesora: 2,
    },
  ];