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
import { addNewElementTech } from "actions/ElementyTechEdit/addNewElementTech";
import { addNewArkuszTech } from "actions/ElementyTechEdit/addNewArkuszTech";
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
         <DodajNowyElement row={row}  />
         <DodajArkusz row={row}  />
                <button
                  className={style.menu_legi_btn}
                  onClick={() => {
                
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

                    setElementyTech(elementyTech.map((t) => {
                      return {...t,
                        showMenu: false}
                    }));
         
                  }}
                  
                >
                Generuj legi
                </button>


        <DodajNowyElement row={row} />
       
        <SkasujElement row={row}  />
        <Ponumeruj row={row} />
        <Anuluj  row={row}/>

      </div>
    );
  }
}

const Ponumeruj = ({ row}) =>{
  const techContext = useContext(TechnologyContext);
  const setNumerArkusza = techContext.setNumerArkusza;
  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

      setNumerArkusza()
      setElementyTech(elementyTech.map((t) => {
        return {...t,
          showMenu: false}
      }));

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
      }));




    }}
  >
    Anuluj
  </button>
  )
}

const KopiujElement = ({ row,showMenu, setShowMenu }) =>{
  const techContext = useContext(TechnologyContext);
  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

createNewElementTech(row,elementyTech,setElementyTech)

setElementyTech(elementyTech.map((t) => {
  return {...t,
    showMenu: false}
}));
    }}
  >
    Kopiuj element
  </button>
  )
}



const DodajNowyElement= ({ row }) =>{
  const techContext = useContext(TechnologyContext);
  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

// createNewElementTech(row,elementyTech,setElementyTech)
 // row = row Element Tech
 addNewElementTech(row,elementyTech,setElementyTech)

setElementyTech(elementyTech.map((t) => {
  return {...t,
    showMenu: false}
}));
    }}
  >
    Nowy element
  </button>
  )
}





const DodajArkusz= ({ row }) =>{
  const techContext = useContext(TechnologyContext);
  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

// createNewElementTech(row,elementyTech,setElementyTech)
 // row = row Element Tech
 addNewArkuszTech(row,arkusze,setArkusze,legi, setLegi,legiFragmenty, setLegiFragmenty)

setElementyTech(elementyTech.map((t) => {
  return {...t,
    showMenu: false}
}));
    }}
  >
    Nowy arkusz
  </button>
  )
}


const SkasujElement = ({ row,showMenu, setShowMenu }) =>{
  const techContext = useContext(TechnologyContext);
  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  const deleteElementTech = techContext.deleteElementTech;


  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

// setElementyTech(elementyTech.map((t) => {
//   return {...t,
//     showMenu: false}
// }));
      deleteElementTech(row)

// deleteElementTech(row,elementyTech,setElementyTech,procesyElementowTech, setProcesyElementowTech)


    }}
  >
   Usuń
  </button>
  )
}