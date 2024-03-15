import { useEffect,createContext,useState } from "react";


export const AppContext = createContext();


export const AppContextProvider = ({children, user})=>{

    const [clients, setClients] = useState(null);

    useEffect(()=>{
        console.log(user)
        // tutaj mozna pobrac liste klientow
    },[user])
    
    return  <AppContext.Provider 
                value={{
                clients,setClients
                }}
            >
                {children}
            </AppContext.Provider>
}