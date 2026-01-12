import style from "./ElementTable.module.css";
import Logo_ustawienia from "assets/settings.svg";
import addIcon2 from "assets/addIcon2.svg"
import logoExpand from "assets/expand.svg";
import { useState, useContext } from "react";
import { _typ_elementu } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";
import { reg_int, reg_txt } from "utils/initialvalue";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import RowArkusze from "./RowArkusze";
import MenuElementyTech from "./menu/ElementyTechMenu";
import { ifNoTextSetNull } from "actions/ifNoTextSetNull";
import { getNameOfPapier } from "actions/getNameOfPapier";
import { getNameOfPapierPostac } from "actions/getNameOfPapierPostac";
import { useArkusze } from "hooks/useArkusze";

export default function RowTechElement({  row,  indeks}) {

  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const handleChangeCardFragmenty_i_Elementy_Tech =  techContext.handleChangeCardFragmenty_i_Elementy_Tech;
  const [showArkusze, setShowArkusze] = useState(true);

  return (
    <>
      <div
        className={style.row3}
        key={row.id}
        draggable
        onDrag={() => handleDragElementStart(row.id)}
      >
        <Rozwin arkusze={arkusze} row={row} showArkusze={showArkusze} setShowArkusze={setShowArkusze} />
        <Id row={row} />
        <Typ row={row} handleChangeCardFragmenty_i_Elementy_Tech={handleChangeCardFragmenty_i_Elementy_Tech}  />
        <Naklad row={row} indeks={indeks}/>
        <NadkompletElement row={row} />
        <Strony row={row} indeks={indeks} />
        <NettoX row={row} indeks={indeks}/>
        <NettoY row={row} indeks={indeks}/>
        <PapierSelect2 row={row} handleChangeCardFragmenty_i_Elementy_Tech={handleChangeCardFragmenty_i_Elementy_Tech} indeks={indeks} />
        <PapierPostac  row={row} handleChangeCardFragmenty_i_Elementy_Tech={handleChangeCardFragmenty_i_Elementy_Tech } indeks={indeks}  />
        <ArkuszSzerokosc row={row} />
        <ArkuszWysokosc row={row} />
        <Lega row={row} />
        <IloscLeg row={row} />
        <LegaMnoznik row={row} />
        <Nazwa row={row} indeks={indeks} />
        <Uwagi row={row}indeks={indeks} />
        <Procesy row={row} indeks={indeks} />
        <MenuElementyBtn  row={row} />
      </div>
      {showArkusze && (
        <div className={style.container_for_arkusze}>
          {arkusze?.filter((x) => x.element_id == row.id && x.delete != true)

            .map((row, i) => {
              return <RowArkusze key={row.id} i={i} row={row} />;
            })}
          
        </div>
      )}
      
    </>
  );



  function handleDragElementStart(id) {
    //   e.preventDefault();
    sessionStorage.setItem("id_element_drag", id);
    sessionStorage.setItem("typ_drag", "element");
  }


}

function Procesy({ row,indeks }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const appContext = useContext(AppContext);
  const techontext = useContext(TechnologyContext);

  const procesyElementow = techontext.procesyElementow;
  const setProcesyElementowTemporary =
    contextModalInsert.setProcesyElementowTemporary;

  const procesyElementowTech = techontext.procesyElementowTech;
  const setProcesyElementowTechTemporary =
    techontext.setProcesyElementowTechTemporary;
const procesListName = appContext.procesListName
  const elementy = techontext.elementy;
  return (
    <div id="procesy" 
      // className={elementy[indeks].procesy == row.procesy ?style.input :style.inputError} title={"W zamówieniu: "+elementy[indeks].procesy} type="text"
    className={style.procesy}
    >

      <img
        className={style.expand}
        src={Logo_ustawienia}
        onClick={() => {
          techontext.setShowElementyTechProcesyInsert(true);
          techontext.setSelectedElementTechROW(row);
          setProcesyElementowTechTemporary(procesyElementowTech);
        }}
        alt="Procesy"
      />
      <div  className={style.procesy2}>
              {procesyElementowTech?.filter((frag) => frag.element_id == row.id)
        .sort((a, b) => a.indeks - b.indeks)
             .filter((x) => x.delete != true)
        .map((pr, i) => <> {pr.indeks +" "+ appContext.showMeProcessName(pr.nazwa_id) + " "}</> )
  // .map((pr,i) => (<> <p className={style.procesy_elementy_indeks}> {pr.indeks}</p><p className={style.procesy_elementy_bold}>{ procesListName?.filter(pln => pln.id == pr.nazwa_id)[0].nazwa } </p> <p className={style.procesy_elementy_light}>  {pr.typ+" "+pr.rodzaj+" "+pr.wykonczenie+" "+pr.obszar+ " "}</p> </>) ) 
}
      </div>

    </div>
  );
}



