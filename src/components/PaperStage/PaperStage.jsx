import React, { useEffect, useState,useContext,useRef} from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import style from "./PaperStage.module.css";
import iconX from "../../assets/x.svg";
import iconDelete from "assets/trashgray.svg";
import iconEdit from "assets/settings_grey.svg";
import addIcon2 from "../../assets/addIcon2.svg";
import Logo_ustawienia2 from "assets/refresh_green2.svg";

import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import TablePaper from "./TablePaper";
import TablePaperNazwa from "./TablePaperNazwa";
import TablePaperGrupa from "./TablePaperGrupa";
import iconCopy from "assets/copygrey.svg";
import { getMaxID } from "actions/getMaxID";
import ChangePaper from "./ChangePaper";
import { updatePaper } from "actions/updatePaper";
import { updatePaperGrupy } from "actions/updatePaperGrupy";
import { updatePaperNazwy } from "actions/updatePaperNazwy";
import { usePapier } from "hooks/usePapier";
import { getPapieryParametry } from "actions/getPapieryParametry";
import { onDeletePaperRow } from "./onDeletePaperRow";
import { onDeletePaperRowCheckUse } from "components/PaperStage/onDeletePaperRowCheckUse";

export default function PaperStage() {

  const start = useRef();
    const appcontext = useContext(AppContext);
    const modalcontext = useContext(ModalInsertContext);

    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
    const setListaPapierow = appcontext.setListaPapierow;
    const setListaPapierowNazwy = appcontext.setListaPapierowNazwy;
    const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
    const setListaPapierowGrupa = appcontext.setListaPapierowGrupa;
    const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;

    const setListaPapierowPostac = appcontext.setListaPapierowPostac;
    const setListaPapierowPostacWyszukiwarka = appcontext.setListaPapierowPostacWyszukiwarka;
    const setListaPapierowRodzaj = appcontext.setListaPapierowRodzaj;
    const setListaPapierowRodzajWyszukiwarka = appcontext.setListaPapierowRodzajWyszukiwarka;
    const setListaPapierowWykonczenia = appcontext.setListaPapierowWykonczenia;
    const setListaPapierowWykonczeniaWyszukiwarka = appcontext.setListaPapierowWykonczeniaWyszukiwarka;
    const setListaPapierowPowleczenie = appcontext.setListaPapierowPowleczenie;
    const setListaPapierowPowleczenieWyszukiwarka = appcontext.setListaPapierowPowleczenieWyszukiwarka;



    const showPaperStage = modalcontext.showPaperStage;
    const [selectRow, setSelectRow] = useState(null);
    const [selectTable, setSelectTable] = useState(start);
const [paperSelectView, setPaperSelectView] = useState([
  {id:1,nazwa:"papier",view:false},
  {id:2,nazwa:"nazwa",view:false},
  {id:3,nazwa:"grupa",view:true}
]);



const scrollTable = (table) => {
  if(table.current != null) {
      table.current.scrollTo({ top: 10000, behavior: "smooth" })
  }

};

  useEffect(() => {
      getPapieryParametry(setListaPapierow,setListaPapierowWyszukiwarka,setListaPapierowNazwy,setListaPapierowNazwyWyszukiwarka,
        setListaPapierowGrupa,setListaPapierowGrupaWyszukiwarka,setListaPapierowPostac,setListaPapierowPostacWyszukiwarka,setListaPapierowRodzaj,setListaPapierowRodzajWyszukiwarka,
        setListaPapierowWykonczenia,setListaPapierowWykonczeniaWyszukiwarka,setListaPapierowPowleczenie,setListaPapierowPowleczenieWyszukiwarka)
  }, []);

//----------- nie działa sprawdzić
  // const effectRan = useRef(false);
  // useEffect(() => {
  //   if (effectRan.current === true) {
  //     getPapieryParametry(setListaPapierow,setListaPapierowWyszukiwarka,setListaPapierowNazwy,setListaPapierowNazwyWyszukiwarka,
  //       setListaPapierowGrupa,setListaPapierowGrupaWyszukiwarka,setListaPapierowPostac,setListaPapierowPostacWyszukiwarka,setListaPapierowRodzaj,setListaPapierowRodzajWyszukiwarka,
  //       setListaPapierowWykonczenia,setListaPapierowWykonczeniaWyszukiwarka,setListaPapierowPowleczenie,setListaPapierowPowleczenieWyszukiwarka)
  //   }
  //   return () => {
  //     effectRan.current = true;
  //   };
  // }, []);


 if(showPaperStage){
  return (
    <div className={style.grayScaleBackground}>
      <div  resizable ref={start} className={style.window}>
        <Header setPaperSelectView={setPaperSelectView} selectRow={selectRow} setSelectRow={setSelectRow}/>
        <Finder >
                <div className={style.btnContainer}>
                  <RefreshBTN/>
                
                  {/* <PapierBTN paperSelectView={paperSelectView} setPaperSelectView={setPaperSelectView} setSelectRow={setSelectRow}/> */}
                  <GrupaBTN paperSelectView={paperSelectView} setPaperSelectView={setPaperSelectView} setSelectRow={setSelectRow}/>
                  <NazwaBTN paperSelectView={paperSelectView} setPaperSelectView={setPaperSelectView} setSelectRow={setSelectRow}/>
                  
                </div>
                <div className={style.container_in_footer_right}>
                    <div className={style.container_in_footer}>  <UseBTN selectRow={selectRow} scrollTable={scrollTable} selectTable={selectTable} paperSelectView={paperSelectView}/>  </div>
                    <div className={style.container_in_footer}>  <CopyBTN selectRow={selectRow} scrollTable={scrollTable} selectTable={selectTable} paperSelectView={paperSelectView} /> </div>
                    <div className={style.container_in_footer}>  <DeleteBTN selectRow={selectRow} scrollTable={scrollTable} selectTable={selectTable}  paperSelectView={paperSelectView}  />   </div>
              
                </div>
              <Szukaj paperSelectView={paperSelectView}/>
        </Finder>
        <TablePaper paperSelectView={paperSelectView} selectRow={selectRow} setSelectRow={setSelectRow} scrollTable={scrollTable} setSelectTable={setSelectTable}/>
        <TablePaperNazwa paperSelectView={paperSelectView} setPaperSelectView={setPaperSelectView} selectRow={selectRow} setSelectRow={setSelectRow} scrollTable={scrollTable} setSelectTable={setSelectTable}/>
        <TablePaperGrupa paperSelectView={paperSelectView} setPaperSelectView={setPaperSelectView} selectRow={selectRow} setSelectRow={setSelectRow} scrollTable={scrollTable} setSelectTable={setSelectTable}/>
  <div className={style.footer}>
    <div className={style.container_in_footer}>  </div>
    <div className={style.container_in_footer}>   <Zapisz  /> </div>
    <div className={style.container_in_footer_right}>
 
    </div>
   

  </div>
      </div>

   
    </div>
  );
 }
  
}
function UseBTN({ selectRow, setSelectedPaperRow,paperSelectView}) {
  const [showChange, setShowChange] = useState(false);


      return (
    <div >
      <img
      title="Użyj"
      
        className={selectRow?.typ_row == 1 ? style.icon : style.iconDisabled}
        src={iconEdit}
        onClick={() => {
          if(selectRow!= null && selectRow.typ_row == 1){
          setShowChange(true)
          }
        }}
        alt="Użyj"
      />

<ChangePaper showChange={showChange} setShowChange={setShowChange} selectRow={selectRow} />
    </div>
  );
  

}










