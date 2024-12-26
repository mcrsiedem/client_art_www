import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./ElementyTechMenu.module.css";
import icon from "assets/copy.svg";
import { deleteZamowienie } from "actions/deleteZamowienie";
import { deleteZamowienieKosz } from "actions/deleteZamowienieKosz";
import { createArkuszeFromElemenetsOneRow } from "actions/createArkuszeFromElementsOneRow";
import { createArkuszeFromElemenets } from "actions/createArkuszeFromElements";
import { createNewElementTech } from "actions/createNewElementTech";
import { addArkuszTech } from "actions/ElementyTechEdit/addArkuszTech";
export default function MenuElementyTech({ row }) {

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


  if (row.showMenu) {
    return (
      <div className={style.menu_legi}>
                <button
                  className={style.menu_legi_btn}
                  onClick={() => {
                    console.log(" row id" + row.id);
                    createArkuszeFromElemenetsOneRow(
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
         
                  }}
                  
                >
                Generuj legi
                </button>


        <DodajNowyElement row={row} />
        <DodajArkusz row={row}  />
        <SkasujElement row={row}  />
        <Ponumeruj row={row} />
        <Anuluj  row={row}/>

      </div>
    );
  }
}

const Ponumeruj = ({ showMenu, setShowMenu }) =>{
  const techContext = useContext(TechnologyContext);
  const setNumerArkusza = techContext.setNumerArkusza;
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

      setNumerArkusza()

      setShowMenu(!showMenu);
    }}
  >
    Ponumeruj
  </button>
  )
}

const Anuluj = ( ) =>{
  const techContext = useContext(TechnologyContext)
  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

      setElementyTech(elementyTech.map((t) => {
        return {...t,
          showMenu: false}
      })
    )




    }}
  >
    Anuluj
  </button>
  )
}

const DodajNowyElement = ({ row,showMenu, setShowMenu }) =>{
  const techContext = useContext(TechnologyContext);
  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

createNewElementTech(row,elementyTech,setElementyTech)

      setShowMenu(!showMenu);
    }}
  >
    Kopiuj element
  </button>
  )
}
const DodajArkusz= ({ row,showMenu, setShowMenu }) =>{
  const techContext = useContext(TechnologyContext);
  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

// createNewElementTech(row,elementyTech,setElementyTech)
addArkuszTech(row,elementyTech,setElementyTech)

      setShowMenu(!showMenu);
    }}
  >
    Dodaj Arkusz
  </button>
  )
}


const SkasujElement = ({ row,showMenu, setShowMenu }) =>{
  const techContext = useContext(TechnologyContext);
  const deleteElementTech = techContext.deleteElementTech;


  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

      deleteElementTech(row)
// deleteElementTech(row,elementyTech,setElementyTech,procesyElementowTech, setProcesyElementowTech)

      setShowMenu(!showMenu);
    }}
  >
   Usuń
  </button>
  )
}