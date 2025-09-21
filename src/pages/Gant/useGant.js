import axios from "axios";
import { useContext } from "react";
import { IP } from "utils/Host"
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";

export function useGant() {
  const techContext = useContext(TechnologyContext);
  const setGantStageGrupy = techContext.setGantStageGrupy;
  const gantStageGrupy = techContext.gantStageGrupy;
  const appContext = useContext(AppContext)
  const selectedProcesor = techContext.selectedProcesor
  const refreshGant = async (id) => {
    let procesor_id = id || 3;
    const res = await axios.get(
      IP + "gantGrupy/" + sessionStorage.getItem("token")
    );
    // Ta linia wyczyściła stan i w tym samym momencie go zaktualizowała nowymi danymi
// console.log(procesor)
// setGantStageGrupy([])
    // setGantStageGrupy(...[res.data.filter(x => x.procesor_id == procesor_id)]);
    setGantStageGrupy(...[res.data]);
    // setGantStageGrupy(...[res.data.reduce((acc, stage) => {
    //     const { procesor_id } = stage;
    //     if (!acc[procesor_id]) {
    //         acc[procesor_id] = [];
    //     }
    //     acc[procesor_id].push(stage);
    //     return acc;
    // }, {})]);
  };

  return [refreshGant];
}