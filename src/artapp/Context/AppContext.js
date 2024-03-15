import { useEffect,createContext,useState } from "react";
import { getUsers } from "../Actions/Users/getUsers";

export const AppContext = createContext();


export const AppContextProvider = ({children, user})=>{

    const [users, setUsers] = useState(null);
    const [clients, setClients] = useState(null);

    useEffect(()=>{
        getUsers(setUsers) // lista wszystkich użytkowników
        console.log("Context: AppContext")
        // tutaj mozna pobrac liste klientow
    },[])
    
    return  <AppContext.Provider 
                value={{
                    users, getUsers,clients,setClients
                }}
            >
                {children}
            </AppContext.Provider>
}