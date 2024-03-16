import { useEffect,createContext,useState, useCallback } from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcess } from 'actions/getProcess';

export const AppContext = createContext();
export const AppContextProvider = ({children})=>{

    const [users, setUsers] = useState(null);
    const [clients, setClients] = useState(null);
    const [process, setProcess] = useState(null); 
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
    },[])
    
    return  <AppContext.Provider 
                value={{
                    users,updateUsers,          // wszystcy uzytkownicy
                    clients,updateClients,      // wszyscy klienci
                    process, updateProcess,     // lista dostępnych procesów
                    rowSelected, setRowSelected // druk
                }}
            >
                {children}
            </AppContext.Provider>




}