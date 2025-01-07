import React, { useEffect, useState,useContext,useRef} from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import style from "./PaperStage.module.css";
import iconX from "../../assets/x.svg";
import iconDelete from "../../assets/trash.svg";
// import TableClient from "./components/TableClient";
import iconTable from "../../assets/add.png";
import addIcon2 from "../../assets/addIcon2.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import TablePaper from "./TablePaper";
import { updatePaper } from "./actions/updatePaper";
import { dragElement } from "actions/dragDrop";
import { insertPaper } from "./actions/insertPaper";
import TablePaperNazwa from "./TablePaperNazwa";

// import AddClient from "./components/AddClient";

export default function PaperStage() {


    const appcontext = useContext(AppContext);
    const modalcontext = useContext(ModalInsertContext);

    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
    const setListaPapierow = appcontext.setListaPapierow;
    const setListaPapierowNazwy = appcontext.setListaPapierowNazwy;
    const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
    const showPaperStage = modalcontext.showPaperStage;
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

    // axios.get(IP + "lista-papierow-nazwy").then(res =>{  setListaPapierowNazwy([...res.data]);})
  }

  useEffect(() => {
    getPapier();
  
  }, []);




 if(showPaperStage){
  return (
    <div className={style.grayScaleBackground}>
      <div className={style.window}>
        <Header setPaperSelectView={setPaperSelectView}/>
        <Finder >
          <div className={style.btnContainer}>
            <PapierBTN paperSelectView={paperSelectView} setPaperSelectView={setPaperSelectView}/>
            <NazwaBTN paperSelectView={paperSelectView} setPaperSelectView={setPaperSelectView}/>

            <button className={style.btnPaper}>Grupa</button>
        


          </div>

        <Szukaj           />
        </Finder>
        <TablePaper paperSelectView={paperSelectView}/>
        <TablePaperNazwa paperSelectView={paperSelectView} />
  <div className={style.footer}>
    <Zapisz  />
  </div>

      </div>
    </div>
  );
 }
  

}

function PapierNazwaGrupa() {
  const contextApp = useContext(AppContext);
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
    return (
      <div className={style.col_dane}>
        <select
          className={style.select_papier}
          value={daneZamowienia.firma_id}
  
          onChange={(event) => {
            // setDaneZamowienia({...daneZamowienia, firma_id: event.target.value});
            // setSaveButtonDisabled(false)
          }}
        >
          {             <option value = "0"  >    Papier   </option>            }
          {             <option value = "0"  >    Nazwa   </option>            }
          {             <option value = "0"  >    Grupa   </option>            }
        </select>
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
  const setListaPapierowNazwy = appcontext.setListaPapierowNazwy;




      return (
    <button 
    
    className={style.btn} 
    onClick={() => {
       updatePaper(listaPapierowWyszukiwarka,setListaPapierowWyszukiwarka,listaPapierowWyszukiwarka,setListaPapierow,setListaPapierowNazwy,setBtnZapiszPapierDisabled,setListaPapierowWyszukiwarka)
      // insertPaper(listaPapierowWyszukiwarka.filter(x => x.insert == true),setListaPapierowWyszukiwarka,listaPapierowWyszukiwarka,setListaPapierow,setListaPapierowNazwy,setBtnZapiszPapierDisabled)
// console.log(isBtnZapiszPapierDisabled)
    }}
    
    disabled={isBtnZapiszPapierDisabled}
    >
      Zapisz</button>

  );
}

function PapierBTN({paperSelectView, setPaperSelectView}) {
      return (
    <button 
    
    className={style.btnPaper} 
    onClick={() => {
      setPaperSelectView(
        paperSelectView.map((t) => {  return{...t,view:false}      })
        .map((t) => {          if (t.nazwa == "papier") {
          return {...t,
            view: true}
        } else {
          return t;
        }  })
      );
    }}
    

    >
      Papier</button>

  );
}



function NazwaBTN({paperSelectView, setPaperSelectView}) {
  return (
<button 

className={style.btnPaper} 
onClick={() => {
  setPaperSelectView(
    paperSelectView.map((t) => {  return{...t,view:false}      })
    .map((t) => {          if (t.nazwa == "nazwa") {
      return {...t,
        view: true}
    } else {
      return t;
    }  })
  );
}}


>
  Nazwa</button>

);
}



function Header() {
  const appcontext = useContext(AppContext);
  const listaPapierowNazwy = appcontext.listaPapierowNazwy;
  const listaPapierow = appcontext.listaPapierow;
  const modalcontext = useContext(ModalInsertContext);

  const selectedElementROW = modalcontext.selectedElementROW;

  return (
    <div  className={style.header}>
      <p className={style.title}>         Ilość papierów: {listaPapierowNazwy.length} </p>
      <p className={style.title}>       Wybrany papier:  {listaPapierow.filter(x=> x.id == selectedElementROW.papier_id)[0].nazwa}  {listaPapierow.filter(x=> x.id == selectedElementROW.papier_id)[0].gramatura} {listaPapierow.filter(x=> x.id == selectedElementROW.papier_id)[0].wykonczenie}</p>
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









function Szukaj() {
  // const klienciEdit = JSON.parse(JSON.stringify(klienci));




  const appcontext = useContext(AppContext);
  const modalcontext = useContext(ModalInsertContext);
  const listaPapierow = appcontext.listaPapierow;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setListaPapierow = appcontext.setListaPapierow;
  const showPaperStage = modalcontext.showPaperStage;
  const setShowPaperStage = modalcontext.setShowPaperStage;
  const selectedElementROW = modalcontext.selectedElementROW;
  return (
    <input
      className={style.szukaj}
      type="text"
  
      placeholder="Szukaj..."
      onChange={(event) => {
        const m = [...listaPapierow];

        // let toFilter =  JSON.parse(JSON.stringify(klienciEdit))
        setListaPapierowWyszukiwarka(
          m.filter((k) =>
            k.nazwa.toLowerCase().includes(event.target.value.toLowerCase())
          )
        );
      }}
    ></input>
  );
}

function Finder({ children }) {
  return <div className={style.finder}>{children}</div>;
}
function Footer({ children }) {
  return <div className={style.footer}>{children}</div>;
}

function Stage({ children, klienci, setKlienci }) {
  return <div className={style.stage}>{children}</div>;
}
