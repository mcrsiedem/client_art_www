import style from "./Header.module.css";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";

import IconClose from "assets/x.svg";
import { zapiszTechnologieUpdate } from "actions/zapiszTechnologieUpdate";
import { zapiszTechnologie } from "actions/zapiszTechnologie";
import DecodeToken from "pages/Login/DecodeToken";
import iconError from "assets/error.svg";
import { refreshZamowienia } from "actions/refreshZamowienia";
import { useArkusze } from "hooks/useArkusze";


export default function Header({}) {
  const techContext = useContext(TechnologyContext);
  const appcontext = useContext(AppContext);
  const listaPapierow = appcontext.listaPapierow;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  
  const [createArkuszeFromElemenets,ponumerujArkusze] = useArkusze()
  return (
    <header
      className={style.headerMain}
      onDoubleClick={() => {
        console.clear();
        // console.log("Karta Technologiczna: ");
        console.log("Dane Tech: ", techContext.daneTech);
        console.log("Produkt Tech: ", techContext.produktyTech);
        console.log("Elementy Tech: ", techContext.elementyTech);
        console.log("Fragmenty Tech: ", techContext.fragmentyTech);
        console.log("Oprawa Tech: ", techContext.oprawaTech);
        console.log("Procesy elementów: ", techContext.procesyElementowTech);
        console.log("Arkusze: ", techContext.arkusze);
        console.log("Legi: ", techContext.legi);
        console.log("Fragmenty leg tech: ", techContext.legiFragmenty);
        console.log("Grupy wykonan tech: ", techContext.grupaWykonan);
        console.log("Wykonania tech: ", techContext.wykonania);
        console.log("listaPapierow: ", appcontext.listaPapierow);
        console.log(
          "lista wszystkich procesów appcontext.procesList: ",
          appcontext.procesList
        );
        //  ponumerujArkusze();
        //  ponumerujArkusze();


      }}
    >
      <LeftPane>
        <IconError />

        {/* <p>Karta technologiczna... {techContext.rowTechnologia?.id} {techContext.rowZamowienia?.id}</p> */}
        {/* <p className={style.title}>Karta technologiczna {techContext.daneTech?.id}</p> */}
        <p className={style.title2}>Technologia </p>
        {/* <IconError/> */}
      </LeftPane>
      <CenterPane>
        <AlertLega />
      </CenterPane>
      <RightPane>
        <PotwierdzKorekteZamowieniaBTN />
        <ClearBTN />
        <SprawdzBTN />
        <ZapisBtnPromise />
        <IconNavigate
          className={style.btn_x}
          logo={IconClose}
          navi={"/Panel"}
        />
      </RightPane>
    </header>
  );
}


const ClearBTN = () => {
  const techContext = useContext(TechnologyContext);
  const setShowProcesy = techContext.setShowProcesy;
// if(DecodeToken(sessionStorage.getItem("token")).id ==1){
    return (
    <button
      className={ style.btn}
      onClick={() => {
        techContext.setArkusze([])
        techContext.setLegi([])
        techContext.setLegiFragmenty([])
        techContext.setGrupaWykonan([])
        techContext.setWykonania([])
        setShowProcesy(false)
        
      }}
    >
      Clear 
    </button>
  );
// }

};

const IconError = () =>{
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  if(daneTech.korekta_zamowienia_alert ==1){
    return(
    <img
       className={style.iconError}
        src={iconError}
        onClick={() => {
        }}
        alt="Procesy"
      />
  )
  }
}




//----
const SprawdzBTN = () => {
  const techContext = useContext(TechnologyContext);
  const isSaveButtonDisabled = techContext.isSaveButtonDisabled;
  const setSaveButtonDisabled = techContext.setSaveButtonDisabled;

  return (
    <button
      // disabled={isSaveButtonDisabled}
      className={ style.btn}
      onClick={() => {

        setSaveButtonDisabled(false)
      }}
    >
      Sprawdź 
    </button>
  );
};
const PotwierdzKorekteZamowieniaBTN = () => {
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  const setDaneTech = techContext.setDaneTech;


    return (
    <button
      disabled={daneTech.korekta_zamowienia_alert == 1 ? false : true}
      className={ daneTech.korekta_zamowienia_alert == 1 ? style.btn : style.btn_disabled  }
      onClick={() => {
        // daneTech.korekta_zamowienia_alert= null
        setDaneTech({...daneTech, alert:true, korekta_zamowienia_alert: null})
      
      }}
    >
      Potwierdź korekty
    </button>
  );

};

