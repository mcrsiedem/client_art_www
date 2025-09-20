import React, { useContext, useEffect } from 'react';
import GanttChart from './GanttChart'; // Upewnij się, że ścieżka jest poprawna
import { TechnologyContext } from 'context/TechnologyContext';
import { useGant } from './useGant';





function Gant() {
    const techContext = useContext(TechnologyContext);
  const gantStageGrupy = techContext.gantStageGrupy;

    const [refreshGant] = useGant();

  useEffect(() => {
refreshGant()
  }, []);

  if(gantStageGrupy){
      return (
    <div className="App">
      <GanttChart stages={gantStageGrupy} />
    </div>
  );
  }

}

export default Gant;