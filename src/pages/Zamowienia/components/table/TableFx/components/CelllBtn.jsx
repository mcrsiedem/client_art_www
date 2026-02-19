import React, { useContext } from "react";
import { 
  FileText, 
  CirclePlus,
  KeySquare
} from "lucide-react";
import { AppContext } from "context/AppContext";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu, _waluta } from "utils/initialvalue";
import { TechnologyContext } from "context/TechnologyContext";
import DecodeToken from "pages/Login/DecodeToken";


export default function  CellBtn({ row }) {

  if(row.open_stan == 1 ) return <BtnLock row={row}/>
  if( row.stan>2  && row.technologia_id == null)  return <BtnCirclePlus row={row}/>

  return row.stan>2  &&<BtnFile row={row}/>

}




function BtnLock({
  row,
}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const setShowProcesy = techContext.setShowProcesy;
  

  if (row.open_user_id != DecodeToken(sessionStorage.getItem("token")).id ) {

    return (
     
        <div>
         <button style={{border:'none',background:'transparent'}}
            alt="Procesy"
          >
          <KeySquare size={16} style={{color: '#c61515'}} />
          </button>
        </div>
    );
  }
  

}


function BtnCirclePlus({
  row,
}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const setShowProcesy = techContext.setShowProcesy;
  
    return (
    
        <div >
      <button style={{color: '#94a3b8',border:'none',background:'transparent'}}
            // className={styles.iconSettings}
            // src={iconAdd}
            onClick={() => {
              if(DecodeToken(sessionStorage.getItem("token")).technologie_wszystkie == 1){
              contextApp.setIsLoading(true);
              techContext.fechparametry(row?.id);
              // techContext.setShowTechnologyStage(true);
              techContext.setRowZamowienia(row);
              setShowProcesy(false)
              }
        
            }}
            alt="Procesy"
          >
<CirclePlus size={16} style={{color: '#21ff03a7'}} />
            
            </button>
         
        </div>
     
    );
  
}

function BtnFile({
  row,
}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const setShowProcesy = techContext.setShowProcesy;
  



    return (
    
        <div style={{color: '#94a3b8',border:'none',minWidth: '20px', whiteSpace: 'nowrap'}}>

       <button style={{color: '#94a3b8',border:'none',background:'transparent'}}

            onClick={() => {
                           if(DecodeToken(sessionStorage.getItem("token")).technologie_wszystkie == 1){
                                    contextApp.setIsLoading(true);
                                            fechparametryTechnologii(row.id, row.technologia_id);
                           }

            
            }}
            alt="Procesy"
          >
<FileText size={16} style={{color: '#94a3b8',border:'none'}} />

          </button>
         
        </div>
      
    );
  
}