import { useEffect,createContext,useState, useCallback } from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcess } from 'actions/getProcess';
import { getBindingType } from "actions/getBindingType";
import { getProductType } from "actions/getProductType";

export const TechnologyContext = createContext();
export const TechnologyContextProvider = ({children})=>{

    const [users, setUsers] = useState(null);
    const [clients, setClients] = useState(null);
    const [process, setProcess] = useState(null); 
    const [bindingType, setBindingTyp] = useState(null); 
    const [productType, setProductType] = useState(null); 

    const [rowSelected, setRowSelected] = useState(null); 

    const updateProcess = useCallback(()=>{
        getProcess(setProcess) 
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
        getProcess(setProcess) 
        getBindingType(setBindingTyp)
        getProductType(setProductType)

    },[])
    
    return  <AppContext.Provider 
                value={{
                    users,updateUsers,          // wszystcy uzytkownicy
                    clients,updateClients,      // wszyscy klienci
                    process, updateProcess,     // lista dostępnych procesów
                    productType,
                    bindingType, setBindingTyp, // lista dostępnych opraw
                    rowSelected, setRowSelected, // druk
                    _firma
                }}
            >
                {children}
            </AppContext.Provider>




}
