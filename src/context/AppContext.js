import { useEffect,createContext,useState, useCallback } from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcesList } from 'actions/getProcesList';
import { getBindingType } from "actions/getBindingType";
import { getProductType } from "actions/getProductType";
import { getProcesListName } from "actions/getProcesListName";

export const AppContext = createContext();
export const AppContextProvider = ({children})=>{

    const [users, setUsers] = useState(null);
    const [clients, setClients] = useState(null);
    const [procesList, setProcesList] = useState(null); // lista wszystkich dostępnych procesów
    const [procesListName, setProcesListName] = useState(null); // lista nazw procesów
    const [bindingType, setBindingTyp] = useState(null); 
    const [productType, setProductType] = useState(null); 


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

    },[])
    
    return  <AppContext.Provider 
                value={{
                    users,updateUsers,          // wszystcy uzytkownicy
                    clients,updateClients,      // wszyscy klienci
                    procesList, updateProcesList,     // lista wszystkich dostępnych proce
                    procesListName,
                    productType,
                    bindingType, setBindingTyp, // lista dostępnych opraw
                    rowSelected, setRowSelected, // druk
                    _firma,typ_elementu,
                    showMeProcessName
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