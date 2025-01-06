import React, { useEffect, useState,useContext} from "react";
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

// import AddClient from "./components/AddClient";

export default function PaperStage() {

  async function getPapier() {
    const res = await axios.get(IP + "lista-papierow");
    setListaPapierow([...res.data]);
    setListaPapierowWyszukiwarka([...res.data]);
    // setKlienciWyszukiwarka([...res.data]);
  }

  useEffect(() => {
    getPapier();
  }, []);

  const [isShowAddClientPane, setShowAddClientPane] = useState(false);
    const appcontext = useContext(AppContext);
    const modalcontext = useContext(ModalInsertContext);
    const listaPapierow = appcontext.listaPapierow;
    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
    const setListaPapierow = appcontext.setListaPapierow;
    const showPaperStage = modalcontext.showPaperStage;
    const setShowPaperStage = modalcontext.setShowPaperStage;
    const selectedElementROW = modalcontext.selectedElementROW;




 if(showPaperStage){
  return (
    <div className={style.grayScaleBackground}>
      <div className={style.window}>
        <Header />
        {/* {selectedElementROW.naklad} */}
       {/* Ilość papierów {listaPapierow.length} */}
      
        <Finder >
          <p>Finder</p>
          {/* <Dodaj
            isShowAddClientPane={isShowAddClientPane}
            setShowAddClientPane={setShowAddClientPane}
          /> */}
          <Szukaj           />
        </Finder>
        <TablePaper/>
        {/* <TableClient
          klienciWyszukiwarka={klienciWyszukiwarka}
          daneZamowienia={daneZamowienia}
          setDaneZamowienia={setDaneZamowienia}
          getClients={()=>getClients()}
          setShowAddClientPane={setShowAddClientPane}
        />

        {isShowAddClientPane && (
          <AddClient
            isShowAddClientPane={isShowAddClientPane}
            setShowAddClientPane={setShowAddClientPane}
            getClients= {()=>getClients()}
          />
        )} */}


      </div>
    </div>
  );
 }
  

}


function Header() {
  return (
    <div className={style.header}>
      <p className={style.title}>Papiery </p>
      <Zamknij/>
    </div>
  );
}

function Zamknij() {
  const modalcontext = useContext(ModalInsertContext);
  const setShowPaperStage = modalcontext.setShowPaperStage;
  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        setShowPaperStage(false);
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
