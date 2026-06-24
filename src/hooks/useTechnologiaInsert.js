import axios from "axios";
import { IP } from "../utils/Host";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";



export function useTechnologiaInsert() {

  let {
    daneTech,
    produktyTech,
    elementyTech,
    fragmentyTech,
    oprawaTech,
    arkusze,
    legi,
    legiFragmenty,
    grupaWykonan,
    wykonania,
    procesyElementowTech,
    setDaneTech,
    setProduktyTech,
    setElementyTech,
    setFragmentyTech,
    setOprawaTech,
    setLegi,
    setLegiFragmenty,
    setArkusze,
    setGrupaWykonan,
    setWykonania,
    setProcesyElementowTech,
    setSaveButtonDisabled,
    grupaOprawaTech,
    setGrupaOprawaTech,
    procesyProduktowTech,
    setProcesyProduktowTech
  } = useContext(TechnologyContext);

  async function zapiszTechnologiePool() {

    
    let payload= [daneTech,produktyTech,
    elementyTech,
    fragmentyTech,
    oprawaTech,
    arkusze,
    legi,
    legiFragmenty,
    grupaWykonan,
    grupaOprawaTech,
    wykonania,
    procesyElementowTech,procesyProduktowTech]

try {
        const token = sessionStorage.getItem("token");
        // 2. Jedno główne zapytanie do API
        const res = await axios.post(`${IP}zapiszTechnologie/${token}`, payload);

        // Zakładamy, że serwer zwraca { success: true, technologia_id: ... }
        if (res.data.success) {
            const technologia_id = res.data.technologia_id;
            setSaveButtonDisabled(true);
            alert("Technologia zapisana poprawnie!");

            // 3. Odświeżenie danych z bazy (tak jak robiłeś wcześniej)
            const refreshRes = await axios.get(`${IP}technologie_parametry/${technologia_id}/${token}`);
            
            setDaneTech(refreshRes.data[0][0]);
            setProduktyTech(refreshRes.data[1]);
            setElementyTech(refreshRes.data[2]);
            setFragmentyTech(refreshRes.data[3]);
            setOprawaTech(refreshRes.data[4]);
            setProcesyElementowTech(refreshRes.data[5]);
            setLegi(refreshRes.data[6]);
            setLegiFragmenty(refreshRes.data[7]);
            setArkusze(refreshRes.data[8]);
            setGrupaWykonan(refreshRes.data[9]);
            setWykonania(refreshRes.data[10]);
            setGrupaOprawaTech(refreshRes.data[11]);
            setProcesyProduktowTech(refreshRes.data[14]);
            

        } else {
            throw new Error(res.data.error || "Błąd zapisu");
        }

    } catch (error) {
        console.error("Błąd podczas zapisu:", error);
        alert("Coś poszło nie tak: " + error.message);
        setSaveButtonDisabled(false); // Pozwól spróbować ponownie w razie błędu
    }

  }


  return { zapiszTechnologiePool };
}


