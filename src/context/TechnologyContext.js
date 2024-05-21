import axios from "axios";
import { IP } from "utils/Host";
import { getTechnology } from "actions/getTechnolgy";
import { useEffect,createContext,useState, useCallback } from "react";;



export const TechnologyContext = createContext();
export const TechnologyContextProvider = ({children})=>{

    const [technology, setTechnology] = useState(null); //lista technologii 
    const [showTechnologyStage, setShowTechnologyStage] = useState(false);

    const [rowZamowienia, setRowZamowienia] = useState(null);  // row - dodaj kartę
    const [rowTechnologia, setRowTechnologia] = useState(null);  // row - edytuj kartę

    const [dane, setDane] = useState([]);

    const [produkty, setProdukty] = useState([]);
    const [elementy, setElementy] = useState([]);
    const [fragmenty, setFragmenty] = useState([]);
    const [oprawa, setOprawa] = useState([]);
    const [procesyElementow, setProcesyElementow] = useState([]);

    // const [openTechnologia, setOpenTechnologia] = useState(false);



        const updateTechnology = useCallback(()=>{
            getTechnology(setTechnology)
       },[])

    //    const updateDane = useCallback((data) => {
    //     console.log("data",data)
    //     setDane(data);
    //   }, []);

       useEffect(() => {
        console.log("new karta")
    

        fechparametry(rowZamowienia?.id,rowZamowienia?.zamowienie_prime_id)


          }, [rowZamowienia]);

          useEffect(() => {
            console.log("edit karta")
              }, [rowTechnologia]);
        

    
    useEffect(()=>{


    },[])

    
  async function fechparametry(idZamowienia,zamowienie_prime_id) {

     const res = await axios.get(IP + "parametry/"+idZamowienia+"/"+zamowienie_prime_id);

     setDane(res.data[0][0])
    //  console.log("dane: ", res.data[0][0])
 
     setProdukty(res.data[1])
     setElementy(res.data[2])
     setFragmenty(res.data[3])
     setOprawa(res.data[4])
     setProcesyElementow(res.data[6])

}
    
    return  <TechnologyContext.Provider 
                value={{
                    technology, setTechnology, updateTechnology,
                    showTechnologyStage, setShowTechnologyStage,
                    rowZamowienia, setRowZamowienia,
                    rowTechnologia, setRowTechnologia,
                    // openTechnologia, setOpenTechnologia,
                    // updateDane,
                    dane, setDane
       
                }}
            >
                {children}
            </TechnologyContext.Provider>




}

