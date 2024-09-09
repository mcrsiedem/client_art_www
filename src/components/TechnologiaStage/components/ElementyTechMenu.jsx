import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./ElementyTechMenu.module.css";
import icon from "assets/copy.svg";
import { deleteZamowienie } from "actions/deleteZamowienie";
import { deleteZamowienieKosz } from "actions/deleteZamowienieKosz";
import { createArkuszeFromElemenets } from "actions/createArkuszeFromElements";
export default function MenuElementyTech({ row,showMenu, setShowMenu }) {

  const techContext = useContext(TechnologyContext);
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;



  const elementy = techContext.elementy;
  const setElementy = techContext.setElementy;
  const fragmenty = techContext.fragmenty;
  const setFragmenty = techContext.setFragmenty;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;

  const procesy = techContext.procesyElementow;
  const grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const oprawaTech = techContext.oprawaTech;
  const setOprawaTech = techContext.setOprawaTech;
  const fragmentyTech = techContext.fragmentyTech;
  const setFragmentyTech = techContext.setFragmentyTech;
  const setElementyTech = techContext.setElementyTech;
  const handleChangeCardFragmenty_i_Elementy_Tech = techContext.handleChangeCardFragmenty_i_Elementy_Tech;

  const elementyTech = techContext.elementyTech;
  // const appContext = useContext(AppContext)
  // const zamowienia = appContext.zamowienia;
  // const setZamowienia = appContext.setZamowienia;

  if (showMenu) {
    return (
      <div className={style.menu_legi}>
        <button
          className={style.menu_legi_btn}
          onClick={() => {
            // const rowsToDelete =zamowienia.filter(x => x.select === true);
    
            // deleteZamowienieKosz(zamowienia,setZamowienia,rowsToDelete, setShowMenu)
            // odlaczFragmenty(oprawa_id,legiFragmenty)
            // setLegiFragmenty(
            //   legiFragmenty.map((t) => {
            //     if (t.oprawa_id === row.id) {
            //       return {...t,
            //         oprawa_id: 0}
            //     } else {
            //       return t;
            //     }
            //   })
            // );

            createArkuszeFromElemenets(
              arkusze,
              setArkusze,
              legi,
              setLegi,
              legiFragmenty,
              setLegiFragmenty,
              oprawaTech,
              setOprawaTech,
              fragmentyTech,
              setFragmentyTech,
              elementyTech,
              row, procesy, grupaWykonan, setGrupaWykonan,wykonania, setWykonania
            );
      
            setShowMenu(!showMenu);
          }}
          
        >
         Stwórz arkusze + legi
        </button>
        {/* <button className={style.menu_legi_btn}           onClick={() => {
        const rowsToDelete =zamowienia.filter(x => x.select === true);
        deleteZamowienie(zamowienia,setZamowienia,rowsToDelete, setShowMenu)
 
          }}>Usuń na zawsze...</button> */}

        <button
          className={style.menu_legi_btn}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          Anuluj
        </button>
      </div>
    );
  }
}
