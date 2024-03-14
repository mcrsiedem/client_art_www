import { useEffect } from "react";
import {creatContex} from React;

export const AppContext = creatContex();


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