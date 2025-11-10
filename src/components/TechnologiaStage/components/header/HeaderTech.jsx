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
import { useZamowienia } from "hooks/useZamowienia";
import axios from "axios";
import { IP } from "../../../../utils/Host";
import { skasujTechnologie } from "actions/skasujTechnologie";
import SprawdzBTN from "./SprawdzBTN";
import { useHistoria } from "hooks/useHistoria";
import { useProcesy } from "hooks/procesy/useProcesy";
import { zapiszTechnologieDodruk } from "actions/zapiszTechnologieDodruk";


export default function Header({}) {
  const techContext = useContext(TechnologyContext);
  const appcontext = useContext(AppContext);
  const listaPapierow = appcontext.listaPapierow;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;

  const { createArkuszeFromElemenets, ponumerujArkusze } = useArkusze();
  return (
    <header
      className={style.headerMain}
      onDoubleClick={async ()  => {
        console.clear();
        // console.log("Karta Technologiczna: ");
        console.log("Dane Tech: ", techContext.daneTech);
        console.log("Produkt Tech: ", techContext.produktyTech);
        console.log("Elementy Tech: ", techContext.elementyTech);
        console.log("Fragmenty Tech: ", techContext.fragmentyTech);
        console.log("Oprawa Tech: ", techContext.oprawaTech);
        console.log("Procesy elementów tech: ", techContext.procesyElementowTech);
        console.log("Arkusze: ", techContext.arkusze);
        console.log("Legi: ", techContext.legi);
        console.log("Fragmenty leg tech: ", techContext.legiFragmenty);
        console.log("Grupy wykonan tech: ", techContext.grupaWykonan);
        console.log("Wykonania tech: ", techContext.wykonania);
        // console.log("listaPapierow: ", appcontext.listaPapierow);
        console.log("grupaOprawaTech: ", techContext.grupaOprawaTech);
        console.log(
          "lista wszystkich procesów appcontext.procesList: ",
          appcontext.procesList
        );


        // 

      }}
    >
      <LeftPane>
        <IconError />

        <p className={style.title2}>Technologia </p>

        <p> {techContext.daneTech.id==1? <p className={style.new} >nowa</p>:<></>}</p>
        {/* <IconError/> */}
      </LeftPane>
      <CenterPane>
        {/* <p  className={style.title2}>  stary nr: {appcontext.zamowienia?.filter(x=> x.id ==techContext?.daneTech.zamowienie_id )[0]?.nr_stary} </p> */}

        <AlertLega />
      </CenterPane>
      <RightPane>
        <Dodruk />
        <ZapisBtnPromiseDodruk />
        <PotwierdzKorekteZamowieniaBTN />
        <SkasujTechnologieBTN />
        
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
 if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1) {
    return (
    <button
      className={ style.btn}
      onClick={() => {

     

                      techContext.setArkusze([])
        techContext.setLegi([])
        techContext.setLegiFragmenty([])
        techContext.setGrupaWykonan([])
        techContext.setWykonania([])
        techContext.setGrupaOprawaTech([])

        setShowProcesy(false)
        
           

      }}
    >
      Clear 
    </button>
  );}
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



const PotwierdzKorekteZamowieniaBTN = () => {
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  const setDaneTech = techContext.setDaneTech;
 if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1) {

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
}

};



const Dodruk = () => {
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  const setDaneTech = techContext.setDaneTech;
    const       {createWykonaniaFromArkuszeLegi}= useProcesy();
 if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1) {

    return (
    <button
      // disabled={daneTech.korekta_zamowienia_alert == 1 ? false : true}
      className={ daneTech.korekta_zamowienia_alert == 1 ? style.btn : style.btn_disabled  }
      onClick={() => {
        // daneTech.korekta_zamowienia_alert= null
        // setDaneTech({...daneTech, alert:true, korekta_zamowienia_alert: null})
       createWykonaniaFromArkuszeLegi();
      }}
    >
      Dodruk
    </button>
  );
}

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
  const grupaOprawaTech = techContext.grupaOprawaTech;
  const setGrupaOprawaTech = techContext.setGrupaOprawaTech;

  const fechparametryTechnologii = techContext.fechparametryTechnologii;


 if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1) {

  return (
    <button
      disabled={isSaveButtonDisabled}
      className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
      onClick={() => {

    setSaveButtonDisabled(true)
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
          setProcesyElementowTech,setSaveButtonDisabled,
          grupaOprawaTech, setGrupaOprawaTech
        });
       
      }



        if(daneTech.id != 1){
              setSaveButtonDisabled(true)
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
         setSaveButtonDisabled,
         grupaOprawaTech, setGrupaOprawaTech,
         fechparametryTechnologii

       });

}
       
        


      }}
    >
      Zapisz 
    </button>
  );
}
};
//----a
const ZapisBtnPromiseDodruk = () => {
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
  const grupaOprawaTech = techContext.grupaOprawaTech;
  const setGrupaOprawaTech = techContext.setGrupaOprawaTech;

  const fechparametryTechnologii = techContext.fechparametryTechnologii;


 if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1) {

  return (
    <button
      disabled={isSaveButtonDisabled}
      className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
      onClick={() => {


     
        console.log("zapis 1st ");
        daneTech.autor_id = DecodeToken(sessionStorage.getItem("token")).id  
        zapiszTechnologieDodruk({
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
          setProcesyElementowTech,setSaveButtonDisabled,
          grupaOprawaTech, setGrupaOprawaTech
        });
      

      }}
    >
      Zapisz Dodruk
    </button>
  );
}
};
//--
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

const IconNavigate =  ({ className, logo, navi }) => {
  const techContext = useContext(TechnologyContext);
  const appContext = useContext(AppContext)
  const setShowTechnologyStage = techContext.setShowTechnologyStage;

  const fechGrupyAndWykonaniaForProcesor =
    techContext.fechGrupyAndWykonaniaForProcesor;
  const selectedProcesor = techContext.selectedProcesor;
  const {refreshZamowienia} = useZamowienia()
  return (
    <img
      className={className}
      src={logo}
      onClick={ async() => {
        setShowTechnologyStage(false);

        techContext.setRowZamowienia(null);
        techContext.setRowTechnologia(null);
        fechGrupyAndWykonaniaForProcesor(selectedProcesor);
        // refreshZamowienia(appContext.setZamowienia,appContext.setZamowieniaWyszukiwarka)
        await axios.put(IP + "setOrderClosed", {
          id: techContext.daneTech.zamowienie_id,
        });
        refreshZamowienia();
        // techContext.setOpenTechnologia(false)
      }}
      alt="Logo"
    />
  );
};


const SkasujTechnologieBTN = () => {
    const techContext = useContext(TechnologyContext);

  const setShowTechnologyStage = techContext.setShowTechnologyStage;
  const daneTech = techContext.daneTech;
    const {refreshZamowienia} = useZamowienia()
if(DecodeToken(sessionStorage.getItem("token")).technologia_zapis ==1){
if(techContext.grupaWykonan.length==0 & techContext.daneTech.id !=1){
      return (
    <button
      className={ style.btn}
      onClick={() => {
        skasujTechnologie(daneTech.id,daneTech.zamowienie_id,DecodeToken(sessionStorage.getItem("token")).id,refreshZamowienia,setShowTechnologyStage)

        // historia kasowanie zapisuje się po stronie bazy

        
      }}
    >
      Skasuj technologie
    </button>
  );
}

}

};
