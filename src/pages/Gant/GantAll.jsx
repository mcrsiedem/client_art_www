import React, { useContext, useEffect } from 'react';
import GanttChart from './GanttChart'; // Upewnij się, że ścieżka jest poprawna
import { TechnologyContext } from 'context/TechnologyContext';
import { useGant } from './useGant';
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import GanttChartAll from './GanttChartAll';


function GantAll() {
    const techContext = useContext(TechnologyContext);
  const gantStageGrupy = techContext.gantStageGrupy;
  const navigate = useNavigate();

    const [refreshGant,refreshGantAll] = useGant();

  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
      refreshGantAll()

        } else {
          navigate("/Login");
        }
      });
  }

  useEffect(() => {
    checkToken();

  }, []);



  if(gantStageGrupy){
      return (
    <div className="App">
      {/* <GanttChart stages={gantStageGrupy} /> */}
      {/* <GanttChartAll stages={gantStageGrupy} /> */}
      <GanttChartAll stages={gantStageGrupy} />
      {/* <GanttChart /> */}
    </div>
  );
  }

}

export default GantAll;