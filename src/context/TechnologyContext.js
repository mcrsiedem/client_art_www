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

    // menu


    const [menuElementyTech,setMenuElementyTech] = useState(false)

    //dane z zamówienia
    const [dane, setDane] = useState([]);
    const [produkty, setProdukty] = useState([]);
    const [elementy, setElementy] = useState([]);
    const [fragmenty, setFragmenty] = useState([]);
    const [oprawa, setOprawa] = useState([]);
    const [procesyElementow, setProcesyElementow] = useState([]);

        //dane z technologii
        const [daneTech, setDaneTech] = useState([]);
        const [produktyTech, setProduktyTech] = useState([]);
        const [elementyTech, setElementyTech] = useState([]);
        const [fragmentyTech, setFragmentyTech] = useState([]);
        const [oprawaTech, setOprawaTech] = useState([]);
        const [procesyElementowTech, setProcesyElementowTech] = useState([]);


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
     setProdukty(res.data[1])
     setElementy(res.data[2])
     setFragmenty(res.data[3])
     setOprawa(res.data[4])
     setProcesyElementow(res.data[6])

     setDaneTech(res.data[0][0])
     setProduktyTech(res.data[1])
     setElementyTech(res.data[2])
     setFragmentyTech(res.data[3])
     setOprawaTech(res.data[4])
     setProcesyElementowTech(res.data[6])

}
    
    return  <TechnologyContext.Provider 
                value={{
                    technology, setTechnology, updateTechnology,
                    showTechnologyStage, setShowTechnologyStage,
                    rowZamowienia, setRowZamowienia,
                    rowTechnologia, setRowTechnologia,
                    // openTechnologia, setOpenTechnologia,
                    // updateDane,
                    dane, setDane,
                    produkty, setProdukty,
                    elementy, setElementy,
                    fragmenty, setFragmenty,
                    oprawa, setOprawa,
                    procesyElementow, setProcesyElementow,
                    daneTech, setDaneTech,
                    produktyTech, setProduktyTech,
                    elementyTech, setElementyTech,
                    fragmentyTech, setFragmentyTech,
                    oprawaTech, setOprawaTech,
                    procesyElementowTech, setProcesyElementowTech,
                    menuElementyTech,setMenuElementyTech
       
                }}
            >
                {children}
            </TechnologyContext.Provider>




}

