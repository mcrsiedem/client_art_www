import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./ElementyTechMenu.module.css";
import { ponumerArkusze } from "actions/ponumerArkusze";
import { useArkuszeOne } from "hooks/useArkuszeOne";
import { useProcesy } from "hooks/procesy/useProcesy";
export default function MenuElementyTech({ row }) {

  const techContext = useContext(TechnologyContext);

  const setElementyTech = techContext.setElementyTech;
  const elementyTech = techContext.elementyTech;
  const setShowProcesy = techContext.setShowProcesy;

  const {createProcesyFromArkuszONE} = useProcesy();

  if (row.showMenu) {
    return (
      <div className={style.menu_legi}>
         {/* <DodajNowyElement row={row}  /> */}
         <DodajArkusz row={row}  />
        <Ponumeruj row={row} />

                <button
                  className={style.menu_legi_btn}
                  onClick={() => {

createProcesyFromArkuszONE()
        setShowProcesy(true)

                    setElementyTech(elementyTech.map((t) => {
                      return {...t,
                        showMenu: false}
                    }));
         
                  }}
                >
                Dodaj procesy
                </button>

        <KopiujFormatPapieru row={row} />
        <KopiujNadkomplet row={row} />

        
        <Anuluj  row={row}/>

      </div>
    );
  }
}

const Ponumeruj = ({ row}) =>{
  const techContext = useContext(TechnologyContext);

  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  const setArkusze = techContext.setArkusze;
  const arkusze = techContext.arkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

      // setNumerArkusza2(row)
      ponumerArkusze(row,setArkusze,arkusze,legi,setLegi)
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

const KopiujFormatPapieru = ({ row}) =>{
  const techContext = useContext(TechnologyContext);
  const setArkusze = techContext.setArkusze;
  const arkusze = techContext.arkusze;
  const setElementyTech = techContext.setElementyTech;
  const elementyTech = techContext.elementyTech;

  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

setArkusze(
  arkusze.map((arkusz) => {
    if (arkusz.element_id === row.id) {
      return {
        ...arkusz,
        arkusz_szerokosc: row.arkusz_szerokosc,
        arkusz_wysokosc: row.arkusz_wysokosc,
        update: true

      };
    } else {
      return arkusz;
    }
  })
);
setElementyTech(elementyTech.map((t) => {
  return {...t,
    showMenu: false}
}));

    }}
  >
    Rozdaj format papieru ark.
  </button>
  )
}

const KopiujNadkomplet = ({ row}) =>{
  const techContext = useContext(TechnologyContext);
  const setArkusze = techContext.setArkusze;
  const arkusze = techContext.arkusze;
  const setElementyTech = techContext.setElementyTech;
  const elementyTech = techContext.elementyTech;

  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {

setArkusze(
  arkusze.map((arkusz) => {
    if (arkusz.element_id === row.id) {
      return {
        ...arkusz,
        nadkomplet: row.nadkomplet,
        update: true

      };
    } else {
      return arkusz;
    }
  })
);
setElementyTech(elementyTech.map((t) => {
  return {...t,
    showMenu: false}
}));

    }}
  >
    Rozdaj nadkomplet
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


const DodajArkusz= ({ row }) =>{
  const [dodajArkusz] = useArkuszeOne()
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {
         dodajArkusz(row)
    }}
  >
    Nowy arkusz
  </button>
  )
}


