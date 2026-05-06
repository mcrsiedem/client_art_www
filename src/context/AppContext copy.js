import { useEffect,createContext,useState} from "react";
import { _wykonczenie } from "utils/initialvalue";

export const AppContext = createContext();
export const AppContextProvider = ({children})=>{
   


    const [zamowienia, setZamowienia] = useState([]); 
   const [pagination, setPagination] = useState({
  currentPage: 1,
  totalPages: 1,
  pageSize: 50,
  total: 0
});


    useEffect(()=>{


    },[])
    
    return  <AppContext.Provider 
                value={{
         pagination, setPagination,zamowienia, setZamowienia,handlePageChange
            
          
                  }}
            >
                {children}
            </AppContext.Provider>
}