const ZapisBtnPromise = () => {
  const techContext = useContext(TechnologyContext);
  const isSaveButtonDisabled = techContext.isSaveButtonDisabled;
  const setSaveButtonDisabled = techContext.setSaveButtonDisabled;

  const daneTech = techContext.daneTech;
  const setDaneTech = techContext.setDaneTech;
  const produktyTech = techContext.produktyTech;
  const setProduktyTech = techContext.setProduktyTech;
  const elementyTech = techContext.elementyTech;
  const fragmentyTech = techContext.fragmentyTech;
  const oprawaTech = techContext.oprawaTech;
  const legi = techContext.legi;
  const legiFragmenty = techContext.legiFragmenty;
  const arkusze = techContext.arkusze;
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const procesyElementowTech = techContext.procesyElementowTech;

  const setLegiFragmenty = techContext.setLegiFragmenty;
  const setFragmentyTech = techContext.setFragmentyTech;
  const setElementyTech = techContext.setElementyTech;
  const setOprawaTech = techContext.setOprawaTech;
  const setLegi = techContext.setLegi;
  const setArkusze = techContext.setArkusze;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const setWykonania = techContext.setWykonania;
  const setProcesyElementowTech = techContext.setProcesyElementowTech;



  return (
    <button
      disabled={isSaveButtonDisabled}
      className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
      onClick={() => {


        if(daneTech.id == 1){
        console.log("zapis 1st ");
        daneTech.autor_id = DecodeToken(sessionStorage.getItem("token")).id  
        zapiszTechnologie({
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
          setProduktyTech,
          setDaneTech,
          setElementyTech,
          setFragmentyTech,
          setOprawaTech,
          setLegi,
          setLegiFragmenty,
          setArkusze,
          setGrupaWykonan,
          setWykonania,
          setProcesyElementowTech,setSaveButtonDisabled
        });
       
      }




        if(daneTech.id != 1){
          zapiszTechnologieUpdate({
         daneTech,
         setDaneTech,
         produktyTech,
         setProduktyTech,
         elementyTech,
         fragmentyTech,
         oprawaTech,
         legi,
         legiFragmenty,
         arkusze,
         grupaWykonan,
         wykonania,
         procesyElementowTech,
         setElementyTech,
         setFragmentyTech,
         setOprawaTech,
         setLegi,
         setLegiFragmenty,
         setArkusze,
         setGrupaWykonan,
         setWykonania,
         setProcesyElementowTech,
         setSaveButtonDisabled

       });

}
       
        


      }}
    >
      Zapisz 
    </button>
  );
};
//----
const LeftPane = ({ children }) => {
  return <div className={style.left}>{children}</div>;
};

const RightPane = ({ children }) => {
  return <div className={style.right}>{children}</div>;
};
const CenterPane = ({ children }) => {
  return <div className={style.center}>{children}</div>;
};

const AlertLega = () => {
  const techContext = useContext(TechnologyContext);
  const legiFragmenty = techContext.legiFragmenty;
  const even = (element) => element?.oprawa_id == null;

  if (legiFragmenty.some(even)) {
    return (
      <div className={style.center}>
        <p style={{ color: "red" }}>UWAGA: bezdomna lega!</p>
      </div>
    );
  }
};

const IconNavigate = ({ className, logo, navi }) => {
  const techContext = useContext(TechnologyContext);
  const appContext = useContext(AppContext)
  const setShowTechnologyStage = techContext.setShowTechnologyStage;

  const fechGrupyAndWykonaniaForProcesor =
    techContext.fechGrupyAndWykonaniaForProcesor;
  const selectedProcesor = techContext.selectedProcesor;
  return (
    <img
      className={className}
      src={logo}
      onClick={() => {
        setShowTechnologyStage(false);

        techContext.setRowZamowienia(null);
        techContext.setRowTechnologia(null);
        fechGrupyAndWykonaniaForProcesor(selectedProcesor);
        refreshZamowienia(appContext.setZamowienia,appContext.setZamowieniaWyszukiwarka)
        // techContext.setOpenTechnologia(false)
      }}
      alt="Logo"
    />
  );
};
