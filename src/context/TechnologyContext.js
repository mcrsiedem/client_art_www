import { getTechnology } from "actions/getTechnolgy";
import { useEffect,createContext,useState, useCallback } from "react";;


export const TechnologyContext = createContext();
export const TechnologyContextProvider = ({children})=>{

    const [technology, setTechnology] = useState(null);



        const updateTechnology = useCallback(()=>{
            getTechnology(setTechnology)
       },[])



    
    useEffect(()=>{
    getTechnology(setTechnology)

    },[])
    
    return  <TechnologyContext.Provider 
                value={{
                    technology, setTechnology, updateTechnology

                }}
            >
                {children}
            </TechnologyContext.Provider>




}