function Typ({ row, handleChangeCardFragmenty_i_Elementy_Tech }) {
  //row - row element
  return (
    <select
      className={style.select}
      defaultValue={row.typ}
      onChange={(e) => {
        handleChangeCardFragmenty_i_Elementy_Tech({
          ...row,
          typ: e.target.value,
          update: true
        });
      }}
    >
      {}
      {_typ_elementu.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nazwa}
        </option>
      ))}
    </select>
  );
}





function  PapierSelect2({
  row,handleChangeCardFragmenty_i_Elementy_Tech,indeks
}) {
  const appcontext = useContext(AppContext);
  const listaPapierow = appcontext.listaPapierow;
  const modalcontext = useContext(ModalInsertContext);
  const setShowPaperStage = modalcontext.setShowPaperStage;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const setSelectedElementTechROW = techContext.setSelectedElementTechROW;
  const setSelectedElementTechArkusz = techContext.setSelectedElementTechArkusz;
  const elementy = techContext.elementy;

  

  return (
   <div className={style.papier_input_container}>
      <select
        className={elementy[indeks]?.papier_id == row.papier_id ?style.select_papier :style.select_papierError} title={"W zamówieniu "+getNameOfPapier(listaPapierow, elementy[indeks]?.papier_id)}
        value={row.papier_id}
        onChange={(e) => {
          handleChangeCardFragmenty_i_Elementy_Tech({
            ...row,
            papier_id: e.target.value,
            update: true
          });
          setArkusze(
            arkusze.map((arkusz) => {
              if (arkusz.element_id === row.id) {
                return {
                  ...arkusz,
                  papier_id: e.target.value,
                  update: true
        
                };
              } else {
                return arkusz;
              }
            })
          );
        }}
      >
        {   <option value = "0"  >
           wybierz papier
          </option>}
        {listaPapierow.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa} {option.gramatura} g/m2 {option.wykonczenie}
          </option>
        ))}
      </select>
<img
       className={style.dodaj_klienta}
        src={addIcon2}
        onClick={() => {
          setShowPaperStage(true)
          //albo element zaznaczony, albo arkusz - po to zeby było wiadomo gdzie zmienić papier w PaperStage USE
          setSelectedElementTechROW(row)
          setSelectedElementTechArkusz(null)

          setListaPapierowWyszukiwarka(listaPapierow)
        }}
        alt="Procesy"
      />
   </div>
  );
}

function PapierPostac({
  row,handleChangeCardFragmenty_i_Elementy_Tech,indeks
}) {
  const appcontext = useContext(AppContext);
  const listaPapierow = appcontext.listaPapierow;
  const listaPapierowPostac = appcontext.listaPapierowPostac;
  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const elementy = techContext.elementy;


  return (
   <div className={style.papier_input_container}>
      <select
        className={elementy[indeks]?.papier_postac_id == row.papier_postac_id ?style.select_papier_postac :style.select_papier_postacError} title={"W zamówieniu "+getNameOfPapierPostac(listaPapierowPostac, elementy[indeks]?.papier_postac_id)}
      
        // className={row.papier_id =="0" ? style.select_papier_postac : style.select_papier_postac }
        value={row.papier_postac_id}
        onChange={(e) => {
          handleChangeCardFragmenty_i_Elementy_Tech({
            ...row,
            papier_postac_id: e.target.value,
            update: true
          });
          setArkusze(
            arkusze.map((arkusz) => {
              if (arkusz.element_id === row.id) {
                return {
                  ...arkusz,
                  papier_postac_id: e.target.value,
                  update: true
        
                };
              } else {
                return arkusz;
              }
            })
          );
        }}
      >
        {/* {  
         <option value = "0"  >
           wybierz
          </option>} */}
        {listaPapierowPostac.map((option) => (
          <option key={option.id} value={option.id}>
            {option.postac}
          </option>
        ))}
      </select>

   </div>
  );
}