function CopyBTN({ selectRow,scrollTable,selectTable,paperSelectView}) {

  const appcontext = useContext(AppContext);
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
  const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
  const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;
  const listaPapierowGrupaWyszukiwarka = appcontext.listaPapierowGrupaWyszukiwarka;



  return (
    <div>
      <img
      title="Skopiuj znaznaczony papier"
        className={style.icon}
        src={iconCopy}
        onClick={() => {

          if(selectRow!= null){

            if(selectRow.typ_row == 1){
          const promiseA = new Promise((resolve, reject) => {
          const newlistaPapierowWyszukiwarka = listaPapierowWyszukiwarka.slice();

    
                    newlistaPapierowWyszukiwarka.push({
            ...selectRow,
            id: getMaxID(listaPapierowWyszukiwarka),
            insert: true
          })
        
      

          setListaPapierowWyszukiwarka(newlistaPapierowWyszukiwarka)
            resolve(777);
          });
          // promiseA.then(res => scrollTable(selectTable))
          setBtnZapiszPapierDisabled(false)

            }

  
            if(selectRow.typ_row == 2){
              const promiseA = new Promise((resolve, reject) => {
              const newlistaPapierowNazwyWyszukiwarka = listaPapierowNazwyWyszukiwarka.slice();
              newlistaPapierowNazwyWyszukiwarka.push({
                ...selectRow,
                nazwa: "Nowy papier",
                id: null,
                powleczenie_id:1,
                // id: getMaxID(listaPapierowNazwyWyszukiwarka),
                insert: true
              })
              setListaPapierowNazwyWyszukiwarka(newlistaPapierowNazwyWyszukiwarka)
                resolve(777);
              });
              promiseA.then(res => scrollTable(selectTable))
              setBtnZapiszPapierDisabled(false)
    
                }

                if(selectRow.typ_row == 3){
                  const promiseA = new Promise((resolve, reject) => {
                  const newlistaPapierowGrupaWyszukiwarka = listaPapierowGrupaWyszukiwarka.slice();
                  newlistaPapierowGrupaWyszukiwarka.push({
                    ...selectRow,
                    id: getMaxID(listaPapierowGrupaWyszukiwarka),
                    insert: true
                  })
                  setListaPapierowGrupaWyszukiwarka(newlistaPapierowGrupaWyszukiwarka)
                    resolve(777);
                  });
                  // promiseA.then(res => scrollTable(selectTable))
                  setBtnZapiszPapierDisabled(false)
        
                    }

          }

        }}
        alt="Procesy"
      />
    </div>
  );
}


