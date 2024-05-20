import { getTechnology } from "actions/getTechnolgy";
import { useEffect,createContext,useState, useCallback } from "react";;


export const TechnologyContext = createContext();
export const TechnologyContextProvider = ({children})=>{

    const [technology, setTechnology] = useState(null);
    const [showTechnologyStage, setShowTechnologyStage] = useState(false);

    const [rowZamowienia, setRowZamowienia] = useState(null);  // row - dodaj kartę
    const [rowTechnologia, setRowTechnologia] = useState(null);  // row - edytuj kartę



        const updateTechnology = useCallback(()=>{
            getTechnology(setTechnology)
       },[])

       useEffect(() => {
        console.log("new karta")
          }, [rowZamowienia]);

          useEffect(() => {
            console.log("edit karta")
              }, [rowTechnologia]);
        

    
    useEffect(()=>{


    },[])
    
    return  <TechnologyContext.Provider 
                value={{
                    technology, setTechnology, updateTechnology,
                    showTechnologyStage, setShowTechnologyStage,
                    rowZamowienia, setRowZamowienia,
                    rowTechnologia, setRowTechnologia
       
                }}
            >
                {children}
            </TechnologyContext.Provider>




}

