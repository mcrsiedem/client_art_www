import { useEffect,createContext,useState, useCallback } from "react";
import { getUsers } from "../Actions/Users/getUsers";
import { getClients } from "../Actions/Clients/getClients";


export const AppContext = createContext(
     {getClients: ()=>{}}
);
export const AppContextProvider = ({children})=>{

    const [users, setUsers] = useState(null);
    const [clients, setClients] = useState(null);

    const updateClients = useCallback(()=>{
     getClients(setClients)
    },[])
    
    useEffect(()=>{
        getUsers(setUsers) // lista wszystkich użytkowników
        getClients(setClients) // list wszystkich klientów
    },[])
    
    return  <AppContext.Provider 
                value={{
                    users,clients,updateClients
                }}
            >
                {children}
            </AppContext.Provider>
}