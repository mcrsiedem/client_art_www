import { useEffect,createContext,useState } from "react";
import { initialDane, initialPreOrder } from "utils/initialvalue";

export const PreOrderContext = createContext();
export const PreOrderContextProvider = ({children})=>{

     
       
      const [preOrder, setPreOrder] = useState(initialPreOrder);

      const [presetTyp, setPresetTyp] = useState({
        id: 1,
        typ: 1, // katalog
      },
      {
        id:2,
        typ: 2 //ulotka
      }
      );

      const [presetOprawa, setPresetOprawa] = useState({
        id: 1,
        oprawa: 1, // katalog
      },
      {
        id:2,
        oprawa: 2 //ulotka
      }
      );


    // const updateUser = useCallback(()=>{
    //  setUser(user)
    // },[])

    
    useEffect(()=>{

    },[])


    
    
    return  <PreOrderContext.Provider 
                value={{
                
                    preOrder, setPreOrder,
                    presetTyp, setPresetTyp,
                    presetOprawa, setPresetOprawa

                }}
            >
                {children}
            </PreOrderContext.Provider>
}