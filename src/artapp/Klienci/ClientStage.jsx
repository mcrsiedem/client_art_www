import React, { useEffect, useState } from "react";
import axios from "axios";
import { ip } from "../../Host";
import style from "./ClientStage.module.css";
import TableClient from "./components/TableClient"
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
            </Finder>
          <TableClient klienciWyszukiwarka={klienciWyszukiwarka}   daneZamowienia={daneZamowienia}  setDaneZamowienia={setDaneZamowienia}/>
          <Zamknij showAddClientStage={showAddClientStage} />
        </Stage>


      </div>
    </div>
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

   
      <input className={style.data} type="text"
      // value={daneZamowienia.cena}
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
