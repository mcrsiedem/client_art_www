
import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import logoExtract from "assets/extract_green.svg";
import logoExpand from "assets/expand.svg";
import iconTrash from "assets/trash2.svg"
import icon from "assets/copy.svg";
import style from "./RowArkusze.module.css";
import { reg_cena, reg_int, reg_txt } from "utils/initialvalue";
import addIcon2 from "assets/addIcon2.svg"
import { findNadkomplet } from "actions/findNadkomplet";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { useProcesy } from "hooks/useProcesy";
import DodajArkusz from "./components/arkusze/DodajArkusz";
import KopiujLega from "./components/legi/KopiujLega";
import UsunLege from "./components/legi/UsunLege";

export default function RowArkusze  ({ row,i })  {
    const techContext = useContext(TechnologyContext);
    const legi = techContext.legi;
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;
    const setLegi = techContext.setLegi;
    const dragLegaId = techContext.dragLegaId;
    const setDragLegaId = techContext.setDragLegaId;
    const legiFragmenty = techContext.legiFragmenty;
    const setLegiFragmenty = techContext.setLegiFragmenty;
    const [showLegi, setShowLegi] = useState(false);
    const setDropArkuszId = techContext.setDropArkuszId;
    return (
      <>
        <div
        draggable
         onDragStart={() => handleDragMoveStartArkusz(row.id,row.indeks,row.element_id)}
         className={style.main2}>
      <div      className={style.row3}        onDrop={()=>handleDrop(row.id,row.indeks,row.element_id)}
              onDragOver={handleDragOver}  key={row.id}>
        <Rozwin setShowLegi={setShowLegi} showLegi={showLegi} />
        <NrArkusza row={row} i={i+1}/>
        <TypElementu row={row} i={i+1}/>
        <NakladArkusza row={row} />
        <NadkompletArkusz row={row} />
        <RodzajArkusza row={row} />
         <td></td>
         <td></td>
        <PapierSelectArkusze row={row} />
        <PapierPostacArkusze row={row} />
        <ArkuszSzerokosc row={row} />
        <ArkuszWysokosc row={row} />
        <td></td>
        <UwagiArkusz row={row} />
        <UsunArkusz row={row} />
        <DodajArkusz row={row} />
        <GenerujWykonanieArkusz row={row} />
        
      </div>
      </div>
      {showLegi &&(<>     {legi.filter(x=> x.arkusz_id == row.id && x.delete != true).map( (l,i) => {
        return (
          <>
            {" "}
            <div
              draggable
              onDragStart={() => handleDragStart(l.id)}
              className={style.row4}
              key={l.id}
            >
              <NrLegi row={l} />
              <TypLega row={l} />
              <NakladLegi row={l} />
                        <td></td>

              <RodzajLegi row={l} />
              

              <KopiujLega lega={l} />
              <UsunLege lega={l} />
                        <td></td>

              <UwagiLegi row={l} />

            </div>

            {showLegi && (
              <>
             
                {legiFragmenty
                  .filter((x) => x.lega_id == l.id)
                  .map((lf, i) => {
                    return (
                      <div
                        draggable
                        onDragStart={() => handleDragStartFragmnetLegi(lf.id)}
                        className={style.row5}
                        key={lf.id}
                      >
                        <td className={style.input3}> </td>
                        <NrLegiFragment row={lf} />
                        <TypFragment row={lf} />
                        <NakladFragment row={lf} />
                        <td></td>
                        <td></td>
                        <WersjaFragment row={lf} />
                        {/* <WersjaFragmentZaznacz row={lf} /> */}
                      </div>
                    );
                  })}
              </>
            )}

          </>
        ); 
      })
      }
      </>)}
      </>
    );


    //drag arkusz

      function handleDragMoveStartArkusz(id,indeks,element_id){
      sessionStorage.setItem("id_arkusz_drag", id);
      sessionStorage.setItem("id_element_arkusz_drag", element_id);
      sessionStorage.setItem("id_indeks_drag", indeks);
      sessionStorage.setItem("typ_drag", "arkusz");
     }



    //


    function handleDragStart(id){
      //   e.preventDefault();
       sessionStorage.setItem("typ_drag", "legi");
      setDragLegaId(id)
     }

     function handleDragStartFragmnetLegi(id){
      sessionStorage.setItem("id_fragment_legi_drag", id);
    sessionStorage.setItem("typ_drag", "fragmentlegi");
 
     }
   
    function handleDrop(id,indeks,element_id) {

      //id to arkusz-id drop
      let typ_drag = sessionStorage.getItem("typ_drag")
       let id_element_arkusz_drag = sessionStorage.getItem("id_element_arkusz_drag")
      if(typ_drag=='arkusz'){
              //drop w obrębie tego samego elementu

        if(element_id == id_element_arkusz_drag ){
                let indeks_drag = sessionStorage.getItem("id_indeks_drag")
                let id_arkusz_drag = sessionStorage.getItem("id_arkusz_drag")
                let indeks_drop= indeks;
      
          let m = 0;
          let n = 1;    


          let new_arkusze = arkusze.map((t) => {
                              if (t.indeks > indeks_drag) {
                                return {...t, indeks: t.indeks -1,update: true}
                              }else return t
                            })

                            .map((t) => {
                              if (t.indeks >= indeks_drop) {
                                return {...t, indeks: t.indeks +1,update: true}
                              }else return t
                            })

                            .map((t) => {
                              if (t.id == id_arkusz_drag) {
                                return {...t, indeks: indeks_drop,update: true}
                              }else return t
                            })
                
                                        .sort((a, b) => a.indeks - b.indeks)
                                    .map((ark,i) => {
                            if(ark.element_id == id_element_arkusz_drag){
                            m++;
                              return {...ark, nr_arkusza: m, update: true}
                            }else {return ark } 
                          
                            })

       //--------------------------                     
                            let new_legi = [...legi]
                            let s =0;
                            for( let ark of new_arkusze.filter(x => x.element_id ==id_element_arkusz_drag )){
                            
                              new_legi =  new_legi.map((lega,i) => {
                                      
                                        if ( ark.id == lega.arkusz_id   ) {
                                    s++
                                          
                                     
                                          return {
                                            ...lega,
                                            indeks: s,
                                            update: true,
                                          };
                               
                                        } else {
                                          return lega;
                                        }
                                      })

                

                            }
                  
        //-----------------------------------------                 


                          //przenumerowanie indeksow leg wzgledem arkuszy

                                    setLegi(
                                      new_legi
                                      .sort((a, b) => a.indeks - b.indeks)
                                      .map((ark, i) => {
                                      
                                        if (
                                          ark.element_id ==
                                          id_element_arkusz_drag
                                        ) {
                                     
                                          return {
                                            ...ark,
                                            nr_legi: i,
                                            update: true,
                                          };
                                        } else {
                                          return ark;
                                        }
                                      })
                                    );
                            // .sort((a, b) => a.oprawa_id - b.oprawa_id)

 setArkusze(new_arkusze )

        }


      }




          if(typ_drag=='legi'){
                        setLegi(
                          legi.map((t, a) => {
                          // console.log("oprawa id" +prev)
                          if (t.id === dragLegaId) {
                            return {
                              ...t,
                              arkusz_id: id,
                              update: true
                    
                            };
                          } else {
                            return t;
                          }
                        })
                      );

                      setLegiFragmenty(
                        legiFragmenty.map((t, a) => {
                        if (t.lega_id === dragLegaId) {
                          return {
                            ...t,
                            arkusz_id: id,
                            update: true

                          };
                        } else {
                          return t;
                        }
                      })
                    );
                        setDropArkuszId(id)
      }

    }
  
    function handleDragOver(e) {
      e.preventDefault();
    }








  };

  function WersjaFragment ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateLegiFragmentyTech = techContext.handleUpdateLegiFragmentyTech;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        
        <input
        className={style.input_legi}
        // disabled
        
          value={row.wersja}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_txt.test(e.target.value)) {
                handleUpdateLegiFragmentyTech({
              ...row,
              wersja: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }
  function WersjaFragmentZaznacz ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateLegiFragmentyTech = techContext.handleUpdateLegiFragmentyTech;
    return (
        <input
        title={"Zaznacz i szukaj zołtego pola na dole"}
        className={style.fragment_checkbox}
        type="checkbox"
          checked={row.select}
          onChange={(e) =>
            {
                handleUpdateLegiFragmentyTech({
              ...row,
              select: e.target.checked
            }
            )}
          }
        ></input>
    );
  }

  function NakladFragment ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateLegiFragmentyTech = techContext.handleUpdateLegiFragmentyTech;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        
        <input
        className={style.input_legi}
        // disabled
        
          defaultValue={row.naklad}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateLegiFragmentyTech({
              ...row,
              naklad: e.target.value,
              update: true
            }
            )}
          }
          }
        ></input>
    );
  }

  function Rozwin({ showLegi,setShowLegi }) {
    const techContext = useContext(TechnologyContext);
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;
  
  
    return (
  
        <div>
          <img
            className={style.expand}
            src={logoExpand}
            onClick={() => {
              setShowLegi(!showLegi)
            }}
            alt="Procesy"
          />
        </div>
  
    );
  }
  function GenerujWykonanieArkusz({ row }) {
    const techContext = useContext(TechnologyContext)
    const arkusze = techContext.arkusze;
    const wykonania = techContext.wykonania;
     const [createWykonaniaFromArkuszeLegi,createProcesyFromArkuszONE,createProcesyFromArkuszNewGrupa] = useProcesy()




if(wykonania.some(x=> x.arkusz_id == row.id)){

}else{
      return (
      <td className={style.col_button}>
        <div>
          <img
            className={style.expand}
            title="Stwórz wykonania do tego arkusza"
            src={logoExtract}
            onClick={() => {
              if(arkusze.some(x=> x.global_id === 0 )){
                alert("Najpierw zapisz technologię z nową ilością arkuszy")
              }else{
              createProcesyFromArkuszNewGrupa(row)

              }
              // handleRemoveArkusz()
            }}
            alt="Procesy"
          />
        </div>
      </td>
    );
}


  }

  function UsunArkusz({ row }) {
    const techContext = useContext(TechnologyContext)
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;

    const legi = techContext.legi;
    const setLegi = techContext.setLegi;
    const legiFragmenty = techContext.legiFragmenty;
    const setLegiFragmenty = techContext.setLegiFragmenty;
    const wykonania = techContext.wykonania;


    const handleRemoveArkusz = () => {

      
if(wykonania.some(x=> x.arkusz_id == row.id)){
      alert("Skasuj najpierw wykonanie do tego arkusza")
}else{     
      if (arkusze.filter((x) => x.delete != true )) {
      // if (arkusze.filter((x) => x.delete != true && x.element_id == row.element_id).length > 1) {

      let newArkusze = [...arkusze];
      let newArkusze2 =  newArkusze.map((t, a) => {
          if (t.id == row.id) {
            return {
              ...t,
              delete: true,
            };
          }else {
            return t;
          }
        })
        
        newArkusze2.map((t, a) => {
            if ( t.indeks > row.indeks) {
            return {
              ...t,
              indeks: t.indeks--,
            };
          }else {
            return t;
          }
        })


      let m = 0;
      setArkusze(
        newArkusze2.map((ark, i) => {
          if (ark.element_id == row.element_id && ark.delete != true) {
            m++;
            return { ...ark, nr_arkusza: m, update: true };
          } else {
            return ark;
          }
        })
      );
//----------------
      let newLegi = [...legi]

      let n = 0;
      
    let newLegi2 =  newLegi.map((t, a) => {
        if (t.arkusz_id == row.id) {
          return {
            ...t,
            delete: true,
          };
        }else {
          return t;
        }
      }
    
    )

    newLegi2.map((t, a) => {
      if ( t.indeks > row.indeks) {
      return {
        ...t,
        indeks: t.indeks--,
      };
    }else {
      return t;
    }
  })

      setLegi(
        newLegi2.map((lega, i) => {
          if (lega.element_id == row.element_id && lega.delete != true) {
            n++;
            return { ...lega, nr_legi: n, update: true };
          } else {
            return lega;
          }
        })
      );


//----------

    let newLegiFragmenty = [...legiFragmenty]
    let newLegiFragmenty2 =  newLegiFragmenty.map((t, a) => {
        for(let lega of legi.filter(x=>x.arkusz_id == row.id)){

     if (t.lega_id == lega.id) {
          return {
            ...t,
            delete: true,
          }
        }
        }
        return t;

      })

      let k = 0;
      setLegiFragmenty(
        newLegiFragmenty2.map((frag, i) => {
          if (frag.element_id == row.element_id  && frag.delete != true) {
            k++;
            return { ...frag,nr_legi:k, indeks: k, update: true };
          } else {
            return frag;
          }
        })
      );
      
      }

    }// koniec sprawdzania czy do akrusza jest jakieś wykonanie
    };

    return (
      <td className={style.col_button}>
        <div>
          <img
            className={style.expand}
            src={iconTrash}
            onClick={() => {
              handleRemoveArkusz()
            }}
            alt="Procesy"
          />
        </div>
      </td>
    );
  }





  function NrArkusza ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
        <input
        className={style.input_ark_nr}
          value={row.nr_arkusza}
          onChange={(e) =>
            {
              if (e.target.value === '' || reg_txt.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              nr_arkusza: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }
  function ArkuszSzerokosc ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
        <input
        className={style.input_ark_nr}
        defaultValue={row.arkusz_szerokosc}
          onChange={(e) =>
            {
              if (e.target.value === '' || reg_cena.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              arkusz_szerokosc: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }

  function ArkuszWysokosc ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
        <input
        className={style.input_ark_nr}
          value={row.arkusz_wysokosc}
          onChange={(e) =>
            {
              if (e.target.value === '' || reg_cena.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              arkusz_wysokosc: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }


  
  function RodzajArkusza ({row}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
   
        <input
        className={style.input_ark}
          value={row.rodzaj_arkusza}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              rodzaj_arkusza: e.target.value,
              update: true
            }
            )}}

          }
        ></input>
     
    );
  }
  function PapierSelectArkusze({  row}) {
    const appcontext = useContext(AppContext);
    const listaPapierow = appcontext.listaPapierow;
    const modalcontext = useContext(ModalInsertContext);
    const setShowPaperStage = modalcontext.setShowPaperStage;

    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
     const techContext = useContext(TechnologyContext)
        const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;

        const setSelectedElementTechROW = techContext.setSelectedElementTechROW;
        const setSelectedElementTechArkusz = techContext.setSelectedElementTechArkusz;
  
    return (
     <div className={style.papier_input_container}>
        <select
          className={row.papier_id =="0" ? style.select_papier_brak : style.select_papier }
          value={row.papier_id}
          onChange={(e) => {

            handleUpdateRowArkusze({
              ...row,
              papier_id: parseInt(e.target.value),
              update: true
            })
            
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
            setSelectedElementTechROW(null)
            setSelectedElementTechArkusz(row)
            setListaPapierowWyszukiwarka(listaPapierow)
            
         
          }}
          alt="Procesy"
        />
     </div>
   
    );
  }

  function PapierPostacArkusze({  row}) {
    const appcontext = useContext(AppContext);
    const listaPapierow = appcontext.listaPapierow;
    const modalcontext = useContext(ModalInsertContext);
    const setShowPaperStage = modalcontext.setShowPaperStage;
    const setSelectedElementROW = modalcontext.setSelectedElementROW;
    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
     const techContext = useContext(TechnologyContext)
        const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
        const listaPapierowPostac = appcontext.listaPapierowPostac;
  
    return (
     <div className={style.papier_input_container}>
        <select
          className={row.papier_id =="0" ? style.select_papier_postac : style.select_papier_postac }
          value={row.papier_postac_id}
          onChange={(e) => {

            handleUpdateRowArkusze({
              ...row,
              papier_postac_id: parseInt(e.target.value),
              update: true
            })
            
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

  function SelectBoxArkusze({row}) {

    const techContext = useContext(TechnologyContext)
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;

  
    return (
      <td className={style.td_checkbox}>
        <div >
        <input
        className={style.ch_box} 
        type="checkbox"
        checked={row.select}
        onChange={(event)=>{
  
          //  console.log(" select"+ row.id +" "+event.target.checked)
          setArkusze(
            arkusze.map((t) => {
              if (t.id == row.id) {
                return {...row, select: event.target.checked }
              } else {
                return t;
              }
            })
          )
        }}
       ></input>
        </div>
  
      </td>
    );
  }

  function TypElementu ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        <input
        className={style.input_ark_typ}
        disabled
          value={"arkusz"}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              typ_elementu: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }

  function TypLega ({row,i}) {
    return (

        <input
        className={style.input_legi}
        disabled
          value={"lega"}
        ></input>
    );
  }
  function NrLegiFragment ({row,i}) {
    return (

        <input
        className={style.input__nr_legi_fragment}
        disabled
          value={row.nr_legi}
        ></input>
    );
  }
  function TypFragment ({row,i}) {
    return (

        <input
        className={style.input_legi}
        disabled
          value={"fragment"}
        ></input>
    );
  }

  function NakladArkusza ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;

    const contextApp = useContext(AppContext);

const nadkomplety = contextApp.nadkomplety;

    return (
        <input
        className={style.input_ark_typ}
          defaultValue={row.naklad}
          onChange={(e) =>
            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              naklad: e.target.value,
               nadkomplet: findNadkomplet(nadkomplety,e.target.value),
              update: true
            }
            )}
          }
          }
        ></input>
    );
  }


  function NadkompletArkusz ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
        <input
        className={style.input_ark_typ}
          value={row.nadkomplet}
          onChange={(e) =>
            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              nadkomplet: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }

  function NrLegi ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowLegi = techContext.handleUpdateRowLegi;
    const setLegiFragmenty = techContext.setLegiFragmenty;
    const legiFragmenty = techContext.legiFragmenty;
    return (
        <input
        className={style.input_legi}
          value={row.nr_legi}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_txt.test(e.target.value)) {
                handleUpdateRowLegi({
              ...row,
              nr_legi: e.target.value,
              update: true
            }
            )
          
            setLegiFragmenty(
              legiFragmenty.map((t, a) => {
              if (t.lega_id == row.id) {
                return {
                  ...t,
                  nr_legi: e.target.value,
                  update: true
        
                };
              } else {
                return t;
              }
            })
          );

          }}
          }
        ></input>
    );
  }
  function NakladLegi ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowLegi = techContext.handleUpdateRowLegi;
    return (
        <input
        className={style.input_legi}
          defaultValue={row.naklad}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowLegi({
              ...row,
              naklad: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }

  function RodzajLegi ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowLegi = techContext.handleUpdateRowLegi;
    return (
        <input
        className={style.input_legi}
          defaultValue={row.rodzaj_legi}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowLegi({
              ...row,
              rodzaj_legi: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }

  function UwagiLegi ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowLegi = techContext.handleUpdateRowLegi;
    return (
        <input
        className={style.input_legi}
          defaultValue={row.uwagi}
          onChange={(e) =>
            {
              if (e.target.value === '' || reg_txt.test(e.target.value)) {
                handleUpdateRowLegi({
              ...row,
              uwagi: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }

  function UwagiArkusz ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
        <input
        className={style.input_ark_typ}
          value={row.indeks+" "+row.uwagi}
          onChange={(e) =>
            {
              if (e.target.value === '' || reg_txt.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              uwagi: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }