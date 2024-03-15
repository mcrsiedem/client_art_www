import { useEffect,createContext,useState, useCallback } from "react";
import { getUsers } from "../actions/Users/getUsers";
import { getClients } from "../actions/getClients";


export const AppContext = createContext(
    //  {getClients: ()=>{}}
);
export const AppContextProvider = ({children})=>{

    const [users, setUsers] = useState(null);
    const [clients, setClients] = useState(null);

    const updateClients = useCallback(()=>{
     getClients(setClients)
    },[])

    const updateUsers = useCallback(()=>{
        getUsers(setUsers)
       },[])
    
    useEffect(()=>{
        getUsers(setUsers) // lista wszystkich użytkowników
        getClients(setClients) // list wszystkich klientów
    },[])
    
    return  <AppContext.Provider 
                value={{
                    users,clients,updateClients, updateUsers
                }}
            >
                {children}
            </AppContext.Provider>
}