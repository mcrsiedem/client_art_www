import { getTechnology } from "actions/getTechnolgy";
import { useEffect,createContext,useState, useCallback } from "react";;


export const TechnologyContext = createContext();
export const TechnologyContextProvider = ({children})=>{

    const [technology, setTechnology] = useState(null);
    const [showTechnologyStage, setShowTechnologyStage] = useState(false);
    const [test, setTest] = useState("test");



        const updateTechnology = useCallback(()=>{
            getTechnology(setTechnology)
       },[])



    
    useEffect(()=>{


    },[])
    
    return  <TechnologyContext.Provider 
                value={{
                    technology, setTechnology, updateTechnology,
                    showTechnologyStage, setShowTechnologyStage,
                    test, setTest
       
                }}
            >
                {children}
            </TechnologyContext.Provider>




}

