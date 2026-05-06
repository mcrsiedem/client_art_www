import { useEffect,createContext,useState} from "react";
import { _wykonczenie } from "utils/initialvalue";

export const AppContext = createContext();
export const AppContextProvider = ({children})=>{
   


    const [zamowienia, setZamowienia] = useState([]); 
    const [pagination, setPagination] = useState([]); 




    useEffect(()=>{


    },[])
    
    return  <AppContext.Provider 
                value={{
         pagination, setPagination,zamowienia, setZamowienia
            
          
                  }}
            >
                {children}
            </AppContext.Provider>
}