function DeleteBTN({ selectRow }) {
    const appcontext = useContext(AppContext);
    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
    const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
    const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
    const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
    const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
    const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;
    const listaPapierowGrupaWyszukiwarka = appcontext.listaPapierowGrupaWyszukiwarka;

  return (
    <div>
      <img
      title="Skasuj zaznaczony papier"
        className={style.icon}
        src={iconDelete}
        onClick={() => {
            onDeletePaperRowCheckUse(setBtnZapiszPapierDisabled,selectRow,setListaPapierowWyszukiwarka,listaPapierowWyszukiwarka,setListaPapierowNazwyWyszukiwarka,
              listaPapierowNazwyWyszukiwarka,setListaPapierowGrupaWyszukiwarka,listaPapierowGrupaWyszukiwarka
            )
      }
      }
        alt="Procesy"
      />
    </div>
  );
}


function Zapisz() {
  const appcontext = useContext(AppContext);
  const isBtnZapiszPapierDisabled = appcontext.isBtnZapiszPapierDisabled;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setListaPapierow = appcontext.setListaPapierow;
  const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
  const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
  const setListaPapierowNazwy = appcontext.setListaPapierowNazwy;
  const listaPapierowGrupaWyszukiwarka = appcontext.listaPapierowGrupaWyszukiwarka;
  const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;
  const setListaPapierowGrupa = appcontext.setListaPapierowGrupa;

      return (
    <button 
    
    className={style.btn} 
    onClick={() => {
       updatePaper(listaPapierowWyszukiwarka,setListaPapierowWyszukiwarka,setListaPapierow,setBtnZapiszPapierDisabled)
       updatePaperNazwy(listaPapierowNazwyWyszukiwarka,setListaPapierowNazwyWyszukiwarka,setListaPapierowNazwy,setBtnZapiszPapierDisabled)
       updatePaperGrupy(listaPapierowGrupaWyszukiwarka,setListaPapierowGrupaWyszukiwarka,setListaPapierowGrupa,setBtnZapiszPapierDisabled)
    }}
    
    disabled={isBtnZapiszPapierDisabled}
    >
      Zapisz</button>

  );
}


function Pokaz({selectRow}) {
  const appcontext = useContext(AppContext);
  const isBtnZapiszPapierDisabled = appcontext.isBtnZapiszPapierDisabled;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
  const listaPapierowGrupaWyszukiwarka = appcontext.listaPapierowGrupaWyszukiwarka;

      return (
    <button 
    
    className={style.btn} 
    onClick={() => {
        console.clear()
        console.log("Papiery: ")
        console.log("listaPapierowWyszukiwarka : ",listaPapierowWyszukiwarka)
        console.log("listaPapierowNazwyWyszukiwarka : ",listaPapierowNazwyWyszukiwarka)
        console.log("listaPapierowGrupaWyszukiwarka : ",listaPapierowGrupaWyszukiwarka)
        // console.log("selectRow  lenght: "+ Object.values(selectRow).length      )
        console.log("selectRow : ",selectRow)
    }}
    
    disabled={isBtnZapiszPapierDisabled}
    >
      Pokaz</button>

  );
}