function Naklad({ row ,indeks}) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  const elementy = techContext.elementy;
  return (
    <input
      className={elementy[indeks]?.naklad == row.naklad ?style.input :style.inputError} title={"W zamówieniu :"+elementy[indeks]?.naklad} type="text"
      value={row.naklad}
      onChange={(e) => {
        if (e.target.value === "" || reg_int.test(e.target.value)) {
          handleUpdateRowElementyTech({
            ...row,
            naklad: ifNoTextSetNull(e.target.value),
            update: true
          });
        }
      }}
    ></input>
  );
}

function NadkompletElement({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (
    <input
    disabled
      className={style.input}
    ></input>
  );
}


function Rozwin({ arkusze,row, showArkusze, setShowArkusze }) {
  if  (arkusze?.filter(x=> x.delete != true).filter((x) => x.element_id == row.id).length !== 0){
  return (
    <div>
      <img
        className={style.expand}
        src={logoExpand}
        onClick={() => {
          setShowArkusze(!showArkusze);
        }}
        alt="Procesy"
      />
    </div>
  );}else return <p> </p>
}

function Id({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  const legi = techContext.legi;



  const sprawdzCzyJestLega = (row) =>{

if (!legi.filter(x=> x.delete != true).some( x => x.element_id == row.id)) return style.input_id_red
if (legi.filter( x => x.element_id == row.id).reduce((akumulator, element) => parseInt(akumulator) + parseInt(element.naklad), 0)< row.naklad) return style.input_id_yellow

    return style.input_id
  }
  return (
    <input
      // className={style.input_id}
      className={sprawdzCzyJestLega(row)}
      disabled
      value={row.id}
      title="Czerwone: nie ma legi, Żółte: za mała ilość leg"
      // onChange={(e) => {
      //   if (e.target.value === "" || reg_int.test(e.target.value)) {
      //     handleUpdateRowElementyTech({
      //       ...row,
      //       naklad: e.target.value,
      //     });
      //   }
      // }}
    ></input>
  );
}
function Nazwa({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (
    <input
      className={style.input}
      value={row.nazwa}
      onChange={(e) => {
        if (e.target.value === "" || reg_txt.test(e.target.value)) {
          handleUpdateRowElementyTech({
            ...row,
            nazwa: e.target.value,
            update: true
          });
        }
      }}
    ></input>
  );
}

function Strony({ row,indeks }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  const elementy = techContext.elementy;

  const {createArkuszeFromElemenets,ponumerujArkusze} = useArkusze()

  const handleKeyPress= (e)=> {
    if (e.key === 'Enter') {

      const promiseA = new Promise((resolve, reject) => {

      techContext.setArkusze([])
      techContext.setLegi([])
      techContext.setLegiFragmenty([])
      techContext.setGrupaWykonan([])
      techContext.setWykonania([])
          resolve(777);
        })
        promiseA.then(res => createArkuszeFromElemenets()  )

              
    }
  }
  return (
    <input
    onKeyUp={handleKeyPress}
    className={elementy[indeks]?.ilosc_stron == row.ilosc_stron ?style.input :style.inputError} title={"W zamówieniu: "+elementy[indeks]?.ilosc_stron} type="text"

      value={row.ilosc_stron}
      onChange={(e) => {
        if (e.target.value === "" || reg_int.test(e.target.value)) {
          handleUpdateRowElementyTech({
            ...row,
            ilosc_stron: ifNoTextSetNull(e.target.value),
            update: true
          });
        }
      }}
    ></input>
  );
}
function NettoX({ row,indeks }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  const elementy = techContext.elementy;

  return (
    <input
    className={elementy[indeks]?.format_x == row.format_x ?style.input :style.inputError} title={"W zamówieniu: "+elementy[indeks]?.format_x} type="text"

      // className={style.input}
      value={row.format_x}
      onChange={(e) => {
        const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

        if (e.target.value === "" || re.test(e.target.value)) {
          handleUpdateRowElementyTech({
            ...row,
            format_x: e.target.value,
            update: true
          });
        }
      }}
    ></input>
  );
}
function NettoY({ row, indeks }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  const elementy = techContext.elementy;

  return (
    <input
    className={elementy[indeks]?.format_y == row.format_y ?style.input :style.inputError} title={"W zamówieniu: "+elementy[indeks]?.format_y} type="text"

      value={row.format_y}
      onChange={(e) => {
        const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

        if (e.target.value === "" || re.test(e.target.value)) {
          handleUpdateRowElementyTech({
            ...row,
            format_y: e.target.value,
            update: true
          });
        }
      }}
    ></input>
  );
}

function Lega({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;

  return (
    <input
      className={style.input}
      title="Rodzaj legi"
      value={row.lega}
      onChange={(e) => {
        if (e.target.value === "" || reg_int.test(e.target.value)) {
          handleUpdateRowElementyTech({
            ...row,
            lega: ifNoTextSetNull(e.target.value),
            update: true
          });
        }
      }}
    ></input>
  );
}
function IloscLeg({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;

  return (
    <input
      className={style.input_mini}
      value={row.ilosc_leg}
      title="Ilość różnych leg"
      onChange={(e) => {
        if (e.target.value === "" || reg_int.test(e.target.value)) {
          handleUpdateRowElementyTech({
            ...row,
            ilosc_leg: ifNoTextSetNull(e.target.value),
            update: true
          });
        }
      }}
    ></input>
  );
}

function LegaMnoznik({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;

  return (
    <input
      className={style.input_mini}
      value={row.lega_mnoznik}
      title="Mnożnik"
      placeholder=""
      onChange={(e) => {
        if (e.target.value === "" || reg_int.test(e.target.value)) {
          handleUpdateRowElementyTech({
            ...row,
            lega_mnoznik: ifNoTextSetNull(e.target.value),
            update: true
          });
        }
      }}
    ></input>
  );
}

function ArkuszSzerokosc({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  return (

    <input
      value={row.arkusz_szerokosc}
      className={style.input}
      placeholder="..."
      onChange={(e) => {
        const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

        if (e.target.value === "" || re.test(e.target.value)) {
          handleUpdateRowElementyTech({
            ...row,
            arkusz_szerokosc: e.target.value ,
            update: true
          });
        }


        // setArkusze(
        //   arkusze.map((arkusz) => {
        //     if (arkusz.element_id === row.id) {
        //       return {
        //         ...arkusz,
        //         arkusz_szerokosc: e.target.value,
        //         update: true
      
        //       };
        //     } else {
        //       return arkusz;
        //     }
        //   })
        // );
      }}
    ></input>
  

  );
}

function ArkuszWysokosc({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (
    <input
      value={row.arkusz_wysokosc}
      className={style.input}
      placeholder="..."
      onChange={(e) => {
        const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

        if (e.target.value === "" || re.test(e.target.value)) {
          handleUpdateRowElementyTech({
            ...row,
            arkusz_wysokosc: e.target.value,
            update: true
          });
        }
      }}
    ></input>
  );
}

// function PapierInfo({ row }) {
//   const techContext = useContext(TechnologyContext);
//   const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
//   return (
//     <td>
//       <input
//         value={row.papier_info}
//         onChange={(e) => {
//           if (e.target.value === "" || reg_txt.test(e.target.value)) {
//             handleUpdateRowElementyTech({
//               ...row,
//               papier_info: e.target.value,
//             });
//           }
//         }}
//       ></input>
//     </td>
//   );
// }

function Uwagi({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (
    <input
      className={style.input}
      value={row.uwagi}
      onChange={(e) => {
        if (e.target.value === "" || reg_txt.test(e.target.value)) {
          handleUpdateRowElementyTech({
            ...row,
            uwagi: e.target.value,
            update: true
          });
        }
      }}
    ></input>
  );
}

const MenuElementyBtn = ({ row }) => {
  const techContext = useContext(TechnologyContext)
  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  return (
    <div className={style.menu_rowtech}>
      <img
        className={style.iconMenuBtn}
        src={Logo_ustawienia}
        onClick={() => {

          setElementyTech(elementyTech.map((t) => {
            return {...t,
              showMenu: false}
          }).map((t) => {
            if (t.id == row.id) {
              return {...t,
                showMenu: true};
            } else {
              return t;
            }
          })
        )


        }}
        alt="x"
      />
      <MenuElementyTech
        row={row}
      />
    </div>
  );
};
