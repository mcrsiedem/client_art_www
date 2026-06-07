import axios from "axios";
import { useContext, useState } from "react";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
import DecodeToken from "pages/Login/DecodeToken";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
import { ZamowienieContext } from "context/ZamowieniaContext";
export function useZamowienia() {
  const contextApp = useContext(AppContext);
  const techcontext = useContext(TechnologyContext);
  const tableZamowienia = contextApp.tableZamowienia;
  const setIsLoading = contextApp.setIsLoading;
  // const zamowienia = contextApp.zamowienia;
  const setZamowienia = contextApp.setZamowienia;

    // const [nr, setNr] = useState(null);
    // const [rok, setRok] = useState(2026);
    // const [klient, setKlient] = useState(null);
    // const [praca, setPraca] = useState(null);
    // const [isbn, setIsbn] = useState(null);
    // const [kod, setKod] = useState(null);
    // const [nr_zamowienia_klienta,setNr_zamowienia_klienta] = useState(null);
    // const [nr_kalkulacji,setNr_kalkulacji] = useState(null);

  const {zamowienia} = useContext(AppContext);
  const {pagination,updatePagination,widok,nr,rok,klient,praca,isbn,kod,nr_zamowienia_klienta,nr_kalkulacji,papierId,wysokosc,szerokosc,element_proces_id,arkusz_wysokosc,arkusz_szerokosc} = useContext(ZamowienieContext);

  // let dane = { nr: nr, rok: rok, praca: praca, klient: klient,isbn:isbn, kod_pracy:kod,nr_zamowienia_klienta ,nr_kalkulacji}
  const scrollTable = (table) => {
    if (table.current != null) {
      table.current.scrollTo({ top: 20000, behavior: "auto" });
    }
  };


    const globalSearch = async () => {

    setIsLoading(true);
    let  res = await axios.post(
      IP +
        "zamowieniaGlobalSearch/" +
        sessionStorage.getItem("token"),{ nr: nr, rok: rok, praca: praca, klient: klient,isbn:isbn, kod_pracy:kod,nr_zamowienia_klienta ,nr_kalkulacji,papier_id:papierId,format_x:szerokosc,format_y:wysokosc,element_proces_id,arkusz_wysokosc,arkusz_szerokosc}
  
    );

    
    contextApp.setZamowienia([...res.data.data]);
    contextApp.setZamowieniaWyszukiwarka([...res.data.data]);
    setIsLoading(false);

    if (DecodeToken(sessionStorage.getItem("token")).id == 3) {
      scrollTable(tableZamowienia);
    }


// console.log(dane)
  };


    const refreshZamowienia = async () => {
      console.log("tu")
    setIsLoading(true);
    const res = await axios.get(
      IP +
        "zamowienia/" +
        contextApp.sortowanieZamowienia.current +
        "/" +
        contextApp.zestawZamowienia.current +
        "/" +
        sessionStorage.getItem("token"),
    );
    contextApp.setZamowienia([...res.data]);
    contextApp.setZamowieniaWyszukiwarka([...res.data]);
    setIsLoading(false);

    if (DecodeToken(sessionStorage.getItem("token")).id == 3) {
      scrollTable(tableZamowienia);
    }
  };




    const refZamPagination = async (paginacja1 = true) => {

    setIsLoading(true);
    let res

    if(paginacja1){
           res = await axios.post(
      IP +
        "zamowieniaPaginations/" +
        sessionStorage.getItem("token"),{...pagination,...widok}
  
    );

    }else{

                 res = await axios.post(
      IP +
        "zamowieniaPaginations/" +
        sessionStorage.getItem("token"),{...pagination,...widok,currentPage:1}
  
    );
    }



    contextApp.setZamowienia([...res.data.data]);
    contextApp.setZamowieniaWyszukiwarka([...res.data.data]);
    updatePagination(res.data.pagination)
    // console.log(res.data.pagination)
    setIsLoading(false);

    if (DecodeToken(sessionStorage.getItem("token")).id == 3) {
      scrollTable(tableZamowienia);
    }
  };

  const refreshZamowieniaNiezamknieteKoszty = async () => {
    setIsLoading(true);
    const res = await axios.get(
      IP +
        "zamowienia/" +
        contextApp.sortowanieZamowienia.current +
        "/" +
        contextApp.zestawZamowienia.current +
        "/" +
        sessionStorage.getItem("token"),
    );
    contextApp.setZamowienia([
      ...res.data.filter(
        (row) =>
          row.etap == 16 &&
          row.koszty_status == 1 &&
          row.faktury_status != 3 &&
          row.opiekun_id == DecodeToken(sessionStorage.getItem("token")).id,
      ),
    ]);
    contextApp.setZamowieniaWyszukiwarka([
      ...res.data.filter(
        (row) =>
          row.etap == 16 && row.koszty_status == 1 && row.faktury_status != 3,
      ),
    ]);
    setIsLoading(false);

    scrollTable(tableZamowienia);
  };

  const refreshZamowieniaFaktury = async () => {
    setIsLoading(true);
    const res = await axios.get(
      IP +
        "zamowienia/" +
        contextApp.sortowanieZamowienia.current +
        "/" +
        contextApp.zestawFaktury.current +
        "/" +
        sessionStorage.getItem("token"),
    );
    contextApp.setZamowienia([...res.data]);
    contextApp.setZamowieniaWyszukiwarka([...res.data]);
    setIsLoading(false);

    // tylko dla Jarka
    if (DecodeToken(sessionStorage.getItem("token")).id == 3) {
      scrollTable(tableZamowienia);
    }
  };

  const refreshZamowieniaProofy = async () => {
    setIsLoading(true);
    const res = await axios.get(
      IP + "zamowienia_proofy/" + sessionStorage.getItem("token"),
    );
    contextApp.setZamowienia([...res.data]);
    contextApp.setZamowieniaWyszukiwarka([...res.data]);
    setIsLoading(false);
  };

  const odblokujZamowienie = (rowsToDelete) => {
    axios
      .delete(IP + "odblokuj_zamowienie/" + sessionStorage.getItem("token"), {
        data: { row: rowsToDelete },
      })
      .then((res) => {
        refZamPagination();
      });
  };

  const deleteZamowienie = (rowsToDelete) => {
    axios
      .delete(IP + "delete_zamowienie/" + sessionStorage.getItem("token"), {
        data: { row: rowsToDelete },
      })
      .then((res) => {
        refZamPagination();
      });
  };

  // async function zmienEtapWydrukowane(techologie) {
  //   await axios.put(
  //     IP + "zmieni_etap_wydrukowane/" + sessionStorage.getItem("token"),

  //     techologie,
  //   );


  // }



    async function edytujProofa(row,{setShowEditProof}) {

      // console.log(row)
   const res = await axios.put(
      IP + "edytuj_proofa/" + sessionStorage.getItem("token"),
      row,
    );
    // console.log(res.data)

    if(res.data.status == "ok"){
            setShowEditProof(false)
      setZamowienia(
      zamowienia.map((t) => {
        if (t.id == row.id) {
          return {...row
          }
        } else {
          return t;
        }
      })
    );
    }
else{
  alert(res.data.status)
}

  }

  
    async function dodajProofa() {


      let zamowienia_new = [...zamowienia];
      // console.log(row)
   const res = await axios.post(
      IP + "dodaj_proofa/" + sessionStorage.getItem("token"),
      
    );
    console.log(res.data)

    if(res.data.status == "ok"){
       zamowienia_new.push({id: res.data.id})
      setZamowienia(
      zamowienia_new
    );
    }
else{
  alert(res.data.status)
}

  }


      async function zamowienieOddaj(id) {

      // 
   const res = await axios.put(
      IP + "zamowienie_oddaj/" + sessionStorage.getItem("token"),
      {id},
    );
    console.log(res.data)

    if(res.data.status == "ok"){

    }
else{
  alert(res.data.status)
}

  }



const getElementy = async (nr, rok) => {
  setIsLoading(true);
  try {
    const res = await axios.get(
      IP +
      "elementy/" +
      nr +
      "/" +
      rok +
      "/" +
      sessionStorage.getItem("token")
    );

    // Aktualizujemy kontekst dla innych komponentów
    techcontext.setElementyTech(res.data);
    techcontext.setDaneTech(res.data[1]);
    console.log(res.data[1]);
    
    // Zwracamy dane, aby móc z nich skorzystać w łańcuchu async/await
    return res.data[0];
  } catch (error) {
    console.error("Błąd podczas pobierania elementów:", error);
    return [];
  } finally {
    setIsLoading(false);
  }
};





  return {
    refreshZamowienia,
    refZamPagination,
    odblokujZamowienie,
    deleteZamowienie,
    // zmienEtapWydrukowane,
    refreshZamowieniaFaktury,
    refreshZamowieniaNiezamknieteKoszty,
    refreshZamowieniaProofy,
    edytujProofa,
    dodajProofa,
    zamowienieOddaj,
    getElementy,
    globalSearch
    
  
  };
}
