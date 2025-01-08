import React, { useEffect, useState,useContext,useRef} from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import style from "./PaperStage.module.css";
import iconX from "../../assets/x.svg";
import addIcon2 from "../../assets/addIcon2.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import TablePaper from "./TablePaper";
import { updatePaper } from "./actions/updatePaper";
import TablePaperNazwa from "./TablePaperNazwa";
import TablePaperGrupa from "./TablePaperGrupa";

export default function PaperStage() {

    const appcontext = useContext(AppContext);
    const modalcontext = useContext(ModalInsertContext);

    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
    const setListaPapierow = appcontext.setListaPapierow;
    const setListaPapierowNazwy = appcontext.setListaPapierowNazwy;
    const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
    const setListaPapierowGrupa = appcontext.setListaPapierowGrupa;
    const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;
    const showPaperStage = modalcontext.showPaperStage;
    const [selectRow, setSelectRow] = useState(null);
const [paperSelectView, setPaperSelectView] = useState([
  {id:1,nazwa:"papier",view:true},
  {id:2,nazwa:"nazwa",view:false},
  {id:3,nazwa:"grupa",view:false}
]);


  async function getPapier() {
    const res = await axios.get(IP + "lista-papierow");
    setListaPapierow([...res.data].map(x => {return {...x, update:null,insert:null,delete:null}}  ));
    setListaPapierowWyszukiwarka([...res.data].map(x => {return {...x, update:null,insert:null,delete:null}}  ));

    const res2 = await axios.get(IP + "lista-papierow-nazwy");
    setListaPapierowNazwy([...res2.data].map(x => {return {...x, update:null,insert:null,delete:null}}  ));
    setListaPapierowNazwyWyszukiwarka([...res2.data].map(x => {return {...x, update:null,insert:null,delete:null}}  ));

    const res3 = await axios.get(IP + "lista-papierow-grupa");
    setListaPapierowGrupa([...res3.data].map(x => {return {...x, update:null,insert:null,delete:null}}  ));
    setListaPapierowGrupaWyszukiwarka([...res3.data].map(x => {return {...x, update:null,insert:null,delete:null}}  ));


  }

  useEffect(() => {
    getPapier();
  
  }, []);




 if(showPaperStage){
  return (
    <div className={style.grayScaleBackground}>
      <div className={style.window}>
        <Header setPaperSelectView={setPaperSelectView} selectRow={selectRow}/>
        <Finder >
          <div className={style.btnContainer}>
            <PapierBTN paperSelectView={paperSelectView} setPaperSelectView={setPaperSelectView}/>
            <NazwaBTN paperSelectView={paperSelectView} setPaperSelectView={setPaperSelectView}/>
            <GrupaBTN paperSelectView={paperSelectView} setPaperSelectView={setPaperSelectView}/>
          </div>
        <Szukaj paperSelectView={paperSelectView}/>
        </Finder>
        <TablePaper paperSelectView={paperSelectView} selectRow={selectRow} setSelectRow={setSelectRow} />
        <TablePaperNazwa paperSelectView={paperSelectView} />
        <TablePaperGrupa paperSelectView={paperSelectView} />
  <div className={style.footer}>
    <Zapisz  />
  </div>
      </div>
    </div>
  );
 }
  
}


function Zapisz() {
  const appcontext = useContext(AppContext);
  const isBtnZapiszPapierDisabled = appcontext.isBtnZapiszPapierDisabled;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setListaPapierow = appcontext.setListaPapierow;
  const setListaPapierowNazwy = appcontext.setListaPapierowNazwy;

      return (
    <button 
    
    className={style.btn} 
    onClick={() => {
       updatePaper(listaPapierowWyszukiwarka,setListaPapierowWyszukiwarka,listaPapierowWyszukiwarka,setListaPapierow,setListaPapierowNazwy,setBtnZapiszPapierDisabled,setListaPapierowWyszukiwarka)
    }}
    
    disabled={isBtnZapiszPapierDisabled}
    >
      Zapisz</button>

  );
}

function PapierBTN({ paperSelectView, setPaperSelectView }) {
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
      }}
    >
      Papier
    </button>
  );
}

function NazwaBTN({ paperSelectView, setPaperSelectView }) {
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
      }}
    >
      Nazwa
    </button>
  );
}

function GrupaBTN({paperSelectView, setPaperSelectView}) {
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
}}


>
  Grupa</button>

);
}


function Header({selectRow}) {
  const appcontext = useContext(AppContext);
  const listaPapierowNazwy = appcontext.listaPapierowNazwy;
  const listaPapierow = appcontext.listaPapierow;
  const modalcontext = useContext(ModalInsertContext);

  const selectedElementROW = modalcontext.selectedElementROW;

  return (
    <div  className={style.header}>
      <p className={style.title}>         Ilość papierów: {listaPapierowNazwy.length} </p>
      <p className={style.title}>       Wybrany papier:  {listaPapierow.filter(x=> x.id == selectedElementROW.papier_id)[0].nazwa}  {listaPapierow.filter(x=> x.id == selectedElementROW.papier_id)[0].gramatura} {listaPapierow.filter(x=> x.id == selectedElementROW.papier_id)[0].wykonczenie}</p>
      <p className={style.title}>       Zaznaczone:  {selectRow?.id}</p>
      {/* <p className={style.title}>         Ilość papierów: {listaPapierow[0].nazwa} </p> */}
      <Zamknij/>
    </div>
  );
}

function Zamknij() {
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