function PapierBTN({ paperSelectView, setPaperSelectView,setSelectRow }) {
  const appcontext = useContext(AppContext);
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const listaPapierow = appcontext.listaPapierow;
  return (
    <button
      className={style.btnPaper}
      onClick={() => {
        setPaperSelectView(
          paperSelectView
            .map((t) => {
              return { ...t, view: false };
            })
            .map((t) => {
              if (t.nazwa == "papier") {
                return { ...t, view: true };
              } else {
                return t;
              }
            })
        );

        setListaPapierowWyszukiwarka(listaPapierow)
        setSelectRow(null)

      }}
    >
      Wszystkie
    </button>
  );
}

function NazwaBTN({ paperSelectView, setPaperSelectView,setSelectRow }) {
  return (
    <button
      className={style.btnPaper}
      onClick={() => {
        setPaperSelectView(
          paperSelectView
            .map((t) => {
              return { ...t, view: false };
            })
            .map((t) => {
              if (t.nazwa == "nazwa") {
                return { ...t, view: true };
              } else {
                return t;
              }
            })
        );

        setSelectRow(null)
      }}
    >
      Papiery
    </button>
  );
}

const RefreshBTN = ({ row, showMenu, setShowMenu }) => {
  const appcontext = useContext(AppContext);

  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setListaPapierow = appcontext.setListaPapierow;
  const setListaPapierowNazwy = appcontext.setListaPapierowNazwy;
  const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
  const setListaPapierowGrupa = appcontext.setListaPapierowGrupa;
  const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;

  const setListaPapierowPostac = appcontext.setListaPapierowPostac;
  const setListaPapierowPostacWyszukiwarka = appcontext.setListaPapierowPostacWyszukiwarka;
  const setListaPapierowRodzaj = appcontext.setListaPapierowRodzaj;
  const setListaPapierowRodzajWyszukiwarka = appcontext.setListaPapierowRodzajWyszukiwarka;
  const setListaPapierowWykonczenia = appcontext.setListaPapierowWykonczenia;
  const setListaPapierowWykonczeniaWyszukiwarka = appcontext.setListaPapierowWykonczeniaWyszukiwarka;
  const setListaPapierowPowleczenie = appcontext.setListaPapierowPowleczenie;
  const setListaPapierowPowleczenieWyszukiwarka = appcontext.setListaPapierowPowleczenieWyszukiwarka;
      return (
    
    <div className={style.menu_produkty}>
      <img

        className={ style.iconMenuBtn}
        src={Logo_ustawienia2}
        title="Odśwież papiery"
        onClick={() => {

          getPapieryParametry(setListaPapierow,setListaPapierowWyszukiwarka,setListaPapierowNazwy,setListaPapierowNazwyWyszukiwarka,
            setListaPapierowGrupa,setListaPapierowGrupaWyszukiwarka,setListaPapierowPostac,setListaPapierowPostacWyszukiwarka,setListaPapierowRodzaj,setListaPapierowRodzajWyszukiwarka,
            setListaPapierowWykonczenia,setListaPapierowWykonczeniaWyszukiwarka,setListaPapierowPowleczenie,setListaPapierowPowleczenieWyszukiwarka)
        }}
        alt="x"
      />
    </div>
  );
  
};




function GrupaBTN({paperSelectView, setPaperSelectView,setSelectRow}) {
  return (
<button 

className={style.btnPaper} 
onClick={() => {
  setPaperSelectView(
    paperSelectView.map((t) => {  return{...t,view:false}      })
    .map((t) => {          if (t.nazwa == "grupa") {
      return {...t,
        view: true}
    } else {
      return t;
    }  })
  );

  setSelectRow(null)
}}


>
  Grupy</button>

);
}


