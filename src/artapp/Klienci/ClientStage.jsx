import React, { useEffect, useState } from "react";
import axios from "axios";
import { ip } from "../../Host";
import style from "./ClientStage.module.css";
import TableClient from "./components/TableClient"
import iconTable from "../../svg/add.png";
export default function ClientStage({
  isShowAddClientStage,
  showAddClientStage,
  daneZamowienia,
  setDaneZamowienia,
  klienci, setKlienci,
  klienciWyszukiwarka, setKlienciWyszukiwarka
}) {
  //   useEffect(() => {}, []);


  // async function getClients() {
  //   const res = await axios.get(ip + "lista-klientow");
  //   setKlienci([...res.data]);
  // }
  
  useEffect(() => {
    //  getClients();
    
  }, []);

  // const [klienciWyszukiwarka, setKlienciWyszukiwarka] = useState(klienci);


  return (
    <div className={style.grayScaleBackground}>
      <div className={style.window}>

        <Header />

        <Stage  klienci={klienci} setKlienci={setKlienci}>
            <Finder  klienci={klienci} setKlienci={setKlienci}>
                    <Szukaj klienci={klienci} setKlienci={setKlienci} setKlienciWyszukiwarka={setKlienciWyszukiwarka} />
                    <Dodaj/>
            </Finder>
          <TableClient klienciWyszukiwarka={klienciWyszukiwarka}   daneZamowienia={daneZamowienia}  setDaneZamowienia={setDaneZamowienia}/>
          <Zamknij showAddClientStage={showAddClientStage} />
        </Stage>


      </div>
    </div>
  );
}

function Dodaj() {
  return (
    <img
    className={style.dodaj_klienta}
     src={iconTable}
     onClick={() => {
      //  showAddClientStage(true)
       // setShowOprawaElementyStage(true);
       // setOprawa_row(row);
     }}
     alt="Procesy"
    />
  );
}



function Header() {
  return (
    <div className={style.header}>
      <p className={style.title}>Lista klientów </p>
    </div>
  );
}

const find =(txt,klienci,setKlienci) =>{
  
}

function Szukaj({klienci,setKlienci,klienciWyszukiwarka,setKlienciWyszukiwarka}){
   const klienciEdit = JSON.parse(JSON.stringify(klienci))
  return(

   
      <input className={style.szukaj} type="text"
      // value={daneZamowienia.cena}
      placeholder="Szukaj..."
      onChange={(event) => {

        const m = [...klienci]


        // let toFilter =  JSON.parse(JSON.stringify(klienciEdit))
        setKlienciWyszukiwarka(m.filter((k)=>   k.firma
        .toLowerCase()
        .includes(event.target.value.toLowerCase()) )  );

        
      }}></input>

  );
}

function Finder({ children,klienci,setKlienci }) {
  return (
  <div className={style.finder}>
    {children}
  </div>
  )
  
}
function Stage({ children,klienci,setKlienci }) {
  return (
  <div className={style.stage}>
    {children}
  </div>
  )
  
}

function Zamknij({ showAddClientStage }) {
  return (
    <button
      className={style.btn}
      onClick={() => {
        showAddClientStage(false);
      }}
    >
      Zamknij
    </button>
  );
}
