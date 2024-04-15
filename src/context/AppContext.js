import { useEffect,createContext,useState, useCallback } from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcesList } from 'actions/getProcesList';
import { getBindingType } from "actions/getBindingType";
import { getProductType } from "actions/getProductType";

export const AppContext = createContext();
export const AppContextProvider = ({children})=>{

    const [users, setUsers] = useState(null);
    const [clients, setClients] = useState(null);
    const [procesList, setProcesList] = useState(null); 
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



    
    useEffect(()=>{
        getUsers(setUsers) 
        getClients(setClients) 
        getProcesList(setProcesList) 
        getBindingType(setBindingTyp)
        getProductType(setProductType)

    },[])
    
    return  <AppContext.Provider 
                value={{
                    users,updateUsers,          // wszystcy uzytkownicy
                    clients,updateClients,      // wszyscy klienci
                    procesList, updateProcesList,     // lista dostępnych procesów
                    productType,
                    bindingType, setBindingTyp, // lista dostępnych opraw
                    rowSelected, setRowSelected, // druk
                    _firma
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