function Header({selectRow,setSelectRow}) {
  const appcontext = useContext(AppContext);
  const listaPapierowNazwy = appcontext.listaPapierowNazwy;
  const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
  const listaPapierowPowleczenie = appcontext.listaPapierowPowleczenie;
  const modalcontext = useContext(ModalInsertContext);

  const selectedElementROW = modalcontext.selectedElementROW;





  // const listaPapierowNazwy = appcontext.listaPapierowNazwy;
  // const listaPapierow = appcontext.listaPapierow;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;

  return (
    <div  className={style.header} onDoubleClick={ () => {
      console.clear()
      console.log("Papiery: ")

      console.log("Papiery_nazwy: ",listaPapierowNazwyWyszukiwarka)
      console.log("listaPapierowWyszukiwarka: ",listaPapierowWyszukiwarka)
      console.log("powleczenie: ",listaPapierowPowleczenie)
      

    }}>
      <p className={style.title}>         Ilość papierów: {listaPapierowNazwy.length} </p>
      {/* {<p className={style.title}>       Wybrany papier:  {listaPapierow?.filter(x=> x.id == selectedElementROW?.papier_id)[0]?.nazwa}  {listaPapierow?.filter(x=> x.id == selectedElementROW?.papier_id)[0]?.gramatura} {listaPapierow?.filter(x=> x.id == selectedElementROW?.papier_id)[0]?.wykonczenie}</p>} */}
      {/* <p className={style.title}>       Wybrany papier:  {listaPapierow.filter(x=> x.id == selectedElementROW.papier_id)[0].nazwa}  {listaPapierow.filter(x=> x.id == selectedElementROW.papier_id)[0].gramatura} {listaPapierow.filter(x=> x.id == selectedElementROW.papier_id)[0].wykonczenie}</p> */}
      {/* <p className={style.title}>       Zaznaczone:  {selectRow?.id}</p> */}
      {/* <p className={style.title}>         Ilość papierów: {listaPapierow[0].nazwa} </p> */}
      <Zamknij setSelectRow={setSelectRow}/>
    </div>
  );
}

function Zamknij({setSelectRow}) {
  const modalcontext = useContext(ModalInsertContext);
  const setShowPaperStage = modalcontext.setShowPaperStage;

  const appcontext = useContext(AppContext);

  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        setShowPaperStage(false);
        setBtnZapiszPapierDisabled(true)
        setSelectRow(null)

      }}
      alt="Procesy"
    />
  );
}


function Dodaj({ setShowAddClientPane }) {
  return (
    <img
      className={style.dodaj_klienta}
      src={addIcon2}
      onClick={() => {
        setShowAddClientPane(true);
        //  showAddClientStage(true)
        // setShowOprawaElementyStage(true);
        // setOprawa_row(row);
      }}
      alt="Procesy"
    />
  );
}



function Szukaj({ paperSelectView }) {
  const appcontext = useContext(AppContext);
  const listaPapierow = appcontext.listaPapierow;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const listaPapierowNazwy = appcontext.listaPapierowNazwy;
  const setListaPapierowNazwyWyszukiwarka =    appcontext.setListaPapierowNazwyWyszukiwarka;
  const listaPapierowGrupa = appcontext.listaPapierowGrupa;
  const setListaPapierowGrupaWyszukiwarka =     appcontext.setListaPapierowGrupaWyszukiwarka;

  return (
    <input
      className={style.szukaj}
      type="text"
      placeholder="Szukaj..."
      onChange={(event) => {
        if (paperSelectView[0].view == true) {
          const m = [...listaPapierow];
          setListaPapierowWyszukiwarka(
            m.filter((k) =>
              k.nazwa.toLowerCase().includes(event.target.value.toLowerCase())
            )
          );
        }

        if (paperSelectView[1].view == true) {
          const m = [...listaPapierowNazwy];
          setListaPapierowNazwyWyszukiwarka(
            m.filter((k) =>
              k.nazwa.toLowerCase().includes(event.target.value.toLowerCase())
            )
          );
        }

        if (paperSelectView[2].view == true) {
          const m = [...listaPapierowGrupa];
          setListaPapierowGrupaWyszukiwarka(
            m.filter((k) =>
              k.grupa.toLowerCase().includes(event.target.value.toLowerCase())
            )
          );
        }
      }}
    ></input>
  );
}

function Finder({ children }) {
  return <div className={style.finder}>{children}</div>;
}

