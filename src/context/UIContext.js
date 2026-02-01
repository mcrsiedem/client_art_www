import { useEffect,createContext,useState} from "react";
import { _wykonczenie } from "utils/initialvalue";

export const UIContext = createContext();
export const UIContextProvider = ({children})=>{


const [showKalkulatorGrzbietu, setShowKalkulatorGrzbietu] = useState(false);


    useEffect(()=>{
      // console.log("UIContext")

       

    },[])
    
    return  <UIContext.Provider 
                value={{
                  showKalkulatorGrzbietu, setShowKalkulatorGrzbietu,

              
          
                  }}
            >
                {children}
            </UIContext.Provider>
}

