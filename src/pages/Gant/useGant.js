import axios from "axios";
import { useContext } from "react";
import { IP } from "utils/Host"
import { AppContext } from "context/AppContext";
import DecodeToken from "pages/Login/DecodeToken";
import { TechnologyContext } from "context/TechnologyContext";
export function useGant() {
  const contextApp = useContext(AppContext);
  const tableZamowienia = contextApp.tableZamowienia;

  const techContext = useContext(TechnologyContext);
  const gantStageGrupy = techContext.gantStageGrupy;
  const setGantStageGrupy = techContext.setGantStageGrupy;
  const refreshGant = async () => {
    const res = await axios.get(
      IP + "gantGrupy/" + sessionStorage.getItem("token")
    );
setGantStageGrupy([])
    setGantStageGrupy([...res.data.filter(x=> x.procesor_id==1)]);
    // contextApp.setZamowieniaWyszukiwarka([...res.data]);
  };

  return [refreshGant];
}
