import { useEffect, createContext, useState } from "react";

export const ZamowienieContext = createContext();
export const ZamowienieContextProvider = ({ children }) => {

const [showWyszukiwarka, setShowWyszukiwarka] = useState(false);

    const [nr, setNr] = useState(null);
    const [rok, setRok] = useState(2026);
    const [klient, setKlient] = useState(null);
    const [praca, setPraca] = useState(null);
    const [isbn, setIsbn] = useState(null);
    const [kod, setKod] = useState(null);
    const [nr_zamowienia_klienta,setNr_zamowienia_klienta] = useState(null);
    const [nr_kalkulacji,setNr_kalkulacji] = useState(null);
    const [papierId,setPapierId] = useState(null);
    const [wysokosc,setWysokosc] = useState(null);
    const [szerokosc,setSzerokosc] = useState(null);
    const [element_proces_id,setElement_proces_id] = useState(null);
    const [arkusz_wysokosc,setArkusz_wysokosc] = useState(null);
    const [arkusz_szerokosc, setArkusz_szerokosc] = useState(null);

    

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 300,
    totalPages: 0,
    total: 0
  });

    const [widok, setWidok] = useState({
    kolumna: "nr",
    kierunek: "asc",
    widok: "Bieżące", // używamy ID z tablicy _widokZamowien
    klientId: 0,
    opiekunId: 0,
  });

const updatePagination = (updates) => {
    setPagination((prev) => ({
      ...prev,
      ...updates,
      // Jeśli zmieniamy filtr lub sortowanie, zazwyczaj chcemy wrócić na 1. stronę
      // currentPage: updates.currentPage || (updates.pageSize ? prev.currentPage : 1),
    }));
  };



  const updateWidok = (updates) => {
    setWidok((prev) => ({
      ...prev,
      ...updates,
      // currentPage:1,
      // Jeśli zmieniamy filtr lub sortowanie, zazwyczaj chcemy wrócić na 1. stronę
      // currentPage: updates.currentPage || (updates.pageSize ? prev.currentPage : 1),
    }));
    //     setPagination((prev) => ({
    //   ...prev,
    //   // Jeśli zmieniamy filtr lub sortowanie, zazwyczaj chcemy wrócić na 1. stronę
    //   // currentPage: updates.currentPage || (updates.pageSize ? prev.currentPage : 1),
    //   currentPage:1,
    // }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };


  // useEffect(() => {
  //   console.log(pagination.kolumna)
  //   console.log(pagination.kierunek)
  //   console.log(pagination.widok)
  //   console.log(`Opiekun:  ${pagination.opiekunId}`)
  //   console.log(`Klient:  ${pagination.klientId}`)
  // }, [pagination]);

  return (
    <ZamowienieContext.Provider
      value={{
   _widokZamowien,handlePageChange,
      updatePagination,  pagination, setPagination,widok,updateWidok,
      showWyszukiwarka, setShowWyszukiwarka,
      nr, setNr,rok, setRok,klient, setKlient,praca, setPraca,isbn, setIsbn,kod, setKod,nr_zamowienia_klienta,setNr_zamowienia_klienta,nr_kalkulacji,setNr_kalkulacji,papierId,setPapierId,wysokosc,setWysokosc,szerokosc,setSzerokosc,element_proces_id,setElement_proces_id,arkusz_wysokosc,setArkusz_wysokosc,arkusz_szerokosc, setArkusz_szerokosc

      }}
    >
      {children}
    </ZamowienieContext.Provider>
  );
};

  const _widokZamowien = [
        {
      id:0,
      nazwa: "Bieżące",
    },
            {
      id:1,
      nazwa: "Przed drukiem",
    },
    {
      id: 2,
      nazwa: "Harmonogram",
    },
    {
      id: 3,
      nazwa: "Wydrukowane",
    },
    {
      id: 4,
      nazwa: "Sfalcowane",
    },
    
    {
      id: 5,
      nazwa: "Oprawione",
    },
    
    {
      id: 6,
      nazwa: "Oddane",
    },

        {
      id: 7,
      nazwa: "Anulowane",
    },
    {
      id: 8,
      nazwa: "Wszystkie",
    }
  ,
    {
      id: 9,
      nazwa: "Proofy",
    },
  ];
