import style from "./Header.module.css";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
// import LeftPane from "./LeftPane"
// import RightPane from "./RightPane"
// import logoGrid from "../../../../assets/grid.svg";
// import IconNavigate from "./IconNavigate";
import IconClose from "assets/x.svg";
import { saveTech } from "actions/saveTech";
import { todayPlusDni } from "actions/todayPlusDni";
import { saveTechNew } from "actions/saveTechNew";
import { today_teraz } from "actions/today_teraz";
import { today_dodaj_minuty } from "actions/today_dodaj_minuty";
import { zapiszZamowienie } from "actions/zapiszZamowienie";
import { zapiszTechnologie } from "actions/zapiszTechnologie";
import { zapiszTechnologieUpdate } from "actions/zapiszTechnologieUpdate";
export default function Header({}) {
  const techContext = useContext(TechnologyContext);
  const appcontext = useContext(AppContext);
  const listaPapierow = appcontext.listaPapierow;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  return (
    <header className={style.headerMain}>
      <LeftPane>
        {/* <p>Karta technologiczna... {techContext.rowTechnologia?.id} {techContext.rowZamowienia?.id}</p> */}
        <p className={style.title}>Karta technologiczna {techContext.daneTech?.id}</p>
      </LeftPane>

      <CenterPane>
        <AlertLega />
      </CenterPane>
      <RightPane>
        <button
          className={style.btn}
          onClick={() => {
            console.clear();
            console.log("Karta Technologiczna: ");
            console.log("Dane Tech: ", techContext.daneTech);
            console.log("Produkt Tech: ", techContext.produktyTech);
            console.log("Elementy Tech: ", techContext.elementyTech);
            console.log("Fragmenty Tech: ", techContext.fragmentyTech);
            console.log("Oprawa Tech: ", techContext.oprawaTech);
            console.log(
              "Procesy elementów: ",
              techContext.procesyElementowTech
            );
            console.log("Arkusze: ", techContext.arkusze);
            console.log("Legi: ", techContext.legi);
            console.log("Fragmenty leg tech: ", techContext.legiFragmenty);
            console.log("Grupy wykonan tech: ", techContext.grupaWykonan);
            console.log("Wykonania tech: ", techContext.wykonania);
            console.log("listaPapierow: ", appcontext.listaPapierow);
            console.log("lista wszystkich procesów appcontext.procesList: ", appcontext.procesList);
            // fechparametryTechnologii(27)

            //  console.log("Teraz: "+ today_dodaj_minuty())
          }}
        >
          Pokaż
        </button>

        <button
          className={style.btn}
          onClick={() => {

            techContext.setArkusze([])
            techContext.setLegi([])
            techContext.setLegiFragmenty([])
            techContext.setGrupaWykonan([])
            techContext.setWykonania([])
            // console.log("Arkusze: ", techContext.arkusze);
            // console.log("Legi: ", techContext.legi);
            // console.log("Fragmenty leg tech: ", techContext.legiFragmenty);
            // console.log("Grupy wykonan tech: ", techContext.grupaWykonan);
            // console.log("Wykonania tech: ", techContext.wykonania);

          }}
        >
          Clear
        </button>

        <ZapisBtn />
        <IconNavigate
          className={style.btn_x}
          logo={IconClose}
          navi={"/Panel"}
        />
      </RightPane>
    </header>
  );
}

const ZapisBtn = () => {
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
        console.log("zapisz");

if(daneTech.id == 1){
                //  setSaveAs(false);
     
                zapiszTechnologie({
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
                  setProcesyElementowTech
        
                });
        


        // setSaveButtonDisabled(true);
        }


        if(daneTech.id != 1){
          //  setSaveAs(false);

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
            setProcesyElementowTech
  
          });
  


  // setSaveButtonDisabled(true);
  }





//         setDaneTech(res.data[0][0]) 
// setProduktyTech(res.data[1])
// setElementyTech(res.data[2])
// setFragmentyTech(res.data[3])
// setOprawaTech(res.data[4])
// setProcesyElementowTech(res.data[5])
// setLegi(res.data[6])
// setLegiFragmenty(res.data[7])
// setArkusze(res.data[8])
// setGrupaWykonan(res.data[9])
// setWykonania(res.data[10])

        
        // setSaveButtonDisabled(true);
      }}
    >
      Zapisz
    </button>
  );
};
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
        // techContext.setOpenTechnologia(false)
      }}
      alt="Logo"
    />
  );
};
