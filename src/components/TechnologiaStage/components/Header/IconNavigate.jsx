import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TechnologyContext } from "context/TechnologyContext";
export default function Icon({className,logo,navi}){

    const techContext = useContext(TechnologyContext);

    const setShowTechnologyStage = techContext.setShowTechnologyStage;
    return(
        <img
        className={className}
        src={logo}
        onClick={() => {setShowTechnologyStage(false)
      
     
        
        }}
        alt="Logo"
      />
    )
}